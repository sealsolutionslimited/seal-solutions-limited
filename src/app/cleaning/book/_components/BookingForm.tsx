"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import {
	SERVICE_TYPES,
	EXTRAS,
	TIME_SLOTS,
	calculateTotal,
	formatPrice,
	getMinDate,
	getMaxDate,
} from "@/lib/cleaningPricing";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

const STEPS = [
	"Service",
	"Property",
	"Add-ons",
	"Date & Time",
	"Contact",
	"Review",
];

const SERVICE_ICONS: Record<string, string> = {
	regularClean: "🧹",
	deepClean: "✨",
	endOfTenancy: "🏠",
	carpetClean: "🪣",
	ovenClean: "🔥",
};

function FieldLabel({
	children,
	required,
}: {
	children: React.ReactNode;
	required?: boolean;
}) {
	return (
		<label className="text-sm font-semibold text-gray-700 block mb-1.5">
			{children}
			{required && <span className="text-amber-500 ml-0.5">*</span>}
		</label>
	);
}

function Counter({
	label,
	value,
	min,
	max,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	onChange: (v: number) => void;
}) {
	return (
		<div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
			<span className="text-sm font-semibold text-gray-700">{label}</span>
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={() => onChange(Math.max(min, value - 1))}
					disabled={value <= min}
					className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					−
				</button>
				<span className="w-5 text-center font-bold text-[#0b1535]">{value}</span>
				<button
					type="button"
					onClick={() => onChange(Math.min(max, value + 1))}
					disabled={value >= max}
					className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					+
				</button>
			</div>
		</div>
	);
}

function ReviewRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between gap-4 px-4 py-3 text-sm">
			<span className="text-gray-400 font-medium shrink-0">{label}</span>
			<span className="text-[#0b1535] font-semibold text-right">{value}</span>
		</div>
	);
}

export default function BookingForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const {
		step,
		serviceType,
		bedrooms,
		bathrooms,
		extras,
		address,
		postcode,
		date,
		timeSlot,
		customerName,
		customerEmail,
		customerPhone,
		notes,
		setField,
		toggleExtra,
		nextStep,
		prevStep,
		reset,
	} = useBookingStore();

	const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

	const canProceed = () => {
		switch (step) {
			case 1: return !!serviceType;
			case 2: return !!address.trim() && !!postcode.trim();
			case 3: return true;
			case 4: return !!date && !!timeSlot;
			case 5:
				return (
					!!customerName.trim() &&
					isValidEmail(customerEmail) &&
					customerPhone.trim().length >= 7
				);
			default: return true;
		}
	};

	const total = calculateTotal(serviceType, bedrooms, bathrooms, extras);

	const handlePay = () => {
		setError(null);
		startTransition(async () => {
			try {
				const res = await fetch("/api/cleaning-checkout", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						serviceType,
						bedrooms,
						bathrooms,
						extras,
						address,
						postcode,
						date,
						timeSlot,
						customerName,
						customerEmail,
						customerPhone,
						notes,
					}),
				});
				const data = await res.json();
				if (data.url) {
					reset();
					router.push(data.url);
				} else {
					setError("Could not start checkout. Please try again.");
				}
			} catch {
				setError("Something went wrong. Please try again.");
			}
		});
	};

	const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

	return (
		<div className="max-w-2xl mx-auto px-4 sm:px-0">

			{/* ── Progress ── */}
			<div className="mb-8">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-semibold text-[#0b1535]">
						Step {step} of {STEPS.length}
						<span className="hidden sm:inline"> — {STEPS[step - 1]}</span>
					</span>
					<span className="text-sm text-gray-400">{Math.round(progressPct)}% complete</span>
				</div>
				<div className="w-full bg-gray-100 rounded-full h-2">
					<div
						className="bg-amber-400 h-2 rounded-full transition-all duration-500"
						style={{ width: `${progressPct}%` }}
					/>
				</div>
				<div className="flex justify-between mt-3">
					{STEPS.map((label, i) => (
						<div
							key={label}
							className={cn(
								"flex flex-col items-center gap-1",
								i + 1 === step ? "text-amber-500" : i + 1 < step ? "text-[#0b1535]" : "text-gray-300",
							)}
						>
							<div className={cn(
								"w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
								i + 1 < step
									? "bg-[#0b1535] border-[#0b1535] text-white"
									: i + 1 === step
										? "border-amber-400 bg-white text-amber-500"
										: "border-gray-200 bg-white text-gray-300",
							)}>
								{i + 1 < step ? <Check size={12} /> : i + 1}
							</div>
							<span className="hidden md:block text-[10px] font-medium tracking-wide">{label}</span>
						</div>
					))}
				</div>
			</div>

			{/* ── Step content ── */}
			<div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm min-h-80">

				{/* Step 1 — Service */}
				{step === 1 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">What service do you need?</h2>
						<p className="text-sm text-gray-400 mb-6">Prices shown are starting rates — your exact quote is calculated in the next steps.</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{Object.entries(SERVICE_TYPES).map(([key, service]) => (
								<button
									key={key}
									type="button"
									onClick={() => setField("serviceType", key)}
									className={cn(
										"text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
										serviceType === key
											? "border-amber-400 bg-amber-50"
											: "border-gray-200 hover:border-amber-200 hover:bg-gray-50",
									)}
								>
									<span className="text-2xl mb-2 block">{SERVICE_ICONS[key]}</span>
									<p className="text-sm font-bold text-[#0b1535]">{service.label}</p>
									<p className="text-xs text-gray-400 mt-0.5">{service.duration}</p>
									<p className="text-sm font-extrabold text-amber-600 mt-1">
										from {formatPrice(service.basePrice)}
									</p>
								</button>
							))}
						</div>
					</div>
				)}

				{/* Step 2 — Property */}
				{step === 2 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">Your property</h2>
						<p className="text-sm text-gray-400 mb-6">
							Bedroom and bathroom count affects the price.{" "}
							<span className="font-semibold text-amber-600">+£15 per extra bed · +£10 per extra bath</span>
						</p>
						<div className="flex flex-col gap-4">
							<Counter
								label="Bedrooms"
								value={bedrooms}
								min={1}
								max={8}
								onChange={(v) => setField("bedrooms", v)}
							/>
							<Counter
								label="Bathrooms"
								value={bathrooms}
								min={1}
								max={6}
								onChange={(v) => setField("bathrooms", v)}
							/>
							<div>
								<FieldLabel required>Full Address</FieldLabel>
								<Input
									value={address}
									onChange={(e) => setField("address", e.target.value)}
									placeholder="e.g. 12 Victoria Road, London"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
							</div>
							<div>
								<FieldLabel required>Postcode</FieldLabel>
								<Input
									value={postcode}
									onChange={(e) => setField("postcode", e.target.value.toUpperCase())}
									placeholder="e.g. SW1A 1AA"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400 uppercase"
									maxLength={8}
								/>
							</div>
						</div>
					</div>
				)}

				{/* Step 3 — Extras */}
				{step === 3 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">Any add-ons?</h2>
						<p className="text-sm text-gray-400 mb-6">All optional — each extra is added to your total.</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{Object.entries(EXTRAS).map(([key, extra]) => {
								const selected = extras.includes(key);
								return (
									<button
										key={key}
										type="button"
										onClick={() => toggleExtra(key)}
										className={cn(
											"flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer",
											selected
												? "border-amber-400 bg-amber-50"
												: "border-gray-200 hover:border-amber-200",
										)}
									>
										<div className="flex items-center gap-3">
											<div className={cn(
												"w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
												selected ? "bg-amber-400 border-amber-400" : "border-gray-300",
											)}>
												{selected && <Check size={11} className="text-white" />}
											</div>
											<span className="text-sm font-semibold text-gray-700">{extra.label}</span>
										</div>
										<span className="text-sm font-bold text-amber-600 shrink-0 ml-2">
											+{formatPrice(extra.price)}
										</span>
									</button>
								);
							})}
						</div>
						{extras.length === 0 && (
							<p className="text-xs text-gray-400 mt-4 text-center">
								No add-ons selected — you can skip this step.
							</p>
						)}
					</div>
				)}

				{/* Step 4 — Date & Time */}
				{step === 4 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">When would you like us?</h2>
						<p className="text-sm text-gray-400 mb-6">We&apos;re available Monday–Saturday. Earliest booking is next day.</p>
						<div className="flex flex-col gap-5">
							<div>
								<FieldLabel required>Preferred Date</FieldLabel>
								<input
									type="date"
									value={date}
									min={getMinDate()}
									max={getMaxDate()}
									onChange={(e) => setField("date", e.target.value)}
									className="w-full h-11 px-3 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
								/>
							</div>
							<div>
								<FieldLabel required>Preferred Time</FieldLabel>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
									{TIME_SLOTS.map((slot) => (
										<button
											key={slot}
											type="button"
											onClick={() => setField("timeSlot", slot)}
											className={cn(
												"py-3 text-sm font-semibold rounded-xl border-2 transition-all duration-150 cursor-pointer",
												timeSlot === slot
													? "border-amber-400 bg-amber-50 text-[#0b1535]"
													: "border-gray-200 text-gray-500 hover:border-amber-200",
											)}
										>
											{slot}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Step 5 — Contact */}
				{step === 5 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">Your contact details</h2>
						<p className="text-sm text-gray-400 mb-6">We&apos;ll send your booking confirmation to your email and may call to confirm.</p>
						<div className="flex flex-col gap-4">
							<div>
								<FieldLabel required>Full Name</FieldLabel>
								<Input
									value={customerName}
									onChange={(e) => setField("customerName", e.target.value)}
									placeholder="Jane Smith"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
							</div>
							<div>
								<FieldLabel required>Email Address</FieldLabel>
								<Input
									type="email"
									value={customerEmail}
									onChange={(e) => setField("customerEmail", e.target.value)}
									placeholder="jane@example.com"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
							</div>
							<div>
								<FieldLabel required>Phone Number</FieldLabel>
								<Input
									type="tel"
									value={customerPhone}
									onChange={(e) => setField("customerPhone", e.target.value)}
									placeholder="+44 7700 900000"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
							</div>
							<div>
								<FieldLabel>Additional Notes</FieldLabel>
								<Textarea
									value={notes}
									onChange={(e) => setField("notes", e.target.value)}
									placeholder="Access instructions, pets, areas to focus on…"
									rows={3}
									maxLength={300}
									className="border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400 resize-none"
								/>
								<p className="text-xs text-gray-400 mt-1 text-right">{notes.length}/300</p>
							</div>
						</div>
					</div>
				)}

				{/* Step 6 — Review */}
				{step === 6 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">Review your booking</h2>
						<p className="text-sm text-gray-400 mb-5">Everything look right? Confirm to proceed to secure payment.</p>

						<div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 mb-5">
							<ReviewRow label="Service" value={SERVICE_TYPES[serviceType]?.label ?? serviceType} />
							<ReviewRow label="Property" value={`${bedrooms} bed · ${bathrooms} bath`} />
							<ReviewRow label="Address" value={`${address}, ${postcode}`} />
							<ReviewRow label="Date" value={date ? new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "—"} />
							<ReviewRow label="Time" value={timeSlot} />
							{extras.length > 0 && (
								<ReviewRow
									label="Add-ons"
									value={extras.map((e) => EXTRAS[e]?.label ?? e).join(", ")}
								/>
							)}
							<ReviewRow label="Name" value={customerName} />
							<ReviewRow label="Email" value={customerEmail} />
							<ReviewRow label="Phone" value={customerPhone} />
						</div>

						{/* Price breakdown */}
						<div className="bg-[#0b1535] rounded-xl p-5 text-white">
							<p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-3">Price Breakdown</p>
							<div className="flex justify-between text-sm mb-1.5">
								<span className="text-gray-300">{SERVICE_TYPES[serviceType]?.label} (base)</span>
								<span>{formatPrice(SERVICE_TYPES[serviceType]?.basePrice ?? 0)}</span>
							</div>
							{bedrooms > 1 && (
								<div className="flex justify-between text-sm mb-1.5">
									<span className="text-gray-300">{bedrooms - 1} extra bedroom{bedrooms - 1 !== 1 ? "s" : ""}</span>
									<span>+{formatPrice((bedrooms - 1) * 1500)}</span>
								</div>
							)}
							{bathrooms > 1 && (
								<div className="flex justify-between text-sm mb-1.5">
									<span className="text-gray-300">{bathrooms - 1} extra bathroom{bathrooms - 1 !== 1 ? "s" : ""}</span>
									<span>+{formatPrice((bathrooms - 1) * 1000)}</span>
								</div>
							)}
							{extras.map((e) => (
								<div key={e} className="flex justify-between text-sm mb-1.5">
									<span className="text-gray-300">{EXTRAS[e]?.label}</span>
									<span>+{formatPrice(EXTRAS[e]?.price ?? 0)}</span>
								</div>
							))}
							<div className="border-t border-white/20 mt-3 pt-3 flex justify-between font-extrabold text-lg">
								<span>Total</span>
								<span className="text-amber-400">{formatPrice(total)}</span>
							</div>
						</div>

						{error && (
							<div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
								{error}
							</div>
						)}
					</div>
				)}
			</div>

			{/* ── Navigation ── */}
			<div className="flex items-center justify-between mt-5 gap-3">
				<Button
					type="button"
					variant="ghost"
					onClick={prevStep}
					disabled={step === 1}
					className="flex items-center gap-1.5 text-gray-500 hover:text-[#0b1535] disabled:opacity-30 px-4 h-11"
				>
					<ChevronLeft size={16} />
					Back
				</Button>

				{step < STEPS.length ? (
					<Button
						type="button"
						onClick={nextStep}
						disabled={!canProceed()}
						className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold px-6 h-11 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md transition-all"
					>
						Continue
						<ChevronRight size={16} />
					</Button>
				) : (
					<Button
						type="button"
						onClick={handlePay}
						disabled={isPending}
						className="flex items-center gap-2 bg-[#0b1535] hover:bg-[#162050] text-white font-bold px-6 h-11 rounded-xl shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
					>
						{isPending ? (
							<>
								<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Redirecting…
							</>
						) : (
							<>
								<CreditCard size={16} />
								Confirm & Pay {formatPrice(total)}
							</>
						)}
					</Button>
				)}
			</div>

			<p className="text-center text-xs text-gray-400 mt-4">
				Your progress is saved automatically. Secure payment via Stripe.
			</p>
		</div>
	);
}
