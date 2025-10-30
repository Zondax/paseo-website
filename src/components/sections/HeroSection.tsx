"use client";

import { ExternalLink, FileText } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { StatCard } from "@/components/shared/StatCard";
import { HERO_CONTENT } from "@/constants/content";
import { HERO_STATS } from "@/constants/stats";

export function HeroSection() {
	return (
		<section
			id="hero"
			className="section-primary relative pt-16 md:pt-24 pb-32 md:pb-24 min-h-[100dvh] flex items-center justify-center overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-6 text-center">
				<div className="mb-8">
					<div className="flex justify-center mb-8">
						<Logo className="animate-float" />
					</div>
					<h1 className="text-4xl md:text-5xl mb-6 font-bold">
						{HERO_CONTENT.title}
					</h1>
					<p className="text-xl opacity-80 max-w-3xl mx-auto">
						{HERO_CONTENT.description}
					</p>
				</div>

				<div className="flex flex-row gap-4 justify-center mb-16">
					<PrimaryButton
						className="group"
						onClick={() => {
							const aboutSection = document.getElementById("about");
							if (aboutSection) {
								aboutSection.scrollIntoView({ behavior: "smooth" });
							}
						}}
					>
						Learn More
					</PrimaryButton>
					<SecondaryButton
						onClick={() =>
							window.open("https://github.com/paseo-network", "_blank")
						}
					>
						<FileText className="mr-2 h-4 w-4" />
						Documentation
						<ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</SecondaryButton>
				</div>

				<div className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{HERO_STATS.map((stat) => (
						<StatCard key={stat.label} value={stat.value} label={stat.label} />
					))}
				</div>
			</div>
		</section>
	);
}
