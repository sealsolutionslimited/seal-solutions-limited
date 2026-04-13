"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
	{
		name: "Adaora Okonkwo",
		role: "Property Investor",
		location: "Lagos",
		rating: 5,
		text: "Seal Solutions found me three investment properties in Lekki within two months. Their market knowledge is unmatched and the entire process was seamless from search to signing.",
		initial: "A",
	},
	{
		name: "Emeka Nwosu",
		role: "First-Time Buyer",
		location: "Abuja",
		rating: 5,
		text: "As a first-time buyer I was nervous, but the team at Seal Solutions walked me through every step. They negotiated a brilliant price and handled all the documentation perfectly.",
		initial: "E",
	},
	{
		name: "Funke Adeyemi",
		role: "Landlord",
		location: "Victoria Island",
		rating: 5,
		text: "I've used their property management service for two years now. They handle everything — tenants, maintenance, rent collection. I haven't had a single problem since I signed with them.",
		initial: "F",
	},
	{
		name: "Chukwudi Eze",
		role: "Corporate Tenant",
		location: "Port Harcourt",
		rating: 5,
		text: "Relocating from the UK, I needed to find quality accommodation quickly. Seal Solutions arranged virtual tours and had me in a fully furnished apartment within a week of landing.",
		initial: "C",
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
				{/* Header */}
				<div className="text-center mb-16">
					<p className="section-label mb-3">Testimonials</p>
					<h2
						className="text-4xl md:text-5xl font-bold text-navy gold-line-center"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						What Our Clients Say
					</h2>
				</div>

				<div className="grid lg:grid-cols-5 gap-10 items-center">
					{/* Sidebar list */}
					<div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
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
					</div>

					{/* Main testimonial */}
					<div
						className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 relative"
						style={{ boxShadow: "0 8px 48px rgba(26,43,107,0.1)" }}
						key={index}
					>
						{/* Quote mark */}
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

						{/* Stars */}
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
								<div
									className="font-bold text-navy text-lg"
									style={{
										fontFamily: "'Playfair Display', serif",
									}}
								>
									{t.name}
								</div>
								<div className="text-sm text-gray-400">
									{t.role} &bull; {t.location}
								</div>
							</div>

							<div className="flex gap-2">
								<button
									onClick={prev}
									className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all text-gray-400"
								>
									<ChevronLeft size={16} />
								</button>
								<button
									onClick={next}
									className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all text-gray-400"
								>
									<ChevronRight size={16} />
								</button>
							</div>
						</div>

						{/* Progress dots */}
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
