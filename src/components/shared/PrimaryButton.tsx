"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = ComponentProps<typeof Button>;

export function PrimaryButton({
	className,
	size,
	...props
}: PrimaryButtonProps) {
	return (
		<Button
			size={size}
			className={cn("rounded-full h-12 cursor-pointer gap-2", className)}
			{...props}
		/>
	);
}
