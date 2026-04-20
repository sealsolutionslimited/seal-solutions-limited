"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
	{
		name: "James Walker",
		role: "Property Investor",
		location: "London",
		rating: 5,
		text: "Seal Solutions helped me secure two buy-to-let properties in East London within a short timeframe. Their understanding of the market and attention to detail made the entire process straightforward.",
		initial: "J",
	},
	{
		name: "Emily Carter",
		role: "First-Time Buyer",
		location: "Manchester",
		rating: 5,
		text: "Buying my first home felt overwhelming at first, but the team guided me through every step. From viewings to completion, everything was handled professionally and efficiently.",
		initial: "E",
	},
	{
		name: "Oliver Bennett",
		role: "Landlord",
		location: "Birmingham",
		rating: 5,
		text: "I've been using their property management service for over a year now. They take care of tenants, maintenance, and compliance, which has made being a landlord completely stress-free.",
		initial: "O",
	},
	{
		name: "Sophia Hughes",
		role: "Corporate Tenant",
		location: "London",
		rating: 5,
		text: "Relocating for work meant I needed a place quickly. Seal Solutions arranged virtual viewings and secured a fully furnished flat for me before I even arrived in the UK.",
		initial: "S",
	},
];

export default function Testimonials() {
	const [index, setIndex] = useState(0);

	const prev = () =>
		setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
	const next = () => setIndex((i) => (i + 1) % testimonials.length);

	const t = testimonials[index];

	return (
		<section className="py-24 bg-cream">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<p className="section-label mb-3">Testimonials</p>
					<h2 className="text-4xl md:text-5xl font-bold text-navy gold-line-center">
						What Our Clients Say
					</h2>
				</div>

				<div className="grid lg:grid-cols-5 gap-10 items-center">
					{/* <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
						{testimonials.map((t, i) => (
							<button
								key={i}
								onClick={() => setIndex(i)}
								className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all w-full ${
									i === index
										? "bg-[var(--navy shadow-lg"
										: "bg-white hover:bg-navy/5"
								}`}
							>
								<div
									className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
									style={{
										background:
											i === index
												? "var(--gold)"
												: "var(--navy)/10",
										color:
											i === index
												? "white"
												: "var(--navy)",
										fontFamily: "'Playfair Display', serif",
										backgroundColor:
											i === index
												? "var(--gold)"
												: "#e8e4f0",
									}}
								>
									{t.initial}
								</div>
								<div className="hidden sm:block">
									<div
										className={`text-sm font-semibold ${i === index ? "text-white" : "text-navy"}`}
									>
										{t.name}
									</div>
									<div
										className={`text-xs ${i === index ? "text-white/60" : "text-gray-400"}`}
									>
										{t.role}
									</div>
								</div>
							</button>
						))}
					</div> */}
					<div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
						{testimonials.map((t, i) => (
							<button
								key={i}
								onClick={() => setIndex(i)}
								className={`flex cursor-pointer items-center gap-3 p-3 rounded-xl text-left transition-all w-full ${
									i === index
										? "bg-navy shadow-lg"
										: "bg-white hover:bg-navy/5"
								}`}
							>
								<div
									className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
									style={{
										backgroundColor:
											i === index
												? "var(--color-gold)"
												: "#dde1ef",
										color:
											i === index
												? "white"
												: "var(--color-navy)",
									}}
								>
									{t.initial}
								</div>
								<div className="hidden sm:block">
									<div
										className={`text-sm font-semibold ${i === index ? "text-white" : "text-navy"}`}
									>
										{t.name}
									</div>
									<div
										className={`text-xs ${i === index ? "text-white/60" : "text-gray-400"}`}
									>
										{t.role}
									</div>
								</div>
							</button>
						))}
					</div>

					<div
						className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 relative"
						style={{ boxShadow: "0 8px 48px rgba(26,43,107,0.1)" }}
						key={index}
					>
						<div
							className="absolute top-6 right-8 text-8xl leading-none font-serif opacity-8"
							style={{
								color: "var(--gold)",
								opacity: 0.08,
								fontFamily: "'Playfair Display', serif",
								fontSize: "120px",
							}}
						>
							&ldquo;
						</div>

						<div className="flex gap-1 mb-6">
							{Array.from({ length: t.rating }).map((_, i) => (
								<Star
									key={i}
									size={18}
									className="fill-gold text-gold"
								/>
							))}
						</div>

						<blockquote
							className="text-gray-700 text-lg leading-relaxed mb-8"
							style={{ fontFamily: "'DM Sans', sans-serif" }}
						>
							&ldquo;{t.text}&rdquo;
						</blockquote>

						<div className="flex items-center justify-between">
							<div>
								<div className="font-bold text-navy text-lg">
									{t.name}
								</div>
								<div className="text-sm text-gray-400">
									{t.role} &bull; {t.location}
								</div>
							</div>

							<div className="flex gap-2">
								<button
									onClick={prev}
									className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all text-gray-400 cursor-pointer"
								>
									<ChevronLeft size={16} />
								</button>
								<button
									onClick={next}
									className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all text-gray-400 cursor-pointer"
								>
									<ChevronRight size={16} />
								</button>
							</div>
						</div>

						<div className="flex gap-2 mt-6">
							{testimonials.map((_, i) => (
								<div
									key={i}
									className={`rounded-full transition-all ${i === index ? "w-6 h-2 bg-navy" : "w-2 h-2 bg-gray-200"}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
