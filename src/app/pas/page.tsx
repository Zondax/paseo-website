import { FloatingNav } from "@/components/layouts/FloatingNav";
import { Footer } from "@/components/layouts/Footer";
import { GitHubFileBrowser } from "@/components/sections/GitHubFileBrowser";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PAS_CONTENT } from "@/constants/content";

export default function PASPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<FloatingNav />
			<Section className="pt-32">
				<SectionHeader
					title={PAS_CONTENT.title}
					description={PAS_CONTENT.description}
				/>
				<GitHubFileBrowser
					repoConfig={PAS_CONTENT.repoConfig}
					title={PAS_CONTENT.browserTitle}
				/>
			</Section>
			<Footer />
		</div>
	);
}
