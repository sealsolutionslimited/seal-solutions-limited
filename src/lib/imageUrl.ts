import { client } from "@/sanity/lib/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
