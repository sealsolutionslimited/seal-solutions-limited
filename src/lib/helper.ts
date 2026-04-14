export function priceMatchesRange(price: string, range: string): boolean {
	if (range === "Any Price") return true;
	const num = parseFloat(price.replace(/[^0-9.]/g, ""));
	const isMonthly = price.includes("/mo");
	const annualised = isMonthly ? num * 12 : num;
	switch (range) {
		case "Under £250k":
			return annualised < 250000;
		case "£250k–£500k":
			return annualised >= 250000 && annualised < 500000;
		case "£500k–£1M":
			return annualised >= 500000 && annualised < 1000000;
		case "£1M–£2M":
			return annualised >= 1000000 && annualised < 2000000;
		case "£2M+":
			return annualised >= 2000000;
		default:
			return true;
	}
}
