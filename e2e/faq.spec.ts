import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("FAQ Accordion Interactions", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();

		// Navigate to FAQ section first
		await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
	});

	test("should expand FAQ item when clicked", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();
			const initialState = await firstItem.getAttribute("data-state");

			// Click to expand
			await firstItem.click();

			// Should be open
			const newState = await firstItem.getAttribute("data-state", {
				timeout: 1000,
			});
			expect(newState).toBe("open");
			expect(newState).not.toBe(initialState);
		}
	});

	test("should collapse FAQ item when clicked twice", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();

			// Click to expand
			await firstItem.click();
			await expect(firstItem).toHaveAttribute("data-state", "open");

			// Click again to collapse
			await firstItem.click();
			await expect(firstItem).toHaveAttribute("data-state", "closed");
		}
	});

	test("should be able to expand multiple FAQ items", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const itemCount = await faqItems.count();

		if (itemCount >= 2) {
			// Expand first item
			await faqItems.nth(0).click();
			await page.waitForTimeout(300);

			// Expand second item
			await faqItems.nth(1).click();
			await page.waitForTimeout(300);

			// Both should be open
			const firstState = await faqItems.nth(0).getAttribute("data-state");
			const secondState = await faqItems.nth(1).getAttribute("data-state");

			expect(firstState).toBe("open");
			expect(secondState).toBe("open");
		}
	});

	test("should display FAQ content when expanded", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();

			// Click to expand
			await firstItem.click();
			await page.waitForTimeout(300);

			// Find content area (typically sibling or child with data-state)
			const content = page
				.locator('[data-state="open"]')
				.locator('div[role="region"]')
				.first();

			// Content should be visible
			if ((await content.count()) > 0) {
				await expect(content).toBeVisible();
				const text = await content.textContent();
				expect(text).toBeTruthy();
				expect(text?.length).toBeGreaterThan(0);
			}
		}
	});

	test("should handle rapid FAQ accordion clicks", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const itemCount = await faqItems.count();

		if (itemCount >= 2) {
			// Rapidly click multiple items
			await faqItems.nth(0).click();
			await page.waitForTimeout(50);

			await faqItems.nth(1).click();
			await page.waitForTimeout(50);

			await faqItems.nth(0).click();
			await page.waitForTimeout(300);

			// Should not crash and items should be in valid states
			const state0 = await faqItems.nth(0).getAttribute("data-state");
			const state1 = await faqItems.nth(1).getAttribute("data-state");

			expect(["open", "closed"]).toContain(state0);
			expect(["open", "closed"]).toContain(state1);
		}
	});

	test("should support keyboard navigation through FAQ", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();

			// Focus on first FAQ item
			await firstItem.focus();
			await expect(firstItem).toBeFocused();

			// Press Enter to expand
			await page.keyboard.press("Enter");
			await page.waitForTimeout(300);

			// Should be expanded
			const state = await firstItem.getAttribute("data-state");
			expect(state).toBe("open");
		}
	});

	test("should maintain scroll position when interacting with FAQ", async ({
		page,
	}) => {
		// Get scroll position
		const initialScroll = await page.evaluate(() => window.scrollY);

		const faqItems = homePage.getFaqAccordionItems();
		if ((await faqItems.count()) > 0) {
			// Expand an item
			await faqItems.first().click();
			await page.waitForTimeout(300);

			// Scroll position should not drastically change
			const newScroll = await page.evaluate(() => window.scrollY);
			const scrollDiff = Math.abs(newScroll - initialScroll);

			// Allow some movement for content expansion, but not major jumps
			expect(scrollDiff).toBeLessThan(500);
		}
	});
});
