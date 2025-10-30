import { FeatureCard } from "@/components/shared/FeatureCard";
import { FEATURES_CONTENT } from "@/constants/content";
import { FEATURES } from "@/constants/features";

export function FeaturesSection() {
	return (
		<section id="features" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{FEATURES_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{FEATURES_CONTENT.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{FEATURES.map((feature) => (
						<FeatureCard
							key={feature.title}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
