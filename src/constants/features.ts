import type { LucideIcon } from "lucide-react";
import { Code, Cpu, Globe, Shield, Users, Zap } from "lucide-react";

// Feature item structure
interface Feature {
	readonly icon: LucideIcon;
	readonly title: string;
	readonly description: string;
}

// Main features of Paseo testnet
export const FEATURES = [
	{
		icon: Zap,
		title: "Faster Sync",
		description:
			"Significantly faster chain synchronization compared to Rococo testnet.",
	},
	{
		icon: Shield,
		title: "Stable Environment",
		description:
			"Production-like stable testnet environment for reliable development.",
	},
	{
		icon: Code,
		title: "Parachain Support",
		description:
			"Guarantee Parachain Onboarding to Polkadot Ecosystem and testing with permissionless slots.",
	},
	{
		icon: Globe,
		title: "Polkadot Ecosystem",
		description:
			"Native integration with the Polkadot ecosystem and its technologies.",
	},
	{
		icon: Cpu,
		title: "dApp Development",
		description:
			"Optimized environment for decentralized application development and testing.",
	},
	{
		icon: Users,
		title: "Community Managed",
		description:
			"Publicly managed with transparent development by experienced contributors.",
	},
] as const satisfies readonly Feature[];
