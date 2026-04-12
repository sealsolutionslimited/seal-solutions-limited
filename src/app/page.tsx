import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedListings from "@/components/FeaturedListings";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<main className="min-h-screen bg-white">
			<Navbar />
			<Hero />
			<Stats />
			<FeaturedListings />
			<Services />
			<HowItWorks />
			<Testimonials />
			<CTA />
			<Footer />
		</main>
	);
}
