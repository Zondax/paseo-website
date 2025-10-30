import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Rapid Interaction Handling", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test("should handle rapid navigation clicks", async ({ page }) => {
		// Rapidly click different sections
		await page.getByRole("menuitem", { name: "About", exact: true }).click();

		await page
			.getByRole("menuitem", { name: "Features", exact: true })
			.first()
			.click();

		const faqMenuItem = await page.getByRole("menuitem", {
			name: "FAQ",
			exact: true,
		});
		await faqMenuItem.waitFor({ state: "visible", timeout: 10000 });
		await faqMenuItem.click();

		// Should end up at FAQ section
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
	});

	test("should scroll smoothly when clicking while scrolling", async ({
		page,
	}) => {
		// Start scrolling to one section
		await page
			.getByRole("menuitem", { name: "Comparison", exact: true })
			.click();

		// Immediately click another section
		const faqMenuItem = await page.getByRole("menuitem", {
			name: "FAQ",
			exact: true,
		});
		await faqMenuItem.waitFor({ state: "visible", timeout: 10000 });
		await faqMenuItem.click();

		// Should end at FAQ section without errors
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
	});

	test("should handle multiple rapid section changes", async ({ page }) => {
		// Rapidly navigate through multiple sections
		const sections = ["About", "Resources", "Features", "Comparison", "FAQ"];

		for (const section of sections) {
			if (section === "Features") {
				const featuresMenuItem = await page
					.getByRole("menuitem", { name: section, exact: true })
					.first();
				await featuresMenuItem.waitFor({ state: "visible", timeout: 10000 });
				await featuresMenuItem.click();
			} else {
				const sectionMenuItem = await page.getByRole("menuitem", {
					name: section,
					exact: true,
				});
				await sectionMenuItem.waitFor({ state: "visible", timeout: 10000 });
				await sectionMenuItem.click();
			}
		}

		// Should be at FAQ section
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
	});

	test("should not crash when clicking same section rapidly", async ({
		page,
	}) => {
		// Click About multiple times rapidly
		for (let i = 0; i < 5; i++) {
			const aboutMenuItem = await page.getByRole("menuitem", {
				name: "About",
				exact: true,
			});
			await aboutMenuItem.waitFor({ state: "visible", timeout: 10000 });
			await aboutMenuItem.click();
		}

		// Should still be functional
		await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });
	});

	test("should handle rapid back-and-forth navigation", async ({ page }) => {
		// Rapidly switch between two sections
		for (let i = 0; i < 3; i++) {
			const aboutMenuItem = await page.getByRole("menuitem", {
				name: "About",
				exact: true,
			});
			await aboutMenuItem.waitFor({ state: "visible", timeout: 10000 });
			await aboutMenuItem.click();

			const faqMenuItem = await page.getByRole("menuitem", {
				name: "FAQ",
				exact: true,
			});
			await faqMenuItem.waitFor({ state: "visible", timeout: 10000 });
			await faqMenuItem.click();
		}

		// Should end at last clicked section (FAQ)
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
	});

	test("should handle navigation during page load", async ({ page }) => {
		// Navigate to a section quickly after page load
		await page.reload();
		await page.waitForTimeout(100); // Minimal wait

		// Click navigation before page fully settles
		const featuresMenuItem = await page
			.getByRole("menuitem", { name: "Features", exact: true })
			.first();
		await featuresMenuItem.waitFor({ state: "visible", timeout: 10000 });
		await featuresMenuItem.click();

		// Should still navigate correctly
		await expect(homePage.featuresSection).toBeInViewport({ timeout: 1000 });
	});
});
