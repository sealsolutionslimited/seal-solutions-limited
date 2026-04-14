"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
	Search,
	MapPin,
	Building2,
	Home,
	TrendingUp,
	Star,
	Bath,
	BedDouble,
} from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PlaceResult {
	result: {
		name_1: string;
		county_unitary?: string;
		region_name?: string;
	}[];
}

interface SuggestionItem {
	label: string;
	sub: string;
}

const FEATURED_CARDS = [
	{
		title: "Chelsea Townhouse",
		price: "£3,200,000",
		beds: 4,
		baths: 3,
		tag: "For Sale",
		tagColor: "bg-emerald-500",
		icon: Home,
		delay: "0s",
		top: "8%",
		right: "2%",
		width: "260px",
	},
	{
		title: "Canary Wharf Flat",
		price: "£2,850 / mo",
		beds: 2,
		baths: 1,
		tag: "To Let",
		tagColor: "bg-blue-500",
		icon: Building2,
		delay: "0.4s",
		top: "42%",
		right: "10%",
		width: "240px",
	},
	{
		title: "Kensington Garden Apt",
		price: "£1,750,000",
		beds: 3,
		baths: 2,
		tag: "New",
		tagColor: "bg-amber-500",
		icon: Star,
		delay: "0.8s",
		top: "70%",
		right: "4%",
		width: "252px",
	},
];

const STAT_BADGES = [
	{
		label: "Avg. London Price",
		value: "£685k",
		top: "20%",
		left: "62%",
		delay: "0.2s",
	},
	{
		label: "Properties Listed",
		value: "12,400+",
		top: "55%",
		left: "58%",
		delay: "1s",
	},
];

export default function Hero() {
	const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");
	const [location, setLocation] = useState("");
	const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const router = useRouter();

	const fetchSuggestions = useCallback(async (query: string) => {
		if (query.length < 2) {
			setSuggestions([]);
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.postcodes.io/places?q=${encodeURIComponent(query)}&limit=8`,
			);
			const data: PlaceResult = await res.json();
			const items: SuggestionItem[] = (data.result || []).map((p) => ({
				label: p.name_1,
				sub: [p.county_unitary, p.region_name]
					.filter(Boolean)
					.join(", "),
			}));
			setSuggestions(items);
		} catch {
			setSuggestions([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			fetchSuggestions(location);
		}, 280);
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [location, fetchSuggestions]);

	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(135deg, #0b1535 0%, #162050 45%, #1e3070 100%)",
					}}
				/>
				<div className="absolute inset-0 opacity-[0.07]">
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
					className="absolute -top-40 -right-40 w-150 h-150 rounded-full opacity-[0.12]"
					style={{
						background:
							"radial-gradient(circle, #c9a84c, transparent 70%)",
					}}
				/>
				<div className="absolute bottom-0 left-0 right-0 opacity-[0.12]">
					<svg
						viewBox="0 0 1440 220"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="none"
						className="w-full"
					>
						<path
							d="M180,220 L180,100 L186,100 L186,85 L189,85 L189,75 L192,75 L192,70 L194,65 L196,70 L198,75 L201,75 L201,85 L204,85 L204,100 L210,100 L210,220 Z"
							fill="white"
						/>
						<rect
							x="185"
							y="60"
							width="20"
							height="4"
							fill="white"
						/>
						<path
							d="M120,220 L120,130 L175,130 L175,220 Z"
							fill="white"
						/>
						<path
							d="M130,130 L130,115 L165,115 L165,130 Z"
							fill="white"
						/>
						<path
							d="M0,220 L0,150 L50,150 L50,120 L70,120 L70,150 L110,150 L110,220 Z"
							fill="white"
						/>
						<path
							d="M900,220 L910,220 L940,60 L945,220 Z"
							fill="white"
						/>
						<path
							d="M1000,220 L1000,110 Q1010,85 1020,110 L1020,220 Z"
							fill="white"
						/>
						<path
							d="M1060,220 L1060,80 L1080,80 L1080,220 Z"
							fill="white"
						/>
						<path
							d="M1085,220 L1085,100 L1105,100 L1105,220 Z"
							fill="white"
						/>
						<path
							d="M1110,220 L1110,90 L1125,90 L1125,220 Z"
							fill="white"
						/>
						<path
							d="M0,220 L0,170 L50,170 L50,150 L220,150 L220,170 L300,170 L300,140 L350,140 L350,160 L420,160 L420,130 L470,130 L470,160 L530,160 L530,145 L580,145 L580,120 L620,120 L620,145 L680,145 L680,160 L750,160 L750,135 L800,135 L800,155 L860,155 L860,170 L890,170 L890,150 L960,150 L960,170 L1000,170 L1000,110 L1020,110 L1020,170 L1055,170 L1055,80 L1130,80 L1130,170 L1180,170 L1180,140 L1230,140 L1230,160 L1280,160 L1280,175 L1340,175 L1340,155 L1440,155 L1440,220 Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left column */}
					<div className="max-w-2xl">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
							<span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
							<span className="text-white/80 text-sm font-medium tracking-wide">
								The UK&apos;s Trusted Property Platform
							</span>
						</div>

						{/* Headline */}
						<h1
							className="text-white mb-6 leading-tight"
							style={{
								fontSize: "clamp(38px, 5.5vw, 70px)",
								fontFamily: "'Playfair Display', serif",
								fontWeight: 700,
							}}
						>
							Find Your{" "}
							<span
								style={{
									color: "#e8c76a",
									fontStyle: "italic",
								}}
							>
								Perfect
							</span>{" "}
							UK Property
						</h1>

						<p
							className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed"
							style={{ fontFamily: "'DM Sans', sans-serif" }}
						>
							Buy, rent, or sell properties with confidence. Seal
							Solutions connects you to premium real estate across
							London and the UK with expert guidance every step of
							the way.
						</p>

						{/* Search card */}
						<div className="bg-white rounded-2xl shadow-2xl overflow-visible">
							{/* Tabs */}
							<div className="flex border-b border-gray-100 rounded-t-2xl overflow-hidden">
								{(["buy", "rent"] as const).map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={cn(
											"flex-1 py-4 text-sm font-semibold uppercase tracking-widest transition-all cursor-pointer",
											activeTab === tab
												? "bg-[#162050] text-white"
												: "text-gray-500 hover:text-[#162050] hover:bg-gray-50",
										)}
										style={{
											fontFamily: "'DM Sans', sans-serif",
										}}
									>
										{tab}
									</button>
								))}
							</div>

							{/* Search fields */}
							<div className="p-5 flex flex-col md:flex-row gap-3 items-stretch">
								<Popover
									open={open && suggestions.length > 0}
									onOpenChange={setOpen}
								>
									<PopoverTrigger asChild>
										<div
											className={cn(
												"flex items-center gap-2 flex-1 border rounded-lg px-4 h-12 cursor-text transition-colors",
												open
													? "border-[#162050]"
													: "border-gray-200",
											)}
											onClick={() => setOpen(true)}
										>
											<MapPin
												size={18}
												className="text-amber-500 shrink-0"
											/>
											<input
												type="text"
												placeholder="Search by area, city or postcode..."
												value={location}
												onChange={(e) => {
													setLocation(e.target.value);
													setOpen(true);
												}}
												onFocus={() => setOpen(true)}
												className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
												style={{
													fontFamily:
														"'DM Sans', sans-serif",
												}}
											/>
											{loading && (
												<div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
											)}
										</div>
									</PopoverTrigger>
									<PopoverContent
										className="p-0 w-[320px]"
										align="start"
										sideOffset={6}
										onOpenAutoFocus={(e) =>
											e.preventDefault()
										}
									>
										<Command>
											<CommandList>
												<CommandEmpty className="py-3 px-4 text-sm text-gray-500">
													No locations found.
												</CommandEmpty>
												<CommandGroup heading="Suggestions">
													{suggestions.map((s, i) => (
														<CommandItem
															key={i}
															value={s.label}
															onSelect={() => {
																setLocation(
																	s.label,
																);
																setOpen(false);
															}}
															className="flex flex-col items-start gap-0.5 py-2.5"
														>
															<span className="font-medium text-sm text-gray-800">
																{s.label}
															</span>
															{s.sub && (
																<span className="text-xs text-gray-400">
																	{s.sub}
																</span>
															)}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>

								<Select defaultValue="all">
									<SelectTrigger
										className="min-w-37.5 h-12! border-gray-200 text-gray-700 focus:ring-[#162050] focus:border-[#162050]"
										style={{
											fontFamily: "'DM Sans', sans-serif",
										}}
									>
										<SelectValue placeholder="All Types" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">
											All Types
										</SelectItem>
										<SelectItem value="flat">
											Flat / Apartment
										</SelectItem>
										<SelectItem value="house">
											House
										</SelectItem>
										<SelectItem value="terraced">
											Terraced
										</SelectItem>
										<SelectItem value="detached">
											Detached
										</SelectItem>
										<SelectItem value="semi">
											Semi-Detached
										</SelectItem>
										<SelectItem value="commercial">
											Commercial
										</SelectItem>
										<SelectItem value="land">
											Land
										</SelectItem>
										<SelectItem value="bungalow">
											Bungalow
										</SelectItem>
									</SelectContent>
								</Select>

								<Button
									className="bg-[#162050] hover:bg-[#1e2e6e] text-white gap-2 px-6  h-12 rounded-lg font-semibold cursor-pointer"
									style={{
										fontFamily: "'DM Sans', sans-serif",
									}}
									onClick={() => router.push("/properties")}
								>
									<Search size={17} />
									Search
								</Button>
							</div>
						</div>

						<div className="flex flex-wrap gap-2 mt-5">
							<span className="text-white/50 text-sm mr-1 self-center">
								Popular:
							</span>
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
									className="text-white/70 text-sm border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
									onClick={() => setLocation(tag)}
								>
									{tag}
								</button>
							))}
						</div>
					</div>

					<div className="hidden lg:block relative h-140">
						<div
							className="absolute inset-0 opacity-20 pointer-events-none"
							style={{
								background:
									"radial-gradient(ellipse at 60% 40%, #c9a84c 0%, transparent 65%)",
							}}
						/>

						{FEATURED_CARDS.map((card, i) => {
							const Icon = card.icon;
							return (
								<div
									key={i}
									className="absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl"
									style={{
										top: card.top,
										right: card.right,
										width: card.width,
										animation: `floatCard 6s ease-in-out infinite`,
										animationDelay: card.delay,
									}}
								>
									<div className="flex items-start justify-between mb-3">
										<div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
											<Icon
												size={18}
												className="text-amber-300"
											/>
										</div>
										<span
											className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${card.tagColor}`}
										>
											{card.tag}
										</span>
									</div>
									<p className="text-white font-semibold text-sm mb-1 leading-snug">
										{card.title}
									</p>
									<p className="text-amber-300 font-bold text-base mb-3">
										{card.price}
									</p>
									<div className="flex gap-3">
										<span className="flex items-center gap-1 text-white/60 text-xs">
											<BedDouble size={12} />
											{card.beds} beds
										</span>
										<span className="flex items-center gap-1 text-white/60 text-xs">
											<Bath size={12} />
											{card.baths} baths
										</span>
									</div>
								</div>
							);
						})}

						{/* Stat badges */}
						{STAT_BADGES.map((badge, i) => (
							<div
								key={i}
								className="absolute bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3"
								style={{
									top: badge.top,
									left: badge.left,
									animation: `floatCard 7s ease-in-out infinite`,
									animationDelay: badge.delay,
								}}
							>
								<p className="text-white/50 text-xs mb-0.5">
									{badge.label}
								</p>
								<p className="text-white font-bold text-lg leading-none">
									{badge.value}
								</p>
							</div>
						))}

						{/* Trending badge */}
						<div
							className="absolute bottom-[18%] left-[5%] flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm rounded-full px-4 py-2"
							style={{
								animation: "floatCard 8s ease-in-out infinite",
								animationDelay: "1.2s",
							}}
						>
							<TrendingUp
								size={14}
								className="text-emerald-400"
							/>
							<span className="text-emerald-300 text-xs font-semibold">
								+12% YoY in London
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
				<div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
					<div className="w-1.5 h-3 bg-white/50 rounded-full" />
				</div>
			</div>

			{/* Float animation keyframes */}
			<style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
		</section>
	);
}
