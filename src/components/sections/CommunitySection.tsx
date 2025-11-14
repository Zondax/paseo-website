"use client";

import { BookOpen, Github, MessageCircle } from "lucide-react";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { COMMUNITY_CONTENT } from "@/constants/content";

export function CommunitySection() {
	const iconMap = {
		"Matrix Support": MessageCircle,
		"Matrix Announcements": MessageCircle,
		GitHub: Github,
		"PAS Governance": BookOpen,
	};

	const communityLinks = COMMUNITY_CONTENT.links.map((link) => ({
		...link,
		icon: iconMap[link.title as keyof typeof iconMap],
	}));

	return (
		<section id="community" className="py-24 bg-accent/10">
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{COMMUNITY_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{COMMUNITY_CONTENT.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					{communityLinks.map((link) => (
						<div
							key={link.title}
							className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover:transform hover:scale-105"
						>
							<div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
								<link.icon className="w-6 h-6 text-primary" />
							</div>
							<h3 className="mb-2">{link.title}</h3>
							<p className="text-muted-foreground text-sm mb-3">
								{link.description}
							</p>
							<div className="text-xs text-primary">{link.members}</div>
						</div>
					))}
				</div>

				<div className="bg-gradient-to-r from-primary/10 to-accent/20 p-8 rounded-3xl text-center">
					<h3 className="text-2xl mb-4">
						{COMMUNITY_CONTENT.governance.title}
					</h3>
					<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
						{COMMUNITY_CONTENT.governance.description}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<PrimaryButton>
							{COMMUNITY_CONTENT.governance.buttons.primary.label}
						</PrimaryButton>
						<SecondaryButton>
							{COMMUNITY_CONTENT.governance.buttons.secondary.label}
						</SecondaryButton>
					</div>
				</div>
			</div>
		</section>
	);
}
