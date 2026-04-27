import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
	step: number;
	serviceType: string;
	bedrooms: number;
	bathrooms: number;
	extras: string[];
	address: string;
	postcode: string;
	date: string;
	timeSlot: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	notes: string;

	setField: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
	toggleExtra: (extra: string) => void;
	nextStep: () => void;
	prevStep: () => void;
	reset: () => void;
}

const defaults = {
	step: 1,
	serviceType: "",
	bedrooms: 1,
	bathrooms: 1,
	extras: [] as string[],
	address: "",
	postcode: "",
	date: "",
	timeSlot: "",
	customerName: "",
	customerEmail: "",
	customerPhone: "",
	notes: "",
};

export const useBookingStore = create<BookingState>()(
	persist(
		(set) => ({
			...defaults,

			setField: (key, value) => set({ [key]: value }),

			toggleExtra: (extra) =>
				set((s) => ({
					extras: s.extras.includes(extra)
						? s.extras.filter((e) => e !== extra)
						: [...s.extras, extra],
				})),

			nextStep: () => set((s) => ({ step: s.step + 1 })),
			prevStep: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
			reset: () => set(defaults),
		}),
		{
			name: "seal-cleaning-booking",
			partialize: (s) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { step, ...rest } = s;
				void step;
				return rest;
			},
		},
	),
);
