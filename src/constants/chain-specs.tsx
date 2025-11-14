import { Database, FileCode, type LucideIcon, Server } from "lucide-react";
import { URLS } from "./urls";

interface ChainSpec {
	readonly title: string;
	readonly description: string;
	readonly filename: string;
	readonly url: string;
	readonly icon: LucideIcon;
}

interface ChainSpecsContent {
	readonly title: string;
	readonly description: string;
	readonly downloadLabel: string;
	readonly specs: readonly ChainSpec[];
}

// Chain Specs Content
export const CHAIN_SPECS_CONTENT = {
	title: "Chain Specifications",
	description:
		"Download the chain specification files needed to connect to Paseo network and its parachains. All files are hosted and maintained by Zondax.",
	downloadLabel: "Download",
	specs: [
		{
			title: "Paseo Relay Chain",
			description: "Main relay chain specification file",
			filename: "paseo.raw.json",
			url: URLS.chainSpecs.relayChain,
			icon: Server,
		},
		{
			title: "Asset Hub",
			description: "Asset Hub parachain specification",
			filename: "paseo-asset-hub.json",
			url: URLS.chainSpecs.assetHub,
			icon: Database,
		},
		{
			title: "Bridge Hub",
			description: "Bridge Hub parachain specification",
			filename: "paseo-bridge-hub.raw.json",
			url: URLS.chainSpecs.bridgeHub,
			icon: FileCode,
		},
		{
			title: "Coretime Chain",
			description: "Coretime parachain specification",
			filename: "paseo-coretime.raw.json",
			url: URLS.chainSpecs.coretime,
			icon: Server,
		},
		{
			title: "People Chain",
			description: "People parachain specification",
			filename: "paseo-people.raw.json",
			url: URLS.chainSpecs.people,
			icon: Database,
		},
		{
			title: "Collectives Chain",
			description: "Collectives parachain specification",
			filename: "paseo-collectives.raw.json",
			url: URLS.chainSpecs.collectives,
			icon: Database,
		},
	],
} as const satisfies ChainSpecsContent;
