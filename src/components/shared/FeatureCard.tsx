import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	className?: string;
}

export function FeatureCard({
	icon: Icon,
	title,
	description,
	className = "",
}: FeatureCardProps) {
	return (
		<Card
			className={`group hover:shadow-lg transition-all duration-300 ${className}`}
		>
			<CardContent className="p-6">
				<div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
					<Icon className="w-7 h-7 text-primary" />
				</div>
				<h3 className="text-xl font-semibold mb-2">{title}</h3>
				<p className="text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}
