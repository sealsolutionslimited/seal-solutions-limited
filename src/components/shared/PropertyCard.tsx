import { tagColors } from "@/data/property";
import { Property } from "../../../sanity.types";
import { Bath, Bed, Heart, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatToPounds } from "@/lib/helper";
import Link from "next/link";

export function PropertyCard({
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
			className="bg-white rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
			style={{ boxShadow: "0 4px 24px rgba(26,43,107,0.07)" }}
		>
			<div className="relative h-52 overflow-hidden">
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

			<div className="p-5 flex flex-col flex-1">
				<h3 className="font-semibold text-[#162050] text-base leading-tight mb-1 group-hover:text-amber-600 transition-colors">
					{listing.title}
				</h3>

				<div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
					<MapPin size={13} className="text-amber-500 shrink-0" />
					<span>{listing.location}</span>
				</div>

				<div className="flex items-center gap-4 text-sm text-gray-400 pb-4 border-b border-gray-100 mt-auto">
					<span className="flex items-center gap-1.5 text-xs">
						<Bed size={14} />
						{listing.beds} Beds
					</span>

					<span className="flex items-center gap-1.5 text-xs">
						<Bath size={14} />
						{listing.baths} Baths
					</span>

					<span className="flex items-center gap-1.5 text-xs">
						<Maximize size={14} />
						{listing.sqft}
					</span>
				</div>

				<div className="flex items-center justify-between pt-4">
					<span className="text-base font-bold text-[#162050]">
						{formatToPounds(listing.price)}
					</span>

					{/* <button className="cursor-pointer text-xs font-semibold text-[#162050] border border-[#162050] rounded-full px-4 py-2 hover:bg-[#162050] hover:text-white transition-all">
						View Details
					</button> */}
					<Link
						href={`/properties/${listing._id}`}
						className="text-xs font-semibold text-[#162050] border border-[#162050] rounded-full px-4 py-2 hover:bg-[#162050] hover:text-white transition-all"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
}
