import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@sanity/client";
import NavbarStatic from "@/components/layout/NavbarStatic";
import PropertyForm from "./_components/PropertyForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const writeClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
	token: process.env.SANITY_WRITE_TOKEN,
	useCdn: false,
});

const PLAN_LISTINGS: Record<string, number> = {
	starter: 5,
	standard: 15,
	premium: 40,
};

const PLAN_LABELS: Record<string, string> = {
	starter: "Starter — 5 Listings",
	standard: "Standard — 15 Listings",
	premium: "Premium — 40 Listings",
};

interface ActiveRecord {
	_id: string;
	plan: string;
	listingsAllowed: number;
	listingsUsed: number;
}

async function ensurePaymentRecord(
	userId: string,
	sessionId: string,
	plan: string,
	amountPaid: number | null,
): Promise<string> {
	const existing = await writeClient.fetch<{ _id: string } | null>(
		`*[_type == "paymentRecord" && stripeSessionId == $sessionId][0]{ _id }`,
		{ sessionId },
	);

	if (existing) return existing._id;

	const listingsAllowed = PLAN_LISTINGS[plan] ?? 5;

	const record = await writeClient.create({
		_type: "paymentRecord",
		userId,
		stripeSessionId: sessionId,
		plan,
		listingsAllowed,
		listingsUsed: 0,
		status: "active",
		amountPaid: amountPaid ?? 0,
		paidAt: new Date().toISOString(),
	});

	return record._id;
}

async function getActiveRecord(userId: string): Promise<ActiveRecord | null> {
	return writeClient.fetch<ActiveRecord | null>(
		`*[_type == "paymentRecord" && userId == $userId && status == "active" && listingsUsed < listingsAllowed] | order(paidAt asc) [0]{
			_id, plan, listingsAllowed, listingsUsed
		}`,
		{ userId },
	);
}

export default async function SubmitPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id?: string; plan?: string }>;
}) {
	const { userId } = await auth();
	if (!userId) redirect("/");

	const { session_id, plan } = await searchParams;

	let paymentRecordId: string;
	let resolvedPlan: string;
	let remaining: number;

	if (session_id) {
		// Fresh payment — verify with Stripe then create/reuse paymentRecord
		let session: Stripe.Checkout.Session;
		try {
			session = await stripe.checkout.sessions.retrieve(session_id);
			if (session.payment_status !== "paid") redirect("/list-property");
		} catch {
			redirect("/list-property");
		}

		resolvedPlan = plan ?? session.metadata?.plan ?? "starter";
		paymentRecordId = await ensurePaymentRecord(
			userId,
			session_id,
			resolvedPlan,
			session.amount_total,
		);

		const record = await getActiveRecord(userId);
		remaining = record
			? record.listingsAllowed - record.listingsUsed
			: PLAN_LISTINGS[resolvedPlan] ?? 5;
	} else {
		// No fresh payment — look for existing credits
		const record = await getActiveRecord(userId);
		if (!record) redirect("/list-property");

		paymentRecordId = record._id;
		resolvedPlan = record.plan;
		remaining = record.listingsAllowed - record.listingsUsed;
	}

	return (
		<>
			<NavbarStatic />
			<main className="min-h-screen bg-gray-50 pt-20">
				<section className="bg-[#0b1535] py-14 px-6 text-center">
					<span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
						{PLAN_LABELS[resolvedPlan] ?? "Property Listing"}
					</span>
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
						Tell us about your property
					</h1>
					<p className="text-gray-300 text-base max-w-md mx-auto">
						Fill in the details below. Your listing will be reviewed and go live
						within 2 hours.
					</p>
					<p className="mt-3 text-amber-400 text-sm font-semibold">
						{remaining} listing credit{remaining !== 1 ? "s" : ""} remaining
					</p>
				</section>

				<section className="max-w-2xl mx-auto px-6 py-14">
					<PropertyForm
						plan={resolvedPlan}
						sessionId={session_id}
						paymentRecordId={paymentRecordId}
					/>
				</section>
			</main>
		</>
	);
}
