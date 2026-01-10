import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

/**
 * Recursively scan a directory for markdown files.
 */
function scanContentDir(dir: string): string[] {
	const files: string[] = [];

	if (!existsSync(dir)) {
		return files;
	}

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...scanContentDir(fullPath));
		} else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
			files.push(fullPath);
		}
	}

	return files;
}

export default function astroDotMd(): AstroIntegration {
	let srcDir: string;

	return {
		name: "starlight-dot-md",
		hooks: {
			"astro:config:setup": ({ config }) => {
				srcDir = fileURLToPath(config.srcDir);
			},
			"astro:build:done": async ({ dir, logger }) => {
				const contentDir = join(srcDir, "content/docs");
				const outputDir = fileURLToPath(dir);

				// Scan for all markdown files
				const files = scanContentDir(contentDir);

				if (files.length === 0) {
					logger.warn("No md(x) files found in src/content/docs/");
					return;
				}

				let copiedCount = 0;

				for (const file of files) {
					// src/content/docs/guides/example.md → guides/example.md
					// src/content/docs/index.mdx → index.md (normalize extension)
					const relativePath = relative(contentDir, file).replace(
						/\.mdx$/,
						".md",
					);
					const outputPath = join(outputDir, relativePath);

					// Ensure directory exists
					const outputDirPath = dirname(outputPath);
					if (!existsSync(outputDirPath)) {
						mkdirSync(outputDirPath, { recursive: true });
					}

					// Copy the file
					copyFileSync(file, outputPath);
					copiedCount++;
				}

				logger.info(
					`Copied ${copiedCount} md(x) file(s) to output directory`,
				);
			},
		},
	};
}
