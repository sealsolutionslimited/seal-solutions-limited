"use client";
import { useState } from "react";
import {
	Search,
	MapPin,
	X,
	ChevronDown,
	Grid3X3,
	List,
	Home,
} from "lucide-react";
import Link from "next/link";
import { sortOptions } from "@/data/property";
import { priceMatchesRange } from "@/lib/helper";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { PropertyListRow } from "@/components/shared/PropertyListRow";
import NavbarStatic from "@/components/layout/NavbarStatic";
import Footer from "@/components/layout/Footer";
import { PropertyListing } from "@/types/listings";

interface PropertiesClientProps {
	properties: PropertyListing[];
	initialLocation?: string;
	initialType?: string;
	initialCategory?: string;
}

export default function PropertiesClient({
	properties,
	initialLocation = "",
	initialType = "All Types",
	initialCategory = "All",
}: PropertiesClientProps) {
	const [activeCategory, setActiveCategory] = useState(initialCategory);
	const [activeType, setActiveType] = useState(initialType);
	const [activePriceRange, setActivePriceRange] = useState("Any Price");
	const [activeBeds, setActiveBeds] = useState("Any Beds");
	const [activeSort, setActiveSort] = useState("Newest First");
	const [searchQuery, setSearchQuery] = useState(initialLocation);
	const [liked, setLiked] = useState<string[]>([]);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const sorted = [...properties].sort((a, b) => {
		if (activeSort === "Price: Low to High")
			return (a.price ?? 0) - (b.price ?? 0);
		if (activeSort === "Price: High to Low")
			return (b.price ?? 0) - (a.price ?? 0);
		return 0;
	});

	const filtered = sorted.filter((p) => {
		if (activeCategory !== "All" && p.tag !== activeCategory) return false;
		if (activeType !== "All Types" && p.type !== activeType) return false;
		if (!priceMatchesRange(p.price ?? undefined, activePriceRange)) return false;
		if (activeBeds !== "Any Beds") {
			const minBeds = parseInt(activeBeds);
			if ((p.beds ?? 0) < minBeds) return false;
		}
		if (
			searchQuery &&
			!p.location?.toLowerCase().includes(searchQuery.toLowerCase()) &&
			!p.title?.toLowerCase().includes(searchQuery.toLowerCase())
		)
			return false;
		return true;
	});

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{
				backgroundColor: "#f8f7f4",
				fontFamily: "'DM Sans', sans-serif",
			}}
		>
			<NavbarStatic />

			{/* Search Header */}
			<div
				className="relative overflow-hidden"
				style={{
					background:
						"linear-gradient(135deg, #0b1535 0%, #162050 45%, #1e3070 100%)",
					paddingTop: "72px",
				}}
			>
				<div className="absolute inset-0 opacity-[0.07] pointer-events-none">
					<svg
						width="100%"
						height="100%"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<pattern
								id="grid"
								width="60"
								height="60"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M 60 0 L 0 0 0 60"
									fill="none"
									stroke="white"
									strokeWidth="0.5"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" />
					</svg>
				</div>
				<div
					className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.12] pointer-events-none"
					style={{
						background:
							"radial-gradient(circle, #c9a84c, transparent 70%)",
					}}
				/>
				<div
					className="absolute bottom-0 left-0 right-0 h-px"
					style={{
						background:
							"linear-gradient(90deg, transparent, #c9a84c, transparent)",
					}}
				/>

				<div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-10">
					<div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
						<Link
							href="/"
							className="hover:text-white/70 transition-colors"
						>
							Home
						</Link>
						<span>/</span>
						<span className="text-white/60">Properties</span>
					</div>

					<h1
						className="text-white text-3xl md:text-4xl font-bold mb-1"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						Find Your{" "}
						<span style={{ color: "#e8c76a", fontStyle: "italic" }}>
							Perfect
						</span>{" "}
						UK Property
					</h1>
					<p className="text-white/50 text-sm mb-7">
						Browse {properties.length} premium properties across
						London and the UK
					</p>

					<div className="bg-white rounded-2xl shadow-2xl overflow-visible">
						<div className="flex border-b border-gray-100 rounded-t-2xl overflow-hidden">
							{(["Buy", "Rent"] as const).map((tab) => (
								<button
									key={tab}
									onClick={() =>
										setActiveCategory(
											tab === "Buy"
												? "For Sale"
												: "To Let",
										)
									}
									className={`flex-1 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all ${
										(tab === "Buy" &&
											activeCategory === "For Sale") ||
										(tab === "Rent" &&
											activeCategory === "To Let")
											? "bg-[#162050] text-white"
											: "text-gray-500 hover:text-[#162050] hover:bg-gray-50"
									}`}
								>
									{tab}
								</button>
							))}
						</div>

						<div className="p-4 flex flex-col md:flex-row gap-3 items-stretch">
							<div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-4 h-12 focus-within:border-[#162050] transition-colors min-w-0">
								<MapPin
									size={16}
									className="text-amber-500 shrink-0"
								/>
								<input
									type="text"
									placeholder="Area, city or postcode…"
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
								/>
								{searchQuery && (
									<button onClick={() => setSearchQuery("")}>
										<X
											size={13}
											className="text-gray-400 hover:text-gray-600"
										/>
									</button>
								)}
							</div>

							<div className="relative">
								<select
									value={activeType}
									onChange={(e) =>
										setActiveType(e.target.value)
									}
									className="appearance-none h-12 bg-white border border-gray-200 rounded-lg pl-4 pr-9 text-sm text-gray-700 focus:outline-none focus:border-[#162050] cursor-pointer w-full md:w-auto"
								>
									<option>All Types</option>
									<option>Flat / Apartment</option>
									<option>House</option>
									<option>Terraced</option>
									<option>Detached</option>
									<option>Semi-Detached</option>
									<option>Commercial</option>
									<option>Land</option>
								</select>
								<ChevronDown
									size={13}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
								/>
							</div>

							<div className="relative">
								<select
									value={activeBeds}
									onChange={(e) =>
										setActiveBeds(e.target.value)
									}
									className="appearance-none h-12 bg-white border border-gray-200 rounded-lg pl-4 pr-9 text-sm text-gray-700 focus:outline-none focus:border-[#162050] cursor-pointer w-full md:w-auto"
								>
									<option>Any Beds</option>
									<option>1+ Beds</option>
									<option>2+ Beds</option>
									<option>3+ Beds</option>
									<option>4+ Beds</option>
									<option>5+ Beds</option>
								</select>
								<ChevronDown
									size={13}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
								/>
							</div>

							<div className="relative">
								<select
									value={activePriceRange}
									onChange={(e) =>
										setActivePriceRange(e.target.value)
									}
									className="appearance-none h-12 bg-white border border-gray-200 rounded-lg pl-4 pr-9 text-sm text-gray-700 focus:outline-none focus:border-[#162050] cursor-pointer w-full md:w-auto"
								>
									<option>Any Price</option>
									<option>Under £500k</option>
									<option>£500k – £1M</option>
									<option>£1M – £2M</option>
									<option>£2M+</option>
								</select>
								<ChevronDown
									size={13}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
								/>
							</div>

							<button
								className="h-12 px-7 rounded-lg text-white font-semibold text-sm flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity"
								style={{ background: "#c9a84c" }}
							>
								<Search size={16} />
								Search
							</button>
						</div>
					</div>

					<div className="flex flex-wrap gap-2 mt-4 items-center">
						<span className="text-white/40 text-xs">Popular:</span>
						{[
							"Kensington",
							"Chelsea",
							"Shoreditch",
							"Canary Wharf",
							"Manchester",
							"Edinburgh",
						].map((tag) => (
							<button
								key={tag}
								onClick={() => setSearchQuery(tag)}
								className="text-white/60 text-xs border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Body */}
			<div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
				<div className="flex items-center justify-between mb-5">
					<span className="text-sm text-gray-500">
						<span className="font-semibold text-gray-800">
							{filtered.length}
						</span>{" "}
						properties found
					</span>

					<div className="flex items-center gap-3">
						<div className="relative">
							<select
								value={activeSort}
								onChange={(e) => setActiveSort(e.target.value)}
								className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#162050] cursor-pointer"
							>
								{sortOptions.map((o) => (
									<option key={o}>{o}</option>
								))}
							</select>
							<ChevronDown
								size={13}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
							/>
						</div>

						<div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#162050] text-white" : "text-gray-400 hover:text-gray-700"}`}
							>
								<Grid3X3 size={15} />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#162050] text-white" : "text-gray-400 hover:text-gray-700"}`}
							>
								<List size={15} />
							</button>
						</div>
					</div>
				</div>

				{filtered.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<Home size={48} className="text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg font-medium">
							No properties found
						</p>
						<p className="text-gray-400 text-sm mt-1">
							Try adjusting your filters above
						</p>
					</div>
				) : viewMode === "grid" ? (
					<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filtered.map((listing) => (
							<PropertyCard
								key={listing._id}
								listing={listing}
								liked={liked}
								setLiked={setLiked}
							/>
						))}
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{filtered.map((listing) => (
							<PropertyListRow
								key={listing._id}
								listing={listing}
								liked={liked}
								setLiked={setLiked}
							/>
						))}
					</div>
				)}
			</div>

			<Footer />
		</div>
	);
}
