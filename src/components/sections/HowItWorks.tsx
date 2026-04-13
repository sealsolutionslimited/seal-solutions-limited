const steps = [
	{
		number: "01",
		title: "Tell Us What You Need",
		description:
			"Share your property goals — buying, renting, selling, or investing. Our team takes time to understand your unique requirements.",
	},
	{
		number: "02",
		title: "We Curate Your Options",
		description:
			"Our experts handpick matched properties or qualified buyers/tenants from our extensive verified database across Nigeria.",
	},
	{
		number: "03",
		title: "View & Evaluate",
		description:
			"Schedule in-person or virtual tours at your convenience. We provide detailed reports and comparative market analysis.",
	},
	{
		number: "04",
		title: "Seal the Deal",
		description:
			"From negotiations to documentation, we handle every detail — including legal verification and smooth transaction close.",
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="py-24 overflow-hidden bg-navy">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left */}
					<div>
						<p className="section-label mb-3">The Process</p>
						<h2
							className="text-4xl md:text-5xl font-bold text-white mb-6 gold-line"
							style={{ fontFamily: "'Playfair Display', serif" }}
						>
							How Seal Solutions Works
						</h2>
						<p className="text-white/60 text-base leading-relaxed max-w-md mt-6">
							We&apos;ve streamlined the property journey so you
							can find, secure, or manage your real estate with
							confidence and clarity.
						</p>

						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							<a href="#listings" className="btn-gold">
								Browse Properties
							</a>
							<a
								href="#contact"
								className="btn-outline"
								style={{
									color: "white",
									borderColor: "rgba(255,255,255,0.3)",
								}}
							>
								Talk to an Agent
							</a>
						</div>
					</div>

					{/* Right - steps */}
					<div className="flex flex-col gap-6">
						{steps.map((step, i) => (
							<div key={i} className="flex gap-5 group">
								<div className="shrink-0 relative">
									<div
										className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold transition-all group-hover:scale-110"
										style={{
											fontFamily:
												"'Playfair Display', serif",
											background:
												i % 2 === 0
													? "var(--gold)"
													: "rgba(255,255,255,0.1)",
											color:
												i % 2 === 0
													? "white"
													: "rgba(255,255,255,0.5)",
										}}
									>
										{step.number}
									</div>
									{i < steps.length - 1 && (
										<div className="absolute left-1/2 top-14 bottom-0 w-px bg-white/10 translate-x-[-50%] h-6" />
									)}
								</div>

								{/* Content */}
								<div className="pb-4">
									<h3
										className="text-white font-semibold text-lg mb-1 group-hover:text-gold-light transition-colors"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										{step.title}
									</h3>
									<p className="text-white/55 text-sm leading-relaxed">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
