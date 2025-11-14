"use client";

import { Check, ExternalLink, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { COMPARISON_CONTENT } from "@/constants/content";

export function ComparisonSection() {
	return (
		<section id="comparison" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{COMPARISON_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-4xl mx-auto">
						{COMPARISON_CONTENT.description}
					</p>
				</div>

				{/* Features Table */}
				<div className="mb-12">
					<h3 className="text-2xl font-bold mb-6 text-center md:text-left">
						{COMPARISON_CONTENT.features.title}
					</h3>
					<div className="bg-gradient-to-br from-background to-accent/5 rounded-3xl p-4 md:p-6 border border-border/50 shadow-xl">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b-2 border-border">
										<th className="text-left py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[200px]">
											Feature
										</th>
										<th className="text-center py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[120px]">
											<div className="flex flex-col items-center gap-1">
												<Logo
													network="paseo"
													variant="signet"
													width={24}
													height={24}
												/>
												<span>Paseo</span>
											</div>
										</th>
										<th className="text-center py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[120px]">
											<div className="flex flex-col items-center gap-1">
												<Logo
													network="kusama"
													variant="signet"
													width={24}
													height={24}
												/>
												<span>Kusama</span>
											</div>
										</th>
										<th className="text-center py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[120px]">
											<div className="flex flex-col items-center gap-1">
												<Logo
													network="polkadot"
													variant="signet"
													width={24}
													height={24}
												/>
												<span>Polkadot</span>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{COMPARISON_CONTENT.features.items.map((item) => (
										<tr
											key={item.feature}
											className="border-b border-border/30"
										>
											<td className="py-4 px-4 md:px-6">
												<div className="flex items-center gap-2">
													{item.link ? (
														<a
															href={item.link}
															target="_blank"
															rel="noopener noreferrer"
															className="font-semibold text-sm md:text-base text-foreground transition-colors hover:text-primary hover:underline flex items-center gap-2"
															aria-label={`Learn more about ${item.feature}`}
														>
															{item.feature}
															<ExternalLink className="w-4 h-4" />
														</a>
													) : (
														<span className="font-semibold text-sm md:text-base">
															{item.feature}
														</span>
													)}
												</div>
											</td>
											<td className="py-4 px-4 md:px-6 text-center">
												{typeof item.paseo === "string" ? (
													<div className="flex justify-center items-center min-h-[40px]">
														<span className="text-sm md:text-base font-medium text-muted-foreground">
															{item.paseo}
														</span>
													</div>
												) : item.paseo ? (
													<div className="flex justify-center">
														<div className="p-2 rounded-full">
															<Check className="w-5 h-5 text-green-600 dark:text-green-400" />
														</div>
													</div>
												) : (
													<div className="flex justify-center">
														<div className="p-2 rounded-full">
															<X className="w-5 h-5 text-red-500 dark:text-red-400" />
														</div>
													</div>
												)}
											</td>
											<td className="py-4 px-4 md:px-6 text-center">
												{typeof item.kusama === "string" ? (
													<div className="flex justify-center items-center min-h-[40px]">
														<span className="text-sm md:text-base font-medium text-muted-foreground">
															{item.kusama}
														</span>
													</div>
												) : item.kusama ? (
													<div className="flex justify-center">
														<div className="p-2 rounded-full">
															<Check className="w-5 h-5 text-green-600 dark:text-green-400" />
														</div>
													</div>
												) : (
													<div className="flex justify-center">
														<div className="p-2 rounded-full">
															<X className="w-5 h-5 text-red-500 dark:text-red-400" />
														</div>
													</div>
												)}
											</td>
											<td className="py-4 px-4 md:px-6 text-center">
												{typeof item.polkadot === "string" ? (
													<div className="flex justify-center items-center min-h-[40px]">
														<span className="text-sm md:text-base font-medium text-muted-foreground">
															{item.polkadot}
														</span>
													</div>
												) : item.polkadot ? (
													<div className="flex justify-center">
														<div className="p-2 rounded-full">
															<Check className="w-5 h-5 text-green-600 dark:text-green-400" />
														</div>
													</div>
												) : (
													<div className="flex justify-center">
														<div className="p-2 rounded-full">
															<X className="w-5 h-5 text-red-500 dark:text-red-400" />
														</div>
													</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Costs Table */}
				<div>
					<h3 className="text-2xl font-bold mb-6 text-center md:text-left">
						{COMPARISON_CONTENT.costs.title}
					</h3>
					<div className="bg-gradient-to-br from-background to-accent/5 rounded-3xl p-4 md:p-6 border border-border/50 shadow-xl">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b-2 border-border">
										<th className="text-left py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[200px]">
											Operation
										</th>
										<th className="text-center py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[150px]">
											<div className="flex flex-col items-center gap-1">
												<Logo
													network="paseo"
													variant="signet"
													width={24}
													height={24}
												/>
												<span>Paseo (PAS)</span>
											</div>
										</th>
										<th className="text-center py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[150px]">
											<div className="flex flex-col items-center gap-1">
												<Logo
													network="kusama"
													variant="signet"
													width={24}
													height={24}
												/>
												<span>Kusama (KSM)</span>
											</div>
										</th>
										<th className="text-center py-4 px-4 md:px-6 font-bold text-base md:text-lg min-w-[150px]">
											<div className="flex flex-col items-center gap-1">
												<Logo
													network="polkadot"
													variant="signet"
													width={24}
													height={24}
												/>
												<span>Polkadot (DOT)</span>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{COMPARISON_CONTENT.costs.items.map((item) => (
										<tr
											key={item.feature}
											className="border-b border-border/30"
										>
											<td className="py-4 px-4 md:px-6 font-semibold text-sm md:text-base text-foreground">
												{item.feature}
											</td>
											<td className="py-4 px-4 md:px-6 text-center">
												<div className="flex justify-center items-center min-h-[40px]">
													<span
														className={`text-sm md:text-base font-medium text-muted-foreground`}
													>
														{item.paseo}
													</span>
												</div>
											</td>
											<td className="py-4 px-4 md:px-6 text-center">
												<div className="flex justify-center items-center min-h-[40px]">
													<span
														className={`text-sm md:text-base font-medium text-muted-foreground`}
													>
														{item.kusama}
													</span>
												</div>
											</td>
											<td className="py-4 px-4 md:px-6 text-center">
												<div className="flex justify-center items-center min-h-[40px]">
													<span
														className={`text-sm md:text-base font-medium text-muted-foreground`}
													>
														{item.polkadot}
													</span>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="text-center mt-12">
					<p className="text-muted-foreground max-w-3xl mx-auto">
						{COMPARISON_CONTENT.footer}
					</p>
				</div>
			</div>
		</section>
	);
}
