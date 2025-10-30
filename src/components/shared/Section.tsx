import { cn } from "@/lib/utils";

interface SectionProps {
	id?: string;
	className?: string;
	children: React.ReactNode;
	variant?: "default" | "accent" | "dark";
}

export function Section({
	id,
	className = "",
	children,
	variant = "default",
}: SectionProps) {
	const variants = {
		default: "bg-background",
		accent: "bg-accent/10",
		dark: "bg-muted/20",
	};

	return (
		<section id={id} className={cn("py-24", variants[variant], className)}>
			<div className="container mx-auto px-6">{children}</div>
		</section>
	);
}
