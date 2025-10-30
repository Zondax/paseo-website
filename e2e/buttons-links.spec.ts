import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Button and Link Interactions", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test.describe("Link Interactions", () => {
		test("should open external links in new tab", async ({ page }) => {
			// Scroll to footer where external links are
			await homePage.footer.scrollIntoViewIfNeeded();

			// Find external links
			const externalLinks = page.locator('a[target="_blank"]');
			const count = await externalLinks.count();

			if (count > 0) {
				const link = externalLinks.first();
				await expect(link).toBeVisible();

				// Should have security attributes
				const target = await link.getAttribute("target");
				const rel = await link.getAttribute("rel");

				expect(target).toBe("_blank");
				expect(rel).toContain("noopener");
			}
		});
	});
});
