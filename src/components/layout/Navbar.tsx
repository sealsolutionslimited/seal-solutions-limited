// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Menu, X, Phone } from "lucide-react";
// import { brandlogo5, brandlogo6 } from "@/assets";
// import Link from "next/link";

// const navLinks = [
// 	{ label: "Buy", href: "#listings" },
// 	{ label: "Rent", href: "#listings" },
// 	{ label: "Sell", href: "#services" },
// 	{ label: "Manage", href: "#services" },
// 	{ label: "About", href: "#how-it-works" },
// ];

// export default function Navbar() {
// 	const [scrolled, setScrolled] = useState(false);
// 	const [open, setOpen] = useState(false);

// 	useEffect(() => {
// 		const onScroll = () => setScrolled(window.scrollY > 40);
// 		window.addEventListener("scroll", onScroll);
// 		return () => window.removeEventListener("scroll", onScroll);
// 	}, []);

// 	const textColorClass = scrolled ? "text-gray-900" : "text-white";
// 	const subTextColorClass = scrolled ? "text-gray-600" : "text-gray-200";

// 	return (
// 		<nav
// 			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// 				scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
// 			}`}
// 		>
// 			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
// 				<a href="#" className="flex items-center gap-3">
// 					<Image
// 						src={scrolled ? brandlogo6 : brandlogo5}
// 						alt="Seal Solutions"
// 						width={60}
// 						height={60}
// 						className="object-contain"
// 					/>
// 				</a>

// 				<div className="hidden md:flex items-center gap-8">
// 					{navLinks.map((link) => (
// 						<Link
// 							key={link.label}
// 							href={link.href}
// 							className={`
// 							relative text-sm font-medium tracking-[0.04em]
// 							transition-colors duration-300
// 							${textColorClass}
// 							hover:text-gold
// 							after:content-[''] after:absolute after:left-0 after:-bottom-1
// 							after:h-0.5 after:w-0 after:bg-gold after:transition-all
// 							after:duration-300 hover:after:w-full
// 						`}
// 						>
// 							{link.label}
// 						</Link>
// 					))}
// 				</div>

// 				<div className="hidden md:flex items-center gap-4">
// 					<Link href="#contact">List Property</Link>
// 				</div>

// 				<button
// 					className="md:hidden text-navy"
// 					onClick={() => setOpen(!open)}
// 				>
// 					{open ? <X size={24} /> : <Menu size={24} />}
// 				</button>
// 			</div>
// 		</nav>
// 	);
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { brandlogo5, brandlogo6 } from "@/assets";
import Link from "next/link";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import MobileMenu from "./MobileMenu";

const navLinks = [
	{ label: "Buy", href: "#listings" },
	{ label: "Rent", href: "#listings" },
	{ label: "Sell", href: "#services" },
	{ label: "Manage", href: "#services" },
	{ label: "About", href: "#how-it-works" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const textColorClass = scrolled ? "text-gray-900" : "text-white";

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

				<div className="flex items-center gap-50">
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className={`
                relative text-sm font-medium tracking-[0.04em]
                transition-colors duration-300 ${textColorClass}
                hover:text-amber-400
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all
                after:duration-300 hover:after:w-full
              `}
							>
								{link.label}
							</Link>
						))}
					</div>

					<div className="flex items-center">
						<div className="hidden md:flex items-center gap-3">
							<Show when="signed-out">
								<SignInButton mode="modal">
									<button
										className={`text-sm font-medium transition-colors duration-300 ${textColorClass} hover:text-amber-400`}
									>
										Sign In
									</button>
								</SignInButton>
							</Show>

							<Show when="signed-in">
								<UserButton
									appearance={{
										elements: { avatarBox: "w-9 h-9" },
									}}
								/>
							</Show>

							<Show when="signed-out">
								<SignInButton mode="modal">
									<button className="bg-amber-400 hover:bg-amber-500 text-[#0b1535] text-sm font-bold tracking-wide px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
										List Property
									</button>
								</SignInButton>
							</Show>

							<Show when="signed-in">
								<Link
									href="/list-property"
									className="bg-amber-400 hover:bg-amber-500 text-[#0b1535] text-sm font-bold tracking-wide px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
								>
									List Property
								</Link>
							</Show>
						</div>

						<div className={textColorClass}>
							<MobileMenu />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
