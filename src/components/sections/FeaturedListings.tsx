"use client";
import { categoryTabs, listings } from "@/data/property";
import { useState } from "react";
import { PropertyCard } from "../shared/PropertyCard";
import { ChevronRight } from "lucide-react";

export default function FeaturedListings() {
	const [active, setActive] = useState("All");
	const [liked, setLiked] = useState<number[]>([]);

	const filtered =
		active === "All" ? listings : listings.filter((l) => l.tag === active);

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

				<div className="flex flex-wrap gap-2 mb-10">
					{categoryTabs.map((cat) => (
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

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
					{filtered.map((listing) => (
						<PropertyCard
							key={listing.id}
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
