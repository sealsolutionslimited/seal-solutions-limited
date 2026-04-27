import { client } from "../client";
import { groq } from "next-sanity";

const USER_LISTINGS_QUERY = groq`
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

export const getUserListings = async (userId: string) => {
	return client.fetch(USER_LISTINGS_QUERY, { userId }, { next: { revalidate: 0 } });
};
