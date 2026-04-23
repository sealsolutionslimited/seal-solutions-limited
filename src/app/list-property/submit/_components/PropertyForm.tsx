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

interface FormState {
	tag: "For Sale" | "For Rent" | "";
	type: string;
	beds: string;
	baths: string;
	sqft: string;
	title: string;
	location: string;
	description: string;
	price: string;
	amenities: string[];
	images: File[];
	previews: string[];
}

const STEPS = [
	"Listing Type",
	"Property Details",
	"Location",
	"Pricing",
	"Photos",
	"Amenities",
	"Review",
];

interface Props {
	plan: string | undefined;
	sessionId: string;
}

export default function PropertyForm({ plan, sessionId }: Props) {
	const [step, setStep] = useState(1);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const [form, setForm] = useState<FormState>({
		tag: "",
		type: "",
		beds: "",
		baths: "",
		sqft: "",
		title: "",
		location: "",
		description: "",
		price: "",
		amenities: [],
		images: [],
		previews: [],
	});

	const update = (field: keyof FormState, value: unknown) =>
		setForm((prev) => ({ ...prev, [field]: value }));

	const toggleAmenity = (amenity: string) => {
		setForm((prev) => ({
			...prev,
			amenities: prev.amenities.includes(amenity)
				? prev.amenities.filter((a) => a !== amenity)
				: [...prev.amenities, amenity],
		}));
	};

	const handleImages = (files: FileList | null) => {
		if (!files) return;
		const newFiles = Array.from(files).slice(0, 15 - form.images.length);
		const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
		setForm((prev) => ({
			...prev,
			images: [...prev.images, ...newFiles],
			previews: [...prev.previews, ...newPreviews],
		}));
	};

	const removeImage = (index: number) => {
		setForm((prev) => {
			URL.revokeObjectURL(prev.previews[index]);
			return {
				...prev,
				images: prev.images.filter((_, i) => i !== index),
				previews: prev.previews.filter((_, i) => i !== index),
			};
		});
	};

	const canProceed = () => {
		switch (step) {
			case 1:
				return !!form.tag;
			case 2:
				return !!form.type && !!form.beds && !!form.baths && !!form.sqft;
			case 3:
				return (
					!!form.title &&
					form.title.length >= 5 &&
					!!form.location &&
					!!form.description &&
					form.description.length >= 50
				);
			case 4:
				return !!form.price && Number(form.price) > 0;
			case 5:
				return form.images.length > 0;
			default:
				return true;
		}
	};

	const handleSubmit = () => {
		setError(null);
		const fd = new FormData();
		fd.append("tag", form.tag);
		fd.append("type", form.type);
		fd.append("beds", form.beds);
		fd.append("baths", form.baths);
		fd.append("sqft", form.sqft);
		fd.append("title", form.title);
		fd.append("location", form.location);
		fd.append("description", form.description);
		fd.append("price", form.price);
		fd.append("amenities", JSON.stringify(form.amenities));
		form.images.forEach((img) => fd.append("images", img));

		startTransition(async () => {
			try {
				const result = await createProperty(fd);
				if (result.success) {
					router.push(`/list-property/success?id=${result.id}&plan=${plan}`);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Submission failed. Please try again."
				);
			}
		});
	};

	const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

	return (
		<div className="max-w-2xl mx-auto">
			{/* Progress */}
			<div className="mb-10">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-semibold text-[#0b1535]">
						Step {step} of {STEPS.length} — {STEPS[step - 1]}
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
				<div className="flex justify-between mt-3">
					{STEPS.map((label, i) => (
						<div
							key={label}
							className={`flex flex-col items-center gap-1 ${
								i + 1 === step
									? "text-amber-500"
									: i + 1 < step
									? "text-[#0b1535]"
									: "text-gray-300"
							}`}
						>
							<div
								className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
									i + 1 < step
										? "bg-[#0b1535] border-[#0b1535] text-white"
										: i + 1 === step
										? "border-amber-400 bg-white text-amber-500"
										: "border-gray-200 bg-white text-gray-300"
								}`}
							>
								{i + 1 < step ? <Check size={12} /> : i + 1}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Step Content */}
			<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm min-h-85">
				{/* Step 1: Listing Type */}
				{step === 1 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							What type of listing is this?
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Choose whether you are selling or renting out your property.
						</p>
						<div className="grid grid-cols-2 gap-4">
							{(["For Sale", "For Rent"] as const).map((tag) => (
								<button
									key={tag}
									onClick={() => update("tag", tag)}
									className={`py-8 rounded-xl border-2 font-bold text-base transition-all duration-200 ${
										form.tag === tag
											? "border-amber-400 bg-amber-50 text-[#0b1535] shadow-md"
											: "border-gray-200 text-gray-400 hover:border-amber-200 hover:text-gray-600"
									}`}
								>
									{tag}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Step 2: Property Details */}
				{step === 2 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							Property details
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Tell us about the property&apos;s physical characteristics.
						</p>
						<div className="flex flex-col gap-5">
							<div>
								<label className="text-sm font-semibold text-gray-700 block mb-2">
									Property Type
								</label>
								<select
									value={form.type}
									onChange={(e) => update("type", e.target.value)}
									className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white"
								>
									<option value="">Select type…</option>
									{PROPERTY_TYPES.map((t) => (
										<option key={t} value={t}>
											{t}
										</option>
									))}
								</select>
							</div>
							<div className="grid grid-cols-3 gap-4">
								{(
									[
										{ field: "beds", label: "Bedrooms" },
										{ field: "baths", label: "Bathrooms" },
									] as const
								).map(({ field, label }) => (
									<div key={field}>
										<label className="text-sm font-semibold text-gray-700 block mb-2">
											{label}
										</label>
										<input
											type="number"
											min="0"
											value={form[field]}
											onChange={(e) => update(field, e.target.value)}
											placeholder="0"
											className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
										/>
									</div>
								))}
								<div>
									<label className="text-sm font-semibold text-gray-700 block mb-2">
										Size
									</label>
									<input
										type="text"
										value={form.sqft}
										onChange={(e) => update("sqft", e.target.value)}
										placeholder="e.g. 1,200 sqft"
										className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
									/>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Step 3: Location & Description */}
				{step === 3 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							Location &amp; description
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Give buyers/renters a clear picture of what makes your property
							special.
						</p>
						<div className="flex flex-col gap-5">
							<div>
								<label className="text-sm font-semibold text-gray-700 block mb-2">
									Listing Title
								</label>
								<input
									type="text"
									value={form.title}
									onChange={(e) => update("title", e.target.value)}
									placeholder="e.g. Luxury 3-Bed Apartment in Victoria Island"
									maxLength={120}
									className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
								/>
								<p className="text-xs text-gray-400 mt-1 text-right">
									{form.title.length}/120
								</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 block mb-2">
									Location / Address
								</label>
								<input
									type="text"
									value={form.location}
									onChange={(e) => update("location", e.target.value)}
									placeholder="e.g. Victoria Island, Lagos"
									className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 block mb-2">
									Description
								</label>
								<textarea
									value={form.description}
									onChange={(e) => update("description", e.target.value)}
									placeholder="Describe your property in detail — key features, nearby landmarks, condition…"
									maxLength={500}
									rows={5}
									className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 resize-none"
								/>
								<p className="text-xs text-gray-400 mt-1 text-right">
									{form.description.length}/500 (min 50)
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Step 4: Pricing */}
				{step === 4 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							Set your price
						</h2>
						<p className="text-sm text-gray-400 mb-8">
							Enter the asking price for your property.{" "}
							{form.tag === "For Rent" && "This will be shown as a per-year figure."}
						</p>
						<div className="relative">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
								£
							</span>
							<input
								type="number"
								min="0"
								value={form.price}
								onChange={(e) => update("price", e.target.value)}
								placeholder="0"
								className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-4 text-2xl font-bold text-[#0b1535] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
							/>
						</div>
						{form.price && Number(form.price) > 0 && (
							<p className="text-sm text-amber-600 font-semibold mt-3">
								£{Number(form.price).toLocaleString()}
								{form.tag === "For Rent" && " / year"}
							</p>
						)}
					</div>
				)}

				{/* Step 5: Photos */}
				{step === 5 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							Add photos
						</h2>
						<p className="text-sm text-gray-400 mb-6">
							Upload at least 1 photo. Listings with more photos get significantly
							more views.
						</p>

						{form.images.length === 0 ? (
							<button
								onClick={() => fileInputRef.current?.click()}
								className="w-full border-2 border-dashed border-gray-200 rounded-xl py-14 flex flex-col items-center gap-3 text-gray-400 hover:border-amber-300 hover:text-amber-500 transition-colors"
							>
								<Upload size={28} />
								<span className="text-sm font-medium">
									Click to upload photos
								</span>
								<span className="text-xs">PNG, JPG, WEBP up to 10MB each</span>
							</button>
						) : (
							<div>
								<div className="grid grid-cols-3 gap-3 mb-4">
									{form.previews.map((src, i) => (
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
												onClick={() => removeImage(i)}
												className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<X size={12} className="text-white" />
											</button>
											{i === 0 && (
												<span className="absolute bottom-1.5 left-1.5 bg-amber-400 text-[#0b1535] text-[10px] font-bold px-2 py-0.5 rounded-full">
													Cover
												</span>
											)}
										</div>
									))}
									{form.images.length < 15 && (
										<button
											onClick={() => fileInputRef.current?.click()}
											className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-amber-300 hover:text-amber-400 transition-colors"
										>
											<Upload size={20} />
										</button>
									)}
								</div>
								<p className="text-xs text-gray-400">
									{form.images.length} photo{form.images.length !== 1 ? "s" : ""}{" "}
									added. First photo is the cover image.
								</p>
							</div>
						)}
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={(e) => handleImages(e.target.files)}
						/>
					</div>
				)}

				{/* Step 6: Amenities */}
				{step === 6 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							Amenities
						</h2>
						<p className="text-sm text-gray-400 mb-6">
							Select all amenities that apply. This helps buyers filter and find
							your property.
						</p>
						<div className="grid grid-cols-2 gap-2.5">
							{AMENITIES.map((amenity) => {
								const selected = form.amenities.includes(amenity);
								return (
									<button
										key={amenity}
										onClick={() => toggleAmenity(amenity)}
										className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-150 ${
											selected
												? "border-amber-400 bg-amber-50 text-[#0b1535]"
												: "border-gray-200 text-gray-500 hover:border-amber-200"
										}`}
									>
										<div
											className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
												selected
													? "bg-amber-400 border-amber-400"
													: "border-gray-300"
											}`}
										>
											{selected && <Check size={10} className="text-white" />}
										</div>
										{amenity}
									</button>
								);
							})}
						</div>
					</div>
				)}

				{/* Step 7: Review */}
				{step === 7 && (
					<div>
						<h2 className="text-xl font-bold text-[#0b1535] mb-2">
							Review your listing
						</h2>
						<p className="text-sm text-gray-400 mb-6">
							Everything look good? Hit submit to send your listing for review.
						</p>
						<div className="space-y-3 text-sm">
							<ReviewRow label="Listing Type" value={form.tag} />
							<ReviewRow label="Property Type" value={form.type} />
							<ReviewRow
								label="Details"
								value={`${form.beds} bed · ${form.baths} bath · ${form.sqft}`}
							/>
							<ReviewRow label="Title" value={form.title} />
							<ReviewRow label="Location" value={form.location} />
							<ReviewRow
								label="Price"
								value={`£${Number(form.price).toLocaleString()}${
									form.tag === "For Rent" ? " / year" : ""
								}`}
							/>
							<ReviewRow
								label="Photos"
								value={`${form.images.length} photo${
									form.images.length !== 1 ? "s" : ""
								}`}
							/>
							{form.amenities.length > 0 && (
								<ReviewRow
									label="Amenities"
									value={form.amenities.join(", ")}
								/>
							)}
						</div>

						{error && (
							<div className="mt-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
								{error}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Navigation */}
			<div className="flex items-center justify-between mt-6">
				<button
					onClick={() => setStep((s) => s - 1)}
					disabled={step === 1}
					className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#0b1535] disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2.5"
				>
					<ChevronLeft size={16} />
					Back
				</button>

				{step < STEPS.length ? (
					<button
						onClick={() => setStep((s) => s + 1)}
						disabled={!canProceed()}
						className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
					>
						Continue
						<ChevronRight size={16} />
					</button>
				) : (
					<button
						onClick={handleSubmit}
						disabled={isPending}
						className="flex items-center gap-2 bg-[#0b1535] hover:bg-[#162050] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
					</button>
				)}
			</div>
		</div>
	);
}

function ReviewRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
			<span className="text-gray-400 font-medium shrink-0">{label}</span>
			<span className="text-[#0b1535] font-semibold text-right">{value}</span>
		</div>
	);
}
