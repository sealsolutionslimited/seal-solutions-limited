import { client } from "../client";
import { groq } from "next-sanity";

export const getPropertyById = async (id: string) => {
	const PROPERTY_BY_ID_QUERY = groq`
		*[_type == "property" && _id == $id][0] {
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
		PROPERTY_BY_ID_QUERY,
		{ id },
		{
			next: {
				revalidate: 10,
			},
		},
	);
};
