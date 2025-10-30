/**
 * Downloads a file from a given URL
 * @param url - The URL to download the file from
 * @param filename - The name to save the file as
 * @param options - Optional configuration for the download
 */
export async function downloadFile(
	url: string,
	filename: string,
	options?: {
		onError?: (error: Error) => void;
		onSuccess?: () => void;
	},
): Promise<void> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to download file: ${response.statusText}`);
		}

		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = downloadUrl;
		link.download = filename;
		link.style.display = "none";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Clean up the object URL
		window.URL.revokeObjectURL(downloadUrl);

		options?.onSuccess?.();
	} catch (error) {
		const downloadError =
			error instanceof Error ? error : new Error("Unknown download error");
		console.error("Error downloading file:", downloadError);
		options?.onError?.(downloadError);
	}
}

/**
 * Downloads a file from a GitHub file object
 * @param file - GitHub file object with download_url and name
 * @param options - Optional configuration for the download
 */
export async function downloadGitHubFile(
	file: { download_url: string; name: string },
	options?: {
		onError?: (error: Error) => void;
		onSuccess?: () => void;
	},
): Promise<void> {
	return downloadFile(file.download_url, file.name, options);
}
