"use client";

import {
	CONTRIBUTORS,
	CORE_MAINTAINERS,
	type Contributor,
} from "@/constants/contributors";
import { useThemeFolder } from "@/hooks/useThemeFolder";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function LogoSection() {
	const themeFolder = useThemeFolder();
	const contributorsScrollRef = useRef<HTMLDivElement>(null);
	const maintainersScrollRef = useRef<HTMLDivElement>(null);
	const [isContributorsHovered, setIsContributorsHovered] = useState(false);
	const [isMaintainersHovered, setIsMaintainersHovered] = useState(false);
	const [shouldAnimateContributors, setShouldAnimateContributors] =
		useState(false);
	const [shouldAnimateMaintainers, setShouldAnimateMaintainers] =
		useState(false);

	// Check if maintainers and contributors fit in container width
	useEffect(() => {
		const checkIfContributorsShouldAnimate = () => {
			const scrollElement = contributorsScrollRef.current;
			if (!scrollElement) return;

			// Calculate approximate width needed for all contributors
			const contributorWidth = 100 + 24; // min-w-[100px] + gap-6
			const totalWidth = CONTRIBUTORS.length * contributorWidth;
			const containerWidth = scrollElement.parentElement?.offsetWidth || 0;

			setShouldAnimateContributors(totalWidth > containerWidth * 0.8); // Buffer for responsiveness
		};

		const checkIfMaintainersShouldAnimate = () => {
			const scrollElement = maintainersScrollRef.current;
			if (!scrollElement) return;

			// Calculate approximate width needed for all maintainers
			const maintainerWidth = 160 + 48; // min-w-[160px] + gap-12
			const totalWidth = CORE_MAINTAINERS.length * maintainerWidth;
			const containerWidth = scrollElement.parentElement?.offsetWidth || 0;

			setShouldAnimateMaintainers(totalWidth > containerWidth * 0.8); // Buffer for responsiveness
		};

		checkIfContributorsShouldAnimate();
		checkIfMaintainersShouldAnimate();
		window.addEventListener("resize", checkIfContributorsShouldAnimate);
		window.addEventListener("resize", checkIfMaintainersShouldAnimate);

		return () => {
			window.removeEventListener("resize", checkIfContributorsShouldAnimate);
			window.removeEventListener("resize", checkIfMaintainersShouldAnimate);
		};
	}, []);

	// Animation for contributors
	useEffect(() => {
		if (!shouldAnimateContributors) return;

		const scrollElement = contributorsScrollRef.current;
		if (!scrollElement) return;

		let animationId: number;
		let scrollPosition = scrollElement.scrollLeft;
		let targetSpeed = isContributorsHovered ? 0.3 : 1;
		let currentSpeed = targetSpeed;

		const animate = () => {
			if (scrollElement) {
				// Smooth speed transition to reduce lag
				currentSpeed += (targetSpeed - currentSpeed) * 0.1;
				scrollPosition += currentSpeed;

				// Reset position when we've scrolled past the first set
				const maxScroll = scrollElement.scrollWidth / 2;
				if (scrollPosition >= maxScroll) {
					scrollPosition = 0;
				}

				scrollElement.scrollLeft = scrollPosition;
			}
			animationId = requestAnimationFrame(animate);
		};

		// Update target speed when hover state changes
		targetSpeed = isContributorsHovered ? 0.3 : 1;
		animationId = requestAnimationFrame(animate);

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [isContributorsHovered, shouldAnimateContributors]);

	// Animation for maintainers
	useEffect(() => {
		if (!shouldAnimateMaintainers) return;

		const scrollElement = maintainersScrollRef.current;
		if (!scrollElement) return;

		let animationId: number;
		let scrollPosition = scrollElement.scrollLeft;
		let targetSpeed = isMaintainersHovered ? 0.3 : 1;
		let currentSpeed = targetSpeed;

		const animate = () => {
			if (scrollElement) {
				// Smooth speed transition to reduce lag
				currentSpeed += (targetSpeed - currentSpeed) * 0.1;
				scrollPosition += currentSpeed;

				// Reset position when we've scrolled past the first set
				const maxScroll = scrollElement.scrollWidth / 2;
				if (scrollPosition >= maxScroll) {
					scrollPosition = 0;
				}

				scrollElement.scrollLeft = scrollPosition;
			}
			animationId = requestAnimationFrame(animate);
		};

		// Update target speed when hover state changes
		targetSpeed = isMaintainersHovered ? 0.3 : 1;
		animationId = requestAnimationFrame(animate);

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [isMaintainersHovered, shouldAnimateMaintainers]);

	return (
		<section id="partners" className="section-primary py-16">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-2xl md:text-3xl font-bold mb-6">
						Who maintains Paseo?
					</h2>
				</div>

				<div className="text-center mb-8">
					<h3 className="text-lg font-semibold mb-6">Core Maintainers</h3>

					{/* Core Maintainers Display */}
					<section
						className={`relative ${shouldAnimateMaintainers ? "overflow-hidden cursor-pointer" : "overflow-visible"}`}
						onMouseEnter={
							shouldAnimateMaintainers
								? () => setIsMaintainersHovered(true)
								: undefined
						}
						onMouseLeave={
							shouldAnimateMaintainers
								? () => setIsMaintainersHovered(false)
								: undefined
						}
						aria-label={
							shouldAnimateMaintainers
								? "Scrolling core maintainers showcase"
								: "Core maintainers showcase"
						}
					>
						<div
							ref={maintainersScrollRef}
							className={`flex gap-8 sm:gap-12 py-2 ${shouldAnimateMaintainers ? "overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" : "justify-center flex-wrap"}`}
						>
							{/* Duplicate the array for seamless scrolling when animating */}
							{(shouldAnimateMaintainers
								? [...CORE_MAINTAINERS, ...CORE_MAINTAINERS]
								: CORE_MAINTAINERS
							).map((logo: Contributor, index: number) => {
								const MaintainerContent = logo.filename ? (
									<Image
										src={`/img/logos/full/${themeFolder}/${logo.filename}`}
										alt={logo.alt}
										width={logo.width ? Math.round(logo.width * 0.9) : 108}
										height={logo.height ? Math.round(logo.height * 0.9) : 36}
										className="opacity-75 hover:opacity-100 transition-opacity duration-300 object-contain filter brightness-110"
										style={{ maxWidth: "100%", height: "auto" }}
									/>
								) : (
									<span className="text-base font-semibold opacity-75 whitespace-nowrap">
										{logo.name}
									</span>
								);

								if (logo.url) {
									return (
										<a
											key={`${logo.name}-${index}`}
											href={logo.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center p-6 bg-background/40 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-background/60 transition-all duration-300 shadow-md hover:shadow-lg min-w-[160px] h-24 cursor-pointer flex-shrink-0"
										>
											{MaintainerContent}
										</a>
									);
								}

								return (
									<div
										key={`${logo.name}-${index}`}
										className="flex items-center justify-center p-6 bg-background/40 rounded-xl border border-border/40 transition-all duration-300 shadow-md min-w-[160px] h-24 flex-shrink-0"
									>
										{MaintainerContent}
									</div>
								);
							})}
						</div>

						{/* Fade gradients on edges - only show when animating */}
						{shouldAnimateMaintainers && (
							<>
								<div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
								<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
							</>
						)}
					</section>
				</div>

				<div className="text-center mt-12">
					<p className="text-sm opacity-80 mb-6">and many more contributors</p>

					{/* Contributors Display */}
					<section
						className={`relative ${shouldAnimateContributors ? "overflow-hidden cursor-pointer" : "overflow-visible"}`}
						onMouseEnter={
							shouldAnimateContributors
								? () => setIsContributorsHovered(true)
								: undefined
						}
						onMouseLeave={
							shouldAnimateContributors
								? () => setIsContributorsHovered(false)
								: undefined
						}
						aria-label={
							shouldAnimateContributors
								? "Scrolling contributors showcase"
								: "Contributors showcase"
						}
					>
						<div
							ref={contributorsScrollRef}
							className={`flex gap-6 py-2 ${shouldAnimateContributors ? "overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" : "justify-center flex-wrap"}`}
						>
							{/* Duplicate the array for seamless scrolling when animating */}
							{(shouldAnimateContributors
								? [...CONTRIBUTORS, ...CONTRIBUTORS]
								: CONTRIBUTORS
							).map((logo: Contributor, index: number) => {
								const ContributorContent = logo.filename ? (
									<Image
										src={`/img/logos/full/${themeFolder}/${logo.filename}`}
										alt={logo.alt}
										width={logo.width ? Math.round(logo.width * 0.6) : 60}
										height={logo.height ? Math.round(logo.height * 0.6) : 20}
										className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 object-contain filter brightness-110"
										style={{ maxWidth: "100%", height: "auto" }}
									/>
								) : (
									<span className="text-xs font-bold opacity-70 whitespace-nowrap">
										{logo.name}
									</span>
								);

								if (logo.url) {
									return (
										<a
											key={`${logo.name}-${index}`}
											href={logo.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center p-3 bg-background/30 rounded-lg border border-border/30 hover:border-primary/20 hover:bg-background/40 transition-all duration-300 shadow-sm hover:shadow-md min-w-[100px] h-14 cursor-pointer group flex-shrink-0"
										>
											{ContributorContent}
										</a>
									);
								}

								return (
									<div
										key={`${logo.name}-${index}`}
										className="flex items-center justify-center p-3 bg-background/30 rounded-lg border border-border/30 transition-all duration-300 shadow-sm min-w-[100px] h-14 group flex-shrink-0"
									>
										{ContributorContent}
									</div>
								);
							})}
						</div>

						{/* Fade gradients on edges - only show when animating */}
						{shouldAnimateContributors && (
							<>
								<div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
								<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
							</>
						)}
					</section>
				</div>
			</div>
		</section>
	);
}
