"use client";

import { ResourceCard } from "@/components/shared/ResourceCard";
import { RESOURCES_CONTENT } from "@/constants/content";
import { RESOURCES } from "@/constants/resources";

export function ResourcesSection() {
	return (
		<section id="resources" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{RESOURCES_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{RESOURCES_CONTENT.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
					{RESOURCES.map((resource) => (
						<ResourceCard
							key={resource.title}
							icon={resource.icon}
							title={resource.title}
							description={resource.description}
							href={resource.href}
							isExternal={resource.isExternal}
							buttonLabel={resource.buttonLabel}
							modalData={resource.modalData}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
