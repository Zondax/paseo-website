"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQ_CONTENT } from "@/constants/faq";
import { cn } from "@/lib/utils";

// Helper function to render text with clickable links
const renderAnswerWithLinks = (text: string): React.ReactNode => {
	const urlRegex = /(https?:\/\/[^\s)]+)/g;
	const parts = text.split(urlRegex);

	return parts.map((part, index) => {
		if (!part.match(urlRegex)) {
			return part;
		}

		const key = `${index}-${part}`;

		return (
			<a
				key={key}
				href={part}
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:text-primary/80 underline break-words"
			>
				{part}
			</a>
		);
	});
};

export function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section id="faq" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{FAQ_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{FAQ_CONTENT.description}
					</p>
				</div>

				<div className="space-y-4">
					{FAQ_CONTENT.items.map((item, index) => (
						<div
							key={item.question}
							className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-200"
						>
							<button
								type="button"
								onClick={() => toggleFAQ(index)}
								className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-accent/5 transition-colors duration-200"
							>
								<h3 className="text-lg font-medium pr-4">{item.question}</h3>
								<ChevronDown
									className={cn(
										"w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
										openIndex === index && "rotate-180",
									)}
								/>
							</button>
							<div
								className={cn(
									"px-6 overflow-hidden transition-all duration-300",
									openIndex === index
										? "py-5 border-t border-border"
										: "max-h-0",
								)}
							>
								<p className="text-muted-foreground leading-relaxed">
									{renderAnswerWithLinks(item.answer)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
