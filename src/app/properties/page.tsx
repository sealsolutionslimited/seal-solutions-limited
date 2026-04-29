import { getAllProperties } from "@/sanity/lib/property/getAllProperties";
import PropertiesClient from "./_components/PropertiesClient";

interface PropertiesPageProps {
	searchParams: Promise<{
		location?: string;
		type?: string;
		category?: string;
	}>;
}

const Properties = async ({ searchParams }: PropertiesPageProps) => {
	const properties = await getAllProperties();
	const { location, type, category } = await searchParams;

	return (
		<PropertiesClient
			properties={properties}
			initialLocation={location ?? ""}
			initialType={type ?? "All Types"}
			initialCategory={category ?? "All"}
		/>
	);
};

export default Properties;
