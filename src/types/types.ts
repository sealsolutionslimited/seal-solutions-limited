export interface Listing {
	id: number;
	tag: "For Sale" | "For Rent";
	price: string;
	title: string;
	description: string;
	location: string;
	beds: number;
	baths: number;
	sqft: string;
	type: string;
	featured: boolean;
	image: string;
}

export interface PlaceResult {
	result: {
		name_1: string;
		county_unitary?: string;
		region_name?: string;
	}[];
}

export interface SuggestionItem {
	label: string;
	sub: string;
}
