import { FloatingNav } from "@/components/layouts/FloatingNav";
import { Footer } from "@/components/layouts/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { ChainSpecsSection } from "@/components/sections/ChainSpecsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoSection } from "@/components/sections/LogoSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<FloatingNav />
			<HeroSection />
			<AboutSection />
			<ResourcesSection />
			<LogoSection />
			<FeaturesSection />
			<ComparisonSection />
			{/* <TechnologySection /> */}
			<ChainSpecsSection />
			<FAQSection />
			<Footer />
		</div>
	);
}
