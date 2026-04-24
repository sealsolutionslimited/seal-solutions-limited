"use server";

import { createClient } from "@sanity/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const writeClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
	token: process.env.SANITY_WRITE_TOKEN,
	useCdn: false,
});

export async function createProperty(formData: FormData) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	const imageFiles = formData.getAll("images") as File[];

	const imageAssets = await Promise.all(
		imageFiles
			.filter((file) => file.size > 0)
			.map(async (file) => {
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				const asset = await writeClient.assets.upload("image", buffer, {
					filename: file.name,
					contentType: file.type,
				});
				return {
					_type: "image" as const,
					_key: asset._id,
					asset: { _type: "reference" as const, _ref: asset._id },
					alt: formData.get("title") as string,
				};
			}),
	);

	const listing = await writeClient.create({
		_type: "userListing",
		userId,
		status: "pending",
		plan: (formData.get("plan") as string) || "basic",
		tag: formData.get("tag") as "For Sale" | "For Rent",
		type: formData.get("type") as string,
		beds: Number(formData.get("beds")),
		baths: Number(formData.get("baths")),
		sqft: formData.get("sqft") as string,
		location: formData.get("location") as string,
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		price: Number(formData.get("price")),
		amenities: JSON.parse((formData.get("amenities") as string) || "[]"),
		contactEmail: formData.get("contactEmail") as string,
		contactPhone: formData.get("contactPhone") as string,
		images: imageAssets,
	});

	revalidatePath("/properties");
	revalidatePath("/my-listings");
	return { success: true, id: listing._id };
}
