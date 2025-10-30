"use client";

import { ExternalLink } from "lucide-react";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { TECHNOLOGY_CONTENT } from "@/constants/content";

export function TechnologySection() {
	const techStack = [
		{ name: "Substrate", description: "Modular blockchain framework" },
		{ name: "Polkadot", description: "Interoperability protocol" },
		{ name: "WASM", description: "High-performance runtime" },
		{ name: "Rust", description: "Memory-safe systems language" },
	];

	return (
		<section id="technology" className="section-primary py-24">
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{TECHNOLOGY_CONTENT.title}
					</h2>
					<p className="text-xl opacity-80 max-w-3xl mx-auto">
						{TECHNOLOGY_CONTENT.description}
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-3xl mb-8">Technical Architecture</h3>
						<div className="space-y-6">
							{techStack.map((tech) => (
								<div key={tech.name} className="flex items-start space-x-4">
									<div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
									</div>
									<div>
										<h4 className="mb-2">{tech.name}</h4>
										<p className="text-muted-foreground">{tech.description}</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-12">
							<SecondaryButton
								onClick={() =>
									window.open(
										"https://github.com/paseo-network/runtimes",
										"_blank",
									)
								}
								className="group"
							>
								View Runtimes
								<ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</SecondaryButton>
						</div>
					</div>

					<div className="bg-gradient-to-br from-primary/5 to-accent/20 p-8 rounded-3xl">
						<div className="space-y-8">
							<div className="bg-card p-6 rounded-2xl border border-border">
								<h4 className="mb-4">Performance Metrics</h4>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<div className="text-2xl mb-1">3s</div>
										<div className="text-muted-foreground">Block Time</div>
									</div>
									<div>
										<div className="text-2xl mb-1">5000</div>
										<div className="text-muted-foreground">TPS</div>
									</div>
									<div>
										<div className="text-2xl mb-1">&lt;100ms</div>
										<div className="text-muted-foreground">Latency</div>
									</div>
									<div>
										<div className="text-2xl mb-1">99.99%</div>
										<div className="text-muted-foreground">Availability</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
