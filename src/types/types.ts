export interface Listing {
	id: number;
	tag: "For Sale" | "For Rent" | "New Development";
	price: string;
	title: string;
	location: string;
	beds: number;
	baths: number;
	sqft: string;
	type: string;
	featured: boolean;
	image: string;
}
