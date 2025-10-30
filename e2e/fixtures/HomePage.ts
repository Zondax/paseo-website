import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Home Page Object Model
 * Represents the homepage with all its sections and navigation
 */
export class HomePage extends BasePage {
	// Navigation elements
	readonly desktopNav: Locator;
	readonly mobileMenuButton: Locator;
	readonly themeToggle: Locator;
	readonly validatorLoginButton: Locator;

	// Sections
	readonly heroSection: Locator;
	readonly aboutSection: Locator;
	readonly resourcesSection: Locator;
	readonly logoSection: Locator;
	readonly featuresSection: Locator;
	readonly comparisonSection: Locator;
	readonly chainSpecsSection: Locator;
	readonly faqSection: Locator;
	readonly footer: Locator;

	constructor(page: Page) {
		super(page);

		// Navigation
		this.desktopNav = page.locator('[role="menubar"]').first();
		this.mobileMenuButton = page.locator('button[aria-label="Menu"]');
		this.themeToggle = page.locator('button[aria-label*="theme" i]').first();
		this.validatorLoginButton = page.getByRole("button", {
			name: /paseo logs/i,
		});

		// Sections
		this.heroSection = page.locator("#hero");
		this.aboutSection = page.locator("#about");
		this.resourcesSection = page.locator("#resources");
		this.logoSection = page.locator("section").filter({
			has: page.locator("h2:has-text('Trusted by teams')"),
		});
		this.featuresSection = page.locator("#features");
		this.comparisonSection = page.locator("#comparison");
		this.chainSpecsSection = page.locator("#chain-specs");
		this.faqSection = page.locator("#faq");
		this.footer = page.locator("footer");
	}

	/**
	 * Navigate to homepage
	 */
	async goto(): Promise<void> {
		await super.goto("/");
	}

	/**
	 * Click a navigation item by name
	 */
	async clickNavItem(itemName: string): Promise<void> {
		const size = this.page.viewportSize();
		const isMobile = size ? size.width < 768 : false;

		if (isMobile) {
			// Open mobile menu first
			await this.mobileMenuButton.click();
			await this.page.waitForTimeout(200); // Wait for menu animation
		}

		// Click the navigation item
		this.page.getByRole("menuitem", { name: itemName }).first().click();

		// Wait for scroll animation
		const section = this.getSection(itemName);
		await section.waitFor({ state: "visible", timeout: 1000 });
	}

	/**
	 * Get the currently active navigation item
	 */
	getActiveNavItem(): Locator {
		return this.page.locator('[role="menuitem"].bg-primary').first();
	}

	/**
	 * Click theme toggle
	 */
	async toggleTheme(): Promise<void> {
		await this.themeToggle.click();
		await this.page.waitForTimeout(100);
	}

	/**
	 * Get all section IDs in order
	 */
	getSectionIds(): string[] {
		return [
			"hero",
			"about",
			"resources",
			"features",
			"comparison",
			"chain-specs",
			"faq",
		];
	}

	/**
	 * Get all navigation items
	 */
	async getNavigationItems(): Promise<string[]> {
		const items = await this.desktopNav
			.locator('[role="menuitem"]')
			.allTextContents();
		return items;
	}

	/**
	 * Verify section is visible
	 */
	async isSectionVisible(sectionId: string): Promise<boolean> {
		const section = this.getSection(sectionId);
		return await section.isVisible();
	}

	/**
	 * Scroll through all sections sequentially
	 */
	async scrollThroughAllSections(): Promise<void> {
		const sectionIds = this.getSectionIds();
		for (const sectionId of sectionIds) {
			await this.scrollToSection(sectionId);
			await this.page.waitForTimeout(200);
		}
	}

	/**
	 * Click a section link in the navigation
	 */
	async clickSectionLink(sectionName: string): Promise<void> {
		await this.page
			.getByRole("menuitem", { name: sectionName, exact: true })
			.click();
	}

	/**
	 * Wait for section to be in viewport
	 */
	async waitForSectionInView(sectionId: string): Promise<void> {
		const section = this.getSection(sectionId);
		await section.waitFor({ state: "visible", timeout: 1000 });
	}

	/**
	 * Get FAQ accordion items
	 */
	getFaqAccordionItems(): Locator {
		return this.faqSection.locator("[data-state]");
	}

	/**
	 * Click FAQ item by index
	 */
	async clickFaqItem(index: number): Promise<void> {
		const items = this.getFaqAccordionItems();
		await items.nth(index).click();
	}

	/**
	 * Get footer links by section
	 */
	getFooterLinks(section: string): Locator {
		return this.footer.getByText(section).locator("..");
	}
}
