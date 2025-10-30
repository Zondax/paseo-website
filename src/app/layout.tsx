import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Paseo Network - Polkadot Testnet",
	description:
		"The next-generation blockchain testnet for developers, validators, and innovators in the Polkadot ecosystem",
	keywords: ["Paseo", "Polkadot", "Testnet", "Blockchain", "Parachain", "Web3"],
	authors: [{ name: "Paseo Network Team" }],
	icons: {
		icon: "/img/logos/signet/paseo-icon.png",
	},
	openGraph: {
		title: "Paseo Network - Polkadot Testnet",
		description:
			"The next-generation blockchain testnet for developers, validators, and innovators",
		type: "website",
	},
	other: {
		"theme-color": "#ffffff",
	},
};

export const viewport: Viewport = {
	colorScheme: "light dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider defaultTheme="system">{children}</ThemeProvider>
			</body>
		</html>
	);
}
