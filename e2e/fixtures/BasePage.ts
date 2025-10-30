import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Base Page Object Model
 * Provides common functionality for all page objects
 */
export class BasePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Navigate to a specific path
	 */
	async goto(path = "/"): Promise<void> {
		await this.page.goto(path);
		await this.page.waitForLoadState("domcontentloaded");
	}

	/**
	 * Wait for network to be idle
	 */
	async waitForNetworkIdle(): Promise<void> {
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Scroll to a section by ID
	 */
	async scrollToSection(sectionId: string): Promise<void> {
		await this.page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
		await expect(this.page.locator(`#${sectionId}`)).toBeInViewport({
			timeout: 1000,
		});
	}

	/**
	 * Check if element is in viewport
	 */
	async isInViewport(locator: Locator): Promise<boolean> {
		const box = await locator.boundingBox();
		if (!box) return false;

		const viewport = this.page.viewportSize();
		if (!viewport) return false;

		return (
			box.y + box.height > 0 &&
			box.y < viewport.height &&
			box.x + box.width > 0 &&
			box.x < viewport.width
		);
	}

	/**
	 * Get section by ID
	 */
	getSection(sectionId: string): Locator {
		return this.page.locator(`#${sectionId}`);
	}
}
