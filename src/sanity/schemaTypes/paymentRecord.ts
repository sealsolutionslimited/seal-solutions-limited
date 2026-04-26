import { CreditCard } from "lucide-react";
import { defineField, defineType } from "sanity";

const paymentRecordType = defineType({
	name: "paymentRecord",
	title: "Payment Record",
	type: "document",
	icon: CreditCard,
	fields: [
		defineField({
			name: "userId",
			title: "Clerk User ID",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "stripeSessionId",
			title: "Stripe Session ID",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "plan",
			title: "Plan",
			type: "string",
			options: {
				list: [
					{ title: "Starter (5 listings)", value: "starter" },
					{ title: "Standard (15 listings)", value: "standard" },
					{ title: "Premium (40 listings)", value: "premium" },
				],
				layout: "radio",
			},
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "listingsAllowed",
			title: "Listings Allowed",
			type: "number",
			readOnly: true,
			description: "Total number of property listings this payment covers",
			validation: (Rule) => Rule.required().min(1),
		}),

		defineField({
			name: "listingsUsed",
			title: "Listings Used",
			type: "number",
			initialValue: 0,
			description: "Number of listings already submitted against this payment",
			validation: (Rule) => Rule.required().min(0),
		}),

		defineField({
			name: "status",
			title: "Status",
			type: "string",
			options: {
				list: [
					{ title: "Active", value: "active" },
					{ title: "Exhausted", value: "exhausted" },
				],
				layout: "radio",
			},
			initialValue: "active",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "amountPaid",
			title: "Amount Paid (pence)",
			type: "number",
			readOnly: true,
			description: "Amount charged in pence (e.g. 4900 = £49.00)",
		}),

		defineField({
			name: "paidAt",
			title: "Paid At",
			type: "datetime",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			plan: "plan",
			userId: "userId",
			listingsAllowed: "listingsAllowed",
			listingsUsed: "listingsUsed",
			status: "status",
		},
		prepare({ plan, userId, listingsAllowed, listingsUsed, status }) {
			const statusLabel = status === "active" ? "✅ Active" : "❌ Exhausted";
			const planLabel =
				plan === "starter"
					? "Starter"
					: plan === "standard"
						? "Standard"
						: "Premium";
			return {
				title: `${planLabel} — ${statusLabel}`,
				subtitle: `${listingsUsed ?? 0}/${listingsAllowed ?? "?"} listings used · ${userId?.slice(0, 24)}…`,
			};
		},
	},
});

export default paymentRecordType;
