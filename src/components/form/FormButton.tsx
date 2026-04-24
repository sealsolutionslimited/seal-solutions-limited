"use client";

import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FormButtonProps extends React.ComponentProps<"button"> {
	loadingText?: string;
}

export function FormButton({ children, className, loadingText = "Sending...", ...props }: FormButtonProps) {
	const { isSubmitting } = useFormikContext();

	return (
		<Button
			type="submit"
			disabled={isSubmitting}
			className={cn(
				"w-full h-12 text-sm font-semibold gap-2 cursor-pointer",
				className
			)}
			{...props}
		>
			{isSubmitting ? (
				<>
					<Loader2 className="size-4 animate-spin" />
					{loadingText}
				</>
			) : (
				children
			)}
		</Button>
	);
}
