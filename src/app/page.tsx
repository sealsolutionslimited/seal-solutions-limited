import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CTA from "@/components/sections/CTA";
import FeaturedListings from "@/components/sections/FeaturedListings";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import { getAllProperties } from "@/sanity/lib/property/getAllProperties";

export default async function Home() {
	const properties = await getAllProperties();

	return (
		<main className="min-h-screen bg-white">
			<Navbar />
			<Hero />
			<Stats />
			<FeaturedListings properties={properties} />
			<Services />
			<HowItWorks />
			<Testimonials />
			<CTA />
			<Footer />
		</main>
	);
}
