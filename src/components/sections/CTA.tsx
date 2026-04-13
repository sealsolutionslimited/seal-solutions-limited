"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function CTA() {
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({ name: "", phone: "", interest: "Buy" });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<section
			id="contact"
			className="py-24 relative overflow-hidden"
			style={{
				background:
					"linear-gradient(135deg, #0f1a45 0%, #1a2b6b 60%, #2d4090 100%)",
			}}
		>
			{/* Decorative elements */}
			<div
				className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
				style={{
					background:
						"radial-gradient(circle, #c9a84c, transparent 70%)",
				}}
			/>
			<div
				className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
				style={{
					background:
						"radial-gradient(circle, #4060b0, transparent 70%)",
				}}
			/>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left */}
					<div>
						<p
							className="section-label mb-3"
							style={{ color: "var(--gold)" }}
						>
							Get In Touch
						</p>
						<h2
							className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
							style={{ fontFamily: "'Playfair Display', serif" }}
						>
							Ready to Find Your Dream Property?
						</h2>
						<p className="text-white/60 text-base leading-relaxed max-w-md mb-8">
							Let our expert agents guide you through
							Nigeria&apos;s property market. Drop your details
							and we&apos;ll be in touch within 24 hours.
						</p>

						<div className="flex flex-col gap-4">
							{[
								{
									icon: "📍",
									text: "12 Admiralty Way, Lekki Phase 1, Lagos",
								},
								{ icon: "📞", text: "+234 123 456 7890" },
								{ icon: "✉️", text: "hello@sealsolutions.ng" },
							].map((item, i) => (
								<div
									key={i}
									className="flex items-center gap-3 text-white/70 text-sm"
								>
									<span className="text-base">
										{item.icon}
									</span>
									{item.text}
								</div>
							))}
						</div>
					</div>

					{/* Right - Form */}
					<div
						className="bg-white rounded-2xl p-8 md:p-10"
						style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
					>
						{submitted ? (
							<div className="text-center py-8">
								<CheckCircle
									size={52}
									className="text-green-500 mx-auto mb-4"
								/>
								<h3
									className="text-2xl font-bold text-navy mb-2"
									style={{
										fontFamily: "'Playfair Display', serif",
									}}
								>
									Message Received!
								</h3>
								<p className="text-gray-500 text-sm">
									Thank you, {form.name}. One of our agents
									will reach out within 24 hours.
								</p>
							</div>
						) : (
							<>
								<h3
									className="text-2xl font-bold text-navy mb-6"
									style={{
										fontFamily: "'Playfair Display', serif",
									}}
								>
									Request a Callback
								</h3>

								<form
									onSubmit={handleSubmit}
									className="flex flex-col gap-4"
								>
									<div>
										<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
											Full Name
										</label>
										<input
											type="text"
											required
											value={form.name}
											onChange={(e) =>
												setForm({
													...form,
													name: e.target.value,
												})
											}
											placeholder="e.g. Adaora Okonkwo"
											className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy transition-colors"
											style={{
												fontFamily:
													"'DM Sans', sans-serif",
											}}
										/>
									</div>

									<div>
										<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
											Phone Number
										</label>
										<input
											type="tel"
											required
											value={form.phone}
											onChange={(e) =>
												setForm({
													...form,
													phone: e.target.value,
												})
											}
											placeholder="+234 800 000 0000"
											className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy transition-colors"
											style={{
												fontFamily:
													"'DM Sans', sans-serif",
											}}
										/>
									</div>

									<div>
										<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
											I&apos;m looking to
										</label>
										<div className="flex gap-2 flex-wrap">
											{[
												"Buy",
												"Rent",
												"Sell",
												"Invest",
											].map((opt) => (
												<button
													key={opt}
													type="button"
													onClick={() =>
														setForm({
															...form,
															interest: opt,
														})
													}
													className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
														form.interest === opt
															? "bg-navy text-white border-navy"
															: "border-gray-200 text-gray-500 hover:border-navy"
													}`}
												>
													{opt}
												</button>
											))}
										</div>
									</div>

									<div>
										<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
											Message (optional)
										</label>
										<textarea
											rows={3}
											placeholder="Tell us more about what you're looking for..."
											className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy transition-colors resize-none"
											style={{
												fontFamily:
													"'DM Sans', sans-serif",
											}}
										/>
									</div>

									<button
										type="submit"
										className="btn-primary flex items-center justify-center gap-2 w-full mt-1"
										style={{ padding: "14px" }}
									>
										<Send size={16} />
										Send Message
									</button>
								</form>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
