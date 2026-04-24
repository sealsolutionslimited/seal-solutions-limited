import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ListingDraft {
	step: number;
	tag: "For Sale" | "For Rent" | "";
	type: string;
	beds: string;
	baths: string;
	sqft: string;
	title: string;
	location: string;
	description: string;
	price: string;
	amenities: string[];
	contactEmail: string;
	contactPhone: string;
	images: File[];
	previews: string[];
}

interface ListingStore extends ListingDraft {
	setField: <K extends keyof ListingDraft>(
		key: K,
		value: ListingDraft[K],
	) => void;
	toggleAmenity: (amenity: string) => void;
	addImages: (files: FileList) => void;
	removeImage: (index: number) => void;
	nextStep: () => void;
	prevStep: () => void;
	reset: () => void;
}

const initial: ListingDraft = {
	step: 1,
	tag: "",
	type: "",
	beds: "",
	baths: "",
	sqft: "",
	title: "",
	location: "",
	description: "",
	price: "",
	amenities: [],
	contactEmail: "",
	contactPhone: "",
	images: [],
	previews: [],
};

export const useListingStore = create<ListingStore>()(
	persist(
		(set, get) => ({
			...initial,

			setField: (key, value) =>
				set({ [key]: value } as Partial<ListingStore>),

			toggleAmenity: (amenity) => {
				const { amenities } = get();
				set({
					amenities: amenities.includes(amenity)
						? amenities.filter((a) => a !== amenity)
						: [...amenities, amenity],
				});
			},

			addImages: (files) => {
				const { images, previews } = get();
				const newFiles = Array.from(files).slice(0, 15 - images.length);
				const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
				set({
					images: [...images, ...newFiles],
					previews: [...previews, ...newPreviews],
				});
			},

			removeImage: (index) => {
				const { images, previews } = get();
				URL.revokeObjectURL(previews[index]);
				set({
					images: images.filter((_, i) => i !== index),
					previews: previews.filter((_, i) => i !== index),
				});
			},

			nextStep: () => set((s) => ({ step: s.step + 1 })),
			prevStep: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
			reset: () => set({ ...initial }),
		}),
		{
			name: "seal-listing-draft",
			partialize: ({ images, previews, ...rest }) => rest,
		},
	),
);
