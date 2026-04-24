"use client";

import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form/FormField";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.ComponentProps<"input"> {
	name: string;
	label: string;
	containerClassName?: string;
}

export function FormInput({ name, label, containerClassName, className, ...props }: FormInputProps) {
	const [field, meta] = useField(name);
	const hasError = meta.touched && Boolean(meta.error);

	return (
		<FormField label={label} error={meta.touched ? meta.error : undefined} className={containerClassName}>
			<Input
				{...field}
				{...props}
				aria-invalid={hasError}
				className={cn(
					"h-11 border-gray-200 focus-visible:border-navy focus-visible:ring-navy/20 text-sm",
					className
				)}
			/>
		</FormField>
	);
}
