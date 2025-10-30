import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadFile, downloadGitHubFile } from "../download";

describe("download.ts", () => {
	describe("downloadFile", () => {
		let mockLink: HTMLAnchorElement;
		let appendChildSpy: ReturnType<typeof vi.spyOn>;
		let removeChildSpy: ReturnType<typeof vi.spyOn>;
		let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
		let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			// Create mock link element
			mockLink = {
				href: "",
				download: "",
				style: { display: "" },
				click: vi.fn(),
			} as unknown as HTMLAnchorElement;

			// Mock document methods
			vi.spyOn(document, "createElement").mockReturnValue(mockLink);
			appendChildSpy = vi
				.spyOn(document.body, "appendChild")
				.mockImplementation(() => mockLink);
			removeChildSpy = vi
				.spyOn(document.body, "removeChild")
				.mockImplementation(() => mockLink);

			// Mock URL methods
			createObjectURLSpy = vi
				.spyOn(URL, "createObjectURL")
				.mockReturnValue("mock-blob-url");
			revokeObjectURLSpy = vi
				.spyOn(URL, "revokeObjectURL")
				.mockImplementation(() => {});

			// Mock console.error to avoid test output noise
			vi.spyOn(console, "debug").mockImplementation(() => {});
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		describe("successful downloads", () => {
			it("should download file successfully", async () => {
				const mockBlob = new Blob(["test content"], { type: "text/plain" });

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile("https://example.com/test.txt", "test.txt");

				expect(global.fetch).toHaveBeenCalledWith(
					"https://example.com/test.txt",
				);
				expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
				expect(mockLink.href).toBe("mock-blob-url");
				expect(mockLink.download).toBe("test.txt");
				expect(mockLink.style.display).toBe("none");
				expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
				expect(mockLink.click).toHaveBeenCalled();
				expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
				expect(revokeObjectURLSpy).toHaveBeenCalledWith("mock-blob-url");
			});

			it("should call onSuccess callback when download succeeds", async () => {
				const onSuccess = vi.fn();
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile("https://example.com/file.pdf", "file.pdf", {
					onSuccess,
				});

				expect(onSuccess).toHaveBeenCalled();
			});

			it("should download different file types", async () => {
				const testCases = [
					{ url: "https://example.com/doc.pdf", filename: "document.pdf" },
					{ url: "https://example.com/img.png", filename: "image.png" },
					{ url: "https://example.com/data.json", filename: "data.json" },
					{ url: "https://example.com/code.ts", filename: "code.ts" },
				];

				for (const { url, filename } of testCases) {
					const mockBlob = new Blob([`content of ${filename}`]);

					global.fetch = vi.fn().mockResolvedValue({
						ok: true,
						blob: async () => mockBlob,
					});

					await downloadFile(url, filename);

					expect(mockLink.download).toBe(filename);
				}
			});

			it("should handle large files", async () => {
				// Create a large blob (1MB)
				const largeContent = new Array(1024 * 1024).fill("a").join("");
				const mockBlob = new Blob([largeContent], { type: "text/plain" });

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile("https://example.com/large.txt", "large.txt");

				expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
				expect(mockLink.click).toHaveBeenCalled();
			});
		});

		describe("error handling", () => {
			it("should handle fetch errors with non-ok response", async () => {
				const onError = vi.fn();

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Not Found",
				});

				await downloadFile("https://example.com/missing.txt", "missing.txt", {
					onError,
				});

				expect(onError).toHaveBeenCalled();
				const errorArg = onError.mock.calls[0][0];
				expect(errorArg).toBeInstanceOf(Error);
				expect(errorArg.message).toContain("Failed to download file");
				expect(errorArg.message).toContain("Not Found");
			});

			it("should handle network errors", async () => {
				const onError = vi.fn();

				global.fetch = vi
					.fn()
					.mockRejectedValue(new Error("Network connection failed"));

				await downloadFile("https://example.com/file.txt", "file.txt", {
					onError,
				});

				expect(onError).toHaveBeenCalled();
				const errorArg = onError.mock.calls[0][0];
				expect(errorArg).toBeInstanceOf(Error);
				expect(errorArg.message).toBe("Network connection failed");
			});

			it("should handle blob conversion errors", async () => {
				const onError = vi.fn();

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => {
						throw new Error("Blob conversion failed");
					},
				});

				await downloadFile("https://example.com/file.txt", "file.txt", {
					onError,
				});

				expect(onError).toHaveBeenCalled();
				const errorArg = onError.mock.calls[0][0];
				expect(errorArg.message).toBe("Blob conversion failed");
			});

			it("should handle unknown errors gracefully", async () => {
				const onError = vi.fn();

				global.fetch = vi.fn().mockRejectedValue("Unknown error string");

				await downloadFile("https://example.com/file.txt", "file.txt", {
					onError,
				});

				expect(onError).toHaveBeenCalled();
				const errorArg = onError.mock.calls[0][0];
				expect(errorArg).toBeInstanceOf(Error);
				expect(errorArg.message).toBe("Unknown download error");
			});

			it("should log errors to console", async () => {
				const consoleSpy = vi.spyOn(console, "error");

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Server Error",
				});

				await downloadFile("https://example.com/file.txt", "file.txt");

				expect(consoleSpy).toHaveBeenCalledWith(
					"Error downloading file:",
					expect.any(Error),
				);
			});

			it("should not call onSuccess when error occurs", async () => {
				const onSuccess = vi.fn();
				const onError = vi.fn();

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Error",
				});

				await downloadFile("https://example.com/file.txt", "file.txt", {
					onSuccess,
					onError,
				});

				expect(onSuccess).not.toHaveBeenCalled();
				expect(onError).toHaveBeenCalled();
			});
		});

		describe("DOM manipulation", () => {
			it("should create anchor element with correct attributes", async () => {
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile(
					"https://example.com/document.pdf",
					"my-document.pdf",
				);

				expect(document.createElement).toHaveBeenCalledWith("a");
				expect(mockLink.href).toBe("mock-blob-url");
				expect(mockLink.download).toBe("my-document.pdf");
				expect(mockLink.style.display).toBe("none");
			});

			it("should append and remove link from DOM", async () => {
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile("https://example.com/file.txt", "file.txt");

				expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
				expect(mockLink.click).toHaveBeenCalled();
				expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
			});

			it("should revoke object URL after download", async () => {
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile("https://example.com/file.txt", "file.txt");

				expect(revokeObjectURLSpy).toHaveBeenCalledWith("mock-blob-url");
			});
		});

		describe("options parameter", () => {
			it("should work without options parameter", async () => {
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await expect(
					downloadFile("https://example.com/file.txt", "file.txt"),
				).resolves.toBeUndefined();
			});

			it("should work with empty options object", async () => {
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await expect(
					downloadFile("https://example.com/file.txt", "file.txt", {}),
				).resolves.toBeUndefined();
			});

			it("should work with only onSuccess", async () => {
				const onSuccess = vi.fn();
				const mockBlob = new Blob(["content"]);

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadFile("https://example.com/file.txt", "file.txt", {
					onSuccess,
				});

				expect(onSuccess).toHaveBeenCalled();
			});

			it("should work with only onError", async () => {
				const onError = vi.fn();

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Error",
				});

				await downloadFile("https://example.com/file.txt", "file.txt", {
					onError,
				});

				expect(onError).toHaveBeenCalled();
			});
		});
	});

	describe("downloadGitHubFile", () => {
		let mockLink: HTMLAnchorElement;

		beforeEach(() => {
			mockLink = {
				href: "",
				download: "",
				style: { display: "" },
				click: vi.fn(),
			} as unknown as HTMLAnchorElement;

			vi.spyOn(document, "createElement").mockReturnValue(mockLink);
			vi.spyOn(document.body, "appendChild").mockImplementation(() => mockLink);
			vi.spyOn(document.body, "removeChild").mockImplementation(() => mockLink);
			vi.spyOn(URL, "createObjectURL").mockReturnValue("mock-blob-url");
			vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
			vi.spyOn(console, "error").mockImplementation(() => {});
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		describe("successful downloads", () => {
			it("should download GitHub file using download_url", async () => {
				const mockBlob = new Blob(["file content"]);
				const gitHubFile = {
					name: "README.md",
					download_url:
						"https://raw.githubusercontent.com/owner/repo/README.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadGitHubFile(gitHubFile);

				expect(global.fetch).toHaveBeenCalledWith(gitHubFile.download_url);
				expect(mockLink.download).toBe("README.md");
				expect(mockLink.click).toHaveBeenCalled();
			});

			it("should call onSuccess callback", async () => {
				const onSuccess = vi.fn();
				const mockBlob = new Blob(["content"]);
				const gitHubFile = {
					name: "file.ts",
					download_url: "https://raw.githubusercontent.com/owner/repo/file.ts",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadGitHubFile(gitHubFile, { onSuccess });

				expect(onSuccess).toHaveBeenCalled();
			});

			it("should handle different GitHub file types", async () => {
				const testFiles = [
					{
						name: "PAS-001.md",
						download_url:
							"https://raw.githubusercontent.com/owner/repo/PAS-001.md",
					},
					{
						name: "config.json",
						download_url:
							"https://raw.githubusercontent.com/owner/repo/config.json",
					},
					{
						name: "script.ts",
						download_url:
							"https://raw.githubusercontent.com/owner/repo/script.ts",
					},
				];

				for (const file of testFiles) {
					const mockBlob = new Blob([`content of ${file.name}`]);

					global.fetch = vi.fn().mockResolvedValue({
						ok: true,
						blob: async () => mockBlob,
					});

					await downloadGitHubFile(file);

					expect(mockLink.download).toBe(file.name);
					expect(global.fetch).toHaveBeenCalledWith(file.download_url);
				}
			});
		});

		describe("error handling", () => {
			it("should call onError when download fails", async () => {
				const onError = vi.fn();
				const gitHubFile = {
					name: "file.md",
					download_url: "https://raw.githubusercontent.com/owner/repo/file.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Not Found",
				});

				await downloadGitHubFile(gitHubFile, { onError });

				expect(onError).toHaveBeenCalled();
				const errorArg = onError.mock.calls[0][0];
				expect(errorArg).toBeInstanceOf(Error);
			});

			it("should handle network errors", async () => {
				const onError = vi.fn();
				const gitHubFile = {
					name: "file.md",
					download_url: "https://raw.githubusercontent.com/owner/repo/file.md",
				};

				global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

				await downloadGitHubFile(gitHubFile, { onError });

				expect(onError).toHaveBeenCalled();
			});

			it("should not call onSuccess when error occurs", async () => {
				const onSuccess = vi.fn();
				const onError = vi.fn();
				const gitHubFile = {
					name: "file.md",
					download_url: "https://raw.githubusercontent.com/owner/repo/file.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Error",
				});

				await downloadGitHubFile(gitHubFile, { onSuccess, onError });

				expect(onSuccess).not.toHaveBeenCalled();
				expect(onError).toHaveBeenCalled();
			});
		});

		describe("function delegation", () => {
			it("should delegate to downloadFile with correct parameters", async () => {
				const mockBlob = new Blob(["content"]);
				const gitHubFile = {
					name: "test.md",
					download_url: "https://raw.githubusercontent.com/owner/repo/test.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadGitHubFile(gitHubFile);

				expect(global.fetch).toHaveBeenCalledWith(gitHubFile.download_url);
				expect(mockLink.download).toBe(gitHubFile.name);
			});

			it("should pass options through to downloadFile", async () => {
				const mockBlob = new Blob(["content"]);
				const onSuccess = vi.fn();
				const onError = vi.fn();
				const gitHubFile = {
					name: "file.md",
					download_url: "https://raw.githubusercontent.com/owner/repo/file.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadGitHubFile(gitHubFile, { onSuccess, onError });

				expect(onSuccess).toHaveBeenCalled();
			});
		});

		describe("real-world GitHub scenarios", () => {
			it("should download PAS files from paseo-action-submission repo", async () => {
				const mockBlob = new Blob(["# PAS-001\n\nProposal content..."]);
				const pasFile = {
					name: "PAS-001-governance-model.md",
					download_url:
						"https://raw.githubusercontent.com/paseo-network/paseo-action-submission/main/pas/PAS-001-governance-model.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					blob: async () => mockBlob,
				});

				await downloadGitHubFile(pasFile);

				expect(global.fetch).toHaveBeenCalledWith(pasFile.download_url);
				expect(mockLink.download).toBe(pasFile.name);
				expect(mockLink.click).toHaveBeenCalled();
			});

			it("should handle GitHub API rate limit errors", async () => {
				const onError = vi.fn();
				const gitHubFile = {
					name: "file.md",
					download_url: "https://raw.githubusercontent.com/owner/repo/file.md",
				};

				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "API rate limit exceeded",
				});

				await downloadGitHubFile(gitHubFile, { onError });

				expect(onError).toHaveBeenCalled();
				const errorArg = onError.mock.calls[0][0];
				expect(errorArg.message).toContain("Failed to download file");
			});
		});
	});
});
