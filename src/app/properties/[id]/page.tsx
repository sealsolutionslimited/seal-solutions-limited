import { notFound } from "next/navigation";
import PropertyDetailsClient from "../_components/PropertyDetailsClient";
import { getPropertyById } from "@/sanity/lib/property/getPropertyById";

interface PropertyPageProps {
	params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
	const { id } = await params;

	const property = await getPropertyById(id);

	if (!property) notFound();

	return <PropertyDetailsClient property={property} />;
}
