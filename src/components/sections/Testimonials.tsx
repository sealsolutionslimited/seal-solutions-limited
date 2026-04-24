"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";

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
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;
		const onSelect = () => setCurrent(api.selectedScrollSnap());
		api.on("select", onSelect);
		api.on("reInit", onSelect);
		return () => {
			api.off("select", onSelect);
			api.off("reInit", onSelect);
		};
	}, [api]);

	// Auto-advance forward only — snap back to 0 instead of reverse-looping
	useEffect(() => {
		if (!api) return;
		const interval = setInterval(() => {
			if (api.canScrollNext()) {
				api.scrollNext();
			} else {
				api.scrollTo(0);
			}
		}, 4500);
		return () => clearInterval(interval);
	}, [api]);

	return (
		<section className="py-24 bg-cream overflow-hidden">
			<div className="max-w-7xl mx-auto px-6">
				{/* Heading */}
				<div className="text-center mb-16">
					<p className="section-label mb-3">Testimonials</p>
					<h2 className="text-4xl md:text-5xl font-bold text-navy gold-line-center">
						What Our Clients Say
					</h2>
				</div>

				{/* Carousel */}
				<div className="relative px-4 md:px-14">
					<Carousel
						setApi={setApi}
						opts={{ loop: false, align: "start" }}
						className="w-full"
					>
						<CarouselContent className="-ml-4 md:-ml-6">
							{testimonials.map((t, i) => (
								<CarouselItem
									key={i}
									className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
								>
									<div
										className="bg-white rounded-2xl p-8 h-full flex flex-col relative"
										style={{
											boxShadow:
												"0 8px 48px rgba(26,43,107,0.08)",
										}}
									>
										{/* Decorative quote */}
										<Quote
											className="absolute top-6 right-6 opacity-[0.06] text-navy"
											size={64}
											strokeWidth={1.5}
										/>

										{/* Stars */}
										<div className="flex gap-1 mb-5">
											{Array.from({
												length: t.rating,
											}).map((_, i) => (
												<Star
													key={i}
													size={16}
													className="fill-gold text-gold"
												/>
											))}
										</div>

										{/* Quote text */}
										<blockquote className="text-gray-600 text-[15px] leading-relaxed flex-1 mb-6">
											&ldquo;{t.text}&rdquo;
										</blockquote>

										{/* Author */}
										<div className="flex items-center gap-3 pt-5 border-t border-gray-100">
											<div
												className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
												style={{
													background:
														"linear-gradient(135deg, #1a2b6b, #2d4090)",
												}}
											>
												{t.initial}
											</div>
											<div>
												<p className="text-sm font-semibold text-navy leading-none mb-1">
													{t.name}
												</p>
												<p className="text-xs text-gray-400">
													{t.role} &bull; {t.location}
												</p>
											</div>
											<div
												className="ml-auto w-1.5 h-8 rounded-full"
												style={{
													background:
														"linear-gradient(to bottom, #c9a84c, #e8c97a)",
												}}
											/>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>

					{/* Prev button */}
					<button
						onClick={() => api?.scrollPrev()}
						className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-navy hover:bg-navy hover:text-white transition-all shadow-sm cursor-pointer"
					>
						<ChevronLeft size={18} />
					</button>

					{/* Next button */}
					<button
						onClick={() => api?.scrollNext()}
						className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-navy hover:bg-navy hover:text-white transition-all shadow-sm cursor-pointer"
					>
						<ChevronRight size={18} />
					</button>
				</div>

				{/* Dot indicators */}
				<div className="flex justify-center gap-2 mt-8">
					{testimonials.map((_, i) => (
						<button
							key={i}
							onClick={() => api?.scrollTo(i)}
							className={`rounded-full transition-all cursor-pointer ${
								i === current
									? "w-6 h-2 bg-navy"
									: "w-2 h-2 bg-gray-300 hover:bg-gray-400"
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
