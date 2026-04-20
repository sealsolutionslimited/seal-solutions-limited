"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

	return (
		<section
			id="how-it-works"
			ref={sectionRef}
			className="py-24 overflow-hidden bg-[#0b1535] relative"
		>
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
					backgroundSize: "40px 40px",
				}}
			/>

			<div className="absolute top-0 right-0 w-125 h-125 rounded-full opacity-[0.04] blur-3xl pointer-events-none bg-amber-400" />
			<div className="absolute bottom-0 left-0 w-75 h-75 rounded-full opacity-[0.05] blur-2xl pointer-events-none bg-amber-400" />

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left column */}
					<div>
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5 }}
							className="section-label mb-3 text-amber-400"
						>
							The Process
						</motion.p>

						<motion.h2
							initial={{ opacity: 0, y: 24 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-4xl md:text-5xl font-bold text-white mb-6 gold-line"
							style={{ fontFamily: "'Playfair Display', serif" }}
						>
							How Seal Solutions Works
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-white/60 text-base leading-relaxed max-w-md mt-6"
						>
							We&apos;ve streamlined the property journey so you
							can find, secure, or manage your real estate with
							confidence and clarity.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.35 }}
							className="mt-10 flex flex-col sm:flex-row gap-4"
						>
							<a
								href="#listings"
								className="bg-amber-400 hover:bg-amber-500 text-[#0b1535] text-sm font-bold tracking-wide px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center"
							>
								Browse Properties
							</a>
							<a
								href="#contact"
								className="border border-white/20 hover:border-amber-400/60 text-white hover:text-amber-400 text-sm font-medium tracking-wide px-6 py-3 rounded-lg transition-all duration-200 text-center"
							>
								Talk to an Agent
							</a>
						</motion.div>
					</div>

					{/* Right column */}
					<div className="flex flex-col gap-0">
						{steps.map((step, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: 40 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{
									duration: 0.55,
									delay: 0.2 + i * 0.13,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
								className="flex gap-5 group relative"
							>
								{i < steps.length - 1 && (
									<motion.div
										initial={{ scaleY: 0 }}
										animate={isInView ? { scaleY: 1 } : {}}
										transition={{
											duration: 0.4,
											delay: 0.35 + i * 0.13,
										}}
										className="absolute left-7 top-14 w-px bg-linear-to-b from-white/20 to-transparent origin-top"
										style={{
											height: "calc(100% - 3.5rem)",
										}}
									/>
								)}

								<div className="shrink-0 z-10">
									<motion.div
										whileHover={{ scale: 1.12, rotate: -3 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 18,
										}}
										className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.25)]"
										style={{
											fontFamily:
												"'Playfair Display', serif",
											background:
												i % 2 === 0
													? "linear-gradient(135deg, #f59e0b, #fbbf24)"
													: "rgba(255,255,255,0.07)",
											color:
												i % 2 === 0
													? "#0b1535"
													: "rgba(255,255,255,0.45)",
											border:
												i % 2 !== 0
													? "1px solid rgba(255,255,255,0.12)"
													: "none",
										}}
									>
										{step.number}
									</motion.div>
								</div>

								<div className="pb-8 pt-1">
									<h3
										className="text-white font-semibold text-lg mb-1.5 group-hover:text-amber-400 transition-colors duration-300"
										style={{
											fontFamily:
												"'Playfair Display', serif",
										}}
									>
										{step.title}
									</h3>
									<p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
										{step.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
