"use client";
import { useState } from "react";
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
	CheckCircle2,
	Phone,
	Mail,
	Calendar,
	TrendingUp,
	Car,
	Wifi,
	Zap,
	Wind,
	ShieldCheck,
	TreePine,
	Home,
	Building2,
	Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { formatToPounds } from "@/lib/helper";
import { tagColors } from "@/data/property";
import { Property } from "../../../../sanity.types";
import NavbarStatic from "@/components/layout/NavbarStatic";
import Footer from "@/components/layout/Footer";

const AMENITY_ICONS: Record<string, React.ElementType> = {
	Parking: Car,
	"High-Speed WiFi": Wifi,
	"EV Charging": Zap,
	"Air Conditioning": Wind,
	"Security System": ShieldCheck,
	Garden: TreePine,
};

const MOCK_FEATURES = [
	"Newly renovated kitchen",
	"Underfloor heating throughout",
	"Double-glazed windows",
	"South-facing garden",
	"Off-street parking for 2 cars",
	"Close to outstanding schools",
	"5 minutes to the tube",
	"Energy Rating: B",
];

const MOCK_AMENITIES = [
	"Parking",
	"High-Speed WiFi",
	"EV Charging",
	"Air Conditioning",
	"Security System",
	"Garden",
];

const NEARBY = [
	{ label: "Schools", value: "3 within 0.5mi", icon: Building2 },
	{ label: "Transport", value: "2 min walk", icon: TrendingUp },
	{ label: "Shops", value: "High street 0.3mi", icon: Home },
	{ label: "Parks", value: "Victoria Park 0.8mi", icon: TreePine },
];

interface PropertyDetailsClientProps {
	property: Property;
	similarProperties?: Property[];
}

export default function PropertyDetailsClient({
	property,
	similarProperties = [],
}: PropertyDetailsClientProps) {
	const router = useRouter();
	const [activeImage, setActiveImage] = useState(0);
	const [liked, setLiked] = useState(false);
	const [showAllFeatures, setShowAllFeatures] = useState(false);

	const images = property.images ?? [];
	const totalImages = images.length;

	const prevImage = () =>
		setActiveImage((i) => (i - 1 + totalImages) % totalImages);
	const nextImage = () => setActiveImage((i) => (i + 1) % totalImages);

	const features = showAllFeatures
		? MOCK_FEATURES
		: MOCK_FEATURES.slice(0, 4);

	return (
		<main
			className="min-h-screen"
			style={{
				background: "#f8f5ef",
				fontFamily: "'DM Sans', sans-serif",
			}}
		>
			<NavbarStatic />
			<div className="mt-28">
				<div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-1 hover:text-[#162050] transition-colors font-medium"
					>
						<ChevronLeft size={16} />
						Back
					</button>
					<span>/</span>
					<span className="hover:text-[#162050] cursor-pointer">
						Properties
					</span>
					<span>/</span>
					<span className="text-[#162050] font-semibold truncate max-w-xs">
						{property.title}
					</span>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-10">
				<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
					<div>
						<div className="flex flex-wrap items-center gap-2 mb-2">
							{property.tag && (
								<span
									className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${
										tagColors[property.tag]
									}`}
								>
									{property.tag}
								</span>
							)}
							{property.featured && (
								<span className="text-xs font-bold px-3 py-1 rounded-full tracking-wide bg-amber-500 text-white">
									Featured
								</span>
							)}
						</div>
						<h1 className="text-3xl md:text-4xl font-bold text-[#162050] leading-tight mb-2">
							{property.title}
						</h1>
						<div className="flex items-center gap-1.5 text-gray-500 text-sm">
							<MapPin
								size={15}
								className="text-amber-500 shrink-0"
							/>
							<span>{property.location}</span>
						</div>
					</div>

					<div className="flex flex-col items-end gap-3 shrink-0">
						<p className="text-3xl font-bold text-[#162050]">
							{formatToPounds(property.price)}
						</p>
						{property.tag === "For Rent" && (
							<span className="text-sm text-gray-400 -mt-2">
								per month
							</span>
						)}
						<div className="flex items-center gap-2">
							<button
								onClick={() => setLiked((v) => !v)}
								className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:border-red-300 transition-colors shadow-sm"
							>
								<Heart
									size={17}
									className={
										liked
											? "fill-red-500 text-red-500"
											: "text-gray-400"
									}
								/>
							</button>
							<button className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:border-[#162050] transition-colors shadow-sm">
								<Share2 size={17} className="text-gray-400" />
							</button>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 mb-10 rounded-2xl overflow-hidden h-105 md:h-125">
					<div className="relative overflow-hidden group">
						{images[activeImage] ? (
							<Image
								src={urlFor(images[activeImage]).url()}
								alt={property.title ?? "Property"}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								priority
							/>
						) : (
							<div className="w-full h-full bg-gray-200 flex items-center justify-center">
								<Home size={48} className="text-gray-300" />
							</div>
						)}
						<div
							className="absolute bottom-0 left-0 right-0 h-0.5"
							style={{ background: "#c9a84c" }}
						/>
						{totalImages > 1 && (
							<>
								<button
									onClick={prevImage}
									className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
								>
									<ChevronLeft size={18} />
								</button>
								<button
									onClick={nextImage}
									className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
								>
									<ChevronRight size={18} />
								</button>
								<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
									{images.map((_, i) => (
										<button
											key={i}
											onClick={() => setActiveImage(i)}
											className={cn(
												"w-1.5 h-1.5 rounded-full transition-all",
												i === activeImage
													? "bg-white w-4"
													: "bg-white/50",
											)}
										/>
									))}
								</div>
							</>
						)}
						<div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
							{activeImage + 1} / {totalImages || 1}
						</div>
					</div>

					<div className="hidden lg:grid grid-rows-2 gap-3">
						{images.slice(1, 3).map((img, i) => (
							<div
								key={i}
								onClick={() => setActiveImage(i + 1)}
								className="relative overflow-hidden cursor-pointer group"
							>
								<Image
									src={urlFor(img).url()}
									alt={`View ${i + 2}`}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								{i === 1 && totalImages > 3 && (
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
										<span className="text-white font-semibold text-lg">
											+{totalImages - 3} more
										</span>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4 mb-10">
					{[
						{ icon: Bed, label: "Bedrooms", value: property.beds },
						{
							icon: Bath,
							label: "Bathrooms",
							value: property.baths,
						},
						{
							icon: Maximize,
							label: "Square Footage",
							value: property.sqft,
						},
					].map(({ icon: Icon, label, value }) => (
						<div
							key={label}
							className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100"
						>
							<div
								className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
								style={{ background: "rgba(22,32,80,0.08)" }}
							>
								<Icon size={20} className="text-[#162050]" />
							</div>
							<div>
								<p className="text-xs text-gray-400 mb-0.5">
									{label}
								</p>
								<p className="text-lg font-bold text-[#162050]">
									{value ?? "—"}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="grid lg:grid-cols-[1fr_360px] gap-8">
					<div className="space-y-8">
						<Tabs defaultValue="overview">
							<TabsList className="bg-white border border-gray-100 rounded-xl h-auto p-1 gap-1">
								{["overview", "features", "location"].map(
									(tab) => (
										<TabsTrigger
											key={tab}
											value={tab}
											className="capitalize rounded-lg px-5 py-2.5 text-sm font-semibold data-[state=active]:bg-[#162050] data-[state=active]:text-white transition-all"
										>
											{tab}
										</TabsTrigger>
									),
								)}
							</TabsList>

							<TabsContent
								value="overview"
								className="mt-6 space-y-6"
							>
								<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
									<h2
										className="text-xl font-bold text-[#162050] mb-4"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										About This Property
									</h2>
									<p className="text-gray-600 leading-relaxed text-sm">
										{property.title ??
											"This exceptional property offers a rare opportunity to acquire a beautifully presented home in one of the UK's most sought-after locations. The property has been thoughtfully designed and finished to an incredibly high standard throughout, featuring spacious, light-filled rooms and a stunning south-facing garden. Perfect for families and professionals alike."}
									</p>
								</div>

								<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
									<h2
										className="text-xl font-bold text-[#162050] mb-5"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										Amenities
									</h2>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
										{MOCK_AMENITIES.map((amenity) => {
											const Icon =
												AMENITY_ICONS[amenity] ??
												CheckCircle2;
											return (
												<div
													key={amenity}
													className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
												>
													<div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
														<Icon
															size={16}
															className="text-amber-500"
														/>
													</div>
													<span className="text-sm text-gray-700 font-medium">
														{amenity}
													</span>
												</div>
											);
										})}
									</div>
								</div>
							</TabsContent>

							<TabsContent value="features" className="mt-6">
								<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
									<h2
										className="text-xl font-bold text-[#162050] mb-5"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										Key Features
									</h2>
									<ul className="space-y-3">
										{features.map((f) => (
											<li
												key={f}
												className="flex items-start gap-3 text-sm text-gray-600"
											>
												<CheckCircle2
													size={17}
													className="text-amber-500 shrink-0 mt-0.5"
												/>
												{f}
											</li>
										))}
									</ul>
									{MOCK_FEATURES.length > 4 && (
										<button
											onClick={() =>
												setShowAllFeatures((v) => !v)
											}
											className="mt-5 text-sm font-semibold text-[#162050] hover:text-amber-600 transition-colors underline underline-offset-4"
										>
											{showAllFeatures
												? "Show less"
												: `Show all ${MOCK_FEATURES.length} features`}
										</button>
									)}
								</div>
							</TabsContent>

							<TabsContent
								value="location"
								className="mt-6 space-y-5"
							>
								<div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
									<div
										className="w-full h-60 bg-gray-100 flex items-center justify-center"
										style={{
											background:
												"linear-gradient(135deg,#e8e4d8 0%,#d4cebc 100%)",
										}}
									>
										<div className="text-center text-gray-500">
											<MapPin
												size={32}
												className="mx-auto mb-2 text-amber-500"
											/>
											<p className="text-sm font-semibold">
												{property.location}
											</p>
											<p className="text-xs text-gray-400 mt-1">
												Map embed goes here
											</p>
										</div>
									</div>
									<div className="p-5 grid sm:grid-cols-2 gap-4">
										{NEARBY.map(
											({ label, value, icon: Icon }) => (
												<div
													key={label}
													className="flex items-center gap-3"
												>
													<div className="w-8 h-8 rounded-lg bg-[#162050]/8 flex items-center justify-center">
														<Icon
															size={15}
															className="text-[#162050]"
														/>
													</div>
													<div>
														<p className="text-xs text-gray-400">
															{label}
														</p>
														<p className="text-sm font-semibold text-gray-700">
															{value}
														</p>
													</div>
												</div>
											),
										)}
									</div>
								</div>
							</TabsContent>
						</Tabs>
					</div>

					<aside className="space-y-5">
						<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
								Listed by
							</p>
							<div className="flex items-center gap-3 mb-5">
								<div
									className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
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
									<div className="flex items-center gap-1 mt-0.5">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={11}
												className="fill-amber-400 text-amber-400"
											/>
										))}
										<span className="text-xs text-gray-400 ml-1">
											5.0 (124 reviews)
										</span>
									</div>
								</div>
							</div>

							<Separator className="mb-5" />

							<div className="space-y-3">
								<Button className="w-full bg-[#162050] hover:bg-[#1e2e6e] text-white gap-2 h-11 rounded-xl font-semibold">
									<Phone size={16} />
									Call Agent
								</Button>
								<Button
									variant="outline"
									className="w-full border-[#162050] text-[#162050] hover:bg-[#162050] hover:text-white gap-2 h-11 rounded-xl font-semibold transition-all"
								>
									<Mail size={16} />
									Send Enquiry
								</Button>
								<Button
									variant="outline"
									className="w-full border-gray-200 text-gray-600 hover:border-[#162050] hover:text-[#162050] gap-2 h-11 rounded-xl font-semibold transition-all"
								>
									<Calendar size={16} />
									Book Viewing
								</Button>
							</div>
						</div>

						<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
							<h3
								className="text-base font-bold text-[#162050] mb-4"
								style={{
									fontFamily: "'Playfair Display', serif",
								}}
							>
								Price Insight
							</h3>
							<div className="space-y-3">
								{[
									{
										label: "Asking Price",
										value: formatToPounds(property.price),
										highlight: true,
									},
									{
										label: "Area Average",
										value: formatToPounds(
											(property.price ?? 0) * 1.06,
										),
									},
									{
										label: "Price per sq ft",
										value: "£520",
									},
								].map(({ label, value, highlight }) => (
									<div
										key={label}
										className={cn(
											"flex items-center justify-between p-3 rounded-xl text-sm",
											highlight
												? "bg-[#162050]/5 border border-[#162050]/10"
												: "bg-gray-50",
										)}
									>
										<span className="text-gray-500">
											{label}
										</span>
										<span
											className={cn(
												"font-bold",
												highlight
													? "text-[#162050]"
													: "text-gray-700",
											)}
										>
											{value}
										</span>
									</div>
								))}
							</div>
							<div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
								<TrendingUp
									size={15}
									className="text-emerald-500 shrink-0"
								/>
								<p className="text-xs text-emerald-700 font-medium">
									6% below area average — great value
								</p>
							</div>
						</div>

						<div
							className="rounded-2xl p-5 text-white"
							style={{
								background:
									"linear-gradient(135deg, #0b1535 0%, #162050 60%, #1e3070 100%)",
							}}
						>
							<p
								className="text-base font-bold mb-1"
								style={{
									fontFamily: "'Playfair Display', serif",
								}}
							>
								Mortgage Calculator
							</p>
							<p className="text-white/60 text-xs mb-4">
								Estimated monthly repayment
							</p>
							<p className="text-2xl font-bold text-amber-300 mb-4">
								£
								{Math.round(
									((property.price ?? 0) * 0.8 * 0.005) / 12,
								).toLocaleString()}
								<span className="text-sm font-normal text-white/50">
									/mo
								</span>
							</p>
							<p className="text-white/40 text-xs mb-4">
								Based on 80% LTV, 25yr term, 5% rate
							</p>
							<Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl h-10 text-sm font-semibold">
								Get Full Estimate
							</Button>
						</div>
					</aside>
				</div>

				{similarProperties.length > 0 && (
					<section className="mt-16">
						<div className="flex items-end justify-between mb-8">
							<div>
								<p className="section-label mb-2">
									More Like This
								</p>
								<h2
									className="text-3xl font-bold text-[#162050]"
									style={{
										fontFamily: "'Playfair Display', serif",
									}}
								>
									Similar Properties
								</h2>
							</div>
							<button className="text-sm font-semibold text-[#162050] flex items-center gap-1 hover:text-amber-600 transition-colors">
								View All <ChevronRight size={15} />
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
									<div className="relative h-44 overflow-hidden">
										{p.images?.[0] && (
											<Image
												fill
												src={urlFor(p.images[0]).url()}
												alt={p.title ?? "Property"}
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										)}
										<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
										<div
											className="absolute bottom-0 left-0 right-0 h-0.5"
											style={{ background: "#c9a84c" }}
										/>
										{p.tag && (
											<div className="absolute top-3 left-3">
												<span
													className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${
														tagColors[p.tag]
													}`}
												>
													{p.tag}
												</span>
											</div>
										)}
									</div>
									<div className="p-4 flex flex-col flex-1">
										<h3 className="font-semibold text-[#162050] text-sm leading-snug mb-1 group-hover:text-amber-600 transition-colors">
											{p.title}
										</h3>
										<div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
											<MapPin
												size={12}
												className="text-amber-500 shrink-0"
											/>
											{p.location}
										</div>
										<div className="flex items-center gap-3 text-xs text-gray-400 pb-3 border-b border-gray-100 mt-auto">
											<span className="flex items-center gap-1">
												<Bed size={13} /> {p.beds} Beds
											</span>
											<span className="flex items-center gap-1">
												<Bath size={13} /> {p.baths}{" "}
												Baths
											</span>
										</div>
										<div className="pt-3 flex items-center justify-between">
											<span className="text-base font-bold text-[#162050]">
												{formatToPounds(p.price)}
											</span>
											<span className="text-xs font-semibold text-[#162050] border border-[#162050] rounded-full px-3 py-1 hover:bg-[#162050] hover:text-white transition-all">
												View
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
			<Footer />
		</main>
	);
}
