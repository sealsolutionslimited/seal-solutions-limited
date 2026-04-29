export interface PropertyListing {
	_id: string;
	_type?: "property" | "userListing";
	tag?: string | null;
	price?: number | null;
	title?: string | null;
	location?: string | null;
	postcode?: string | null;
	beds?: number | null;
	baths?: number | null;
	sqft?: string | null;
	type?: string | null;
	featured?: boolean | null;
	description?: string | null;
	amenities?: string[] | null;
	// User listing only
	contactEmail?: string | null;
	contactPhone?: string | null;
	userId?: string | null;
	status?: "pending" | "active" | "rejected" | null;
	plan?: string | null;
	images?: Array<{
		_key: string;
		asset?: { _ref?: string; _type?: string; url?: string } | null;
		alt?: string | null;
	}> | null;
}
