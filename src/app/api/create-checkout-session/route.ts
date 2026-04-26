import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { name: string; amount: number; currency: string; listingsAllowed: number }> = {
	starter: {
		name: "Starter — 5 Property Listings",
		amount: 4900, // £49.00 in pence
		currency: "gbp",
		listingsAllowed: 5,
	},
	standard: {
		name: "Standard — 15 Property Listings",
		amount: 9900, // £99.00
		currency: "gbp",
		listingsAllowed: 15,
	},
	premium: {
		name: "Premium — 40 Property Listings",
		amount: 19900, // £199.00
		currency: "gbp",
		listingsAllowed: 40,
	},
};

export async function POST(req: NextRequest) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { plan } = await req.json();
	const selectedPlan = PLANS[plan];
	if (!selectedPlan) {
		return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
	}

	const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: selectedPlan.currency,
					product_data: {
						name: selectedPlan.name,
						description: "Seal Solutions Limited — Property Listing",
					},
					unit_amount: selectedPlan.amount,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${appUrl}/list-property/submit?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
		cancel_url: `${appUrl}/list-property`,
		metadata: { userId, plan, listingsAllowed: String(selectedPlan.listingsAllowed) },
	});

	return NextResponse.json({ url: session.url });
}
