"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { brandlogo6 } from "@/assets";

const navLinks = [
	{ label: "Buy", href: "/properties" },
	{ label: "Rent", href: "/properties" },
	{ label: "Sell", href: "/#services" },
	{ label: "Manage", href: "/#services" },
	{ label: "About", href: "/#how-it-works" },
];

export default function NavbarStatic() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3">
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3">
					<Image
						src={brandlogo6}
						alt="Seal Solutions"
						width={55}
						height={55}
						className="object-contain"
					/>
				</Link>

				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="relative text-sm font-medium tracking-[0.04em] text-gray-900 hover:text-gold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="hidden md:flex items-center gap-4">
					<a
						href="tel:+2341234567890"
						className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gold transition-colors"
					>
						<Phone size={15} />
						<span>+234 123 456 7890</span>
					</a>
					<Link
						href="/#contact"
						className="btn-primary"
						style={{ padding: "10px 22px", fontSize: "13px" }}
					>
						List Property
					</Link>
				</div>

				<button
					className="md:hidden text-[#162050]"
					onClick={() => setOpen(!open)}
				>
					{open ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{open && (
				<div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="text-sm font-medium text-gray-700 hover:text-[#162050]"
							onClick={() => setOpen(false)}
						>
							{link.label}
						</Link>
					))}
					<Link
						href="/#contact"
						className="btn-primary text-center"
						style={{ padding: "12px 22px", fontSize: "14px" }}
					>
						List Property
					</Link>
				</div>
			)}
		</nav>
	);
}
