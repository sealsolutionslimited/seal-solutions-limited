"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/app/actions/createProperty";
import {
	ChevronRight,
	ChevronLeft,
	Upload,
	X,
	Check,
	Home,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useListingStore } from "@/store/useListingStore";

// ─── constants ────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = [
	"Apartment",
	"Flat",
	"Detached",
	"Semi-Detached",
	"Terraced",
	"Townhouse",
	"Manor",
	"Penthouse",
];

const AMENITIES = [
	"Parking Space",
	"24/7 Security",
	"Swimming Pool",
	"Generator / Power Backup",
	"Borehole / Water Supply",
	"Air Conditioning",
	"Garden / Terrace",
	"Gym / Fitness Center",
	"Elevator / Lift",
	"Boys' Quarters (BQ)",
	"CCTV Surveillance",
	"Smart Home Features",
];

const STEPS = [
	"Listing Type",
	"Property Details",
	"Location",
	"Pricing",
	"Photos",
	"Amenities",
	"Contact",
	"Review",
];

// ─── helpers ──────────────────────────────────────────────────────────────────

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

// ─── props ────────────────────────────────────────────────────────────────────

interface Props {
	plan: string | undefined;
	sessionId?: string;
	paymentRecordId: string;
}

// ─── component ────────────────────────────────────────────────────────────────

export default function PropertyForm({ plan, paymentRecordId }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		step,
		tag,
		type,
		beds,
		baths,
		sqft,
		title,
		location,
		description,
		price,
		amenities,
		images,
		previews,
		contactEmail,
		contactPhone,
		setField,
		toggleAmenity,
		addImages,
		removeImage,
		nextStep,
		prevStep,
		reset,
	} = useListingStore();

	const [error, setError] = useState<string | null>(null);

	// ── validation ──
	const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

	const canProceed = () => {
		switch (step) {
			case 1:
				return !!tag;
			case 2:
				return !!type && !!beds && !!baths && !!sqft;
			case 3:
				return (
					!!title &&
					title.length >= 5 &&
					!!location &&
					!!description &&
					description.length >= 50
				);
			case 4:
				return !!price && Number(price) > 0;
			case 5:
				return images.length > 0;
			case 7:
				return (
					isValidEmail(contactEmail) &&
					contactPhone.trim().length >= 7
				);
			default:
				return true;
		}
	};

	// ── submit ──
	const handleSubmit = () => {
		setError(null);
		const fd = new FormData();
		fd.append("tag", tag);
		fd.append("type", type);
		fd.append("beds", beds);
		fd.append("baths", baths);
		fd.append("sqft", sqft);
		fd.append("title", title);
		fd.append("location", location);
		fd.append("description", description);
		fd.append("price", price);
		fd.append("amenities", JSON.stringify(amenities));
		fd.append("contactEmail", contactEmail);
		fd.append("contactPhone", contactPhone);
		fd.append("plan", plan || "basic");
		fd.append("paymentRecordId", paymentRecordId);
		images.forEach((img) => fd.append("images", img));

		startTransition(async () => {
			try {
				const result = await createProperty(fd);
				if (result.success) {
					reset();
					router.push(
						`/list-property/success?id=${result.id}&plan=${plan}`,
					);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Submission failed. Please try again.",
				);
			}
		});
	};

	const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

	return (
		<div className="max-w-2xl mx-auto px-4 sm:px-0">
			{/* ── Progress bar ── */}
			<div className="mb-8">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-semibold text-[#0b1535]">
						Step {step} of {STEPS.length}
						<span className="hidden sm:inline">
							{" "}
							— {STEPS[step - 1]}
						</span>
					</span>
					<span className="text-sm text-gray-400">
						{Math.round(progressPct)}% complete
					</span>
				</div>
				<div className="w-full bg-gray-100 rounded-full h-2">
					<div
						className="bg-amber-400 h-2 rounded-full transition-all duration-500"
						style={{ width: `${progressPct}%` }}
					/>
				</div>
				{/* Step dots */}
				<div className="flex justify-between mt-3">
					{STEPS.map((label, i) => (
						<div
							key={label}
							className={cn(
								"flex flex-col items-center gap-1",
								i + 1 === step
									? "text-amber-500"
									: i + 1 < step
										? "text-[#0b1535]"
										: "text-gray-300",
							)}
						>
							<div
								className={cn(
									"w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
									i + 1 < step
										? "bg-[#0b1535] border-[#0b1535] text-white"
										: i + 1 === step
											? "border-amber-400 bg-white text-amber-500"
											: "border-gray-200 bg-white text-gray-300",
								)}
							>
								{i + 1 < step ? <Check size={12} /> : i + 1}
							</div>
							<span className="hidden md:block text-[10px] font-medium tracking-wide">
								{label}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* ── Step content ── */}
			<div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm min-h-80">
				{/* Step 1 — Listing Type */}
				{step === 1 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							What type of listing is this?
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Choose whether you are selling or renting out your
							property.
						</p>
						<div className="grid grid-cols-2 gap-4">
							{(["For Sale", "For Rent"] as const).map(
								(option) => (
									<button
										key={option}
										type="button"
										onClick={() => setField("tag", option)}
										className={cn(
											"py-10 rounded-xl border-2 font-bold text-base transition-all duration-200 cursor-pointer",
											tag === option
												? "border-amber-400 bg-amber-50 text-[#0b1535] shadow-md"
												: "border-gray-200 text-gray-400 hover:border-amber-200 hover:text-gray-600",
										)}
									>
										{option}
									</button>
								),
							)}
						</div>
					</div>
				)}

				{/* Step 2 — Property Details */}
				{step === 2 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Property details
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Tell us about the property&apos;s physical
							characteristics.
						</p>
						<div className="flex flex-col gap-5">
							<div>
								<FieldLabel required>Property Type</FieldLabel>
								<Select
									value={type}
									onValueChange={(v) => setField("type", v)}
								>
									<SelectTrigger className="h-11 border-gray-200 focus:ring-amber-300 focus:border-amber-400 w-full">
										<SelectValue placeholder="Select type…" />
									</SelectTrigger>
									<SelectContent>
										{PROPERTY_TYPES.map((t) => (
											<SelectItem key={t} value={t}>
												{t}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div>
									<FieldLabel required>Bedrooms</FieldLabel>
									<Input
										type="number"
										min="0"
										value={beds}
										onChange={(e) =>
											setField("beds", e.target.value)
										}
										placeholder="0"
										className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
									/>
								</div>
								<div>
									<FieldLabel required>Bathrooms</FieldLabel>
									<Input
										type="number"
										min="0"
										value={baths}
										onChange={(e) =>
											setField("baths", e.target.value)
										}
										placeholder="0"
										className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
									/>
								</div>
								<div>
									<FieldLabel required>Size</FieldLabel>
									<Input
										type="text"
										value={sqft}
										onChange={(e) =>
											setField("sqft", e.target.value)
										}
										placeholder="e.g. 1,200 sq ft"
										className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
									/>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Step 3 — Location & Description */}
				{step === 3 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Location &amp; description
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Give buyers and renters a clear picture of what
							makes your property special.
						</p>
						<div className="flex flex-col gap-5">
							<div>
								<FieldLabel required>Listing Title</FieldLabel>
								<Input
									value={title}
									onChange={(e) =>
										setField("title", e.target.value)
									}
									placeholder="e.g. Modern 2-Bed Flat in Shoreditch, London"
									maxLength={120}
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
								<p className="text-xs text-gray-400 mt-1 text-right">
									{title.length}/120
								</p>
							</div>

							<div>
								<FieldLabel required>
									Location / Address
								</FieldLabel>
								<Input
									value={location}
									onChange={(e) =>
										setField("location", e.target.value)
									}
									placeholder="e.g. Shoreditch, London E2 6AA"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
							</div>
							<div>
								<FieldLabel required>Description</FieldLabel>
								<Textarea
									value={description}
									onChange={(e) =>
										setField("description", e.target.value)
									}
									placeholder="Describe your property in detail — key features, nearby landmarks, condition…"
									maxLength={500}
									rows={5}
									className="border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400 resize-none"
								/>
								<p className="text-xs text-gray-400 mt-1 text-right">
									{description.length}/500{" "}
									<span
										className={
											description.length < 50
												? "text-amber-500"
												: "text-green-500"
										}
									>
										(min 50)
									</span>
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Step 4 — Pricing */}
				{step === 4 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Set your price
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Enter the asking price for your property.{" "}
							{tag === "For Rent" &&
								"This will be shown as a per-year figure."}
						</p>
						<div className="relative">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
								£
							</span>
							<Input
								type="number"
								min="0"
								value={price}
								onChange={(e) =>
									setField("price", e.target.value)
								}
								placeholder="0"
								className="pl-8 h-14 text-2xl font-bold text-[#0b1535] border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
							/>
						</div>
						{price && Number(price) > 0 && (
							<p className="text-sm text-amber-600 font-semibold mt-3">
								£{Number(price).toLocaleString()}
								{tag === "For Rent" && " / year"}
							</p>
						)}
					</div>
				)}

				{/* Step 5 — Photos */}
				{step === 5 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Add photos
						</h2>
						<p className="text-sm text-gray-400 mb-6">
							Upload at least 1 photo. Listings with more photos
							get significantly more views.
						</p>

						{images.length === 0 ? (
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="w-full border-2 border-dashed border-gray-200 rounded-xl py-14 flex flex-col items-center gap-3 text-gray-400 hover:border-amber-300 hover:text-amber-500 transition-colors cursor-pointer"
							>
								<Upload size={28} />
								<span className="text-sm font-medium">
									Click to upload photos
								</span>
								<span className="text-xs">
									PNG, JPG, WEBP — up to 10 MB each
								</span>
							</button>
						) : (
							<div>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
									{previews.map((src, i) => (
										<div
											key={i}
											className="relative aspect-square rounded-xl overflow-hidden group"
										>
											<Image
												src={src}
												alt={`Preview ${i + 1}`}
												fill
												className="object-cover"
											/>
											<button
												type="button"
												onClick={() => removeImage(i)}
												className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
											>
												<X
													size={12}
													className="text-white"
												/>
											</button>
											{i === 0 && (
												<span className="absolute bottom-1.5 left-1.5 bg-amber-400 text-[#0b1535] text-[10px] font-bold px-2 py-0.5 rounded-full">
													Cover
												</span>
											)}
										</div>
									))}
									{images.length < 15 && (
										<button
											type="button"
											onClick={() =>
												fileInputRef.current?.click()
											}
											className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-amber-300 hover:text-amber-400 transition-colors cursor-pointer"
										>
											<Upload size={20} />
										</button>
									)}
								</div>
								<p className="text-xs text-gray-400">
									{images.length} photo
									{images.length !== 1 ? "s" : ""} added.
									First photo is the cover image.
								</p>
							</div>
						)}
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={(e) =>
								e.target.files && addImages(e.target.files)
							}
						/>
					</div>
				)}

				{/* Step 6 — Amenities */}
				{step === 6 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Amenities
						</h2>
						<p className="text-sm text-gray-400 mb-6">
							Select all amenities that apply. This helps buyers
							filter and find your property.
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
							{AMENITIES.map((amenity) => {
								const selected = amenities.includes(amenity);
								return (
									<button
										key={amenity}
										type="button"
										onClick={() => toggleAmenity(amenity)}
										className={cn(
											"flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-150 cursor-pointer",
											selected
												? "border-amber-400 bg-amber-50 text-[#0b1535]"
												: "border-gray-200 text-gray-500 hover:border-amber-200",
										)}
									>
										<div
											className={cn(
												"w-4 h-4 rounded border-2 flex items-center justify-center shrink-0",
												selected
													? "bg-amber-400 border-amber-400"
													: "border-gray-300",
											)}
										>
											{selected && (
												<Check
													size={10}
													className="text-white"
												/>
											)}
										</div>
										{amenity}
									</button>
								);
							})}
						</div>
					</div>
				)}

				{/* Step 7 — Contact Details */}
				{step === 7 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Your contact details
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Interested buyers and renters will use these details
							to reach you directly.
						</p>
						<div className="flex flex-col gap-5">
							<div>
								<FieldLabel required>Email Address</FieldLabel>
								<Input
									type="email"
									value={contactEmail}
									onChange={(e) =>
										setField("contactEmail", e.target.value)
									}
									placeholder="your@email.com"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
								<p className="text-xs text-gray-400 mt-1">
									Shown on your listing so buyers can email
									you directly.
								</p>
							</div>
							<div>
								<FieldLabel required>Phone Number</FieldLabel>
								<Input
									type="tel"
									value={contactPhone}
									onChange={(e) =>
										setField("contactPhone", e.target.value)
									}
									placeholder="+44 7700 900000"
									className="h-11 border-gray-200 focus-visible:ring-amber-300 focus-visible:border-amber-400"
								/>
								<p className="text-xs text-gray-400 mt-1">
									Include the country code for international
									visibility.
								</p>
							</div>

							<div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
								<strong>Privacy note:</strong> Your contact
								details will only be visible to logged-in users
								viewing your listing.
							</div>
						</div>
					</div>
				)}

				{/* Step 8 — Review */}
				{step === 8 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-1.5">
							Review your listing
						</h2>
						<p className="text-sm text-gray-400 mb-6">
							Everything look good? Hit submit to send your
							listing for review.
						</p>
						<div className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
							<ReviewRow label="Listing Type" value={tag} />
							<ReviewRow label="Property Type" value={type} />
							<ReviewRow
								label="Details"
								value={`${beds} bed · ${baths} bath · ${sqft}`}
							/>
							<ReviewRow label="Title" value={title} />
							<ReviewRow label="Location" value={location} />
							<ReviewRow
								label="Price"
								value={`£${Number(price).toLocaleString()}${tag === "For Rent" ? " / year" : ""}`}
							/>
							<ReviewRow
								label="Photos"
								value={`${images.length} photo${images.length !== 1 ? "s" : ""}`}
							/>
							{amenities.length > 0 && (
								<ReviewRow
									label="Amenities"
									value={amenities.join(", ")}
								/>
							)}
							<ReviewRow
								label="Contact Email"
								value={contactEmail}
							/>
							<ReviewRow
								label="Contact Phone"
								value={contactPhone}
							/>
						</div>

						{error && (
							<div className="mt-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
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
						onClick={handleSubmit}
						disabled={isPending}
						className="flex items-center gap-2 bg-[#0b1535] hover:bg-[#162050] text-white font-bold px-6 h-11 rounded-xl shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all"
					>
						{isPending ? (
							<>
								<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Submitting…
							</>
						) : (
							<>
								<Home size={15} />
								Submit Listing
							</>
						)}
					</Button>
				)}
			</div>

			{/* Draft saved notice */}
			<p className="text-center text-xs text-gray-400 mt-4">
				Your progress is saved automatically — safe to close and come
				back.
			</p>
		</div>
	);
}

// ─── sub-components ───────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between gap-4 px-4 py-3 text-sm bg-white">
			<span className="text-gray-400 font-medium shrink-0">{label}</span>
			<span className="text-[#0b1535] font-semibold text-right wrap-break-word max-w-[60%]">
				{value}
			</span>
		</div>
	);
}
