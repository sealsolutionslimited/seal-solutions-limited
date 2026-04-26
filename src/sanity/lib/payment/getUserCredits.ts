import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

export interface PaymentRecord {
	_id: string;
	plan: string;
	listingsAllowed: number;
	listingsUsed: number;
	status: "active" | "exhausted";
	paidAt: string;
}

export interface UserCredits {
	records: PaymentRecord[];
	totalAllowed: number;
	totalUsed: number;
	remaining: number;
	hasCredits: boolean;
}

export async function getUserCredits(userId: string): Promise<UserCredits> {
	const records: PaymentRecord[] = await client.fetch(
		`*[_type == "paymentRecord" && userId == $userId && status == "active"] | order(paidAt asc) {
			_id,
			plan,
			listingsAllowed,
			listingsUsed,
			status,
			paidAt
		}`,
		{ userId },
		{ cache: "no-store" },
	);

	const totalAllowed = records.reduce((sum, r) => sum + r.listingsAllowed, 0);
	const totalUsed = records.reduce((sum, r) => sum + r.listingsUsed, 0);
	const remaining = totalAllowed - totalUsed;

	return {
		records,
		totalAllowed,
		totalUsed,
		remaining,
		hasCredits: remaining > 0,
	};
}
