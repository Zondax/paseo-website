interface SectionHeaderProps {
	title: string;
	description?: string;
	className?: string;
}

export function SectionHeader({
	title,
	description,
	className = "",
}: SectionHeaderProps) {
	return (
		<div className={`text-center mb-16 ${className}`}>
			<h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
			{description && (
				<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
					{description}
				</p>
			)}
		</div>
	);
}
