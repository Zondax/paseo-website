// Navigation item structure
export interface MenuItem {
	name: string;
	href: string;
	onClick?: () => void;
}

// Main navigation menu items
export const NAVIGATION_ITEMS: readonly MenuItem[] = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Resources", href: "#resources" },
	{ name: "Features", href: "#features" },
	{ name: "Comparison", href: "#comparison" },
	{ name: "Chain Specs", href: "#chain-specs" },
	{ name: "FAQ", href: "#faq" },
];

// Labels for auxiliary UI elements (external links, theme toggle, modal titles)
export const ISOLATED_NAV_LABELS = {
	paseoLogs: "Paseo Logs",
	validatorLogin: "Validator Login",
	theme: "Theme",
	navigationMenu: "Navigation Menu",
} as const;

// Navigation behavior constants
export const SCROLL_THRESHOLD = 100 as const;
export const ANIMATION_DURATION = 200 as const;
