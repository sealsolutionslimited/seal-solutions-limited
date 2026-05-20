"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
	{ number: 50, suffix: "+", label: "Properties Listed" },
	{ number: 90, suffix: "%", label: "Happy Clients" },
	{ number: 98, suffix: "%", label: "Client Satisfaction" },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!active) return;
		let start: number | null = null;
		const step = (timestamp: number) => {
			if (!start) start = timestamp;
			const progress = Math.min((timestamp - start) / duration, 1);
			setCount(Math.floor(progress * target));
			if (progress < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}, [active, target, duration]);

	return count;
}

function StatItem({ number, suffix, label }: (typeof stats)[0]) {
	const [active, setActive] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const count = useCountUp(number, 1800, active);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) setActive(true); },
			{ threshold: 0.5 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className="text-center">
			<div className="text-4xl font-bold mb-1 text-gold-light">
				{count}{suffix}
			</div>
			<div className="text-white/60 text-sm tracking-wide uppercase">
				{label}
			</div>
		</div>
	);
}

export default function Stats() {
	return (
		<section className="bg-navy py-14">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
					{stats.map((stat, i) => (
						<StatItem key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
