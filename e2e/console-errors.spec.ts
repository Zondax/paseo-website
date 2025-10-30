import { expect, test } from "@playwright/test";

test.describe("Console Errors", () => {
	const pagesToTest = [
		{ path: "/", name: "homepage" },
		{ path: "/pas", name: "PAS page" },
	];

	for (const { path, name } of pagesToTest) {
		test(`should not have console errors on ${name}`, async ({ page }) => {
			const consoleErrors: string[] = [];

			page.on("console", (msg) => {
				if (msg.type() === "error") {
					const url = msg.location()?.url || "unknown";
					consoleErrors.push(`[${url}] ${msg.text()}`);
				}
			});

			page.on("pageerror", (error) => {
				consoleErrors.push(`[pageerror] ${error.message}`);
			});

			await page.goto(path);
			await page.waitForLoadState("networkidle");

			expect(
				consoleErrors,
				`Found console errors on ${name} (${path}):\n${consoleErrors.join("\n")}`,
			).toHaveLength(0);
		});
	}
});
