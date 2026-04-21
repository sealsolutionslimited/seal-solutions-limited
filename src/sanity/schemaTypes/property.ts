import { House } from "lucide-react";
import { defineField, defineType } from "sanity";

const propertyType = defineType({
	name: "property",
	title: "Property",
	type: "document",
	icon: House,
	fields: [
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
			name: "featured",
			title: "Featured Property",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "images",
			title: "Property Images",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
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
			subtitle: "location",
			media: "image",
		},
	},
});

export default propertyType;
