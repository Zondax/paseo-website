import { ABOUT_CONTENT } from "@/constants/content";

export function AboutSection() {
	return (
		<section id="about" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{ABOUT_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{ABOUT_CONTENT.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					<div className="p-8">
						<h3 className="text-3xl mb-6">{ABOUT_CONTENT.sections[0].title}</h3>
						<p className="text-muted-foreground mb-8">
							{ABOUT_CONTENT.sections[0].description}
						</p>
						<div className="space-y-4">
							{ABOUT_CONTENT.sections[0].features.map((feature) => (
								<div key={feature} className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span>{feature}</span>
								</div>
							))}
						</div>
					</div>

					<div className="bg-gradient-to-br from-accent/20 to-transparent p-8 rounded-3xl">
						<h3 className="text-3xl mb-6">{ABOUT_CONTENT.sections[1].title}</h3>
						<p className="text-muted-foreground mb-8">
							{ABOUT_CONTENT.sections[1].description}
						</p>
						<div className="space-y-4">
							{ABOUT_CONTENT.sections[1].features.map((feature) => (
								<div key={feature} className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span>{feature}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
