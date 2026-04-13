import { brandlogo5 } from "@/assets";
import Image from "next/image";

const footerLinks = {
	Properties: [
		"For Sale",
		"For Rent",
		"New Developments",
		"Commercial",
		"Land & Plots",
	],
	Services: [
		"Property Sales",
		"Lettings",
		"Property Management",
		"Valuation",
		"Legal Services",
	],
	Company: ["About Us", "Our Team", "Careers", "News & Blog", "Contact"],
};

export default function Footer() {
	return (
		<footer className="bg-navy-dark text-white">
			<div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
					{/* Brand */}
					<div className="lg:col-span-2">
						<div className="flex items-center gap-3 mb-5">
							<Image
								src={brandlogo5}
								alt="Seal Solutions"
								width={70}
								height={70}
								className="object-contain rounded-sm"
							/>
						</div>
						<p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
							Nigeria&apos;s trusted property partner. We help
							individuals and businesses buy, sell, rent, and
							manage real estate with confidence.
						</p>
						{/* Social links */}
						<div className="flex gap-3">
							{["in", "tw", "ig", "fb"].map((s) => (
								<a
									key={s}
									href="#"
									className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-xs font-bold text50 hover:bgold hover:border-gold hover:text-white transition-all"
								>
									{s}
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					{Object.entries(footerLinks).map(([category, links]) => (
						<div key={category}>
							<h4
								className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-5"
								style={{ fontFamily: "'DM Sans', sans-serif" }}
							>
								{category}
							</h4>
							<ul className="flex flex-col gap-3">
								{links.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="text-white/45 text-sm hover:text-gold-light transition-colors"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Gold divider */}
				<div
					className="h-px mb-6"
					style={{
						background:
							"linear-gradient(90deg, transparent, var(--gold), transparent)",
					}}
				/>

				<div className="flex flex-col md:flex-row items-center justify-between gap-3 text-white/30 text-xs">
					<p>
						&copy; {new Date().getFullYear()} Seal Solutions Nigeria
						Ltd. All rights reserved.
					</p>
					<div className="flex gap-6">
						<a
							href="#"
							className="hover:text-gold-light transition-colors"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="hover:text-gold-light transition-colors"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="hover:text-gold-light transition-colors"
						>
							Cookie Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
