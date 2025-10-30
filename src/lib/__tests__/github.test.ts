import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createRawGitHubUrl,
	fetchFileContentByPath,
	fetchRepositoryFiles,
	getLanguageFromExtension,
	type GitHubFile,
	type GitHubRepoConfig,
} from "../github";

describe("github.ts", () => {
	describe("getLanguageFromExtension", () => {
		describe("common languages", () => {
			it("should map markdown extension", () => {
				expect(getLanguageFromExtension("md")).toBe("markdown");
			});

			it("should map JavaScript extension", () => {
				expect(getLanguageFromExtension("js")).toBe("javascript");
			});

			it("should map TypeScript extension", () => {
				expect(getLanguageFromExtension("ts")).toBe("typescript");
			});

			it("should map TSX extension", () => {
				expect(getLanguageFromExtension("tsx")).toBe("tsx");
			});

			it("should map JSX extension", () => {
				expect(getLanguageFromExtension("jsx")).toBe("jsx");
			});

			it("should map Python extension", () => {
				expect(getLanguageFromExtension("py")).toBe("python");
			});
		});

		describe("config languages", () => {
			it("should map JSON extension", () => {
				expect(getLanguageFromExtension("json")).toBe("json");
			});

			it("should map YAML extensions", () => {
				expect(getLanguageFromExtension("yaml")).toBe("yaml");
				expect(getLanguageFromExtension("yml")).toBe("yaml");
			});

			it("should map TOML extension", () => {
				expect(getLanguageFromExtension("toml")).toBe("toml");
			});
		});

		describe("shell languages", () => {
			it("should map shell script extensions", () => {
				expect(getLanguageFromExtension("sh")).toBe("bash");
				expect(getLanguageFromExtension("bash")).toBe("bash");
				expect(getLanguageFromExtension("zsh")).toBe("bash");
			});
		});

		describe("compiled languages", () => {
			it("should map Rust extension", () => {
				expect(getLanguageFromExtension("rs")).toBe("rust");
			});

			it("should map Go extension", () => {
				expect(getLanguageFromExtension("go")).toBe("go");
			});

			it("should map Java extension", () => {
				expect(getLanguageFromExtension("java")).toBe("java");
			});
		});

		describe("unknown extensions", () => {
			it("should return 'text' for unknown extensions", () => {
				expect(getLanguageFromExtension("xyz")).toBe("text");
			});

			it("should handle empty strings", () => {
				expect(getLanguageFromExtension("")).toBe("text");
			});

			it("should be case-sensitive", () => {
				expect(getLanguageFromExtension("JS")).toBe("text");
				expect(getLanguageFromExtension("MD")).toBe("text");
				expect(getLanguageFromExtension("jS")).toBe("text");
			});
		});
	});

	describe("createRawGitHubUrl", () => {
		describe("with default branch", () => {
			it("should create URL with default main branch", () => {
				const url = createRawGitHubUrl(
					"paseo-network",
					"paseo-action-submission",
					undefined,
					"pas/README.md",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/paseo-network/paseo-action-submission/main/pas/README.md",
				);
			});

			it("should create URL using main as default", () => {
				const url = createRawGitHubUrl(
					"owner",
					"repo",
					"main",
					"path/to/file.ts",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/main/path/to/file.ts",
				);
			});
		});

		describe("with custom branch", () => {
			it("should create URL with custom branch", () => {
				const url = createRawGitHubUrl(
					"owner",
					"repo",
					"develop",
					"src/index.ts",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/develop/src/index.ts",
				);
			});

			it("should handle feature branch names", () => {
				const url = createRawGitHubUrl(
					"owner",
					"repo",
					"feature/new-feature",
					"file.ts",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/feature/new-feature/file.ts",
				);
			});
		});

		describe("path handling", () => {
			it("should handle paths with no leading slash", () => {
				const url = createRawGitHubUrl("owner", "repo", "main", "file.ts");
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/main/file.ts",
				);
			});

			it("should handle nested paths", () => {
				const url = createRawGitHubUrl(
					"owner",
					"repo",
					"main",
					"src/components/Button.tsx",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/main/src/components/Button.tsx",
				);
			});

			it("should handle root files", () => {
				const url = createRawGitHubUrl("owner", "repo", "main", "README.md");
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/main/README.md",
				);
			});
		});

		describe("special characters", () => {
			it("should handle files with spaces (as-is)", () => {
				const url = createRawGitHubUrl(
					"owner",
					"repo",
					"main",
					"path/file with spaces.md",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/main/path/file with spaces.md",
				);
			});

			it("should handle files with special characters", () => {
				const url = createRawGitHubUrl(
					"owner",
					"repo",
					"main",
					"path/file-name_v1.2.3.ts",
				);
				expect(url).toBe(
					"https://raw.githubusercontent.com/owner/repo/main/path/file-name_v1.2.3.ts",
				);
			});
		});
	});

	describe("fetchRepositoryFiles", () => {
		const mockConfig: GitHubRepoConfig = {
			owner: "paseo-network",
			repo: "paseo-action-submission",
			path: "pas",
		};

		beforeEach(() => {
			// Reset all mocks before each test
			vi.clearAllMocks();
		});

		describe("successful requests", () => {
			it("should fetch and return files sorted by name", async () => {
				const mockFiles: GitHubFile[] = [
					{
						name: "file-2.md",
						path: "pas/file-2.md",
						type: "file",
						size: 100,
						download_url: "https://example.com/file-2.md",
						html_url: "https://github.com/example/file-2.md",
					},
					{
						name: "file-1.md",
						path: "pas/file-1.md",
						type: "file",
						size: 200,
						download_url: "https://example.com/file-1.md",
						html_url: "https://github.com/example/file-1.md",
					},
				];

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => mockFiles,
				});

				const result = await fetchRepositoryFiles(mockConfig);

				expect(result).toHaveLength(2);
				expect(result[0].name).toBe("file-1.md");
				expect(result[1].name).toBe("file-2.md");
			});

			it("should filter out directories", async () => {
				const mockData = [
					{
						name: "file.md",
						type: "file",
						path: "pas/file.md",
						size: 100,
						download_url: "https://example.com/file.md",
						html_url: "https://github.com/example/file.md",
					},
					{
						name: "folder",
						type: "dir",
						path: "pas/folder",
						size: 0,
						download_url: "",
						html_url: "",
					},
				];

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => mockData,
				});

				const result = await fetchRepositoryFiles(mockConfig);

				expect(result).toHaveLength(1);
				expect(result[0].type).toBe("file");
			});

			it("should include Authorization header when API key provided", async () => {
				const apiKey = "test-api-key";

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => [],
				});

				await fetchRepositoryFiles(mockConfig, apiKey);

				expect(global.fetch).toHaveBeenCalledWith(
					expect.any(String),
					expect.objectContaining({
						headers: { Authorization: `Bearer ${apiKey}` },
					}),
				);
			});

			it("should not include Authorization header when no API key", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => [],
				});

				await fetchRepositoryFiles(mockConfig);

				expect(global.fetch).toHaveBeenCalledWith(
					expect.any(String),
					expect.objectContaining({
						headers: {},
					}),
				);
			});
		});

		describe("error handling", () => {
			it("should throw error for 401 Unauthorized", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					status: 401,
					statusText: "Unauthorized",
				});

				await expect(fetchRepositoryFiles(mockConfig)).rejects.toThrow(
					"Authentication failed",
				);
			});

			it("should throw error for 403 Forbidden", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					status: 403,
					statusText: "Forbidden",
				});

				await expect(fetchRepositoryFiles(mockConfig)).rejects.toThrow(
					"Access forbidden",
				);
			});

			it("should throw error for 404 Not Found with repo path", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					status: 404,
					statusText: "Not Found",
				});

				await expect(fetchRepositoryFiles(mockConfig)).rejects.toThrow(
					"paseo-network/paseo-action-submission/pas",
				);
			});

			it("should throw error for 422 Unprocessable Entity", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					status: 422,
					statusText: "Unprocessable Entity",
				});

				await expect(fetchRepositoryFiles(mockConfig)).rejects.toThrow(
					"Invalid repository path",
				);
			});

			it("should throw generic error for other status codes", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					status: 500,
					statusText: "Internal Server Error",
				});

				await expect(fetchRepositoryFiles(mockConfig)).rejects.toThrow(
					"GitHub API error: 500 Internal Server Error",
				);
			});
		});

		describe("API endpoint construction", () => {
			it("should construct correct GitHub API URL", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => [],
				});

				await fetchRepositoryFiles(mockConfig);

				expect(global.fetch).toHaveBeenCalledWith(
					"https://api.github.com/repos/paseo-network/paseo-action-submission/contents/pas",
					expect.any(Object),
				);
			});
		});
	});

	describe("fetchFileContentByPath", () => {
		const mockConfig: GitHubRepoConfig = {
			owner: "paseo-network",
			repo: "paseo-action-submission",
			path: "pas",
		};

		beforeEach(() => {
			vi.clearAllMocks();
		});

		describe("successful requests", () => {
			it("should fetch file content and parse extension", async () => {
				const mockContent = "# Test Content\nThis is a test.";

				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => mockContent,
				});

				const result = await fetchFileContentByPath(
					mockConfig,
					"README.md",
					"main",
				);

				expect(result).toEqual({
					name: "README.md",
					content: mockContent,
					extension: "md",
				});
			});

			it("should use main branch by default", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				await fetchFileContentByPath(mockConfig, "file.ts");

				expect(global.fetch).toHaveBeenCalledWith(
					expect.stringContaining("/main/"),
					expect.any(Object),
				);
			});

			it("should use custom branch when provided", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				await fetchFileContentByPath(mockConfig, "file.ts", "develop");

				expect(global.fetch).toHaveBeenCalledWith(
					expect.stringContaining("/develop/"),
					expect.any(Object),
				);
			});

			it("should handle files without extension", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				const result = await fetchFileContentByPath(mockConfig, "Makefile");

				// Note: "Makefile" becomes "makefile" because split('.').pop() returns "Makefile"
				// and toLowerCase() converts it to "makefile"
				expect(result.extension).toBe("makefile");
			});

			it("should handle files with multiple dots", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				const result = await fetchFileContentByPath(mockConfig, "file.spec.ts");

				expect(result.extension).toBe("ts");
			});

			it("should convert extension to lowercase", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				const result = await fetchFileContentByPath(mockConfig, "README.MD");

				expect(result.extension).toBe("md");
			});
		});

		describe("error handling", () => {
			it("should throw error when fetch fails", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Not Found",
				});

				await expect(
					fetchFileContentByPath(mockConfig, "missing.md"),
				).rejects.toThrow("Failed to fetch file content: Not Found");
			});

			it("should throw error with status text", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: false,
					statusText: "Internal Server Error",
				});

				await expect(
					fetchFileContentByPath(mockConfig, "file.md"),
				).rejects.toThrow("Internal Server Error");
			});
		});

		describe("URL construction", () => {
			it("should construct correct raw GitHub URL", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				await fetchFileContentByPath(mockConfig, "test.md", "main");

				expect(global.fetch).toHaveBeenCalledWith(
					"https://raw.githubusercontent.com/paseo-network/paseo-action-submission/main/pas/test.md",
					expect.objectContaining({
						next: { revalidate: 3600 },
					}),
				);
			});

			it("should append filename to config path", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				await fetchFileContentByPath(mockConfig, "file.ts");

				expect(global.fetch).toHaveBeenCalledWith(
					expect.stringContaining("/pas/file.ts"),
					expect.any(Object),
				);
			});
		});

		describe("caching configuration", () => {
			it("should set revalidate cache to 1 hour", async () => {
				global.fetch = vi.fn().mockResolvedValue({
					ok: true,
					text: async () => "content",
				});

				await fetchFileContentByPath(mockConfig, "file.md");

				expect(global.fetch).toHaveBeenCalledWith(
					expect.any(String),
					expect.objectContaining({
						next: { revalidate: 3600 },
					}),
				);
			});
		});
	});
});
