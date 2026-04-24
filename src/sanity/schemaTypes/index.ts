import { type SchemaTypeDefinition } from "sanity";
import propertyType from "./property";
import userListingType from "./userListingType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [propertyType, userListingType],
};
