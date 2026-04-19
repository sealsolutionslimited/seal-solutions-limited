import { client } from "../client";
import { groq } from "next-sanity";

export const getAllProperties = async () => {
	const ALL_PROPERTIES_QUERY = groq`
		*[_type == "property"] | order(_createdAt desc) {
			_id,
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
				asset->{
					url
				},
				alt
			}
		}
	`;

	return client.fetch(
		ALL_PROPERTIES_QUERY,
		{},
		{
			next: {
				revalidate: 10,
			},
		},
	);
};
