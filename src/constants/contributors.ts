// Contributor structure
export interface Contributor {
	readonly name: string;
	readonly filename?: string; // Optional for text-only contributors
	readonly alt: string;
	readonly url?: string; // Optional for contributors without websites
	readonly width?: number;
	readonly height?: number;
}

// Core maintainers of the Paseo project
export const CORE_MAINTAINERS = [
	{
		name: "R0gue",
		filename: "rogue.svg",
		alt: "R0gue",
		url: "https://r0gue.io",
		width: 120,
		height: 40,
	},
	{
		name: "Zondax",
		filename: "zondax.svg",
		alt: "Zondax",
		url: "https://zondax.ch",
		width: 120,
		height: 40,
	},
] as const satisfies readonly Contributor[];

// Community contributors
export const CONTRIBUTORS = [
	{
		name: "Parity",
		filename: "parity.svg",
		alt: "Parity Technologies",
		url: "https://www.parity.io",
		width: 100,
		height: 32,
	},
	{
		name: "Subscan",
		filename: "subscan.svg",
		alt: "Subscan",
		url: "https://subscan.io",
		width: 100,
		height: 32,
	},
	{
		name: "Turboflakes",
		filename: "turboflakes.svg",
		alt: "Turboflakes",
		url: "https://www.turboflakes.io",
		width: 100,
		height: 32,
	},
	{
		name: "Dwellir",
		filename: "dwellir.svg",
		alt: "Dwellir",
		url: "https://www.dwellir.com",
		width: 100,
		height: 32,
	},
	{
		name: "CoinStudio",
		alt: "CoinStudio",
	},
	{
		name: "Mile",
		alt: "Mile",
	},
	{
		name: "ParaNodes",
		alt: "ParaNodes",
	},
	{
		name: "amforc",
		alt: "amforc",
	},
	{
		name: "BestValidator",
		alt: "BestValidator",
	},
	{
		name: "BluefinTuna",
		alt: "BluefinTuna",
	},
	{
		name: "dpstk",
		alt: "dpstk",
	},
	{
		name: "ExtraCoin",
		alt: "ExtraCoin",
	},
	{
		name: "Faraday",
		alt: "Faraday",
	},
	{
		name: "GatoTech",
		alt: "GatoTech",
	},
	{
		name: "LuckyFriday",
		alt: "LuckyFriday",
	},
	{
		name: "Metaspan",
		alt: "Metaspan",
	},
	{
		name: "OpenBitLab",
		alt: "OpenBitLab",
	},
	{
		name: "Polkadotters",
		alt: "Polkadotters",
	},
	{
		name: "RadiumBlock",
		alt: "RadiumBlock",
	},
	{
		name: "Rotko",
		alt: "Rotko",
	},
	{
		name: "SIK | CRifferent",
		alt: "SIK | CRifferent",
	},
	{
		name: "StakePlus",
		alt: "StakePlus",
	},
	{
		name: "Staker Space",
		alt: "Staker Space",
	},
	{
		name: "StakeWorld",
		alt: "StakeWorld",
	},
	{
		name: "StakingLand",
		alt: "StakingLand",
	},
	{
		name: "STKD",
		alt: "STKD",
	},
	{
		name: "ValidOrange",
		alt: "ValidOrange",
	},
] as const satisfies readonly Contributor[];
