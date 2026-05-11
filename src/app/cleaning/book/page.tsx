import NavbarStatic from "@/components/layout/NavbarStatic";
import BookingForm from "./_components/BookingForm";

export default function BookCleaningPage() {
	return (
		<>
			<NavbarStatic />
			<main className="min-h-screen bg-gray-50 pt-20">
				<section
					className="relative py-14 px-6 text-center bg-cover bg-center"
					style={{ backgroundImage: "url('/bg-pic.png')" }}
				>
					<div className="absolute inset-0 bg-[#0b1535]/75" />

					<div className="relative z-10">
						<span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
							Book a Clean
						</span>
						<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
							Set up your cleaning appointment
						</h1>
						<p className="text-gray-300 text-base max-w-md mx-auto">
							Takes under 2 minutes. Your price is calculated live
							as you go.
						</p>
					</div>
				</section>

				<section className="max-w-2xl mx-auto px-6 py-14">
					<BookingForm />
				</section>
			</main>
		</>
	);
}
