"use client";

import {
	Code,
	Download,
	ExternalLink,
	Eye,
	FileText,
	Loader2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadGitHubFile } from "@/lib/download";
import {
	fetchFileContentByPath,
	fetchRepositoryFiles,
	type GitHubFile,
	type GitHubFileContent,
	type GitHubRepoConfig,
	getLanguageFromExtension,
} from "@/lib/github";
import { cn } from "@/lib/utils";

interface GitHubFileBrowserProps {
	repoConfig: GitHubRepoConfig;
	title?: string;
}

export function GitHubFileBrowser({
	repoConfig,
	title = "Files",
}: GitHubFileBrowserProps) {
	return (
		<TooltipProvider>
			<GitHubFileBrowserContent repoConfig={repoConfig} title={title} />
		</TooltipProvider>
	);
}

function GitHubFileBrowserContent({
	repoConfig,
	title = "Files",
}: GitHubFileBrowserProps) {
	const [files, setFiles] = useState<GitHubFile[]>([]);
	const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null);
	const [fileContent, setFileContent] = useState<GitHubFileContent | null>(
		null,
	);
	const [isLoadingFiles, setIsLoadingFiles] = useState(true);
	const [isLoadingContent, setIsLoadingContent] = useState(false);
	const [error, setError] = useState<boolean>(false);
	const [showMarkdownFormatted, setShowMarkdownFormatted] = useState(true);

	// Load files function
	const loadFiles = useCallback(async () => {
		try {
			setIsLoadingFiles(true);
			setError(false);
			const repoFiles = await fetchRepositoryFiles(repoConfig);
			setFiles(repoFiles);
			setSelectedFile(repoFiles[0]);
		} catch (_err) {
			setError(true);
		} finally {
			setIsLoadingFiles(false);
		}
	}, [repoConfig]);

	// Load files on component mount
	useEffect(() => {
		loadFiles();
	}, [loadFiles]);

	// Load file content when a file is selected
	useEffect(() => {
		async function loadFileContent() {
			if (!selectedFile) {
				setFileContent(null);
				return;
			}

			try {
				setIsLoadingContent(true);
				setError(false);
				const content = await fetchFileContentByPath(
					repoConfig,
					selectedFile.name,
				);
				setFileContent(content);
			} catch (_err) {
				setError(true);
				setFileContent(null);
			} finally {
				setIsLoadingContent(false);
			}
		}

		loadFileContent();
	}, [selectedFile, repoConfig]);

	const formatFileSize = (bytes: number): string => {
		const kb = bytes / 1024;
		if (kb < 1) return `${bytes} B`;
		if (kb < 1024) return `${kb.toFixed(1)} KB`;
		return `${(kb / 1024).toFixed(1)} MB`;
	};

	if (error && !isLoadingFiles) {
		return (
			<Card className="max-w-6xl mx-auto border-destructive">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-destructive">
						<FileText className="h-5 w-5" />
						Error Loading Repository Files
					</CardTitle>
				</CardHeader>
				<CardContent className="p-6">
					<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
						<p className="text-destructive font-medium mb-2">
							Could not load files
						</p>
						<p className="text-sm text-muted-foreground">
							Unable to access repository files. Please try again later.
						</p>
					</div>
					<div className="mt-4 text-sm text-muted-foreground">
						<p className="mb-1">
							<strong>Repository:</strong> {repoConfig.owner}/{repoConfig.repo}
						</p>
						<p className="mb-3">
							<strong>Path:</strong> {repoConfig.path || "/"}
						</p>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setError(false);
								loadFiles();
							}}
							className="mt-2"
						>
							Try Again
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="max-w-7xl mx-auto mt-8">
			{/* Mobile File Selector */}
			<div className="lg:hidden mb-6">
				<Select
					value={selectedFile?.name || ""}
					onValueChange={(fileName) => {
						const file = files.find((f) => f.name === fileName);
						if (file) setSelectedFile(file);
					}}
				>
					<SelectTrigger className="w-full rounded-xl border-border bg-card text-card-foreground shadow font-medium text-sm px-6">
						<SelectValue placeholder="Select a file to view" />
					</SelectTrigger>
					<SelectContent>
						{files.map((file) => (
							<SelectItem key={file.path} value={file.name}>
								<div className="flex items-center justify-between w-full gap-2">
									<span className="truncate font-medium text-sm min-w-0 flex-1">
										{file.name}
									</span>
									<span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
										{formatFileSize(file.size)}
									</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
				{/* File List Panel - Hidden on mobile */}
				<Card className="hidden lg:flex col-span-1">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							{title} ({files.length})
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						{isLoadingFiles ? (
							<div className="flex items-center justify-center py-8">
								<Loader2 className="h-6 w-6 animate-spin" />
								<span className="ml-2">Loading files...</span>
							</div>
						) : error ? (
							<div className="p-6">
								<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
									<p className="text-destructive font-medium mb-2 text-sm">
										Could not load files
									</p>
									<p className="text-xs text-muted-foreground mb-3">
										Unable to access repository files.
									</p>
									<Button
										variant="outline"
										size="sm"
										onClick={loadFiles}
										className="text-xs"
									>
										Retry
									</Button>
								</div>
							</div>
						) : (
							<div className="h-[calc(100vh-320px)] overflow-y-auto">
								{files.map((file, index) => (
									<div key={file.path}>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													type="button"
													onClick={() => setSelectedFile(file)}
													className={cn(
														"w-full text-left px-6 py-3 hover:bg-accent transition-colors",
														selectedFile?.path === file.path && "bg-accent",
													)}
												>
													<div className="font-medium text-sm truncate">
														{file.name}
													</div>
													<div className="text-xs text-muted-foreground">
														{formatFileSize(file.size)}
													</div>
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p>{file.name}</p>
											</TooltipContent>
										</Tooltip>
										{index < files.length - 1 && <Separator />}
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* File Content Panel */}
				<Card className="col-span-1 lg:col-span-2">
					<CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-2">
						<CardTitle className="flex items-center gap-2 min-w-0 flex-1 max-w-full">
							{selectedFile ? (
								<>
									<FileText className="h-5 w-5 flex-shrink-0" />
									<Tooltip>
										<TooltipTrigger asChild>
											<span className="truncate block">
												{selectedFile.name}
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>{selectedFile.name}</p>
										</TooltipContent>
									</Tooltip>
								</>
							) : (
								"Select a file to view"
							)}
						</CardTitle>
						{selectedFile && (
							<div className="flex gap-2 flex-shrink-0">
								{/* Show view toggle only for markdown files */}
								{fileContent?.extension === "md" && (
									<div className="flex border rounded-md">
										<Button
											variant={showMarkdownFormatted ? "default" : "ghost"}
											size="sm"
											className="rounded-r-none"
											onClick={() => setShowMarkdownFormatted(true)}
										>
											<Eye className="h-4 w-4" />
										</Button>
										<Button
											variant={!showMarkdownFormatted ? "default" : "ghost"}
											size="sm"
											className="rounded-l-none"
											onClick={() => setShowMarkdownFormatted(false)}
										>
											<Code className="h-4 w-4" />
										</Button>
									</div>
								)}
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										downloadGitHubFile(selectedFile, {
											onError: (_error) => setError(true),
										})
									}
								>
									<Download className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => window.open(selectedFile.html_url, "_blank")}
								>
									<ExternalLink className="h-4 w-4" />
								</Button>
							</div>
						)}
					</CardHeader>
					<CardContent className="p-0">
						{!selectedFile ? (
							<div className="flex items-center justify-center py-12 text-muted-foreground">
								Select a file from the list to view its content
							</div>
						) : isLoadingContent ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-6 w-6 animate-spin" />
								<span className="ml-2">Loading content...</span>
							</div>
						) : error && !fileContent ? (
							<div className="p-6">
								<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
									<p className="text-destructive font-medium text-sm">
										Could not load files
									</p>
								</div>
							</div>
						) : fileContent ? (
							<div className="h-[calc(100vh-320px)] overflow-auto">
								{fileContent.extension === "md" && showMarkdownFormatted ? (
									<div className="prose prose-slate dark:prose-invert max-w-none p-6">
										<ReactMarkdown>{fileContent.content}</ReactMarkdown>
									</div>
								) : (
									<SyntaxHighlighter
										language={getLanguageFromExtension(fileContent.extension)}
										style={oneDark}
										showLineNumbers
										customStyle={{
											margin: 0,
											borderRadius: 0,
											background: "transparent",
										}}
										codeTagProps={{
											style: {
												fontSize: "14px",
												fontFamily:
													'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
											},
										}}
									>
										{fileContent.content}
									</SyntaxHighlighter>
								)}
							</div>
						) : null}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
