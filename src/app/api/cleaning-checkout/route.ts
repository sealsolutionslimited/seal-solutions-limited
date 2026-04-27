import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { calculateTotal, SERVICE_TYPES } from "@/lib/cleaningPricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
	const { userId } = await auth();
	const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	const body = await req.json();
	const {
		serviceType,
		bedrooms,
		bathrooms,
		extras,
		address,
		postcode,
		date,
		timeSlot,
		customerName,
		customerEmail,
		customerPhone,
		notes,
	} = body;

	if (
		!serviceType ||
		!SERVICE_TYPES[serviceType] ||
		!address ||
		!postcode ||
		!date ||
		!timeSlot ||
		!customerName ||
		!customerEmail ||
		!customerPhone
	) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		);
	}

	const totalAmount = calculateTotal(
		serviceType,
		Number(bedrooms) || 1,
		Number(bathrooms) || 1,
		Array.isArray(extras) ? extras : [],
	);

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "gbp",
					product_data: {
						name: `${SERVICE_TYPES[serviceType].label} — Seal Solutions`,
						description: `${date} at ${timeSlot} · ${address}, ${postcode}`,
					},
					unit_amount: totalAmount,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		customer_email: customerEmail,
		success_url: `${appUrl}/cleaning/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${appUrl}/cleaning/book`,
		metadata: {
			userId: userId ?? "",
			serviceType,
			bedrooms: String(bedrooms ?? 1),
			bathrooms: String(bathrooms ?? 1),
			extras: JSON.stringify(extras ?? []),
			address: address.slice(0, 200),
			postcode,
			date,
			timeSlot,
			customerName: customerName.slice(0, 100),
			customerEmail: customerEmail.slice(0, 100),
			customerPhone: customerPhone.slice(0, 30),
			notes: (notes ?? "").slice(0, 300),
			totalAmount: String(totalAmount),
		},
	});

	return NextResponse.json({ url: session.url });
}
