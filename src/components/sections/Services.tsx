import { Home, Key, BarChart3, Shield, Wrench } from "lucide-react";

const services = [
	{
		icon: Home,
		title: "Property Sales",
		description:
			"We connect motivated buyers with premium properties, handling negotiations, documentation, and closing with expert precision.",
	},
	{
		icon: Key,
		title: "Lettings & Rentals",
		description:
			"From tenant sourcing to lease agreements, we manage the full rental process to maximise your yield and minimise vacancy.",
	},
	{
		icon: Shield,
		title: "Property Management",
		description:
			"Full-service management including rent collection, maintenance coordination, and tenant relations — hands-off ownership for you.",
	},
	{
		icon: BarChart3,
		title: "Valuation & Advisory",
		description:
			"Expert market valuations and strategic investment advice grounded in deep local knowledge and real-time market data.",
	},
	{
		icon: Wrench,
		title: "Facility Management",
		description:
			"Routine inspections, maintenance scheduling, repairs, and contractor management to keep your property in peak condition.",
	},
];

export default function Services() {
	return (
		<section id="services" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-16">
					<p className="section-label mb-3">What We Offer</p>
					<h2 className="text-4xl md:text-5xl font-bold text-navy mb-5 gold-line-center">
						Full-Spectrum Property Services
					</h2>
					<p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed mt-6">
						Whether you&apos;re buying, selling, or investing, Seal
						Solutions delivers end-to-end real estate services
						tailored to your goals.
					</p>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
					{services.map((service, i) => {
						const Icon = service.icon;
						return (
							<div
								key={i}
								className="group p-7 rounded-2xl border border-gray-100 hover:border-navy/20 card-hover cursor-pointer relative overflow-hidden"
								style={{
									background:
										"linear-gradient(145deg, #ffffff 0%, #f8f5f0 100%)",
								}}
							>
								{/* Hover bg */}
								<div className="absolute inset-0 bg-linear-to-br from-navy to-navy-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

								<div className="relative z-10">
									{/* Icon */}
									<div className="w-14 h-14 rounded-xl bg-navy/8 group-hover:bg-white/15 flex items-center justify-center mb-5 transition-colors">
										<Icon
											size={24}
											className="text-navy group-hover:text-gold-light transition-colors"
										/>
									</div>

									<h3 className="text-xl font-bold text-navy group-hover:text-white mb-3 transition-colors">
										{service.title}
									</h3>
									<p className="text-gray-500 group-hover:text-white/75 text-sm leading-relaxed transition-colors">
										{service.description}
									</p>

									{/* <div className="mt-5 flex items-center gap-1 text-gold group-hover:text-gold-light text-sm font-semibold transition-colors">
										Learn more
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											className="group-hover:translate-x-1 transition-transform"
										>
											<path
												d="M1 7h12M7 1l6 6-6 6"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div> */}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
