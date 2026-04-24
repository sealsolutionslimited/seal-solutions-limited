"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Bath,
	Bed,
	Maximize,
	MapPin,
	Heart,
	Share2,
	ChevronLeft,
	ChevronRight,
	Phone,
	Mail,
	Calendar,
	TrendingUp,
	Home,
	Star,
	X,
	Grid2X2,
	ArrowUpRight,
	Building2,
	CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { formatToPounds } from "@/lib/helper";
import { tagColors } from "@/data/property";
import { PropertyListing } from "@/types/listings";
import NavbarStatic from "@/components/layout/NavbarStatic";
import Footer from "@/components/layout/Footer";

interface PropertyDetailsClientProps {
	property: PropertyListing;
	similarProperties?: PropertyListing[];
}

export default function PropertyDetailsClient({
	property,
	similarProperties = [],
}: PropertyDetailsClientProps) {
	const router = useRouter();
	const [activeImage, setActiveImage] = useState(0);
	const [liked, setLiked] = useState(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const images = property.images ?? [];
	const totalImages = images.length;
	const isUserListing = property._type === "userListing";

	const openLightbox = (index: number) => {
		setLightboxIndex(index);
		setLightboxOpen(true);
	};
	const closeLightbox = () => setLightboxOpen(false);

	const lightboxPrev = useCallback(() => {
		setLightboxIndex((i) => (i - 1 + totalImages) % totalImages);
	}, [totalImages]);

	const lightboxNext = useCallback(() => {
		setLightboxIndex((i) => (i + 1) % totalImages);
	}, [totalImages]);

	useEffect(() => {
		if (!lightboxOpen) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowLeft") lightboxPrev();
			if (e.key === "ArrowRight") lightboxNext();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [lightboxOpen, lightboxPrev, lightboxNext]);

	useEffect(() => {
		document.body.style.overflow = lightboxOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [lightboxOpen]);

	const prevImage = () =>
		setActiveImage((i) => (i - 1 + totalImages) % totalImages);
	const nextImage = () => setActiveImage((i) => (i + 1) % totalImages);

	const overviewRows = [
		{ label: "Property Type", value: property.type },
		{ label: "Listing Status", value: property.tag },
		{
			label: "Bedrooms",
			value: property.beds != null ? String(property.beds) : null,
		},
		{
			label: "Bathrooms",
			value: property.baths != null ? String(property.baths) : null,
		},
		{ label: "Floor Area", value: property.sqft },
		{
			label: "Listing",
			value: property.featured ? "Featured" : "Standard",
		},
	].filter((r): r is { label: string; value: string } => r.value != null);

	return (
		<>
			{/* ── Lightbox ── */}
			{lightboxOpen && (
				<div
					className="fixed inset-0 z-999 bg-black/95 backdrop-blur-sm flex flex-col"
					onClick={closeLightbox}
				>
					<div
						className="flex items-center justify-between px-5 py-4 shrink-0"
						onClick={(e) => e.stopPropagation()}
					>
						<span className="text-white/60 text-sm font-medium tracking-widest uppercase">
							{lightboxIndex + 1} / {totalImages}
						</span>
						<button
							onClick={closeLightbox}
							className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						>
							<X size={18} className="text-white" />
						</button>
					</div>

					<div
						className="flex-1 relative flex items-center justify-center px-12 md:px-20 min-h-0"
						onClick={(e) => e.stopPropagation()}
					>
						{images[lightboxIndex] && (
							<div className="relative w-full h-full max-h-[72vh]">
								<Image
									src={urlFor(images[lightboxIndex]).url()}
									alt={`Image ${lightboxIndex + 1}`}
									fill
									className="object-contain"
									priority
									sizes="100vw"
								/>
							</div>
						)}
						{totalImages > 1 && (
							<>
								<button
									onClick={lightboxPrev}
									className="absolute left-2 md:left-4 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
								>
									<ChevronLeft size={20} />
								</button>
								<button
									onClick={lightboxNext}
									className="absolute right-2 md:right-4 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
								>
									<ChevronRight size={20} />
								</button>
							</>
						)}
					</div>

					{totalImages > 1 && (
						<div
							className="flex gap-2 px-5 py-4 overflow-x-auto shrink-0 scrollbar-hide"
							onClick={(e) => e.stopPropagation()}
						>
							{images.map((img, i) => (
								<button
									key={img._key}
									onClick={() => setLightboxIndex(i)}
									className={cn(
										"relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all",
										i === lightboxIndex
											? "border-amber-400 opacity-100"
											: "border-transparent opacity-50 hover:opacity-80",
									)}
								>
									<Image
										src={urlFor(img).url()}
										alt={`Thumb ${i + 1}`}
										fill
										className="object-cover"
										sizes="64px"
									/>
								</button>
							))}
						</div>
					)}
				</div>
			)}

			<main
				className="min-h-screen bg-[#f8f5ef]"
				style={{ fontFamily: "'DM Sans', sans-serif" }}
			>
				<NavbarStatic />

				{/* ════════════════════════════════════════
				    MOBILE
				════════════════════════════════════════ */}
				<div className="md:hidden pt-20">
					{/* Full-width carousel */}
					<div
						className="relative w-full overflow-hidden"
						style={{ height: "clamp(240px, 65vw, 420px)" }}
					>
						{images[activeImage] ? (
							<Image
								src={urlFor(images[activeImage]).url()}
								alt={property.title ?? "Property"}
								fill
								className="object-cover"
								priority
								sizes="100vw"
								onClick={() => openLightbox(activeImage)}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 flex items-center justify-center">
								<Home size={48} className="text-gray-300" />
							</div>
						)}
						<div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

						<div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pointer-events-none">
							<div className="flex flex-wrap gap-1.5 mb-2">
								{property.tag && (
									<span
										className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tagColors[property.tag]}`}
									>
										{property.tag}
									</span>
								)}
								{property.type && (
									<span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
										{property.type}
									</span>
								)}
							</div>
							<h1 className="text-white font-bold text-xl leading-snug drop-shadow-md">
								{property.title}
							</h1>
							<p className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
								<MapPin
									size={13}
									className="text-amber-400 shrink-0"
								/>
								{property.location}
							</p>
						</div>

						{totalImages > 1 && (
							<>
								<button
									onClick={(e) => {
										e.stopPropagation();
										prevImage();
									}}
									className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
								>
									<ChevronLeft size={18} />
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										nextImage();
									}}
									className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
								>
									<ChevronRight size={18} />
								</button>
							</>
						)}

						<div className="absolute top-4 right-4">
							<span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
								{activeImage + 1} / {totalImages || 1}
							</span>
						</div>
					</div>

					{/* Mobile body */}
					<div className="px-4 py-6 space-y-5">
						<button
							onClick={() => router.back()}
							className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#162050] transition-colors font-medium"
						>
							<ChevronLeft size={14} /> Back to Properties
						</button>

						{/* Price */}
						<div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
							<div>
								<p className="text-2xl font-bold text-[#162050]">
									{formatToPounds(property.price ?? undefined)}
								</p>
								{property.tag === "For Rent" && (
									<p className="text-xs text-gray-400 mt-0.5">
										per month
									</p>
								)}
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={() => setLiked((v) => !v)}
									className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center shadow-sm"
								>
									<Heart
										size={16}
										className={
											liked
												? "fill-red-500 text-red-500"
												: "text-gray-400"
										}
									/>
								</button>
								<button className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center shadow-sm">
									<Share2
										size={16}
										className="text-gray-400"
									/>
								</button>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-3">
							{[
								{
									icon: Bed,
									label: "Bedrooms",
									value: property.beds,
								},
								{
									icon: Bath,
									label: "Bathrooms",
									value: property.baths,
								},
								{
									icon: Maximize,
									label: "Floor Area",
									value: property.sqft,
								},
							].map(({ icon: Icon, label, value }) => (
								<div
									key={label}
									className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border border-gray-100 shadow-sm text-center"
								>
									<div
										className="w-10 h-10 rounded-xl flex items-center justify-center"
										style={{
											background: "rgba(22,32,80,0.07)",
										}}
									>
										<Icon
											size={19}
											className="text-[#162050]"
										/>
									</div>
									<div>
										<p className="text-lg font-bold text-[#162050] leading-none">
											{value ?? "—"}
										</p>
										<p className="text-xs text-gray-400 mt-0.5">
											{label}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Description */}
						{property.description && (
							<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
								<div className="flex items-center gap-3 mb-4">
									<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
									<h2
										className="text-lg font-bold text-[#162050]"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										About This Property
									</h2>
								</div>
								<p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line wrap-break-word">
									{property.description as string}
								</p>
							</div>
						)}

						{/* Key Features */}
						{property.amenities &&
							property.amenities.length > 0 && (
								<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
									<div className="flex items-center gap-3 mb-4">
										<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
										<h2
											className="text-lg font-bold text-[#162050]"
											style={{
												fontFamily:
													"'Playfair Display', serif",
											}}
										>
											Key Features
										</h2>
									</div>
									<ul className="grid grid-cols-1 gap-3">
										{property.amenities.map(
											(amenity, i) => (
												<li
													key={i}
													className="flex items-start gap-2.5 text-sm text-gray-700"
												>
													<CheckCircle2
														size={16}
														className="text-amber-500 shrink-0 mt-0.5"
													/>
													{amenity}
												</li>
											),
										)}
									</ul>
								</div>
							)}

						{/* Property Details */}
						<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
							<div className="flex items-center gap-3 mb-4">
								<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
								<h2
									className="text-lg font-bold text-[#162050]"
									style={{
										fontFamily: "'Playfair Display', serif",
									}}
								>
									Property Details
								</h2>
							</div>
							<div className="divide-y divide-gray-100">
								{overviewRows.map(({ label, value }) => (
									<div
										key={label}
										className="flex justify-between items-center py-3 text-sm"
									>
										<span className="text-gray-500 font-medium">
											{label}
										</span>
										<span className="font-semibold text-[#162050]">
											{value}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Contact card */}
						{isUserListing ? (
							<div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
									Contact the Owner
								</p>
								{property.contactPhone && (
									<a
										href={`tel:${property.contactPhone}`}
										className="flex items-center gap-3 w-full h-11 px-4 rounded-xl bg-[#162050] text-white font-semibold text-sm hover:bg-[#1e2e6e] transition-colors"
									>
										<Phone size={15} />
										{property.contactPhone}
									</a>
								)}
								{property.contactEmail && (
									<a
										href={`mailto:${property.contactEmail}`}
										className="flex items-center gap-3 w-full h-11 px-4 rounded-xl border border-[#162050] text-[#162050] font-semibold text-sm hover:bg-[#162050] hover:text-white transition-all"
									>
										<Mail size={15} />
										{property.contactEmail}
									</a>
								)}
							</div>
						) : (
							<div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-2.5">
								<Button className="w-full bg-[#162050] hover:bg-[#1e2e6e] text-white gap-2 h-11 rounded-xl font-semibold text-sm">
									<Phone size={15} /> Call Agent
								</Button>
								<Button
									variant="outline"
									className="w-full border-[#162050] text-[#162050] hover:bg-[#162050] hover:text-white gap-2 h-11 rounded-xl font-semibold text-sm transition-all"
								>
									<Mail size={15} /> Send Enquiry
								</Button>
								<Button
									variant="outline"
									className="w-full border-gray-200 text-gray-600 hover:border-[#162050] hover:text-[#162050] gap-2 h-11 rounded-xl font-semibold text-sm transition-all"
								>
									<Calendar size={15} /> Book Viewing
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* ════════════════════════════════════════
				    DESKTOP
				════════════════════════════════════════ */}
				<div className="hidden md:block py-24">
					<div className="max-w-7xl mx-auto px-6">
						{/* Breadcrumb */}
						<div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
							<button
								onClick={() => router.back()}
								className="flex items-center gap-1 hover:text-[#162050] transition-colors font-medium"
							>
								<ChevronLeft size={14} /> Back
							</button>
							<span>/</span>
							<span className="hover:text-[#162050] cursor-pointer transition-colors">
								Properties
							</span>
							<span>/</span>
							<span className="text-[#162050] font-semibold truncate max-w-xs">
								{property.title}
							</span>
						</div>

						{/* Title + badges */}
						<div className="mb-5">
							<div className="flex flex-wrap items-center gap-2 mb-2">
								{property.tag && (
									<span
										className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${tagColors[property.tag]}`}
									>
										{property.tag}
									</span>
								)}
								{property.type && (
									<span className="text-xs font-bold px-3 py-1 rounded-full tracking-wide bg-slate-100 text-slate-700 flex items-center gap-1">
										<Building2 size={11} /> {property.type}
									</span>
								)}
								{property.featured && (
									<span className="text-xs font-bold px-3 py-1 rounded-full tracking-wide bg-amber-500 text-white">
										Featured
									</span>
								)}
							</div>
							<h1
								className="text-3xl xl:text-4xl font-bold text-[#162050] leading-snug mb-1.5"
								style={{
									fontFamily: "'Playfair Display', serif",
								}}
							>
								{property.title}
							</h1>
							<p className="flex items-center gap-1.5 text-gray-500 text-sm">
								<MapPin
									size={14}
									className="text-amber-500 shrink-0"
								/>
								{property.location}
							</p>
						</div>

						{/* ── Gallery + Content | Sidebar ── */}
						<div className="grid grid-cols-[3fr_2fr] gap-6 items-start">
							{/* Left column — gallery then content */}
							<div className="flex flex-col gap-6">
								{/* Main gallery image */}
								<div
									className="relative w-full aspect-3/2 rounded-2xl overflow-hidden cursor-pointer group bg-gray-100"
									onClick={() => openLightbox(activeImage)}
								>
									{images[activeImage] ? (
										<Image
											src={urlFor(
												images[activeImage],
											).url()}
											alt={property.title ?? "Property"}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
											priority
											sizes="(max-width: 1280px) 60vw, 768px"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<Home
												size={56}
												className="text-gray-300"
											/>
										</div>
									)}
									<div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

									{totalImages > 1 && (
										<>
											<button
												onClick={(e) => {
													e.stopPropagation();
													prevImage();
												}}
												className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/65 transition-all opacity-0 group-hover:opacity-100"
											>
												<ChevronLeft size={20} />
											</button>
											<button
												onClick={(e) => {
													e.stopPropagation();
													nextImage();
												}}
												className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/65 transition-all opacity-0 group-hover:opacity-100"
											>
												<ChevronRight size={20} />
											</button>
										</>
									)}
									<div className="absolute top-4 left-4">
										<span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
											{activeImage + 1} /{" "}
											{totalImages || 1}
										</span>
									</div>
									{totalImages > 1 && (
										<div className="absolute bottom-4 right-4">
											<button
												onClick={(e) => {
													e.stopPropagation();
													openLightbox(0);
												}}
												className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-[#162050] text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-md"
											>
												<Grid2X2 size={14} />
												All {totalImages} photos
											</button>
										</div>
									)}
								</div>

								{/* Stats row */}
								<div className="grid grid-cols-3 gap-4">
									{[
										{
											icon: Bed,
											label: "Bedrooms",
											value: property.beds,
										},
										{
											icon: Bath,
											label: "Bathrooms",
											value: property.baths,
										},
										{
											icon: Maximize,
											label: "Floor Area",
											value: property.sqft,
										},
									].map(({ icon: Icon, label, value }) => (
										<div
											key={label}
											className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2 border border-gray-100 shadow-sm text-center"
										>
											<div
												className="w-10 h-10 rounded-xl flex items-center justify-center"
												style={{
													background:
														"rgba(22,32,80,0.07)",
												}}
											>
												<Icon
													size={19}
													className="text-[#162050]"
												/>
											</div>
											<div>
												<p className="text-lg font-bold text-[#162050] leading-none">
													{value ?? "—"}
												</p>
												<p className="text-xs text-gray-400 mt-0.5">
													{label}
												</p>
											</div>
										</div>
									))}
								</div>

								{/* Description */}
								{property.description && (
									<div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
										<div className="flex items-center gap-3 mb-5">
											<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
											<h2
												className="text-xl font-bold text-[#162050]"
												style={{
													fontFamily:
														"'Playfair Display', serif",
												}}
											>
												About This Property
											</h2>
										</div>
										{/* <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line wrap-break-word"> */}
										<p className="text-gray-600 leading-relaxed text-base whitespace-pre-line break-all">
											{property.description as string}
										</p>
									</div>
								)}

								{/* Key Features / Amenities */}
								{property.amenities &&
									property.amenities.length > 0 && (
										<div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
											<div className="flex items-center gap-3 mb-5">
												<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
												<h2
													className="text-xl font-bold text-[#162050]"
													style={{
														fontFamily:
															"'Playfair Display', serif",
													}}
												>
													Key Features
												</h2>
											</div>
											<ul className="grid grid-cols-2 gap-x-8 gap-y-3">
												{property.amenities.map(
													(amenity, i) => (
														<li
															key={i}
															className="flex items-start gap-2.5 text-sm text-gray-700"
														>
															<CheckCircle2
																size={16}
																className="text-amber-500 shrink-0 mt-0.5"
															/>
															{amenity}
														</li>
													),
												)}
											</ul>
										</div>
									)}

								{/* Property Details table */}
								<div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
									<div className="flex items-center gap-3 mb-5">
										<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
										<h2
											className="text-xl font-bold text-[#162050]"
											style={{
												fontFamily:
													"'Playfair Display', serif",
											}}
										>
											Property Details
										</h2>
									</div>
									<div className="divide-y divide-gray-100">
										{overviewRows.map(
											({ label, value }) => (
												<div
													key={label}
													className="flex justify-between items-center py-3 text-sm"
												>
													<span className="text-gray-500 font-medium">
														{label}
													</span>
													<span className="font-semibold text-[#162050]">
														{value}
													</span>
												</div>
											),
										)}
									</div>
								</div>

								{/* Location */}
								<div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
									<div className="px-8 pt-6 pb-4 flex items-center gap-3">
										<span className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
										<div>
											<h2
												className="text-xl font-bold text-[#162050]"
												style={{
													fontFamily:
														"'Playfair Display', serif",
												}}
											>
												Location
											</h2>
											<p className="text-sm text-gray-500 mt-0.5">
												{property.location}
											</p>
										</div>
									</div>
									<div
										className="w-full flex items-center justify-center"
										style={{
											height: 240,
											background:
												"linear-gradient(135deg,#e8e4d8 0%,#d4cebc 100%)",
										}}
									>
										<div className="text-center">
											<MapPin
												size={30}
												className="mx-auto mb-2 text-amber-500"
											/>
											<p className="text-sm font-semibold text-gray-600">
												{property.location}
											</p>
											<p className="text-xs text-gray-400 mt-1">
												Map embed goes here
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Right — sticky sidebar */}
							<div className="sticky top-24 flex flex-col gap-4">
								{/* Price */}
								<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
									<div className="flex items-start justify-between mb-1">
										<div>
											<p className="text-3xl font-bold text-[#162050]">
												{formatToPounds(property.price ?? undefined)}
											</p>
											{property.tag === "For Rent" && (
												<p className="text-xs text-gray-400 mt-0.5">
													per month
												</p>
											)}
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													setLiked((v) => !v)
												}
												className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:border-red-300 transition-colors"
											>
												<Heart
													size={15}
													className={
														liked
															? "fill-red-500 text-red-500"
															: "text-gray-400"
													}
												/>
											</button>
											<button className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:border-[#162050] transition-colors">
												<Share2
													size={15}
													className="text-gray-400"
												/>
											</button>
										</div>
									</div>
									<div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
										<TrendingUp
											size={14}
											className="text-emerald-500 shrink-0"
										/>
										<p className="text-xs text-emerald-700 font-medium">
											6% below area average — great value
										</p>
									</div>
								</div>

								{/* Contact card */}
								{isUserListing ? (
									<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
										<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
											Contact the Owner
										</p>
										<div className="space-y-2.5">
											{property.contactPhone && (
												<a
													href={`tel:${property.contactPhone}`}
													className="flex items-center gap-2 w-full bg-[#162050] hover:bg-[#1e2e6e] text-white h-11 rounded-xl font-semibold text-sm px-4 transition-colors"
												>
													<Phone size={15} />
													{property.contactPhone}
												</a>
											)}
											{property.contactEmail && (
												<a
													href={`mailto:${property.contactEmail}`}
													className="flex items-center gap-2 w-full border border-[#162050] text-[#162050] hover:bg-[#162050] hover:text-white h-11 rounded-xl font-semibold text-sm px-4 transition-all"
												>
													<Mail size={15} />
													{property.contactEmail}
												</a>
											)}
										</div>
									</div>
								) : (
									<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
										<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
											Listed by
										</p>
										<div className="flex items-center gap-3 mb-5">
											<div
												className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
												style={{
													background:
														"linear-gradient(135deg,#162050,#1e3070)",
												}}
											>
												SS
											</div>
											<div>
												<p className="font-bold text-[#162050] text-sm">
													Seal Solutions
												</p>
												<div className="flex items-center gap-0.5 mt-0.5">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															size={11}
															className="fill-amber-400 text-amber-400"
														/>
													))}
													<span className="text-xs text-gray-400 ml-1.5">
														5.0 (124)
													</span>
												</div>
											</div>
										</div>
										<Separator className="mb-5" />
										<div className="space-y-2.5">
											<Button className="w-full bg-[#162050] hover:bg-[#1e2e6e] text-white gap-2 h-11 rounded-xl font-semibold text-sm">
												<Phone size={15} /> Call Agent
											</Button>
											<Button
												variant="outline"
												className="w-full border-[#162050] text-[#162050] hover:bg-[#162050] hover:text-white gap-2 h-11 rounded-xl font-semibold text-sm transition-all"
											>
												<Mail size={15} /> Send Enquiry
											</Button>
											<Button
												variant="outline"
												className="w-full border-gray-200 text-gray-600 hover:border-[#162050] hover:text-[#162050] gap-2 h-11 rounded-xl font-semibold text-sm transition-all"
											>
												<Calendar size={15} /> Book Viewing
											</Button>
										</div>
									</div>
								)}

								{/* At a Glance */}
								<div
									className="rounded-2xl p-5"
									style={{
										background:
											"linear-gradient(135deg, #162050 0%, #1a2d6e 100%)",
									}}
								>
									<p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
										At a Glance
									</p>
									<ul className="space-y-2.5">
										{property.type && (
											<li className="flex items-center gap-3 text-sm">
												<Building2
													size={14}
													className="text-amber-400 shrink-0"
												/>
												<span className="text-white/80">
													{property.type}
												</span>
											</li>
										)}
										{property.beds != null && (
											<li className="flex items-center gap-3 text-sm">
												<Bed
													size={14}
													className="text-amber-400 shrink-0"
												/>
												<span className="text-white/80">
													{property.beds} Bedroom
													{property.beds !== 1
														? "s"
														: ""}
												</span>
											</li>
										)}
										{property.baths != null && (
											<li className="flex items-center gap-3 text-sm">
												<Bath
													size={14}
													className="text-amber-400 shrink-0"
												/>
												<span className="text-white/80">
													{property.baths} Bathroom
													{property.baths !== 1
														? "s"
														: ""}
												</span>
											</li>
										)}
										{property.sqft && (
											<li className="flex items-center gap-3 text-sm">
												<Maximize
													size={14}
													className="text-amber-400 shrink-0"
												/>
												<span className="text-white/80">
													{property.sqft}
												</span>
											</li>
										)}
										{property.location && (
											<li className="flex items-center gap-3 text-sm">
												<MapPin
													size={14}
													className="text-amber-400 shrink-0"
												/>
												<span className="text-white/80">
													{property.location}
												</span>
											</li>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Similar Properties */}
					{similarProperties.length > 0 && (
						<div className="max-w-7xl mx-auto px-6 mt-20">
							<div className="flex items-end justify-between mb-7">
								<div>
									<p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
										More Like This
									</p>
									<h2
										className="text-2xl md:text-3xl font-bold text-[#162050]"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										Similar Properties
									</h2>
								</div>
								<button className="text-sm font-semibold text-[#162050] flex items-center gap-1 hover:text-amber-600 transition-colors">
									View All <ArrowUpRight size={14} />
								</button>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
								{similarProperties.slice(0, 3).map((p) => (
									<div
										key={p._id}
										className="bg-white rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col"
										style={{
											boxShadow:
												"0 4px 24px rgba(26,43,107,0.07)",
										}}
										onClick={() =>
											router.push(`/properties/${p._id}`)
										}
									>
										<div className="relative h-48 overflow-hidden">
											{p.images?.[0] && (
												<Image
													fill
													src={urlFor(
														p.images[0],
													).url()}
													alt={p.title ?? "Property"}
													className="object-cover transition-transform duration-500 group-hover:scale-105"
													sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
												/>
											)}
											<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
											<div
												className="absolute bottom-0 left-0 right-0 h-0.5"
												style={{
													background: "#c9a84c",
												}}
											/>
											{p.tag && (
												<div className="absolute top-3 left-3">
													<span
														className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${tagColors[p.tag]}`}
													>
														{p.tag}
													</span>
												</div>
											)}
										</div>
										<div className="p-4 flex flex-col flex-1">
											<h3 className="font-semibold text-[#162050] text-sm leading-snug mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
												{p.title}
											</h3>
											<div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
												<MapPin
													size={11}
													className="text-amber-500 shrink-0"
												/>
												{p.location}
											</div>
											<div className="flex items-center gap-3 text-xs text-gray-400 pb-3 border-b border-gray-100 mt-auto">
												<span className="flex items-center gap-1">
													<Bed size={12} /> {p.beds}{" "}
													Beds
												</span>
												<span className="flex items-center gap-1">
													<Bath size={12} /> {p.baths}{" "}
													Baths
												</span>
											</div>
											<div className="pt-3 flex items-center justify-between">
												<span className="text-base font-bold text-[#162050]">
													{formatToPounds(p.price ?? undefined)}
												</span>
												<span className="text-xs font-semibold text-[#162050] border border-[#162050] rounded-full px-3 py-1 group-hover:bg-[#162050] group-hover:text-white transition-all">
													View
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<Footer />
			</main>
		</>
	);
}
