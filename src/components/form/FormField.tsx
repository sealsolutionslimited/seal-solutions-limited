"use client";

import { cn } from "@/lib/utils";

interface FormFieldProps {
	label: string;
	error?: string;
	children: React.ReactNode;
	className?: string;
}

export function FormField({ label, error, children, className }: FormFieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
				{label}
			</label>
			{children}
			{error && (
				<p className="text-xs text-red-500 mt-0.5">{error}</p>
			)}
		</div>
	);
}
