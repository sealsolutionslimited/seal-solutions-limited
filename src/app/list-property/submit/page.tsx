import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import NavbarStatic from "@/components/layout/NavbarStatic";
import PropertyForm from "./_components/PropertyForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_LABELS: Record<string, string> = {
	starter: "Starter — 30 days",
	standard: "Standard — 90 days",
	premium: "Premium — 6 months",
};

export default async function SubmitPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id?: string; plan?: string }>;
}) {
	const { userId } = await auth();
	if (!userId) redirect("/");

	const { session_id, plan } = await searchParams;

	if (!session_id) redirect("/list-property");

	try {
		const session = await stripe.checkout.sessions.retrieve(session_id);
		if (session.payment_status !== "paid") redirect("/list-property");
	} catch {
		redirect("/list-property");
	}

	return (
		<>
			<NavbarStatic />
			<main className="min-h-screen bg-gray-50 pt-20">
				<section className="bg-[#0b1535] py-14 px-6 text-center">
					<span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
						{plan ? PLAN_LABELS[plan] ?? "Property Listing" : "Property Listing"}
					</span>
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
						Tell us about your property
					</h1>
					<p className="text-gray-300 text-base max-w-md mx-auto">
						Fill in the details below. Your listing will be reviewed and go live
						within 2 hours.
					</p>
				</section>

				<section className="max-w-2xl mx-auto px-6 py-14">
					<PropertyForm plan={plan} sessionId={session_id} />
				</section>
			</main>
		</>
	);
}
