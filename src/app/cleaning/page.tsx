import Link from "next/link";
import NavbarStatic from "@/components/layout/NavbarStatic";
import { SERVICE_TYPES, formatPrice } from "@/lib/cleaningPricing";
import {
	ArrowRight,
	CheckCircle,
	ShieldCheck,
	Star,
	Clock,
	Leaf,
	CalendarCheck,
	CreditCard,
	Sparkles,
} from "lucide-react";

const SERVICE_ICONS: Record<string, string> = {
	regularClean: "🧹",
	deepClean: "✨",
	endOfTenancy: "🏠",
	carpetClean: "🪣",
	ovenClean: "🔥",
};

const trustPoints = [
	{
		icon: ShieldCheck,
		title: "Fully Insured",
		body: "All our cleaners are background-checked, vetted, and fully insured for your peace of mind.",
	},
	{
		icon: Star,
		title: "Satisfaction Guarantee",
		body: "Not happy with the clean? We'll come back and re-clean for free, no questions asked.",
	},
	{
		icon: Leaf,
		title: "Eco-Friendly Products",
		body: "We use professional-grade, non-toxic, eco-friendly products that are safe for your family and pets.",
	},
	{
		icon: Clock,
		title: "Punctual & Reliable",
		body: "Our cleaners arrive on time, every time. You'll always get a reminder the day before.",
	},
];

const howItWorks = [
	{
		step: "01",
		icon: CalendarCheck,
		title: "Choose & Book",
		body: "Select your service, tell us about your property, pick a date and time that works for you.",
	},
	{
		step: "02",
		icon: CreditCard,
		title: "Secure Payment",
		body: "Pay safely online via card. No hidden fees — the price you see is exactly what you pay.",
	},
	{
		step: "03",
		icon: Sparkles,
		title: "We Clean",
		body: "A vetted professional arrives at your door and delivers a spotless, thorough clean.",
	},
];

export default function CleaningPage() {
	return (
		<>
			<NavbarStatic />
			<main className="min-h-screen bg-gray-50 pt-20">
				{/* ── Hero ── */}
				<section
					className="relative py-18 md:py-24 px-6 text-center bg-cover bg-center overflow-hidden"
					style={{ backgroundImage: "url('/bg-pic.png')" }}
				>
					<div className="absolute inset-0 bg-[#0b1535]/75" />
					<div className="relative max-w-3xl mx-auto">
						<span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
							Professional Cleaning Services
						</span>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
							A spotless home,{" "}
							<span className="text-amber-400">guaranteed.</span>
						</h1>
						<p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
							Vetted, insured, and reliable cleaners across
							London. Transparent pricing with no hidden fees —
							book in under 2 minutes.
						</p>
						<Link
							href="/cleaning/book"
							className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
						>
							Book a Clean
							<ArrowRight size={18} />
						</Link>
					</div>
				</section>

				{/* ── Trust bar ── */}
				<div className="bg-white border-b border-gray-100">
					<div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8">
						{[
							"✅ Background-checked cleaners",
							"🔒 Secure card payment",
							"♻️ Eco-friendly products",
							"⭐ Satisfaction guarantee",
						].map((item) => (
							<span
								key={item}
								className="text-sm font-medium text-gray-600"
							>
								{item}
							</span>
						))}
					</div>
				</div>

				{/* ── Services ── */}
				<section className="max-w-6xl mx-auto px-6 py-20">
					<div className="text-center mb-12">
						<span className="inline-block bg-amber-400/10 text-amber-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
							Our Services
						</span>
						<h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1535]">
							What we offer
						</h2>
						<p className="text-gray-500 mt-3 max-w-lg mx-auto">
							From regular upkeep to deep end-of-tenancy cleans —
							we have a service for every need.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{Object.entries(SERVICE_TYPES).map(([key, service]) => (
							<div
								key={key}
								className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
							>
								<div className="text-3xl">
									{SERVICE_ICONS[key]}
								</div>
								<div>
									<h3 className="text-lg font-bold text-[#0b1535] mb-1">
										{service.label}
									</h3>
									<p className="text-sm text-gray-500 leading-relaxed">
										{service.description}
									</p>
								</div>
								<div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
									<div>
										<span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
											From
										</span>
										<p className="text-2xl font-extrabold text-[#0b1535]">
											{formatPrice(service.basePrice)}
										</p>
									</div>
									<span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full font-medium">
										{service.duration}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-10">
						<Link
							href="/cleaning/book"
							className="inline-flex items-center gap-2 bg-[#0b1535] hover:bg-[#162050] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
						>
							Book Your Clean
							<ArrowRight size={15} />
						</Link>
					</div>
				</section>

				{/* ── How it works ── */}
				<section className="bg-[#0b1535] py-20 px-6">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
								Simple Process
							</span>
							<h2 className="text-3xl md:text-4xl font-extrabold text-white">
								How it works
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{howItWorks.map(
								({ step, icon: Icon, title, body }) => (
									<div key={step} className="text-center">
										<div className="flex justify-center mb-4">
											<div className="relative">
												<div className="w-16 h-16 bg-amber-400/10 rounded-2xl flex items-center justify-center">
													<Icon
														size={28}
														className="text-amber-400"
													/>
												</div>
												<span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full text-[#0b1535] text-xs font-extrabold flex items-center justify-center">
													{step.replace("0", "")}
												</span>
											</div>
										</div>
										<h3 className="text-lg font-bold text-white mb-2">
											{title}
										</h3>
										<p className="text-gray-400 text-sm leading-relaxed">
											{body}
										</p>
									</div>
								),
							)}
						</div>
					</div>
				</section>

				{/* ── Why choose us ── */}
				<section className="max-w-6xl mx-auto px-6 py-20">
					<div className="text-center mb-12">
						<span className="inline-block bg-amber-400/10 text-amber-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
							Why Seal Solutions
						</span>
						<h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1535]">
							You&apos;re in safe hands
						</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{trustPoints.map(({ icon: Icon, title, body }) => (
							<div
								key={title}
								className="flex gap-5 bg-white border border-gray-200 rounded-2xl p-7 shadow-sm"
							>
								<div className="p-3 bg-amber-50 rounded-xl h-fit shrink-0">
									<Icon
										size={22}
										className="text-amber-500"
									/>
								</div>
								<div>
									<h3 className="text-base font-bold text-[#0b1535] mb-1.5">
										{title}
									</h3>
									<p className="text-sm text-gray-500 leading-relaxed">
										{body}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* ── Pricing transparency ── */}
				<section className="bg-amber-50 border-y border-amber-100 py-14 px-6">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-2xl font-extrabold text-[#0b1535] mb-3">
							Transparent pricing always
						</h2>
						<p className="text-gray-600 mb-4">
							Our price calculator shows you the exact total
							before you pay. Pricing is based on your service,
							number of bedrooms and bathrooms, and any add-ons
							you choose. No surprises at checkout.
						</p>
						<div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
							{[
								"No call-out fees",
								"No hidden charges",
								"Pay only what you see",
							].map((item) => (
								<span
									key={item}
									className="flex items-center gap-1.5 bg-white border border-amber-200 px-4 py-2 rounded-full"
								>
									<CheckCircle
										size={14}
										className="text-amber-500"
									/>
									{item}
								</span>
							))}
						</div>
					</div>
				</section>

				{/* ── Bottom CTA ── */}
				<section className="bg-[#0b1535] py-20 px-6 text-center">
					<h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
						Ready for a spotless home?
					</h2>
					<p className="text-gray-300 mb-8 max-w-md mx-auto">
						Book in under 2 minutes. Our team will be in touch to
						confirm your cleaner within 2 hours of booking.
					</p>
					<Link
						href="/cleaning/book"
						className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold text-base px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
					>
						Book a Clean Now
						<ArrowRight size={18} />
					</Link>
				</section>
			</main>
		</>
	);
}
