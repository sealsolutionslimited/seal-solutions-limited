import { Listing } from "@/types/types";
import { Building2, Home, Star } from "lucide-react";

export const tagColors: Record<string, string> = {
	"For Sale": "bg-[#162050] text-white",
	"For Rent": "bg-emerald-600 text-white",
	"New Development": "bg-amber-500 text-white",
};

export const propertyTypes = [
	"All Types",
	"Apartment",
	"Flat",
	"Detached",
	"Semi-Detached",
	"Terraced",
	"Townhouse",
	"Manor",
	"Penthouse",
];

export const priceRanges = [
	"Any Price",
	"Under £250k",
	"£250k–£500k",
	"£500k–£1M",
	"£1M–£2M",
	"£2M+",
];

export const bedroomOptions = ["Any Beds", "1+", "2+", "3+", "4+", "5+"];

export const sortOptions = [
	"Newest First",
	"Price: Low to High",
	"Price: High to Low",
	"Most Popular",
];

export const categoryTabs = ["All", "For Sale", "For Rent"];

export const listings: Listing[] = [
	{
		id: 1,
		tag: "For Sale",
		price: "£1,850,000",
		title: "Grand 5-Bedroom Victorian Townhouse",
		description:
			"An elegant Victorian townhouse featuring spacious interiors, a private garden, high ceilings, and premium finishes in one of London’s most prestigious neighborhoods.",
		location: "Kensington, London",
		beds: 5,
		baths: 4,
		sqft: "3,200 sq ft",
		type: "Townhouse",
		featured: true,
		image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
	},
	{
		id: 2,
		tag: "For Rent",
		price: "£3,800/mo",
		title: "Modern 2-Bedroom City Apartment",
		description:
			"A sleek city apartment with floor-to-ceiling windows, modern kitchen fittings, concierge service, and stunning skyline views in Canary Wharf.",
		location: "Canary Wharf, London",
		beds: 2,
		baths: 2,
		sqft: "950 sq ft",
		type: "Apartment",
		featured: false,
		image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
	},
	{
		id: 3,
		tag: "For Sale",
		price: "£685,000",
		title: "Charming 4-Bedroom Detached House",
		description:
			"A beautifully maintained detached family home with landscaped gardens, spacious living areas, and a peaceful suburban setting in Yorkshire.",
		location: "Harrogate, Yorkshire",
		beds: 4,
		baths: 3,
		sqft: "2,100 sq ft",
		type: "Detached",
		featured: false,
		image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
	},
	{
		id: 4,
		tag: "For Rent",
		price: "£425,000",
		title: "Contemporary 3-Bedroom Semi-Detached",
		description:
			"A stylish semi-detached home offering open-plan living, a modern kitchen, private parking, and excellent transport links in vibrant Manchester.",
		location: "Didsbury, Manchester",
		beds: 3,
		baths: 2,
		sqft: "1,450 sq ft",
		type: "Semi-Detached",
		featured: true,
		image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
	},
	{
		id: 5,
		tag: "For Rent",
		price: "£1,600/mo",
		title: "Stylish 1-Bedroom Period Flat",
		description:
			"A charming period flat with original architectural details, bright interiors, and a cozy atmosphere located in the heart of Clifton.",
		location: "Clifton, Bristol",
		beds: 1,
		baths: 1,
		sqft: "620 sq ft",
		type: "Flat",
		featured: false,
		image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
	},
	{
		id: 6,
		tag: "For Sale",
		price: "£2,400,000",
		title: "Stunning 6-Bedroom Country Manor",
		description:
			"A luxurious country manor surrounded by rolling countryside, featuring expansive grounds, elegant interiors, and exceptional privacy in the Cotswolds.",
		location: "Cotswolds, Gloucestershire",
		beds: 6,
		baths: 5,
		sqft: "5,800 sq ft",
		type: "Manor",
		featured: true,
		image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
	},
	{
		id: 7,
		tag: "For Sale",
		price: "£340,000",
		title: "Bright 3-Bedroom Terraced House",
		description:
			"A bright and welcoming terraced home with spacious bedrooms, a private backyard, and close proximity to schools, shops, and local parks.",
		location: "Jesmond, Newcastle",
		beds: 3,
		baths: 2,
		sqft: "1,200 sq ft",
		type: "Terraced",
		featured: false,
		image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
	},
	{
		id: 8,
		tag: "For Rent",
		price: "£2,200/mo",
		title: "Penthouse 2-Bedroom Apartment",
		description:
			"A premium penthouse apartment offering panoramic city views, luxury finishes, private balcony, and exclusive access to top-tier amenities.",
		location: "City Centre, Edinburgh",
		beds: 2,
		baths: 2,
		sqft: "1,100 sq ft",
		type: "Penthouse",
		featured: false,
		image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
	},
	{
		id: 9,
		tag: "For Rent",
		price: "£295,000",
		title: "Modern 2-Bedroom Apartment",
		description:
			"A contemporary apartment with smart-home features, open-plan design, secure parking, and easy access to Birmingham’s business district.",
		location: "Digbeth, Birmingham",
		beds: 2,
		baths: 2,
		sqft: "820 sq ft",
		type: "Apartment",
		featured: false,
		image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
	},
];

export const FEATURED_CARDS = [
	{
		title: "Chelsea Townhouse",
		price: "£3,200,000",
		beds: 4,
		baths: 3,
		tag: "For Sale",
		tagColor: "bg-emerald-500",
		icon: Home,
		delay: "0s",
		top: "8%",
		right: "2%",
		width: "260px",
	},
	{
		title: "Canary Wharf Flat",
		price: "£2,850 / mo",
		beds: 2,
		baths: 1,
		tag: "To Let",
		tagColor: "bg-blue-500",
		icon: Building2,
		delay: "0.4s",
		top: "42%",
		right: "10%",
		width: "240px",
	},
	{
		title: "Kensington Garden Apt",
		price: "£1,750,000",
		beds: 3,
		baths: 2,
		tag: "New",
		tagColor: "bg-amber-500",
		icon: Star,
		delay: "0.8s",
		top: "70%",
		right: "4%",
		width: "252px",
	},
];

export const STAT_BADGES = [
	{
		label: "Avg. London Price",
		value: "£685k",
		top: "20%",
		left: "62%",
		delay: "0.2s",
	},
	{
		label: "Properties Listed",
		value: "12,400+",
		top: "55%",
		left: "58%",
		delay: "1s",
	},
];
