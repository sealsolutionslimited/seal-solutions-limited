"use client";

import { useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import {
	Check,
	Zap,
	Star,
	Crown,
	ArrowRight,
	Shield,
	Clock,
	Camera,
} from "lucide-react";

const plans = [
	{
		id: "starter",
		name: "Starter",
		price: "£49",
		duration: "5 listing credits",
		icon: Zap,
		highlight: false,
		features: [
			"5 property listings",
			"Up to 5 photos per listing",
			"Standard search placement",
			"Email enquiries forwarded",
			"Basic listing analytics",
		],
	},
	{
		id: "standard",
		name: "Standard",
		price: "£99",
		duration: "15 listing credits",
		icon: Star,
		highlight: true,
		features: [
			"15 property listings",
			"Up to 15 photos per listing",
			"Priority search placement",
			"Email & phone enquiries",
			"Detailed analytics",
			"2× free listing refresh",
		],
	},
	{
		id: "premium",
		name: "Premium",
		price: "£199",
		duration: "40 listing credits",
		icon: Crown,
		highlight: false,
		features: [
			"40 property listings",
			"Unlimited photos per listing",
			"Homepage featured placement",
			"All enquiry channels",
			"Full analytics dashboard",
			"5× free listing refresh",
			"Dedicated agent support",
		],
	},
];

const trustItems = [
	{ icon: Shield, label: "Secure Payment", sub: "256-bit SSL encryption" },
	{ icon: Clock, label: "Instant Activation", sub: "Live within 2 hours" },
	{ icon: Camera, label: "Pro Photography", sub: "Available on Premium" },
];

export default function PricingPlans() {
	const [loading, setLoading] = useState<string | null>(null);
	const { isSignedIn } = useAuth();

	const handleSelectPlan = async (planId: string) => {
		setLoading(planId);
		try {
			const res = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plan: planId }),
			});

			const data = await res.json();
			if (data.url) {
				window.location.href = data.url;
			} else {
				setLoading(null);
			}
		} catch {
			setLoading(null);
		}
	};

	return (
		<main className="min-h-screen bg-gray-50 pt-20">
			{/* Hero */}
			<section className="bg-[#0b1535] py-20 px-6 text-center">
				<span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
					List Your Property
				</span>
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
					Reach thousands of serious buyers and renters
				</h1>
				<p className="text-gray-300 text-lg max-w-xl mx-auto">
					Choose a plan that fits your needs and get your property in front of
					the right audience — fast.
				</p>
			</section>

			{/* Trust bar */}
			<div className="bg-white border-b border-gray-100">
				<div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8">
					{trustItems.map(({ icon: Icon, label, sub }) => (
						<div key={label} className="flex items-center gap-2.5">
							<div className="p-2 bg-amber-50 rounded-lg">
								<Icon size={16} className="text-amber-500" />
							</div>
							<div>
								<p className="text-xs font-semibold text-[#0b1535]">{label}</p>
								<p className="text-xs text-gray-400">{sub}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Plans */}
			<section className="max-w-5xl mx-auto px-6 py-20">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-7">
					{plans.map((plan) => {
						const Icon = plan.icon;
						const isLoading = loading === plan.id;

						return (
							<div
								key={plan.id}
								className={`relative bg-white rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 ${
									plan.highlight
										? "border-2 border-amber-400 shadow-xl shadow-amber-100/60"
										: "border border-gray-200 shadow-md hover:shadow-xl"
								}`}
							>
								{plan.highlight && (
									<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-[#0b1535] text-[11px] font-extrabold px-4 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
										Most Popular
									</div>
								)}

								<div className="flex items-center gap-3">
									<div
										className={`p-2.5 rounded-xl ${
											plan.highlight ? "bg-amber-50" : "bg-gray-50"
										}`}
									>
										<Icon
											size={18}
											className={
												plan.highlight ? "text-amber-500" : "text-[#0b1535]"
											}
										/>
									</div>
									<h3 className="text-base font-bold text-[#0b1535]">
										{plan.name}
									</h3>
								</div>

								<div>
									<div className="text-3xl font-extrabold text-[#0b1535]">
										{plan.price}
									</div>
									<p className="text-sm text-gray-400 mt-1">{plan.duration}</p>
								</div>

								<ul className="flex flex-col gap-3 flex-1">
									{plan.features.map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-2.5 text-sm text-gray-600"
										>
											<Check
												size={14}
												className="text-amber-500 mt-0.5 shrink-0"
											/>
											{feature}
										</li>
									))}
								</ul>

								{isSignedIn ? (
									<button
										onClick={() => handleSelectPlan(plan.id)}
										disabled={!!loading}
										className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
											plan.highlight
												? "bg-amber-400 hover:bg-amber-500 text-[#0b1535] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
												: "bg-[#0b1535] hover:bg-[#162050] text-white"
										}`}
									>
										{isLoading ? (
											<span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
										) : (
											<>
												Get Started
												<ArrowRight size={14} />
											</>
										)}
									</button>
								) : (
									<SignInButton mode="modal">
										<button
											className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
												plan.highlight
													? "bg-amber-400 hover:bg-amber-500 text-[#0b1535] shadow-md hover:shadow-lg"
													: "bg-[#0b1535] hover:bg-[#162050] text-white"
											}`}
										>
											Sign In to Get Started
											<ArrowRight size={14} />
										</button>
									</SignInButton>
								)}
							</div>
						);
					})}
				</div>

				<p className="text-center text-sm text-gray-400 mt-10">
					All plans include a review by our team before going live. Questions?{" "}
					<a href="/#contact" className="text-amber-600 hover:underline font-medium">
						Contact us
					</a>
				</p>
			</section>
		</main>
	);
}
