import { client } from "../client";
import { groq } from "next-sanity";

export const getPropertyById = async (id: string) => {
	const QUERY = groq`
		*[
			(_type == "property" || _type == "userListing") &&
			_id == $id
		][0] {
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
			description,
			amenities,
			status,
			userId,
			contactEmail,
			contactPhone,
			plan,
			images[]{
				_key,
				asset->{
					url
				},
				alt
			}
		}
	`;

	return client.fetch(QUERY, { id }, { next: { revalidate: 10 } });
};
