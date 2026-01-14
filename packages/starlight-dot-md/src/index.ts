import type { AstroIntegration } from "astro";

import type { StarlightDotMdContext, StarlightDotMdOptions } from "./types";

function vitePluginStarlightDotMdContext(context: StarlightDotMdContext) {
	const moduleId = "virtual:starlight-dot-md/context";
	const resolvedModuleId = `\0${moduleId}`;

	return {
		name: "vite-plugin-starlight-dot-md-context",
		resolveId(id: string) {
			if (id === moduleId) {
				return resolvedModuleId;
			}
			return undefined;
		},
		load(id: string) {
			if (id === resolvedModuleId) {
				return `export const context = ${JSON.stringify(context)};`;
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
				});

				const context: StarlightDotMdContext = {
					excludePatterns: options.excludePatterns ?? [],
					includePatterns: options.includePatterns ?? [],
				};

				updateConfig({
					vite: {
						plugins: [vitePluginStarlightDotMdContext(context)],
					},
				});
			},
		},
	};
}
