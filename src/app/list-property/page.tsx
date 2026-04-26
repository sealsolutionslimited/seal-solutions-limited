import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import NavbarStatic from "@/components/layout/NavbarStatic";
import PricingPlans from "./_components/PricingPlans";

const readClient = createClient({ projectId, dataset, apiVersion, useCdn: false });

async function getRemainingCredits(userId: string): Promise<number> {
	const records = await readClient.fetch<{ listingsAllowed: number; listingsUsed: number }[]>(
		`*[_type == "paymentRecord" && userId == $userId && status == "active"]{
			listingsAllowed, listingsUsed
		}`,
		{ userId },
		{ cache: "no-store" },
	);
	return records.reduce((sum, r) => sum + (r.listingsAllowed - r.listingsUsed), 0);
}

export default async function ListPropertyPage() {
	const { userId } = await auth();

	if (userId) {
		const remaining = await getRemainingCredits(userId);
		if (remaining > 0) redirect("/list-property/submit");
	}

	return (
		<>
			<NavbarStatic />
			<PricingPlans />
		</>
	);
}
