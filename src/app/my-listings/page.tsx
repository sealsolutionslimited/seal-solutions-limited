import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserListings } from "@/sanity/lib/property/getUserListings";
import MyListingsClient from "./_components/MyListingsClient";

export default async function MyListingsPage() {
	const { userId } = await auth();
	if (!userId) redirect("/sign-in");

	const listings = await getUserListings(userId);

	return <MyListingsClient listings={listings} />;
}
