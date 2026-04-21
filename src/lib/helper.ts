export function priceMatchesRange(
	price: number | undefined,
	range: string,
): boolean {
	if (range === "Any Price") return true;
	if (price === undefined) return false;

	switch (range) {
		case "Under £500k":
			return price < 500000;
		case "£500k – £1M":
			return price >= 500000 && price < 1000000;
		case "£1M – £2M":
			return price >= 1000000 && price < 2000000;
		case "£2M+":
			return price >= 2000000;
		default:
			return true;
	}
}

export const formatToPounds = (amount?: number) => {
	if (amount == null || isNaN(amount)) return "—";

	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	}).format(amount);
};
