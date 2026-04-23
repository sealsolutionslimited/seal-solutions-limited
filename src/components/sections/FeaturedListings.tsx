"use client";
import { categoryTabs } from "@/data/property";
import { useState } from "react";
import { PropertyCard } from "../shared/PropertyCard";
import { ChevronRight } from "lucide-react";
import { Property } from "../../../sanity.types";
import Link from "next/link";

interface FeaturedListingsProps {
	properties: Property[];
}

export default function FeaturedListings({
	properties,
}: FeaturedListingsProps) {
	const [active, setActive] = useState("All");
	const [liked, setLiked] = useState<string[]>([]);

	const filtered =
		active === "All"
			? properties
			: properties.filter((property) => property.tag === active);

	const featuredProperties = filtered.slice(0, 8);

	return (
		<section id="listings" className="py-24 bg-cream">
			<div className="max-w-7xl mx-auto px-6">
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
					<Link
						href="/properties"
						className="mt-6 md:mt-0 flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold transition-colors group"
					>
						View All Properties
						<ChevronRight
							size={16}
							className="group-hover:translate-x-1 transition-transform"
						/>
					</Link>
				</div>

				<div className="flex flex-wrap gap-2 mb-10">
					{categoryTabs.map((cat) => (
						<button
							key={cat}
							onClick={() => setActive(cat)}
							className={`px-5 py-2 cursor-pointer rounded-full text-sm font-semibold transition-all ${
								active === cat
									? "bg-navy text-white shadow-md"
									: "bg-white text-gray-600 hover:bg-navy/5"
							}`}
						>
							{cat}
						</button>
					))}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
					{featuredProperties.map((listing) => (
						<PropertyCard
							key={listing._id}
							listing={listing}
							liked={liked}
							setLiked={setLiked}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
