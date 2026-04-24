import { UserCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

const userListingType = defineType({
	name: "userListing",
	title: "User Listing",
	type: "document",
	icon: UserCircle,
	fields: [
		defineField({
			name: "userId",
			title: "Clerk User ID",
			type: "string",
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "status",
			title: "Listing Status",
			type: "string",
			options: {
				list: [
					{ title: "Pending Review", value: "pending" },
					{ title: "Active", value: "active" },
					{ title: "Rejected", value: "rejected" },
				],
				layout: "radio",
			},
			initialValue: "pending",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "plan",
			title: "Listing Plan",
			type: "string",
			readOnly: true,
		}),

		defineField({
			name: "tag",
			title: "Listing Type",
			type: "string",
			options: {
				list: [
					{ title: "For Sale", value: "For Sale" },
					{ title: "For Rent", value: "For Rent" },
				],
				layout: "radio",
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "price",
			title: "Price",
			type: "number",
			description: "Enter numeric value only (e.g. 1850000)",
			validation: (Rule) => Rule.required().min(0),
		}),

		defineField({
			name: "title",
			title: "Property Title",
			type: "string",
			validation: (Rule) => Rule.required().min(5).max(120),
		}),

		defineField({
			name: "description",
			title: "Property Description",
			type: "text",
			rows: 5,
			validation: (Rule) => Rule.required().min(50).max(500),
		}),

		defineField({
			name: "location",
			title: "Location",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "beds",
			title: "Bedrooms",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),

		defineField({
			name: "baths",
			title: "Bathrooms",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),

		defineField({
			name: "sqft",
			title: "Square Footage",
			type: "string",
			description: "Example: 3,200 sq ft",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "type",
			title: "Property Type",
			type: "string",
			options: {
				list: [
					{ title: "Apartment", value: "Apartment" },
					{ title: "Townhouse", value: "Townhouse" },
					{ title: "Detached", value: "Detached" },
					{ title: "Semi-Detached", value: "Semi-Detached" },
					{ title: "Flat", value: "Flat" },
					{ title: "Manor", value: "Manor" },
					{ title: "Terraced", value: "Terraced" },
					{ title: "Penthouse", value: "Penthouse" },
				],
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "amenities",
			title: "Key Features & Amenities",
			type: "array",
			of: [{ type: "string" }],
			options: { layout: "tags" },
		}),

		defineField({
			name: "contactEmail",
			title: "Contact Email",
			type: "string",
			description: "Email address buyers/renters can reach you on",
			validation: (Rule) => Rule.required().email(),
		}),

		defineField({
			name: "contactPhone",
			title: "Contact Phone",
			type: "string",
			description: "Phone number buyers/renters can reach you on",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "images",
			title: "Property Images",
			type: "array",
			of: [
				{
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({
							name: "alt",
							title: "Alt Text",
							type: "string",
						}),
					],
				},
			],
			validation: (Rule) =>
				Rule.required().min(1).error("At least one image is required"),
		}),
	],

	preview: {
		select: {
			title: "title",
			subtitle: "status",
			media: "images.0",
		},
		prepare({ title, subtitle, media }) {
			const labels: Record<string, string> = {
				pending: "⏳ Pending",
				active: "✅ Active",
				rejected: "❌ Rejected",
			};
			return {
				title,
				subtitle: labels[subtitle] ?? subtitle,
				media,
			};
		},
	},
});

export default userListingType;
