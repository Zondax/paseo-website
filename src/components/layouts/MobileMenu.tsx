"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ISOLATED_NAV_LABELS, type MenuItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
	items: readonly MenuItem[];
	activeItem?: string;
	onItemClick?: (href: string) => void;
	additionalContent?: React.ReactNode;
	className?: string;
}

export function MobileMenu({
	items,
	activeItem,
	onItemClick,
	additionalContent,
	className = "",
}: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef<HTMLDivElement>(null);

	const handleItemClick = (item: MenuItem) => {
		if (item.onClick) {
			item.onClick();
		} else if (onItemClick) {
			onItemClick(item.href);
		}
		setIsOpen(false);
	};

	// Focus management and accessibility
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			// Close on Escape
			if (e.key === "Escape") {
				setIsOpen(false);
				return;
			}

			// Focus trapping with Tab
			if (e.key === "Tab") {
				const focusableElements = dialogRef.current?.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				);

				if (!focusableElements || focusableElements.length === 0) return;

				const firstElement = focusableElements[0] as HTMLElement;
				const lastElement = focusableElements[
					focusableElements.length - 1
				] as HTMLElement;

				if (e.shiftKey) {
					// Shift + Tab: if currently on first element, focus last
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					// Tab: if currently on last element, focus first
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";

			// Focus the first interactive element when menu opens
			setTimeout(() => {
				const firstFocusable = dialogRef.current?.querySelector(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				) as HTMLElement;
				firstFocusable?.focus();
			}, 100);
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<>
			{/* Burger Menu Button */}
			<div className={cn("fixed top-6 right-6 z-50", className)}>
				<Button
					variant="outline"
					size="sm"
					onClick={() => setIsOpen(!isOpen)}
					className="rounded-full h-12 w-12 p-0 bg-background/80 backdrop-blur-md border border-border shadow-lg"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					aria-controls="mobile-menu-content"
				>
					{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</Button>
			</div>

			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40"
					role="dialog"
					aria-modal="true"
					aria-labelledby="mobile-menu-title"
					ref={dialogRef}
				>
					{/* Backdrop */}
					<Button
						variant="ghost"
						className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default p-0 h-auto rounded-none border-none hover:bg-black/50"
						onClick={() => setIsOpen(false)}
						aria-label="Close menu"
						tabIndex={-1}
					/>

					{/* Menu Content */}
					<div
						id="mobile-menu-content"
						className="absolute top-20 right-6 left-6 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg p-6"
					>
						<div className="space-y-4">
							{/* Hidden title for screen readers */}
							<h2 id="mobile-menu-title" className="sr-only">
								{ISOLATED_NAV_LABELS.navigationMenu}
							</h2>
							{/* Navigation Items */}
							<div className="space-y-2">
								{items.map((item) => (
									<Button
										key={item.name}
										variant={
											activeItem === item.href.substring(1)
												? "default"
												: "ghost"
										}
										onClick={() => handleItemClick(item)}
										className="w-full justify-start px-4 py-3 h-auto text-sm font-medium"
									>
										{item.name}
									</Button>
								))}
							</div>

							{/* Additional Content */}
							{additionalContent && (
								<>
									<div className="border-t border-border" />
									{additionalContent}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
