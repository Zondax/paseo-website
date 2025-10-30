export interface GitHubFile {
	name: string;
	path: string;
	size: number;
	download_url: string;
	type: string;
	html_url: string;
}

export interface GitHubFileContent {
	name: string;
	content: string;
	extension: string;
}

export interface GitHubRepoConfig {
	owner: string;
	repo: string;
	path: string;
}

const GITHUB_API_BASE = "https://api.github.com";

export async function fetchRepositoryFiles(
	config: GitHubRepoConfig,
	apiKey?: string,
): Promise<GitHubFile[]> {
	const headers: HeadersInit = {};
	if (apiKey) {
		headers.Authorization = `Bearer ${apiKey}`;
	}

	const response = await fetch(
		`${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${config.path}`,
		{
			headers,
			next: { revalidate: 3600 }, // Cache for 1 hour
		},
	);

	if (!response.ok) {
		let errorMessage = "Failed to fetch repository files";

		switch (response.status) {
			case 401:
				errorMessage =
					"Authentication failed. Please check your GitHub API key.";
				break;
			case 403:
				errorMessage =
					"Access forbidden. The repository may be private or the API rate limit has been exceeded.";
				break;
			case 404:
				errorMessage = `Repository not found. Please verify the repository path: ${config.owner}/${config.repo}/${config.path}`;
				break;
			case 422:
				errorMessage = "Invalid repository path or configuration.";
				break;
			default:
				errorMessage = `GitHub API error: ${response.status} ${response.statusText}`;
		}

		throw new Error(errorMessage);
	}

	const files = await response.json();

	// Filter to only include files (not directories) and sort by name
	return files
		.filter((file: GitHubFile) => file.type === "file")
		.sort((a: GitHubFile, b: GitHubFile) => a.name.localeCompare(b.name));
}

export function createRawGitHubUrl(
	owner: string,
	repo: string,
	branch: string = "main",
	filePath: string,
): string {
	return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

export async function fetchFileContentByPath(
	config: GitHubRepoConfig,
	fileName: string,
	branch: string = "main",
): Promise<GitHubFileContent> {
	const filePath = `${config.path}/${fileName}`;
	const rawUrl = createRawGitHubUrl(
		config.owner,
		config.repo,
		branch,
		filePath,
	);

	const response = await fetch(rawUrl, {
		next: { revalidate: 3600 }, // Cache for 1 hour
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch file content: ${response.statusText}`);
	}

	const content = await response.text();
	const extension = fileName.split(".").pop()?.toLowerCase() || "";

	return {
		name: fileName,
		content,
		extension,
	};
}

export function getLanguageFromExtension(extension: string): string {
	const languageMap: Record<string, string> = {
		md: "markdown",
		js: "javascript",
		ts: "typescript",
		tsx: "tsx",
		jsx: "jsx",
		py: "python",
		rs: "rust",
		go: "go",
		java: "java",
		json: "json",
		yaml: "yaml",
		yml: "yaml",
		toml: "toml",
		sh: "bash",
		bash: "bash",
		zsh: "bash",
	};

	return languageMap[extension] || "text";
}
