"use client";
import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

export default function Hero() {
	const [activeTab, setActiveTab] = useState<"buy" | "rent" | "sell">("buy");
	const [location, setLocation] = useState("");
	const [type, setType] = useState("All Types");

	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 z-0">
				{/* Gradient sky */}
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(135deg, #0f1a45 0%, #1a2b6b 45%, #2d4090 100%)",
					}}
				/>
				{/* Geometric overlay */}
				<div className="absolute inset-0 opacity-10">
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
				{/* Decorative circles */}
				<div
					className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
					style={{
						background:
							"radial-gradient(circle, #c9a84c, transparent 70%)",
					}}
				/>
				<div
					className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-8"
					style={{
						background:
							"radial-gradient(circle, #2d4090, transparent 70%)",
					}}
				/>
				{/* Abstract building silhouettes */}
				<div className="absolute bottom-0 left-0 right-0 opacity-15">
					<svg
						viewBox="0 0 1440 200"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="none"
						className="w-full"
					>
						<path
							d="M0,200 L0,120 L60,120 L60,80 L80,80 L80,60 L100,60 L100,80 L120,80 L120,40 L160,40 L160,80 L180,80 L180,100 L240,100 L240,60 L280,60 L280,20 L320,20 L320,60 L380,60 L380,90 L440,90 L440,50 L500,50 L500,90 L560,90 L560,70 L600,70 L600,30 L640,30 L640,70 L700,70 L700,100 L760,100 L760,60 L820,60 L820,40 L860,40 L860,60 L920,60 L920,80 L980,80 L980,50 L1020,50 L1020,80 L1060,80 L1060,40 L1100,40 L1100,80 L1160,80 L1160,100 L1220,100 L1220,70 L1280,70 L1280,100 L1340,100 L1340,120 L1440,120 L1440,200 Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
				<div className="max-w-3xl">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
						<span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
						<span className="text-white/80 text-sm font-medium tracking-wide">
							Nigeria&apos;s Trusted Property Platform
						</span>
					</div>

					{/* Headline */}
					<h1
						className="text-white mb-6 leading-tight animate-fade-up"
						style={{
							fontSize: "clamp(42px, 7vw, 78px)",
							fontFamily: "'Playfair Display', serif",
							fontWeight: 700,
						}}
					>
						Find Your{" "}
						<span
							style={{
								color: "var(--gold-light)",
								fontStyle: "italic",
							}}
						>
							Perfect
						</span>{" "}
						Property
					</h1>

					<p
						className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed animate-fade-up-delay-1"
						style={{ fontFamily: "'DM Sans', sans-serif" }}
					>
						Buy, rent, or sell properties with confidence. Seal
						Solutions connects you to premium real estate across
						Nigeria with expert guidance every step of the way.
					</p>

					{/* Search card */}
					<div className="bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-up-delay-2">
						{/* Tabs */}
						<div className="flex border-b border-gray-100">
							{(["buy", "rent", "sell"] as const).map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`flex-1 py-4 text-sm font-semibold uppercase tracking-widest transition-all ${
										activeTab === tab
											? "bg-navy text-white"
											: "text-gray-500 hover:text-navy hover:bg-gray-50"
									}`}
									style={{
										fontFamily: "'DM Sans', sans-serif",
									}}
								>
									{tab}
								</button>
							))}
						</div>

						{/* Search fields */}
						<div className="p-5 flex flex-col md:flex-row gap-3">
							<div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[var(--navy)] transition-colors">
								<MapPin
									size={18}
									className="text-gold shrink-0"
								/>
								<input
									type="text"
									placeholder="Enter location, city or state..."
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
									className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
									style={{
										fontFamily: "'DM Sans', sans-serif",
									}}
								/>
							</div>

							<div className="relative flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-navy transition-colors min-w-[160px]">
								<select
									value={type}
									onChange={(e) => setType(e.target.value)}
									className="flex-1 outline-none text-sm text-gray-700 bg-transparent appearance-none cursor-pointer pr-6"
									style={{
										fontFamily: "'DM Sans', sans-serif",
									}}
								>
									<option>All Types</option>
									<option>Apartment</option>
									<option>House</option>
									<option>Commercial</option>
									<option>Land</option>
									<option>Duplex</option>
								</select>
								<ChevronDown
									size={16}
									className="absolute right-4 text-gray-400 pointer-events-none"
								/>
							</div>

							<button
								className="btn-primary flex items-center gap-2 justify-center"
								style={{ padding: "12px 28px" }}
							>
								<Search size={17} />
								Search
							</button>
						</div>
					</div>

					{/* Quick tags */}
					<div className="flex flex-wrap gap-2 mt-5 animate-fade-up-delay-3">
						<span className="text-white/50 text-sm mr-1">
							Popular:
						</span>
						{[
							"Lagos Island",
							"Lekki",
							"Victoria Island",
							"Abuja",
							"Port Harcourt",
						].map((tag) => (
							<button
								key={tag}
								className="text-white/70 text-sm border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
				<div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
					<div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
				</div>
			</div>
		</section>
	);
}
