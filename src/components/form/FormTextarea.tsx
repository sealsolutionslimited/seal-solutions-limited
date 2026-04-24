"use client";

import { useField } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/form/FormField";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.ComponentProps<"textarea"> {
	name: string;
	label: string;
	containerClassName?: string;
}

export function FormTextarea({ name, label, containerClassName, className, ...props }: FormTextareaProps) {
	const [field, meta] = useField(name);
	const hasError = meta.touched && Boolean(meta.error);

	return (
		<FormField label={label} error={meta.touched ? meta.error : undefined} className={containerClassName}>
			<Textarea
				{...field}
				{...props}
				aria-invalid={hasError}
				className={cn(
					"border-gray-200 focus-visible:border-navy focus-visible:ring-navy/20 text-sm resize-none",
					className
				)}
			/>
		</FormField>
	);
}
