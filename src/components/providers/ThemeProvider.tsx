"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<
	ThemeProviderContextType | undefined
>(undefined);

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "paseo-ui-theme",
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		let currentTheme: string;
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			currentTheme = systemTheme;
		} else {
			root.classList.add(theme);
			currentTheme = theme;
		}

		// Update theme-color meta tag for Safari
		const themeColorMeta = document.querySelector('meta[name="theme-color"]');
		if (themeColorMeta) {
			const newColor = currentTheme === "dark" ? "#09090b" : "#ffffff";
			themeColorMeta.setAttribute("content", newColor);
		}
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem(storageKey) as Theme;
		if (storedTheme) {
			setTheme(storedTheme);
		}
	}, [storageKey]);

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
