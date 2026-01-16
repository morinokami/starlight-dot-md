import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { AstroIntegration } from "astro";

import type { StarlightDotMdContext, StarlightDotMdOptions } from "./types";

function findFilesByExtension(
	dir: string,
	baseDir: string,
	extension: string,
): string[] {
	const results: string[] = [];
	try {
		const entries = readdirSync(dir);
		for (const entry of entries) {
			const fullPath = join(dir, entry);
			const stat = statSync(fullPath);
			if (stat.isDirectory()) {
				results.push(...findFilesByExtension(fullPath, baseDir, extension));
			} else if (entry.endsWith(extension)) {
				const relativePath = relative(baseDir, fullPath);
				results.push(relativePath.replace(extension, ""));
			}
		}
	} catch {
		// Directory doesn't exist, return empty array
	}
	return results;
}

function vitePluginStarlightDotMdContext(
	context: StarlightDotMdContext,
	preserveExtension: boolean,
) {
	const contextModuleId = "virtual:starlight-dot-md/context";
	const resolvedContextModuleId = `\0${contextModuleId}`;
	const filesModuleId = "virtual:starlight-dot-md/files";
	const resolvedFilesModuleId = `\0${filesModuleId}`;
	let root = "";

	return {
		name: "vite-plugin-starlight-dot-md-context",
		configResolved(config: { root: string }) {
			root = config.root;
		},
		resolveId(id: string) {
			if (id === contextModuleId) {
				return resolvedContextModuleId;
			}
			if (id === filesModuleId) {
				return resolvedFilesModuleId;
			}
			return undefined;
		},
		load(id: string) {
			if (id === resolvedContextModuleId) {
				return `export const context = ${JSON.stringify(context)};`;
			}
			if (id === resolvedFilesModuleId) {
				if (!preserveExtension) {
					return `export const mdocSlugs = new Set();\nexport const mdxSlugs = new Set();`;
				}
				const docsDir = join(root, "src/content/docs");
				const mdxSlugs = findFilesByExtension(docsDir, docsDir, ".mdx");
				const mdocSlugs = findFilesByExtension(docsDir, docsDir, ".mdoc");
				return `export const mdocSlugs = new Set(${JSON.stringify(mdocSlugs)});\nexport const mdxSlugs = new Set(${JSON.stringify(mdxSlugs)});`;
			}
			return undefined;
		},
	};
}

export default function starlightDotMd(
	options: StarlightDotMdOptions = {},
): AstroIntegration {
	return {
		name: "starlight-dot-md",
		hooks: {
			"astro:config:setup": ({ injectRoute, updateConfig }) => {
				injectRoute({
					pattern: "/[...slug].md",
					entrypoint: "starlight-dot-md/slug.md",
					prerender: true,
				});

				if (options.preserveExtension) {
					injectRoute({
						pattern: "/[...slug].mdx",
						entrypoint: "starlight-dot-md/slug.mdx",
						prerender: true,
					});
					injectRoute({
						pattern: "/[...slug].mdoc",
						entrypoint: "starlight-dot-md/slug.mdoc",
						prerender: true,
					});
				}

				const context: StarlightDotMdContext = {
					excludePatterns: options.excludePatterns ?? [],
					includePatterns: options.includePatterns ?? [],
					preserveExtension: options.preserveExtension ?? false,
				};

				updateConfig({
					vite: {
						plugins: [
							vitePluginStarlightDotMdContext(
								context,
								options.preserveExtension ?? false,
							),
						],
					},
				});
			},
		},
	};
}
