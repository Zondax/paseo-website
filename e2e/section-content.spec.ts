import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Section Content Visibility", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test("should display features cards with interactive elements", async ({
		page,
	}) => {
		// Navigate to Features
		const featuresMenuItem = await page
			.getByRole("menuitem", { name: "Features", exact: true })
			.first();
		await featuresMenuItem.click();
		await expect(homePage.featuresSection).toBeInViewport({ timeout: 1000 });

		const featuresSection = homePage.featuresSection;
		await expect(featuresSection).toBeVisible();

		// Find feature cards
		const cards = featuresSection.locator("article, div[class*='card']");
		const cardCount = await cards.count();

		expect(cardCount).toBeGreaterThan(0);

		// Verify cards have content
		if (cardCount > 0) {
			const firstCard = cards.first();
			const text = await firstCard.textContent();
			expect(text?.length).toBeGreaterThan(0);
		}
	});

	test("should display comparison content with interactions", async ({
		page,
	}) => {
		// Navigate to Comparison
		const comparisonMenuItem = await page
			.getByRole("menuitem", { name: "Comparison", exact: true })
			.first();
		await comparisonMenuItem.click();
		await expect(homePage.comparisonSection).toBeInViewport({ timeout: 1000 });

		const comparisonSection = homePage.comparisonSection;
		await expect(comparisonSection).toBeVisible();

		// Check for interactive elements
		const interactiveElements = comparisonSection.locator(
			"button, a, input, select",
		);
		const count = await interactiveElements.count();

		// Should have some content (text or interactive elements)
		const text = await comparisonSection.textContent();
		expect(text?.length || count).toBeGreaterThan(0);
	});

	test("should display chain specs with clickable elements", async ({
		page,
	}) => {
		// Navigate to Chain Specs
		const chainSpecsMenuItem = await page
			.getByRole("menuitem", { name: "Chain Specs", exact: true })
			.first();
		await chainSpecsMenuItem.click();
		await expect(homePage.chainSpecsSection).toBeInViewport({ timeout: 1000 });

		const chainSpecsSection = homePage.chainSpecsSection;
		await expect(chainSpecsSection).toBeVisible();

		// Verify section has content
		const text = await chainSpecsSection.textContent();
		expect(text?.length).toBeGreaterThan(0);

		// Check for interactive elements (buttons, links)
		const interactiveElements = chainSpecsSection.locator("button, a");
		const count = await interactiveElements.count();

		if (count > 0) {
			const firstElement = interactiveElements.first();
			await expect(firstElement).toBeVisible();
		}
	});

	test("should display hero section with content", async ({ page }) => {
		const heroSection = homePage.heroSection;
		await expect(heroSection).toBeVisible();

		// Verify hero has content
		const text = await heroSection.textContent();
		expect(text?.length).toBeGreaterThan(0);
	});

	test("should display about section with content", async ({ page }) => {
		// Navigate to About
		const aboutMenuItem = await page
			.getByRole("menuitem", { name: "About", exact: true })
			.first();
		await aboutMenuItem.click();
		await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

		const aboutSection = homePage.aboutSection;
		await expect(aboutSection).toBeVisible();

		// Verify about has content
		const text = await aboutSection.textContent();
		expect(text?.length).toBeGreaterThan(0);
	});

	test("should display resources section with content", async ({ page }) => {
		// Navigate to Resources
		const resourcesMenuItem = await page
			.getByRole("menuitem", { name: "Resources", exact: true })
			.first();
		await resourcesMenuItem.click();
		await expect(homePage.resourcesSection).toBeInViewport({ timeout: 1000 });

		const resourcesSection = homePage.resourcesSection;
		await expect(resourcesSection).toBeVisible();

		// Verify resources has content
		const text = await resourcesSection.textContent();
		expect(text?.length).toBeGreaterThan(0);
	});
});
