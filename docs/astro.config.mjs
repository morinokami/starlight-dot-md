// @ts-check

// import node from "@astrojs/node";
import markdoc from "@astrojs/markdoc";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import astroOg from "astro-og";
import starlightDotMd from "starlight-dot-md";

// https://astro.build/config
export default defineConfig({
	// output: "server",
	// adapter: node({
	// 	mode: "standalone",
	// }),
	trailingSlash: "never",
	integrations: [
		starlight({
			title: "starlight-dot-md",
			components: {
				PageTitle: "./src/components/PageTitleWithCopyAsMarkdown.astro",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/morinokami/starlight-dot-md",
				},
			],
			sidebar: ["getting-started", "configuration"],
			plugins: [starlightDotMd()],
		}),
		astroOg(),
		markdoc(),
	],
});
