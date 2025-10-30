// Stat item structure
interface Stat {
	readonly value: string;
	readonly label: string;
}

// Hero section statistics
export const HERO_STATS = [
	{ value: "100+", label: "Active Validators" },
	{ value: "99,9%+", label: "Network Uptime" },
	{ value: "100%", label: "Community Driven" },
] as const satisfies readonly Stat[];
