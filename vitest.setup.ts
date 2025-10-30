import { afterAll, afterEach, beforeAll, vi } from "vitest";

// Mock window.URL.createObjectURL and revokeObjectURL
beforeAll(() => {
	global.URL.createObjectURL = () => "mock-object-url";
	global.URL.revokeObjectURL = () => {};
});

// Cleanup after each test
afterEach(() => {
	// Clear all mocks
	vi.clearAllMocks();
});

afterAll(() => {
	// Restore all mocks
	vi.restoreAllMocks();
});
