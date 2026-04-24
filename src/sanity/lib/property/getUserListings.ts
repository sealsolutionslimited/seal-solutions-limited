import { client } from "../client";
import { groq } from "next-sanity";

export const getUserListings = async (userId: string) => {
	const QUERY = groq`
		*[_type == "userListing" && userId == $userId] | order(_createdAt desc) {
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
			status,
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

	return client.fetch(QUERY, { userId }, { next: { revalidate: 0 } });
};
