export const SERVICE_TYPES: Record<
	string,
	{ label: string; description: string; basePrice: number; duration: string }
> = {
	regularClean: {
		label: "Regular Clean",
		description:
			"Ideal for weekly or fortnightly upkeep. Covers all living areas, kitchen surfaces, and bathrooms.",
		basePrice: 6000,
		duration: "2–3 hrs",
	},
	deepClean: {
		label: "Deep Clean",
		description:
			"Thorough top-to-bottom clean including behind appliances, inside cupboards, and hard-to-reach areas.",
		basePrice: 12000,
		duration: "4–6 hrs",
	},
	endOfTenancy: {
		label: "End of Tenancy",
		description:
			"Comprehensive clean to meet landlord and letting agency standards. Deposit-back guarantee.",
		basePrice: 18000,
		duration: "5–8 hrs",
	},
	carpetClean: {
		label: "Carpet Clean",
		description:
			"Professional steam cleaning to remove stains, odours, and deep-seated dirt from all carpets.",
		basePrice: 8000,
		duration: "2–4 hrs",
	},
	ovenClean: {
		label: "Oven Clean",
		description:
			"Specialist cleaning for your oven, hob, extractor hood, and grill. Fully stripped and degreased.",
		basePrice: 6000,
		duration: "1–2 hrs",
	},
};

export const EXTRAS: Record<string, { label: string; price: number }> = {
	insideFridge: { label: "Inside Fridge", price: 1500 },
	insideOven: { label: "Inside Oven", price: 2000 },
	laundry: { label: "Laundry (one load)", price: 1500 },
	ironing: { label: "Ironing (1 hour)", price: 2000 },
	insideCabinets: { label: "Inside Cabinets", price: 2500 },
	interiorWindows: { label: "Interior Windows", price: 3000 },
};

export const BED_EXTRA = 1500;
export const BATH_EXTRA = 1000;

export const TIME_SLOTS = [
	"8:00 AM",
	"10:00 AM",
	"12:00 PM",
	"2:00 PM",
	"4:00 PM",
];

export function calculateTotal(
	serviceType: string,
	bedrooms: number,
	bathrooms: number,
	extras: string[],
): number {
	const base = SERVICE_TYPES[serviceType]?.basePrice ?? 6000;
	const bedExtra = Math.max(0, bedrooms - 1) * BED_EXTRA;
	const bathExtra = Math.max(0, bathrooms - 1) * BATH_EXTRA;
	const extrasTotal = extras.reduce(
		(sum, e) => sum + (EXTRAS[e]?.price ?? 0),
		0,
	);
	return base + bedExtra + bathExtra + extrasTotal;
}

export function formatPrice(pence: number): string {
	return `£${(pence / 100).toFixed(0)}`;
}

export function getMinDate(): string {
	const d = new Date();
	d.setDate(d.getDate() + 1);
	return d.toISOString().split("T")[0];
}

export function getMaxDate(): string {
	const d = new Date();
	d.setDate(d.getDate() + 60);
	return d.toISOString().split("T")[0];
}
