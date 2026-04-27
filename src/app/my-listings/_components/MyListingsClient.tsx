"use client";

import { PropertyListing } from "@/types/listings";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatToPounds } from "@/lib/helper";
import { tagColors } from "@/data/property";
import NavbarStatic from "@/components/layout/NavbarStatic";
import Footer from "@/components/layout/Footer";
import {
	Bath,
	Bed,
	Clock,
	CheckCircle2,
	XCircle,
	MapPin,
	Maximize,
	Plus,
	Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
	pending: {
		label: "Pending Review",
		icon: Clock,
		className: "bg-amber-50 text-amber-700 border-amber-200",
		iconClass: "text-amber-500",
	},
	active: {
		label: "Active",
		icon: CheckCircle2,
		className: "bg-emerald-50 text-emerald-700 border-emerald-200",
		iconClass: "text-emerald-500",
	},
	rejected: {
		label: "Rejected",
		icon: XCircle,
		className: "bg-red-50 text-red-700 border-red-200",
		iconClass: "text-red-500",
	},
} as const;

export default function MyListingsClient({
	listings,
}: {
	listings: PropertyListing[];
}) {
	return (
		<div
			className="min-h-screen flex flex-col"
			style={{
				backgroundColor: "#f8f7f4",
				fontFamily: "'DM Sans', sans-serif",
			}}
		>
			<NavbarStatic />

			{/* Header */}
			<div
				className="relative overflow-hidden bg-cover bg-center"
				style={{
					backgroundImage: "url('/bg-pic.png')",
					paddingTop: "72px",
				}}
			>
				<div className="absolute inset-0 bg-[#0b1535]/75" />
				<div
					className="absolute bottom-0 left-0 right-0 h-px"
					style={{
						background:
							"linear-gradient(90deg, transparent, #c9a84c, transparent)",
					}}
				/>
				<div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
					<div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
						<Link
							href="/"
							className="hover:text-white/70 transition-colors"
						>
							Home
						</Link>
						<span>/</span>
						<span className="text-white/60">My Listings</span>
					</div>
					<div className="flex items-end justify-between gap-4">
						<div>
							<h1
								className="text-white text-3xl md:text-4xl font-bold mb-1"
								style={{
									fontFamily: "'Playfair Display', serif",
								}}
							>
								My{" "}
								<span
									style={{
										color: "#e8c76a",
										fontStyle: "italic",
									}}
								>
									Listings
								</span>
							</h1>
							<p className="text-white/50 text-sm">
								{listings.length} listing
								{listings.length !== 1 ? "s" : ""} submitted
							</p>
						</div>
						<Link
							href="/list-property"
							className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0"
						>
							<Plus size={15} />
							New Listing
						</Link>
					</div>
				</div>
			</div>

			{/* Body */}
			<div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-4 md:py-8">
				{listings.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<Home size={48} className="text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg font-medium">
							No listings yet
						</p>
						<p className="text-gray-400 text-sm mt-1 mb-6">
							Submit your first property and we&apos;ll review it
							within 24 hours.
						</p>
						<Link
							href="/list-property"
							className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold text-sm px-6 py-3 rounded-xl transition-all"
						>
							<Plus size={15} />
							List a Property
						</Link>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{listings.map((listing) => (
							<ListingRow key={listing._id} listing={listing} />
						))}
					</div>
				)}
			</div>

			<Footer />
		</div>
	);
}

function ListingRow({ listing }: { listing: PropertyListing }) {
	const status = listing.status ?? "pending";
	const cfg =
		statusConfig[status as keyof typeof statusConfig] ??
		statusConfig.pending;
	const StatusIcon = cfg.icon;

	return (
		<div
			className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all"
			style={{ boxShadow: "0 4px 24px rgba(26,43,107,0.07)" }}
		>
			{/* Thumbnail */}
			<div className="relative w-full sm:w-52 shrink-0 h-44 sm:h-auto overflow-hidden">
				{listing.images?.[0] ? (
					<Image
						fill
						src={urlFor(listing.images[0]).url()}
						alt={listing.title ?? "Property"}
						className="object-cover"
						sizes="(max-width: 640px) 100vw, 208px"
					/>
				) : (
					<div className="w-full h-full bg-gray-100 flex items-center justify-center">
						<Home size={32} className="text-gray-300" />
					</div>
				)}
				{listing.tag && (
					<div className="absolute top-3 left-3">
						<span
							className={`text-xs font-bold px-2.5 py-0.5 rounded-full tracking-wide ${tagColors[listing.tag]}`}
						>
							{listing.tag}
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex-1 p-5 flex flex-col justify-between gap-3">
				<div>
					<div className="flex items-start justify-between gap-3 mb-1">
						<h3 className="font-semibold text-[#162050] text-base leading-tight line-clamp-2">
							{listing.title}
						</h3>
						{/* Status badge */}
						<span
							className={cn(
								"flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border shrink-0",
								cfg.className,
							)}
						>
							<StatusIcon size={12} className={cfg.iconClass} />
							{cfg.label}
						</span>
					</div>

					<div className="flex items-center gap-1 text-gray-400 text-sm">
						<MapPin size={13} className="text-amber-500 shrink-0" />
						<span>{listing.location}</span>
					</div>
				</div>

				<div className="flex items-center justify-between flex-wrap gap-3">
					<div className="flex items-center gap-4 text-xs text-gray-400">
						{listing.beds != null && (
							<span className="flex items-center gap-1.5">
								<Bed size={13} /> {listing.beds} Beds
							</span>
						)}
						{listing.baths != null && (
							<span className="flex items-center gap-1.5">
								<Bath size={13} /> {listing.baths} Baths
							</span>
						)}
						{listing.sqft && (
							<span className="flex items-center gap-1.5">
								<Maximize size={13} /> {listing.sqft}
							</span>
						)}
					</div>

					<div className="flex items-center gap-3">
						<span className="text-base font-bold text-[#162050]">
							{formatToPounds(listing.price ?? undefined)}
						</span>
						{status === "active" && (
							<Link
								href={`/properties/${listing._id}`}
								className="text-xs font-semibold text-[#162050] border border-[#162050] rounded-full px-4 py-1.5 hover:bg-[#162050] hover:text-white transition-all"
							>
								View Live
							</Link>
						)}
					</div>
				</div>

				{status === "pending" && (
					<p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
						Your listing is under review. We typically approve
						listings within 24 hours.
					</p>
				)}
				{status === "rejected" && (
					<p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 border border-red-100">
						This listing was not approved. Please contact support
						for more information.
					</p>
				)}
			</div>
		</div>
	);
}
