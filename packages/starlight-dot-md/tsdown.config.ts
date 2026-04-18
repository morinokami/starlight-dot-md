import { defineConfig } from "tsdown";

export default defineConfig({
	entry: [
		"./src/index.ts",
		"./src/slug.md.ts",
		"./src/slug.mdx.ts",
		"./src/slug.mdoc.ts",
	],
	format: ["esm"],
	dts: true,
	clean: true,
	deps: {
		neverBundle: [
			"@astrojs/starlight/types",
			"astro:content",
			"virtual:starlight-dot-md/context",
			"virtual:starlight-dot-md/files",
		],
	},
});
