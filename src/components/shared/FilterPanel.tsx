import { bedroomOptions, priceRanges, propertyTypes } from "@/data/property";
import { Building2, Castle, Home, Trees } from "lucide-react";

export function FilterPanel({
	activeType,
	setActiveType,
	activePriceRange,
	setActivePriceRange,
	activeBeds,
	setActiveBeds,
	onClear,
}: {
	activeType: string;
	setActiveType: (v: string) => void;
	activePriceRange: string;
	setActivePriceRange: (v: string) => void;
	activeBeds: string;
	setActiveBeds: (v: string) => void;
	onClear: () => void;
}) {
	return (
		<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-[#162050] text-sm uppercase tracking-wider">
					Filters
				</h3>
				<button
					onClick={onClear}
					className="text-xs text-amber-500 hover:text-amber-600 font-semibold"
				>
					Clear all
				</button>
			</div>

			{/* Property Type */}
			<div>
				<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
					Property Type
				</p>
				<div className="space-y-1.5">
					{propertyTypes.map((t) => (
						<button
							key={t}
							onClick={() => setActiveType(t)}
							className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeType === t ? "bg-[#162050] text-white font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
						>
							{t}
						</button>
					))}
				</div>
			</div>

			{/* Price Range */}
			<div>
				<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
					Price Range
				</p>
				<div className="space-y-1.5">
					{priceRanges.map((r) => (
						<button
							key={r}
							onClick={() => setActivePriceRange(r)}
							className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activePriceRange === r ? "bg-[#162050] text-white font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
						>
							{r}
						</button>
					))}
				</div>
			</div>

			{/* Bedrooms */}
			<div>
				<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
					Bedrooms
				</p>
				<div className="flex flex-wrap gap-2">
					{bedroomOptions.map((b) => (
						<button
							key={b}
							onClick={() => setActiveBeds(b)}
							className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeBeds === b ? "bg-[#162050] text-white border-[#162050]" : "border-gray-200 text-gray-600 hover:border-[#162050]"}`}
						>
							{b}
						</button>
					))}
				</div>
			</div>

			{/* Quick Links */}
			<div className="border-t border-gray-100 pt-4 space-y-2">
				<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
					Browse By
				</p>
				{[
					{ icon: <Building2 size={14} />, label: "City Apartments" },
					{ icon: <Home size={14} />, label: "Family Homes" },
					{ icon: <Trees size={14} />, label: "Rural Properties" },
					{ icon: <Castle size={14} />, label: "Luxury Estates" },
				].map(({ icon, label }) => (
					<button
						key={label}
						className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#162050] transition-colors w-full"
					>
						<span className="text-amber-500">{icon}</span>
						{label}
					</button>
				))}
			</div>
		</div>
	);
}
