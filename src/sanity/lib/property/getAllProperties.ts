import { client } from "../client";
import { groq } from "next-sanity";

const FIELDS = `
	_id,
	_type,
	tag,
	price,
	title,
	location,
	postcode,
	beds,
	baths,
	sqft,
	type,
	featured,
	images[]{
		_key,
		asset->{
			url
		},
		alt
	}
`;

const ALL_PROPERTIES_QUERY = groq`
	*[
		(_type == "property") ||
		(_type == "userListing" && status == "active")
	] | order(_createdAt desc) {
		${FIELDS}
	}
`;

export const getAllProperties = async () => {
	return client.fetch(ALL_PROPERTIES_QUERY, {}, { next: { revalidate: 10 } });
};
