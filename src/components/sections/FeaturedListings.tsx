"use client";
import { useState } from "react";
import { Bed, Bath, Maximize, MapPin, Heart, ChevronRight } from "lucide-react";

const categories = ["All", "For Sale", "For Rent", "New Development"];

const listings = [
	{
		id: 1,
		tag: "For Sale",
		price: "₦185,000,000",
		title: "Luxury 4-Bedroom Duplex",
		location: "Lekki Phase 1, Lagos",
		beds: 4,
		baths: 4,
		sqft: "320 sqm",
		type: "Duplex",
		featured: true,
		gradient: "from-[#1a2b6b] to-[#2d4090]",
		accentColor: "#c9a84c",
	},
	{
		id: 2,
		tag: "For Rent",
		price: "₦4,500,000/yr",
		title: "Modern 3-Bedroom Apartment",
		location: "Victoria Island, Lagos",
		beds: 3,
		baths: 3,
		sqft: "185 sqm",
		type: "Apartment",
		featured: false,
		gradient: "from-[#0f3460] to-[#16213e]",
		accentColor: "#e8c97a",
	},
	{
		id: 3,
		tag: "New Development",
		price: "₦95,000,000",
		title: "Smart 3-Bedroom Terrace",
		location: "Ikeja GRA, Lagos",
		beds: 3,
		baths: 2,
		sqft: "220 sqm",
		type: "Terrace",
		featured: false,
		gradient: "from-[#1a3a2a] to-[#0d2b1a]",
		accentColor: "#c9a84c",
	},
	{
		id: 4,
		tag: "For Sale",
		price: "₦320,000,000",
		title: "5-Bedroom Waterfront Mansion",
		location: "Banana Island, Lagos",
		beds: 5,
		baths: 6,
		sqft: "650 sqm",
		type: "Mansion",
		featured: true,
		gradient: "from-[#2b1a4a] to-[#1a0f30]",
		accentColor: "#e8c97a",
	},
	{
		id: 5,
		tag: "For Rent",
		price: "₦2,800,000/yr",
		title: "Serviced 2-Bedroom Apartment",
		location: "Wuse II, Abuja",
		beds: 2,
		baths: 2,
		sqft: "120 sqm",
		type: "Apartment",
		featured: false,
		gradient: "from-[#1a3040] to-[#0f2030]",
		accentColor: "#c9a84c",
	},
	{
		id: 6,
		tag: "New Development",
		price: "₦55,000,000",
		title: "Contemporary 2-Bedroom Flat",
		location: "Oniru Estate, Lagos",
		beds: 2,
		baths: 2,
		sqft: "110 sqm",
		type: "Flat",
		featured: false,
		gradient: "from-[#2b1a1a] to-[#3a1a0f]",
		accentColor: "#e8c97a",
	},
];

const tagColors: Record<string, string> = {
	"For Sale": "bg-[var(--navy)] text-white",
	"For Rent": "bg-emerald-600 text-white",
	"New Development": "bg-[var(--gold)] text-white",
};

export default function FeaturedListings() {
	const [active, setActive] = useState("All");
	const [liked, setLiked] = useState<number[]>([]);

	const filtered =
		active === "All" ? listings : listings.filter((l) => l.tag === active);

	return (
		<section id="listings" className="py-24 bg-cream">
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
					<div>
						<p className="section-label mb-3">Properties</p>
						<h2
							className="text-4xl md:text-5xl font-bold text-navy gold-line"
							style={{ fontFamily: "'Playfair Display', serif" }}
						>
							Featured Listings
						</h2>
					</div>
					<a
						href="#"
						className="mt-6 md:mt-0 flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold transition-colors group"
					>
						View All Properties
						<ChevronRight
							size={16}
							className="group-hover:translate-x-1 transition-transform"
						/>
					</a>
				</div>

				{/* Filter tabs */}
				<div className="flex flex-wrap gap-2 mb-10">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setActive(cat)}
							className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
								active === cat
									? "bg-navy text-white shadow-md"
									: "bg-white text-gray-600 hover:bg-navy/5"
							}`}
							style={{ fontFamily: "'DM Sans', sans-serif" }}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
					{filtered.map((listing) => (
						<div
							key={listing.id}
							className="bg-white rounded-2xl overflow-hidden card-hover cursor-pointer group"
							style={{
								boxShadow: "0 4px 24px rgba(26,43,107,0.07)",
							}}
						>
							{/* Image placeholder with gradient */}
							<div
								className={`relative h-56 bg-linear-to-br ${listing.gradient} overflow-hidden`}
							>
								{/* Abstract property visual */}
								<div className="absolute inset-0 flex items-center justify-center">
									<svg
										viewBox="0 0 200 150"
										xmlns="http://www.w3.org/2000/svg"
										className="w-48 opacity-25"
									>
										{listing.type === "Mansion" ? (
											<g fill="white">
												<rect
													x="20"
													y="80"
													width="160"
													height="70"
												/>
												<polygon points="20,80 100,20 180,80" />
												<rect
													x="80"
													y="100"
													width="40"
													height="50"
												/>
												<rect
													x="30"
													y="90"
													width="25"
													height="20"
												/>
												<rect
													x="145"
													y="90"
													width="25"
													height="20"
												/>
												<rect
													x="90"
													y="60"
													width="20"
													height="15"
												/>
												<polygon points="0,80 100,0 200,80 190,80 100,12 10,80" />
											</g>
										) : listing.type === "Apartment" ||
										  listing.type === "Flat" ? (
											<g fill="white">
												<rect
													x="30"
													y="30"
													width="140"
													height="120"
												/>
												<rect
													x="40"
													y="45"
													width="20"
													height="20"
												/>
												<rect
													x="70"
													y="45"
													width="20"
													height="20"
												/>
												<rect
													x="100"
													y="45"
													width="20"
													height="20"
												/>
												<rect
													x="130"
													y="45"
													width="20"
													height="20"
												/>
												<rect
													x="40"
													y="75"
													width="20"
													height="20"
												/>
												<rect
													x="70"
													y="75"
													width="20"
													height="20"
												/>
												<rect
													x="100"
													y="75"
													width="20"
													height="20"
												/>
												<rect
													x="130"
													y="75"
													width="20"
													height="20"
												/>
												<rect
													x="40"
													y="105"
													width="20"
													height="20"
												/>
												<rect
													x="130"
													y="105"
													width="20"
													height="20"
												/>
												<rect
													x="75"
													y="100"
													width="50"
													height="50"
												/>
											</g>
										) : (
											<g fill="white">
												<rect
													x="30"
													y="70"
													width="140"
													height="80"
												/>
												<polygon points="20,70 100,15 180,70" />
												<rect
													x="60"
													y="95"
													width="30"
													height="25"
												/>
												<rect
													x="110"
													y="95"
													width="30"
													height="25"
												/>
												<rect
													x="80"
													y="90"
													width="40"
													height="60"
												/>
												<rect
													x="92"
													y="48"
													width="16"
													height="14"
												/>
											</g>
										)}
									</svg>
								</div>

								{/* Overlay grid pattern */}
								<div className="absolute inset-0 opacity-5">
									<svg width="100%" height="100%">
										<defs>
											<pattern
												id={`p${listing.id}`}
												width="20"
												height="20"
												patternUnits="userSpaceOnUse"
											>
												<circle
													cx="10"
													cy="10"
													r="1"
													fill="white"
												/>
											</pattern>
										</defs>
										<rect
											width="100%"
											height="100%"
											fill={`url(#p${listing.id})`}
										/>
									</svg>
								</div>

								{/* Gold accent line */}
								<div
									className="absolute bottom-0 left-0 right-0 h-1"
									style={{ background: `var(--gold)` }}
								/>

								{/* Tags */}
								<div className="absolute top-4 left-4">
									<span
										className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${tagColors[listing.tag]}`}
									>
										{listing.tag}
									</span>
								</div>
								{listing.featured && (
									<div className="absolute top-4 right-14">
										<span className="text-xs font-bold px-3 py-1 rounded-full tracking-wide bg-gold text-white">
											Featured
										</span>
									</div>
								)}

								{/* Like button */}
								<button
									onClick={() =>
										setLiked((prev) =>
											prev.includes(listing.id)
												? prev.filter(
														(id) =>
															id !== listing.id,
													)
												: [...prev, listing.id],
										)
									}
									className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
								>
									<Heart
										size={15}
										className={
											liked.includes(listing.id)
												? "fill-red-500 text-red-500"
												: "text-white"
										}
									/>
								</button>
							</div>

							{/* Content */}
							<div className="p-5">
								<div className="flex items-start justify-between mb-2">
									<h3
										className="font-semibold text-navy text-lg leading-tight group-hover:text-gold transition-colors"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										{listing.title}
									</h3>
								</div>

								<div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
									<MapPin
										size={13}
										className="text-gold shrink-0"
									/>
									<span>{listing.location}</span>
								</div>

								<div className="flex items-center gap-5 text-sm text-gray-500 pb-4 border-b border-gray-100">
									<span className="flex items-center gap-1.5">
										<Bed
											size={15}
											className="text-navy/60"
										/>
										{listing.beds} Beds
									</span>
									<span className="flex items-center gap-1.5">
										<Bath
											size={15}
											className="text-navy/60"
										/>
										{listing.baths} Baths
									</span>
									<span className="flex items-center gap-1.5">
										<Maximize
											size={15}
											className="text-navy/60"
										/>
										{listing.sqft}
									</span>
								</div>

								<div className="flex items-center justify-between pt-4">
									<span
										className="text-xl font-bold text-navy"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										{listing.price}
									</span>
									<button className="text-xs font-semibold text-navy border border-navy rounded-full px-4 py-1.5 hover:bg-navy hover:text-white transition-all">
										View Details
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
