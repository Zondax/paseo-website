import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for E2E Testing
 *
 * This configuration sets up end-to-end testing for the Paseo website,
 * including console error detection and interaction testing.
 */
export default defineConfig({
	// Directory where test files are located
	testDir: "./e2e",

	// Run tests in parallel
	fullyParallel: true,

	// Forbid test.only in CI to prevent accidentally committed focused tests
	forbidOnly: !!process.env.CI,

	// Retry failed tests in CI for flakiness tolerance
	retries: process.env.CI ? 2 : 0,

	// Limit workers in CI, use optimal workers locally
	workers: process.env.CI ? 1 : undefined,

	// HTML reporter for test results
	reporter: "html",

	// Global test configuration
	use: {
		// Base URL for the application
		baseURL: "http://localhost:3000",

		// Collect trace on first retry for debugging
		trace: "on-first-retry",
	},

	// Test projects for different browsers
	projects: [
		{
			name: "Desktop Chrome",
			use: {
				...devices["Desktop Chrome"],
				// Enable Chromium debugging for Lighthouse
				launchOptions: {
					args: ["--remote-debugging-port=9222"],
				},
			},
		},
	],

	// Auto-start dev server before running tests
	webServer: {
		command: "pnpm run dev",
		url: "http://localhost:3000",
		// In CI: always start fresh, Dev: reuse if running
		reuseExistingServer: !process.env.CI,
	},
});
