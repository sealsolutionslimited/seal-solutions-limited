import { redirect } from "next/navigation";
import Stripe from "stripe";
import { createClient } from "@sanity/client";
import { Resend } from "resend";
import NavbarStatic from "@/components/layout/NavbarStatic";
import { SERVICE_TYPES, EXTRAS, formatPrice } from "@/lib/cleaningPricing";
import { cleaningConfirmationHtml, cleaningAdminNotificationHtml } from "@/lib/cleaning-email";
import { CheckCircle, CalendarCheck, MapPin, Clock, Phone, Mail, Hash } from "lucide-react";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

const writeClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
	token: process.env.SANITY_WRITE_TOKEN,
	useCdn: false,
});

function generateBookingRef(): string {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let ref = "SSL-";
	for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
	return ref;
}

async function processBooking(sessionId: string) {
	// Idempotent: return existing booking if already processed
	const existing = await writeClient.fetch<{
		_id: string;
		stripeSessionId: string;
		customerName: string;
		customerEmail: string;
		customerPhone: string;
		serviceType: string;
		date: string;
		timeSlot: string;
		address: string;
		postcode: string;
		bedrooms: number;
		bathrooms: number;
		extras: string[];
		notes: string;
		totalAmount: number;
		bookingRef: string;
	} | null>(
		`*[_type == "cleaningBooking" && stripeSessionId == $sessionId][0]{
			_id, stripeSessionId,
			customerName, customerEmail, customerPhone,
			serviceType, date, timeSlot,
			address, postcode, bedrooms, bathrooms, extras, notes,
			totalAmount, bookingRef
		}`,
		{ sessionId },
	);

	if (existing) return existing;

	// Retrieve session metadata from Stripe
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	const m = session.metadata ?? {};

	const bookingRef = generateBookingRef();
	const extras: string[] = JSON.parse(m.extras || "[]");

	const booking = await writeClient.create({
		_type: "cleaningBooking",
		stripeSessionId: sessionId,
		userId: m.userId || undefined,
		status: "confirmed",
		serviceType: m.serviceType,
		bedrooms: Number(m.bedrooms) || 1,
		bathrooms: Number(m.bathrooms) || 1,
		extras,
		address: m.address,
		postcode: m.postcode,
		date: m.date,
		timeSlot: m.timeSlot,
		customerName: m.customerName,
		customerEmail: m.customerEmail,
		customerPhone: m.customerPhone,
		notes: m.notes || "",
		totalAmount: Number(m.totalAmount) || session.amount_total || 0,
		bookingRef,
		bookedAt: new Date().toISOString(),
	});

	const emailData = {
		bookingRef,
		customerName: m.customerName,
		customerEmail: m.customerEmail,
		customerPhone: m.customerPhone,
		serviceType: m.serviceType,
		bedrooms: Number(m.bedrooms) || 1,
		bathrooms: Number(m.bathrooms) || 1,
		extras,
		address: m.address,
		postcode: m.postcode,
		date: m.date,
		timeSlot: m.timeSlot,
		notes: m.notes || "",
		totalAmount: Number(m.totalAmount) || session.amount_total || 0,
	};

	// Send confirmation to customer + notification to admin (fire and forget)
	await Promise.allSettled([
		resend.emails.send({
			from: "Seal Solutions <onboarding@resend.dev>",
			to: m.customerEmail,
			subject: `Booking Confirmed — ${SERVICE_TYPES[m.serviceType]?.label ?? m.serviceType} on ${m.date}`,
			html: cleaningConfirmationHtml(emailData),
		}),
		resend.emails.send({
			from: "Seal Solutions <onboarding@resend.dev>",
			to: "sealsolutionslim@gmail.com",
			subject: `New Cleaning Booking — ${m.customerName} · ${SERVICE_TYPES[m.serviceType]?.label ?? m.serviceType}`,
			html: cleaningAdminNotificationHtml(emailData),
		}),
	]);

	return { ...booking, ...emailData };
}

export default async function CleaningSuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id?: string }>;
}) {
	const { session_id } = await searchParams;
	if (!session_id) redirect("/cleaning");

	let session: Stripe.Checkout.Session;
	try {
		session = await stripe.checkout.sessions.retrieve(session_id);
		if (session.payment_status !== "paid") redirect("/cleaning");
	} catch {
		redirect("/cleaning");
	}

	const booking = await processBooking(session_id);

	const formattedDate = new Date(booking.date).toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const extraLabels = (booking.extras ?? [])
		.map((e: string) => EXTRAS[e]?.label ?? e)
		.join(", ");

	return (
		<>
			<NavbarStatic />
			<main className="min-h-screen bg-gray-50 pt-20 pb-16">
				<div className="max-w-lg mx-auto px-6 py-16">

					{/* Icon */}
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
							<CheckCircle size={40} className="text-emerald-500" />
						</div>
					</div>

					<h1 className="text-3xl font-extrabold text-[#0b1535] text-center mb-2">
						Booking confirmed!
					</h1>
					<p className="text-gray-500 text-center mb-8 max-w-sm mx-auto">
						A confirmation email has been sent to{" "}
						<strong className="text-[#0b1535]">{booking.customerEmail}</strong>.
						Our team will be in touch within 2 hours.
					</p>

					{/* Booking card */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">

						{/* Header */}
						<div className="bg-[#0b1535] px-6 py-4 flex items-center justify-between">
							<div>
								<p className="text-xs text-amber-400 font-bold tracking-widest uppercase mb-0.5">
									{SERVICE_TYPES[booking.serviceType]?.label ?? booking.serviceType}
								</p>
								<p className="text-white font-extrabold text-lg">{formatPrice(booking.totalAmount)}</p>
							</div>
							<div className="text-right">
								<p className="text-xs text-gray-400 mb-0.5">Booking Ref</p>
								<p className="text-amber-400 font-bold font-mono text-sm">{booking.bookingRef}</p>
							</div>
						</div>

						{/* Details */}
						<div className="divide-y divide-gray-100">
							<div className="flex items-start gap-3 px-6 py-4">
								<CalendarCheck size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<div>
									<p className="text-xs text-gray-400 font-medium">Date & Time</p>
									<p className="text-sm font-semibold text-[#0b1535]">
										{formattedDate} at {booking.timeSlot}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3 px-6 py-4">
								<MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<div>
									<p className="text-xs text-gray-400 font-medium">Address</p>
									<p className="text-sm font-semibold text-[#0b1535]">
										{booking.address}, {booking.postcode}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3 px-6 py-4">
								<Clock size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<div>
									<p className="text-xs text-gray-400 font-medium">Property</p>
									<p className="text-sm font-semibold text-[#0b1535]">
										{booking.bedrooms} bedroom{booking.bedrooms !== 1 ? "s" : ""} ·{" "}
										{booking.bathrooms} bathroom{booking.bathrooms !== 1 ? "s" : ""}
										{extraLabels ? ` · Add-ons: ${extraLabels}` : ""}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3 px-6 py-4">
								<Mail size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<div>
									<p className="text-xs text-gray-400 font-medium">Contact</p>
									<p className="text-sm font-semibold text-[#0b1535]">{booking.customerName}</p>
									<p className="text-xs text-gray-500">{booking.customerEmail}</p>
								</div>
							</div>
							<div className="flex items-start gap-3 px-6 py-4">
								<Phone size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<div>
									<p className="text-xs text-gray-400 font-medium">Phone</p>
									<p className="text-sm font-semibold text-[#0b1535]">{booking.customerPhone}</p>
								</div>
							</div>
							<div className="flex items-start gap-3 px-6 py-4">
								<Hash size={16} className="text-amber-500 mt-0.5 shrink-0" />
								<div>
									<p className="text-xs text-gray-400 font-medium">Reference</p>
									<p className="text-sm font-bold font-mono text-[#0b1535]">{booking.bookingRef}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Info box */}
					<div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 mb-8">
						<p className="font-semibold mb-1">What happens next?</p>
						<p className="leading-relaxed text-amber-700">
							Our team will review your booking and confirm a cleaner within 2
							hours. Need to make changes? Call{" "}
							<a href="tel:+447879183213" className="font-bold underline">
								+44 7879 183213
							</a>{" "}
							or email{" "}
							<a href="mailto:sealsolutionslim@gmail.com" className="font-bold underline">
								sealsolutionslim@gmail.com
							</a>
							.
						</p>
					</div>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-3">
						<Link
							href="/cleaning/book"
							className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
						>
							Book Another Clean
						</Link>
						<Link
							href="/"
							className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:text-[#0b1535] hover:border-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
						>
							Back to Home
						</Link>
					</div>

				</div>
			</main>
		</>
	);
}
