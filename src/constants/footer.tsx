import { Bell, MessageCircle } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { URLS } from "./urls";

export interface FooterLink {
	readonly label: string;
	readonly href: string;
	readonly external?: boolean;
}

interface SocialIcons extends FooterLink {
	readonly icon: React.ReactNode;
}

interface Sections {
	readonly title: string;
	readonly links: readonly FooterLink[];
}

// Footer content structure
interface FooterContent {
	readonly description: string;
	readonly sections: {
		readonly network: Sections;
		readonly developers: Sections;
		readonly support: Sections;
	};
	readonly social: {
		readonly github: SocialIcons;
		readonly twitter: SocialIcons;
		readonly matrixSupport: SocialIcons;
		readonly matrixAnnouncements: SocialIcons;
	};
	readonly legal: {
		readonly copyright: string;
		readonly privacyPolicy: FooterLink;
		readonly termsOfUse: FooterLink;
		readonly builtBy: string;
	};
}

// Footer content
export const FOOTER_CONTENT = {
	description:
		"A decentralized, community-run, stable testnet for Parachain teams and dApp developers in the Polkadot ecosystem.",
	sections: {
		network: {
			title: "Network",
			links: [
				{ label: "About Paseo", href: "#about", external: false },
				{ label: "Features", href: "#features", external: false },
				{ label: "Resources", href: "#resources", external: false },
			],
		},
		developers: {
			title: "Developers",
			links: [
				{
					label: "GitHub Repos",
					href: URLS.github,
					external: true,
				},
				{
					label: "Chain Specs",
					href: URLS.githubChainSpecs,
					external: true,
				},
				{
					label: "Support",
					href: URLS.matrixSupport,
					external: true,
				},
			],
		},
		support: {
			title: "Support",
			links: [
				{
					label: "Announcements",
					href: URLS.matrixAnnouncements,
					external: true,
				},
				{
					label: "Governance (PAS)",
					href: URLS.githubGovernance,
					external: true,
				},
				{
					label: "Polkadot Ecosystem",
					href: URLS.polkadotEcosystem,
					external: true,
				},
			],
		},
	},
	social: {
		github: {
			href: URLS.github,
			label: "GitHub",
			icon: <LuGithub size={20} />,
		},
		twitter: {
			href: URLS.twitter,
			label: "X (Twitter)",
			icon: <RiTwitterXFill size={20} />,
		},
		matrixSupport: {
			href: URLS.matrixSupport,
			label: "Matrix Support",
			icon: <MessageCircle size={20} />,
		},
		matrixAnnouncements: {
			href: URLS.matrixAnnouncements,
			label: "Matrix Announcements",
			icon: <Bell size={20} />,
		},
	},
	legal: {
		copyright: "© 2025",
		privacyPolicy: {
			label: "Privacy Policy",
			href: URLS.zondaxPrivacy,
		},
		termsOfUse: {
			label: "Terms of Use",
			href: URLS.zondaxTerms,
		},
		builtBy: "by",
	},
} as const satisfies FooterContent;
