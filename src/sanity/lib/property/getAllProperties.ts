import { client } from "../client";
import { groq } from "next-sanity";

const FIELDS = `
	_id,
	_type,
	tag,
	price,
	title,
	location,
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

export const getAllProperties = async () => {
	const QUERY = groq`
		*[
			(_type == "property") ||
			(_type == "userListing" && status == "active")
		] | order(_createdAt desc) {
			${FIELDS}
		}
	`;

	return client.fetch(QUERY, {}, { next: { revalidate: 10 } });
};
