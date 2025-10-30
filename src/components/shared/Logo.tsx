"use client";

import Image from "next/image";

import { useThemeFolder } from "@/hooks/useThemeFolder";

interface LogoProps {
	className?: string;
	width?: number;
	height?: number;
	network?: "paseo" | "kusama" | "polkadot";
	variant?: "full" | "signet";
}

export function Logo({
	className = "",
	width = 128,
	height = 128,
	network = "paseo",
	variant = "full",
}: LogoProps) {
	const themeFolder = useThemeFolder();

	// Capitalize network name for alt text
	const networkName = network.charAt(0).toUpperCase() + network.slice(1);

	return (
		<div className={`relative ${className}`}>
			<Image
				src={`/img/logos/${variant}/${themeFolder}/${network}.svg`}
				alt={`${networkName} Network`}
				width={width}
				height={height}
				priority
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	);
}
