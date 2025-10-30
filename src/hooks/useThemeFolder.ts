"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Hook to get the current theme folder ("dark" or "light")
 * Handles SSR hydration by always rendering light theme on server
 * and first client render to avoid hydration mismatch
 */
export function useThemeFolder(): "dark" | "light" {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Always render light theme on server and first client render to avoid hydration mismatch
	const isDark =
		mounted &&
		(theme === "dark" ||
			(theme === "system" &&
				typeof window !== "undefined" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches));

	return isDark ? "dark" : "light";
}
