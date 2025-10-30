"use client";

import type { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	type ResourceDetailsData,
	ResourceDetailsModal,
} from "./ResourceDetailsModal";

interface ResourceCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	href?: string;
	isExternal?: boolean;
	buttonLabel?: string;
	modalData?: ResourceDetailsData;
	className?: string;
}

export function ResourceCard({
	icon: Icon,
	title,
	description,
	href,
	isExternal = false,
	buttonLabel,
	modalData,
	className = "",
}: ResourceCardProps) {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleButtonClick = () => {
		if (modalData) {
			setIsModalOpen(true);
		} else if (href) {
			if (isExternal) {
				window.open(href, "_blank", "noopener,noreferrer");
			} else {
				router.push(href);
			}
		}
	};

	const buttonContent = (
		<Button className="w-full mt-4" onClick={handleButtonClick}>
			{buttonLabel ||
				(modalData
					? "View Details"
					: isExternal
						? "Visit Site"
						: `Go to ${title}`)}
			{isExternal && !modalData && <ExternalLink className="w-4 h-4 ml-2" />}
		</Button>
	);

	return (
		<>
			<Card
				className={`group hover:shadow-lg transition-all duration-300 flex flex-col h-full ${className}`}
			>
				<CardContent className="p-6 flex flex-col flex-grow">
					<div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
						<Icon className="w-7 h-7 text-primary" />
					</div>
					<h3 className="text-xl font-semibold mb-2">{title}</h3>
					<p className="text-muted-foreground mb-4 flex-grow">{description}</p>
					{buttonContent}
				</CardContent>
			</Card>

			{modalData && (
				<ResourceDetailsModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title={title}
					data={modalData}
				/>
			)}
		</>
	);
}
