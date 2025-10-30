import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("should load the homepage", async ({ page }) => {
		await page.goto("/");

		// Check if the page loaded successfully
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	});
});
