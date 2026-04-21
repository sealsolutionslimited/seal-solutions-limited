import { tagColors } from "@/data/property";
import { Bath, Bed, Heart, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatToPounds } from "@/lib/helper";

export function PropertyListRow({
	listing,
	liked,
	setLiked,
}: {
	listing: Property;
	liked: string[];
	setLiked: React.Dispatch<React.SetStateAction<string[]>>;
}) {
	return (
		<div
			className="bg-white rounded-2xl overflow-hidden cursor-pointer group flex transition-all duration-300 hover:shadow-lg"
			style={{ boxShadow: "0 4px 24px rgba(26,43,107,0.07)" }}
		>
			{/* Image */}
			<div className="relative w-60 shrink-0 overflow-hidden">
				{listing.images?.[0] && (
					<Image
						fill
						src={urlFor(listing.images[0]).url()}
						alt={listing.title || "Property image"}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
				<div
					className="absolute bottom-0 left-0 right-0 h-0.5"
					style={{ background: "#c9a84c" }}
				/>
				<div className="absolute top-4 left-4">
					<span
						className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${
							tagColors[listing.tag || "For Sale"]
						}`}
					>
						{listing.tag}
					</span>
				</div>
				{listing.featured && (
					<div className="absolute top-4 left-28">
						<span className="text-xs font-bold px-3 py-1 rounded-full tracking-wide bg-amber-500 text-white">
							Featured
						</span>
					</div>
				)}
				<button
					onClick={(e) => {
						e.stopPropagation();
						setLiked((prev) =>
							prev.includes(listing._id)
								? prev.filter((id) => id !== listing._id)
								: [...prev, listing._id],
						);
					}}
					className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
				>
					<Heart
						size={15}
						className={
							liked.includes(listing._id)
								? "fill-red-500 text-red-500"
								: "text-white"
						}
					/>
				</button>
			</div>

			{/* Content */}
			<div className="flex-1 p-6 flex flex-col justify-between">
				<div>
					<h3
						className="font-semibold text-[#162050] text-lg leading-tight mb-1 group-hover:text-amber-600 transition-colors"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						{listing.title}
					</h3>
					<div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
						<MapPin size={13} className="text-amber-500 shrink-0" />
						<span>{listing.location}</span>
					</div>
					<div className="flex items-center gap-5 text-sm text-gray-400">
						<span className="flex items-center gap-1.5">
							<Bed size={14} className="text-[#162050]/50" />
							{listing.beds} Beds
						</span>
						<span className="flex items-center gap-1.5">
							<Bath size={14} className="text-[#162050]/50" />
							{listing.baths} Baths
						</span>
						<span className="flex items-center gap-1.5">
							<Maximize size={14} className="text-[#162050]/50" />
							{listing.sqft}
						</span>
						{listing.type && (
							<span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-500">
								{listing.type}
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
					<span
						className="text-2xl font-bold text-[#162050]"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						{formatToPounds(listing.price)}
					</span>
					<Link
						href={`/properties/${listing._id}`}
						className="text-sm font-semibold text-[#162050] border border-[#162050] rounded-full px-5 py-2 hover:bg-[#162050] hover:text-white transition-all"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
}
