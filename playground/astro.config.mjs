// @ts-check

// import node from "@astrojs/node";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightDotMd from "starlight-dot-md";

// https://astro.build/config
export default defineConfig({
	// output: "server",
	// adapter: node({
	// 	mode: "standalone",
	// }),
	integrations: [
		starlight({
			title: "My Docs",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/withastro/starlight",
				},
			],
			sidebar: [
				{
					label: "Guides",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "Example Guide", slug: "guides/example" },
					],
				},
				{
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
			],
		}),
		starlightDotMd({
			excludePatterns: ["reference/**"],
		}),
	],
});
