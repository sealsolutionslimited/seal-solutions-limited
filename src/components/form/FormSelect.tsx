"use client";

import { useField, useFormikContext } from "formik";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/form/FormField";
import { cn } from "@/lib/utils";

interface SelectOption {
	label: string;
	value: string;
}

interface FormSelectProps {
	name: string;
	label: string;
	placeholder?: string;
	options: SelectOption[];
	containerClassName?: string;
	className?: string;
}

export function FormSelect({
	name,
	label,
	placeholder,
	options,
	containerClassName,
	className,
}: FormSelectProps) {
	const [field, meta] = useField(name);
	const { setFieldValue, setFieldTouched } = useFormikContext();
	const hasError = meta.touched && Boolean(meta.error);

	return (
		<FormField label={label} error={meta.touched ? meta.error : undefined} className={containerClassName}>
			<Select
				value={field.value}
				onValueChange={(val) => {
					setFieldValue(name, val);
					setFieldTouched(name, true, false);
				}}
			>
				<SelectTrigger
					aria-invalid={hasError}
					className={cn(
						"h-11 w-full border-gray-200 focus-visible:border-navy focus-visible:ring-navy/20 text-sm",
						className
					)}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</FormField>
	);
}
