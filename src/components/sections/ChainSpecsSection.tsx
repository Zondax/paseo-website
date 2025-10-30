"use client";

import { CHAIN_SPECS_CONTENT } from "@/constants/chain-specs";
import { Download } from "lucide-react";

export function ChainSpecsSection() {
	return (
		<section id="chain-specs" className="section-primary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{CHAIN_SPECS_CONTENT.title}
					</h2>
					<p className="text-xl opacity-80 max-w-3xl mx-auto">
						{CHAIN_SPECS_CONTENT.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{CHAIN_SPECS_CONTENT.specs.map((spec) => {
						const Icon = spec.icon;
						return (
							<div
								key={spec.title}
								className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-200"
							>
								<div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
									<Icon className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-lg mb-2">{spec.title}</h3>
								<p className="text-muted-foreground text-sm mb-4">
									{spec.description}
								</p>
								<div className="flex items-center justify-between">
									<code className="text-xs bg-background/50 px-2 py-1 rounded text-primary">
										{spec.filename}
									</code>
									<button
										type="button"
										onClick={() => window.open(spec.url, "_blank")}
										className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm transition-colors duration-200 flex items-center space-x-1"
									>
										<Download className="w-3 h-3" />
										<span>{CHAIN_SPECS_CONTENT.downloadLabel}</span>
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
