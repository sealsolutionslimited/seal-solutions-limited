"use client";
import { Menu, LayoutList } from "lucide-react";
import Link from "next/link";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { brandlogo6 } from "@/assets";

const navLinks = [
	{ label: "Buy", href: "#listings" },
	{ label: "Rent", href: "#listings" },
	{ label: "Sell", href: "#services" },
	{ label: "Cleaning", href: "/cleaning" },
	{ label: "About", href: "#how-it-works" },
];

export default function MobileMenu() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					className="md:hidden text-current"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>
			</SheetTrigger>

			<SheetContent
				side="right"
				className="w-75 sm:w-85 p-0 bg-white flex flex-col"
			>
				<SheetHeader className="px-6 py-5 border-b border-gray-100">
					<SheetTitle asChild>
						<div className="flex items-center justify-between">
							<Image
								src={brandlogo6}
								alt="Seal Solutions"
								width={50}
								height={50}
								className="object-contain"
							/>
						</div>
					</SheetTitle>
				</SheetHeader>

				<nav className="flex flex-col px-6 py-6 gap-1 flex-1">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="
                flex items-center text-gray-700 text-sm font-medium
                px-3 py-3 rounded-lg hover:bg-amber-50 hover:text-amber-600
                transition-colors duration-200 tracking-wide
              "
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="mx-6 border-t border-gray-100" />

				<div className="px-6 py-6 flex flex-col gap-3">
					{/* Signed-in state */}
					<Show when="signed-in">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
								<UserButton>
									<UserButton.MenuItems>
										<UserButton.Link
											label="My Listings"
											labelIcon={<LayoutList size={16} />}
											href="/my-listings"
										/>
									</UserButton.MenuItems>
								</UserButton>
								<span className="text-sm text-gray-600 font-medium">
									My Account
								</span>
							</div>
							<Link
								href="/my-listings"
								className="flex items-center gap-2.5 text-gray-700 text-sm font-semibold px-3 py-3 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
							>
								<LayoutList size={15} />
								My Listings
							</Link>
							<Link
								href="/list-property"
								className="w-full bg-amber-400 hover:bg-amber-500 text-[#0b1535] text-sm font-bold py-3 rounded-lg text-center block transition-all duration-200 shadow-sm hover:shadow-md"
							>
								List Property
							</Link>
							<Link
								href="/cleaning"
								className="w-full bg-[#0b1535] hover:bg-[#162050] text-white text-sm font-bold py-3 rounded-lg text-center block transition-all duration-200 shadow-sm hover:shadow-md"
							>
								Book a Clean
							</Link>
						</div>
					</Show>

					{/* Signed-out state */}
					<Show when="signed-out">
						<div className="flex flex-col gap-3">
							<SignInButton mode="modal">
								<button className="w-full text-sm font-semibold text-[#162050] border border-[#162050]/20 py-3 rounded-lg hover:bg-[#162050]/5 transition-colors">
									Sign In
								</button>
							</SignInButton>
							<SignInButton mode="modal">
								<button className="w-full bg-[#0b1535] hover:bg-[#162050] text-white text-sm font-bold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
									Book a Clean
								</button>
							</SignInButton>
							<SignInButton mode="modal">
								<button className="w-full bg-amber-400 hover:bg-amber-500 text-[#0b1535] text-sm font-bold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
									List Property
								</button>
							</SignInButton>
						</div>
					</Show>
				</div>
			</SheetContent>
		</Sheet>
	);
}
