"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = ComponentProps<typeof Button>;

export function SecondaryButton({
	className,
	size,
	...props
}: SecondaryButtonProps) {
	return (
		<Button
			variant="outline"
			size={size}
			className={cn("rounded-full h-12 cursor-pointer gap-0 px-2", className)}
			{...props}
		/>
	);
}
