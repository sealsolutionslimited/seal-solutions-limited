import { CalendarCheck } from "lucide-react";
import { defineField, defineType } from "sanity";

const cleaningBookingType = defineType({
	name: "cleaningBooking",
	title: "Cleaning Booking",
	type: "document",
	icon: CalendarCheck,
	fields: [
		defineField({
			name: "stripeSessionId",
			title: "Stripe Session ID",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "userId",
			title: "Clerk User ID",
			type: "string",
			readOnly: true,
			description: "Optional — only set if customer was signed in",
		}),

		defineField({
			name: "status",
			title: "Status",
			type: "string",
			options: {
				list: [
					{ title: "Confirmed", value: "confirmed" },
					{ title: "Completed", value: "completed" },
					{ title: "Cancelled", value: "cancelled" },
				],
				layout: "radio",
			},
			initialValue: "confirmed",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "serviceType",
			title: "Service Type",
			type: "string",
			options: {
				list: [
					{ title: "Regular Clean", value: "regularClean" },
					{ title: "Deep Clean", value: "deepClean" },
					{ title: "End of Tenancy", value: "endOfTenancy" },
					{ title: "Carpet Clean", value: "carpetClean" },
					{ title: "Oven Clean", value: "ovenClean" },
				],
				layout: "radio",
			},
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "bedrooms",
			title: "Bedrooms",
			type: "number",
			readOnly: true,
			validation: (Rule) => Rule.required().min(1),
		}),

		defineField({
			name: "bathrooms",
			title: "Bathrooms",
			type: "number",
			readOnly: true,
			validation: (Rule) => Rule.required().min(1),
		}),

		defineField({
			name: "extras",
			title: "Add-ons",
			type: "array",
			of: [{ type: "string" }],
			readOnly: true,
		}),

		defineField({
			name: "address",
			title: "Address",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "postcode",
			title: "Postcode",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "date",
			title: "Cleaning Date",
			type: "date",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "timeSlot",
			title: "Time Slot",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "customerName",
			title: "Customer Name",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "customerEmail",
			title: "Customer Email",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required().email(),
		}),

		defineField({
			name: "customerPhone",
			title: "Customer Phone",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "notes",
			title: "Additional Notes",
			type: "text",
			rows: 3,
			readOnly: true,
		}),

		defineField({
			name: "totalAmount",
			title: "Total Amount (pence)",
			type: "number",
			readOnly: true,
			description: "Amount charged in pence (e.g. 9500 = £95.00)",
			validation: (Rule) => Rule.required().min(0),
		}),

		defineField({
			name: "bookedAt",
			title: "Booked At",
			type: "datetime",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			customerName: "customerName",
			serviceType: "serviceType",
			date: "date",
			status: "status",
			totalAmount: "totalAmount",
		},
		prepare({ customerName, serviceType, date, status, totalAmount }) {
			const statusLabel =
				status === "confirmed"
					? "✅ Confirmed"
					: status === "completed"
						? "🏁 Completed"
						: "❌ Cancelled";
			const serviceLabel: Record<string, string> = {
				regularClean: "Regular Clean",
				deepClean: "Deep Clean",
				endOfTenancy: "End of Tenancy",
				carpetClean: "Carpet Clean",
				ovenClean: "Oven Clean",
			};
			return {
				title: `${customerName} — ${serviceLabel[serviceType] ?? serviceType}`,
				subtitle: `${date} · £${((totalAmount ?? 0) / 100).toFixed(0)} · ${statusLabel}`,
			};
		},
	},
});

export default cleaningBookingType;
