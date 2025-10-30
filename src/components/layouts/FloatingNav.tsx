"use client";

import { MobileMenu } from "@/components/layouts/MobileMenu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
	ANIMATION_DURATION,
	ISOLATED_NAV_LABELS,
	NAVIGATION_ITEMS,
} from "@/constants/navigation";
import { URLS } from "@/constants/urls";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function FloatingNav() {
	const [activeSection, setActiveSection] = useState("hero");
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Center the active item in the mobile scroll container
	const centerActiveItem = useCallback((sectionId: string) => {
		if (!scrollContainerRef.current) return;

		const container = scrollContainerRef.current;
		const activeButton = container.querySelector(
			`[data-section="${sectionId}"]`,
		) as HTMLElement;

		if (activeButton) {
			const containerWidth = container.offsetWidth;
			const buttonLeft = activeButton.offsetLeft;
			const buttonWidth = activeButton.offsetWidth;
			const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

			container.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			// Update active section
			const sections = [
				"hero",
				...NAVIGATION_ITEMS.map((item) => item.href.substring(1)),
			];
			const currentSection = sections.find((section) => {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					return rect.top <= 100 && rect.bottom >= 100;
				}
				return false;
			});

			if (currentSection) {
				setActiveSection(currentSection);
			}
		};

		const scrollToHash = (hash: string) => {
			if (!hash) {
				return;
			}
			const element = document.getElementById(hash.substring(1));
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		};

		const handlePopState = () => {
			// Handle browser back/forward navigation
			const hash = window.location.hash;
			if (hash) {
				scrollToHash(hash);
			} else {
				// If no hash, scroll to top (hero section)
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		};

		// Handle initial load with hash
		scrollToHash(window.location.hash);

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	// Center active item when section changes on mobile
	useEffect(() => {
		centerActiveItem(activeSection);
	}, [activeSection, centerActiveItem]);

	const handleNavigation = (href: string) => {
		// Check if this is an external link (starts with / or http)
		if (href.startsWith("/") || href.startsWith("http")) {
			window.location.href = href;
			return;
		}

		// Check if we're on the home page
		const isHomePage = window.location.pathname === "/";

		if (!isHomePage) {
			// If not on home page, navigate to home page with the hash
			window.location.href = `/${href}`;
			return;
		}

		// Handle internal hash navigation on home page
		const element = document.getElementById(href.substring(1));
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			// Update the URL without triggering a page reload
			window.history.pushState(null, "", href);
		}
	};

	return (
		<>
			{/* Desktop Navigation - Top with Validator Login */}
			<div className="fixed top-6 left-0 right-0 z-50 hidden md:block px-6">
				<div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
					{/* Left spacer for balance */}
					<div className="flex-1" />

					{/* Centered Navigation Menu */}
					<div className="flex-shrink-0">
						<Menubar className="bg-background/80 backdrop-blur-md border border-border rounded-full px-1.5 shadow-lg h-13 gap-1 flex items-center">
							{NAVIGATION_ITEMS.map((item) => (
								<MenubarMenu key={item.name}>
									<MenubarTrigger
										onClick={() => handleNavigation(item.href)}
										className={cn(
											"h-10 px-4 rounded-full text-sm cursor-pointer font-medium w-fit whitespace-nowrap",
											`transition-all duration-${ANIMATION_DURATION}`,
											activeSection === item.href.substring(1)
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:text-foreground hover:bg-accent",
										)}
									>
										{item.name}
									</MenubarTrigger>
								</MenubarMenu>
							))}
						</Menubar>
					</div>

					{/* Right side buttons */}
					<div className="flex-1 flex items-center justify-end gap-4">
						<ThemeToggle />
						<Button
							onClick={() => window.open(URLS.validatorLogs, "_blank")}
							className="backdrop-blur-md rounded-full h-12 px-6 shadow-lg transition-all duration-200 cursor-pointer"
							variant="outline"
						>
							{ISOLATED_NAV_LABELS.paseoLogs}
							<ExternalLink className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<MobileMenu
				items={NAVIGATION_ITEMS}
				activeItem={activeSection}
				onItemClick={handleNavigation}
				className="md:hidden"
				additionalContent={
					<div className="space-y-3">
						<div className="flex items-center justify-between px-4 py-3">
							<span className="text-sm font-medium">
								{ISOLATED_NAV_LABELS.theme}
							</span>
							<ThemeToggle />
						</div>

						<Button
							onClick={() => window.open(URLS.validatorLogs, "_blank")}
							className="w-full rounded-lg"
							variant="outline"
						>
							{ISOLATED_NAV_LABELS.validatorLogin}
							<ExternalLink className="ml-2 h-4 w-4" />
						</Button>
					</div>
				}
			/>
		</>
	);
}
