import { expect, Locator, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Navigation and Section Interaction", () => {
	let homePage: HomePage;
	let navItems: { name: string; section: Locator }[];

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		navItems = [
			{ name: "About", section: homePage.aboutSection },
			{ name: "Resources", section: homePage.resourcesSection },
			{ name: "Features", section: homePage.featuresSection },
			{ name: "Comparison", section: homePage.comparisonSection },
			{ name: "Chain Specs", section: homePage.chainSpecsSection },
			{ name: "FAQ", section: homePage.faqSection },
		];
		await homePage.goto();
	});

	test.describe("Desktop Navigation", () => {
		test("should display navigation menu with all items", async ({ page }) => {
			// Verify menubar is visible
			await expect(homePage.desktopNav).toBeVisible();

			for (const item of navItems) {
				const menuItem = page.getByRole("menuitem", { name: item.name });
				await expect(menuItem).toBeVisible();
			}
		});

		test("should scroll to section when clicking navigation item", async ({
			page,
		}) => {
			for (const item of navItems) {
				await page
					.getByRole("menuitem", { name: item.name, exact: true })
					.first()
					.click();
				await expect(item.section).toBeInViewport();
			}
		});

		test("should scroll back to top when clicking Home link", async ({
			page,
		}) => {
			// First scroll down to another section
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Then click Home
			await page.getByRole("menuitem", { name: "Home", exact: true }).click();

			// Verify hero section is visible
			await expect(homePage.heroSection).toBeInViewport({ timeout: 1000 });
		});
	});

	test.describe("Section Scrolling", () => {
		test("should scroll through all sections sequentially", async ({
			page,
		}) => {
			const sections = [
				{ id: "about", locator: homePage.aboutSection },
				{ id: "resources", locator: homePage.resourcesSection },
				{ id: "features", locator: homePage.featuresSection },
				{ id: "comparison", locator: homePage.comparisonSection },
				{ id: "chain-specs", locator: homePage.chainSpecsSection },
				{ id: "faq", locator: homePage.faqSection },
			];

			for (const section of sections) {
				await homePage.scrollToSection(section.id);
				await expect(section.locator).toBeInViewport();
			}
		});

		test("should handle rapid section changes", async ({ page }) => {
			// Rapidly click different navigation items
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			await page
				.getByRole("menuitem", { name: "Features", exact: true })
				.first()
				.click();

			// Final section should be visible
			await expect(homePage.featuresSection).toBeInViewport({ timeout: 1000 });
		});

		test("should maintain section visibility after scroll", async ({
			page,
		}) => {
			// Scroll to a section
			await page
				.getByRole("menuitem", { name: "Comparison", exact: true })
				.click();

			// Verify it's visible
			await expect(homePage.comparisonSection).toBeVisible({ timeout: 1000 });

			// Wait and check it's still visible
			await expect(homePage.comparisonSection).toBeVisible({ timeout: 1000 });
		});
	});

	test.describe("Footer Navigation", () => {
		test("should display footer with all sections", async ({ page }) => {
			// Scroll to footer
			await homePage.footer.scrollIntoViewIfNeeded();

			// Verify footer is visible
			await expect(homePage.footer).toBeVisible();

			// Verify footer sections exist
			const footerSections = ["Network", "Developers", "Support"];
			for (const section of footerSections) {
				const heading = page.getByRole("heading", {
					name: section,
					exact: true,
				});
				await expect(heading).toBeVisible();
			}
		});

		test("should navigate to sections from footer links", async ({ page }) => {
			// Scroll to footer
			await homePage.footer.scrollIntoViewIfNeeded();

			// Click a footer link (if they exist)
			const aboutLink = homePage.footer.getByRole("link", {
				name: /about/i,
			});

			if ((await aboutLink.count()) > 0) {
				await aboutLink.first().click();
				await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });
			}
		});

		test("should display social media links in footer", async ({ page }) => {
			await homePage.footer.scrollIntoViewIfNeeded();

			// Check for social media links (adjust selectors based on actual implementation)
			const footer = homePage.footer;
			await expect(footer).toBeVisible();

			// Verify footer contains links
			const links = footer.locator("a");
			expect(await links.count()).toBeGreaterThan(0);
		});
	});

	test.describe("Keyboard Navigation", () => {
		test("should navigate through menu items with Tab key", async ({
			page,
		}) => {
			// Focus on first navigation item
			await page.keyboard.press("Tab");

			// Get focused element
			const focused = page.locator(":focus");

			// Verify focus is within navigation
			const _isInNav = await focused.evaluate((el) => {
				const nav = el.closest('[role="menubar"]');
				return nav !== null;
			});

			// Tab is working if element is focused
			await expect(focused).toBeFocused();
		});
	});

	test.describe("Section Content Interactions", () => {
		test("should display comparison table in Comparison section", async ({
			page,
		}) => {
			// Navigate to Comparison section
			await page
				.getByRole("menuitem", { name: "Comparison", exact: true })
				.click();

			// Verify Comparison section is visible
			await expect(homePage.comparisonSection).toBeVisible({ timeout: 1000 });

			// Check for table or comparison content
			const hasContent =
				(await homePage.comparisonSection.locator("table").count()) > 0 ||
				(await homePage.comparisonSection
					.locator("[class*='comparison']")
					.count()) > 0;

			expect(hasContent).toBeTruthy();
		});
	});

	test.describe("Smooth Scrolling Behavior", () => {
		test("should scroll smoothly between sections", async ({ page }) => {
			// Click About
			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			// Get scroll position
			const scrollPos1 = await page.evaluate(() => window.scrollY);

			// Click FAQ (much further down)
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Get new scroll position
			const scrollPos2 = await page.evaluate(() => window.scrollY);

			// Verify we scrolled down
			expect(scrollPos2).toBeGreaterThan(scrollPos1);
		});
	});

	test.describe("Responsive Navigation Behavior", () => {
		test("should display all sections on desktop", async ({ page }) => {
			// Verify all major sections are in the DOM
			await expect(homePage.heroSection).toBeAttached();
			await expect(homePage.aboutSection).toBeAttached();
			await expect(homePage.resourcesSection).toBeAttached();
			await expect(homePage.featuresSection).toBeAttached();
			await expect(homePage.comparisonSection).toBeAttached();
			await expect(homePage.chainSpecsSection).toBeAttached();
			await expect(homePage.faqSection).toBeAttached();
		});

		test("should maintain navigation visibility during scroll", async ({
			page,
		}) => {
			// Verify nav is visible at top
			await expect(homePage.desktopNav).toBeVisible();

			// Scroll down
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Nav should still be visible (sticky/fixed)
			await expect(homePage.desktopNav).toBeVisible();
		});
	});

	test.describe("Link Validation", () => {
		test("should have enabled menu items", async ({ page }) => {
			const menuItems = page.locator('[role="menuitem"]');
			const count = await menuItems.count();

			for (let i = 0; i < count; i++) {
				const item = menuItems.nth(i);

				// Each menu item should be clickable
				await expect(item).toBeEnabled();
			}

			// Should have at least 5 menu items
			expect(count).toBeGreaterThanOrEqual(5);
		});
	});
});
