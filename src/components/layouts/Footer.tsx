"use client";

import Image from "next/image";
import { FOOTER_CONTENT, type FooterLink } from "@/constants/footer";
import { URLS } from "@/constants/urls";
import { useThemeFolder } from "@/hooks/useThemeFolder";
import { cn } from "@/lib/utils";
import { Logo } from "../shared/Logo";

export function Footer() {
	const themeFolder = useThemeFolder();

	const renderLinks = (link: FooterLink, className?: string) => (
		<a
			href={link.href}
			className={cn(
				"text-muted-foreground hover:text-primary hover:underline transition-colors duration-200",
				className,
			)}
			target={link.external ? "_blank" : undefined}
			rel={link.external ? "noopener noreferrer" : undefined}
		>
			{link.label}
		</a>
	);

	return (
		<footer className="section-primary border-t border-primary-foreground/20">
			<div className="max-w-7xl mx-auto px-6 py-16 pb-44 md:pb-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
					<div className="lg:col-span-2">
						<div className="flex items-center space-x-3 mb-4">
							<Logo width={128} height={64} className="w-24 h-16" />
						</div>
						<p className="text-muted-foreground mb-6 max-w-sm">
							{FOOTER_CONTENT.description}
						</p>
						<div className="flex gap-3">
							{Object.entries(FOOTER_CONTENT.social).map(([_key, social]) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
									aria-label={social.label}
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{Object.entries(FOOTER_CONTENT.sections).map(([key, section]) => (
						<div key={key}>
							<h4 className="mb-4">{section.title}</h4>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.label}>{renderLinks(link)}</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-muted-foreground text-sm">
						{FOOTER_CONTENT.legal.copyright}
					</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						{renderLinks(FOOTER_CONTENT.legal.privacyPolicy, "text-sm")}
						{renderLinks(FOOTER_CONTENT.legal.termsOfUse, "text-sm")}
						<div className="flex items-center gap-2">
							<p className="text-muted-foreground text-sm">
								{FOOTER_CONTENT.legal.builtBy}
							</p>
							<a
								href={URLS.zondax}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-80 transition-opacity duration-200"
							>
								<Image
									src={`/img/logos/full/${themeFolder}/zondax.svg`}
									alt="Zondax"
									width={70}
									height={24}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
