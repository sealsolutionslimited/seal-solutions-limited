"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { brandlogo5, brandlogo6 } from "@/assets";
import Link from "next/link";

const navLinks = [
	{ label: "Buy", href: "#listings" },
	{ label: "Rent", href: "#listings" },
	{ label: "Sell", href: "#services" },
	{ label: "Manage", href: "#services" },
	{ label: "About", href: "#how-it-works" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const textColorClass = scrolled ? "text-gray-900" : "text-white";
	const subTextColorClass = scrolled ? "text-gray-600" : "text-gray-200";

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
				<a href="#" className="flex items-center gap-3">
					<Image
						src={scrolled ? brandlogo6 : brandlogo5}
						alt="Seal Solutions"
						width={60}
						height={60}
						className="object-contain"
					/>
				</a>

				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							// 	className="
							// 	relative
							// 	text-sm
							// 	font-medium
							// 	tracking-[0.04em]
							// 	text-[#111827]
							// 	transition-colors duration-200
							// 	hover:text-navy

							// 	after:content-['']
							// 	after:absolute
							// 	after:left-0
							// 	after:-bottom-0.75
							// 	after:h-0.5
							// 	after:w-0
							// 	after:bg-gold
							// 	after:transition-all
							// 	after:duration-300

							// 	hover:after:w-full
							// "
							className={`
							relative text-sm font-medium tracking-[0.04em]
							transition-colors duration-300
							${textColorClass}
							hover:text-gold
							after:content-[''] after:absolute after:left-0 after:-bottom-1
							after:h-0.5 after:w-0 after:bg-gold after:transition-all
							after:duration-300 hover:after:w-full
						`}
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="hidden md:flex items-center gap-4">
					<a
						href="tel:+2341234567890"
						// className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gold transition-colors"
						className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${subTextColorClass} hover:text-gold`}
					>
						<Phone size={15} />
						<span>+234 123 456 7890</span>
					</a>
					<a
						href="#contact"
						className="btn-primary"
						style={{ padding: "10px 22px", fontSize: "13px" }}
					>
						List Property
					</a>
				</div>

				{/* Mobile toggle */}
				<button
					className="md:hidden text-navy"
					onClick={() => setOpen(!open)}
				>
					{open ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-sm font-medium text-gray-700 hover:text-navy"
							onClick={() => setOpen(false)}
						>
							{link.label}
						</a>
					))}
					<a
						href="#contact"
						className="btn-primary text-center"
						style={{ padding: "12px 22px", fontSize: "14px" }}
					>
						List Property
					</a>
				</div>
			)}
		</nav>
	);
}
