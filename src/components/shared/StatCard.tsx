interface StatCardProps {
	value: string;
	label: string;
	className?: string;
}

export function StatCard({ value, label, className = "" }: StatCardProps) {
	return (
		<div className={`text-center ${className}`}>
			<div className="text-3xl font-bold text-primary">{value}</div>
			<div className="text-sm text-muted-foreground">{label}</div>
		</div>
	);
}
