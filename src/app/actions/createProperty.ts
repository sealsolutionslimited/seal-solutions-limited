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

interface PaymentRecord {
	_id: string;
	listingsAllowed: number;
	listingsUsed: number;
}

async function getAvailableRecord(userId: string, paymentRecordId: string): Promise<PaymentRecord> {
	// Prefer the specific record tied to this session; fall back to any active record for the user
	const record: PaymentRecord | null = await writeClient.fetch(
		`*[_type == "paymentRecord" && _id == $id && userId == $userId && status == "active" && listingsUsed < listingsAllowed][0]{
			_id, listingsAllowed, listingsUsed
		}`,
		{ id: paymentRecordId, userId },
	);

	if (record) return record;

	// Fallback: oldest active record with remaining credits
	const fallback: PaymentRecord | null = await writeClient.fetch(
		`*[_type == "paymentRecord" && userId == $userId && status == "active" && listingsUsed < listingsAllowed] | order(paidAt asc) [0]{
			_id, listingsAllowed, listingsUsed
		}`,
		{ userId },
	);

	if (!fallback) {
		throw new Error(
			"NO_CREDITS: You have no remaining listing credits. Please purchase a plan to continue.",
		);
	}

	return fallback;
}

export async function createProperty(formData: FormData) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	const paymentRecordId = formData.get("paymentRecordId") as string;
	if (!paymentRecordId) throw new Error("Missing payment record. Please restart the listing flow.");

	// Check available credits before uploading images (fail fast)
	const record = await getAvailableRecord(userId, paymentRecordId);

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
		plan: (formData.get("plan") as string) || "starter",
		paymentRecordId: record._id,
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

	// Atomically increment listingsUsed and exhaust the record if fully used
	const newUsed = record.listingsUsed + 1;
	await writeClient
		.patch(record._id)
		.set({
			listingsUsed: newUsed,
			...(newUsed >= record.listingsAllowed ? { status: "exhausted" } : {}),
		})
		.commit();

	revalidatePath("/properties");
	revalidatePath("/my-listings");
	return { success: true, id: listing._id };
}
