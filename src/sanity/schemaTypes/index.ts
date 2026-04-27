import { type SchemaTypeDefinition } from "sanity";
import propertyType from "./property";
import userListingType from "./userListingType";
import paymentRecordType from "./paymentRecord";
import cleaningBookingType from "./cleaningBooking";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [propertyType, userListingType, paymentRecordType, cleaningBookingType],
};
