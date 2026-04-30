"use client";
import { useState } from "react";
import { Search, MapPin, X, Grid3X3, List, Home } from "lucide-react";
import Link from "next/link";
import { sortOptions } from "@/data/property";
import { priceMatchesRange } from "@/lib/helper";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { PropertyListRow } from "@/components/shared/PropertyListRow";
import NavbarStatic from "@/components/layout/NavbarStatic";
import Footer from "@/components/layout/Footer";
import { PropertyListing } from "@/types/listings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
		if (!priceMatchesRange(p.price ?? undefined, activePriceRange))
			return false;
		if (activeBeds !== "Any Beds") {
			const minBeds = parseInt(activeBeds);
			if ((p.beds ?? 0) < minBeds) return false;
		}
		if (searchQuery) {
			const q = searchQuery.toLowerCase().replace(/\s/g, "");
			const matchesLocation = p.location
				?.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesTitle = p.title
				?.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesPostcode = p.postcode
				?.toLowerCase()
				.replace(/\s/g, "")
				.includes(q);
			if (!matchesLocation && !matchesTitle && !matchesPostcode)
				return false;
		}
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
				className="relative overflow-hidden md:px-10"
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
						<div className="p-4 flex flex-col gap-3">
							{/* Buy / Rent toggle */}
							<div className="flex bg-gray-100 rounded-full p-1 self-start">
								{(["Buy", "Rent"] as const).map((tab) => (
									<button
										key={tab}
										onClick={() =>
											setActiveCategory(
												tab === "Buy"
													? "For Sale"
													: "For Rent",
											)
										}
										className={cn(
											"px-5 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all cursor-pointer",
											(tab === "Buy" &&
												activeCategory ===
													"For Sale") ||
												(tab === "Rent" &&
													activeCategory ===
														"For Rent")
												? "bg-[#162050] text-white shadow-sm"
												: "text-gray-500 hover:text-gray-700",
										)}
									>
										{tab}
									</button>
								))}
							</div>

							{/* Filters row */}
							<div className="flex flex-col md:flex-row gap-3 items-stretch">
								{/* Location */}
								<div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 h-11 min-h-11 focus-within:border-[#162050] focus-within:ring-2 focus-within:ring-[#162050]/20 transition-colors min-w-0 bg-white">
									<MapPin
										size={16}
										className="text-amber-500 shrink-0"
									/>
									<Input
										type="text"
										placeholder="Area, city or postcode…"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										className="flex-1 border-0 shadow-none ring-0 focus-visible:ring-0 p-0 h-auto text-sm placeholder:text-gray-400 bg-transparent"
									/>
									{searchQuery && (
										<button
											onClick={() => setSearchQuery("")}
										>
											<X
												size={13}
												className="text-gray-400 hover:text-gray-600"
											/>
										</button>
									)}
								</div>

								{/* Property type */}
								<Select
									value={activeType}
									onValueChange={setActiveType}
								>
									<SelectTrigger className="h-11 border-gray-200 focus:ring-[#162050]/20 focus:border-[#162050] w-full md:w-auto text-sm text-gray-700 cursor-pointer">
										<SelectValue placeholder="All Types" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="All Types">
											All Types
										</SelectItem>
										<SelectItem value="Flat / Apartment">
											Flat / Apartment
										</SelectItem>
										<SelectItem value="House">
											House
										</SelectItem>
										<SelectItem value="Terraced">
											Terraced
										</SelectItem>
										<SelectItem value="Detached">
											Detached
										</SelectItem>
										<SelectItem value="Semi-Detached">
											Semi-Detached
										</SelectItem>
										<SelectItem value="Commercial">
											Commercial
										</SelectItem>
										<SelectItem value="Land">
											Land
										</SelectItem>
									</SelectContent>
								</Select>

								{/* Bedrooms */}
								<Select
									value={activeBeds}
									onValueChange={setActiveBeds}
								>
									<SelectTrigger className="h-11 border-gray-200 focus:ring-[#162050]/20 focus:border-[#162050] w-full md:w-auto text-sm text-gray-700 cursor-pointer">
										<SelectValue placeholder="Any Beds" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Any Beds">
											Any Beds
										</SelectItem>
										<SelectItem value="1+ Beds">
											1+ Beds
										</SelectItem>
										<SelectItem value="2+ Beds">
											2+ Beds
										</SelectItem>
										<SelectItem value="3+ Beds">
											3+ Beds
										</SelectItem>
										<SelectItem value="4+ Beds">
											4+ Beds
										</SelectItem>
										<SelectItem value="5+ Beds">
											5+ Beds
										</SelectItem>
									</SelectContent>
								</Select>

								{/* Price range */}
								<Select
									value={activePriceRange}
									onValueChange={setActivePriceRange}
								>
									<SelectTrigger className="h-11 border-gray-200 focus:ring-[#162050]/20 focus:border-[#162050] w-full md:w-auto text-sm text-gray-700 cursor-pointer">
										<SelectValue placeholder="Any Price" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Any Price">
											Any Price
										</SelectItem>
										<SelectItem value="Under £500k">
											Under £500k
										</SelectItem>
										<SelectItem value="£500k – £1M">
											£500k – £1M
										</SelectItem>
										<SelectItem value="£1M – £2M">
											£1M – £2M
										</SelectItem>
										<SelectItem value="£2M+">
											£2M+
										</SelectItem>
									</SelectContent>
								</Select>

								<Button className="h-11 px-7 bg-gold hover:bg-[#b8963e] text-white font-semibold text-sm gap-2 shrink-0 cursor-pointer w-full md:w-auto rounded-lg">
									<Search size={16} />
									Search
								</Button>
							</div>
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
						<Select
							value={activeSort}
							onValueChange={setActiveSort}
						>
							<SelectTrigger className="h-9 bg-white border-gray-200 focus:ring-[#162050]/20 focus:border-[#162050] text-sm text-gray-700 cursor-pointer">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{sortOptions.map((o) => (
									<SelectItem key={o} value={o}>
										{o}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<div className="hidden sm:flex bg-white border border-gray-200 rounded-lg overflow-hidden">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 transition-colors cursor-pointer ${viewMode === "grid" ? "bg-[#162050] text-white" : "text-gray-400 hover:text-gray-700"}`}
							>
								<Grid3X3 size={15} />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 transition-colors cursor-pointer ${viewMode === "list" ? "bg-[#162050] text-white" : "text-gray-400 hover:text-gray-700"}`}
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
				) : viewMode === "list" ? (
					<>
						{/* Mobile: always grid */}
						<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 sm:hidden">
							{filtered.map((listing) => (
								<PropertyCard
									key={listing._id}
									listing={listing}
									liked={liked}
									setLiked={setLiked}
								/>
							))}
						</div>
						{/* Desktop: list view */}
						<div className="hidden sm:flex flex-col gap-4">
							{filtered.map((listing) => (
								<PropertyListRow
									key={listing._id}
									listing={listing}
									liked={liked}
									setLiked={setLiked}
								/>
							))}
						</div>
					</>
				) : (
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
				)}
			</div>

			<Footer />
		</div>
	);
}
