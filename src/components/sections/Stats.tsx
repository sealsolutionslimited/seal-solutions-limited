const stats = [
	{ number: "2,500+", label: "Properties Listed" },
	{ number: "1,200+", label: "Happy Clients" },
	{ number: "15+", label: "Years Experience" },
	{ number: "98%", label: "Client Satisfaction" },
];

export default function Stats() {
	return (
		<section className="bg-navy py-14">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, i) => (
						<div key={i} className="text-center">
							<div className="text-4xl font-bold mb-1 text-gold-light">
								{stat.number}
							</div>
							<div className="text-white/60 text-sm tracking-wide uppercase">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
