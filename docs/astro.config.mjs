// @ts-check

// import node from "@astrojs/node";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import astroOg from "astro-og";
import starlightDotMd from "starlight-dot-md";

const site = "https://starlight-dot-md.shf0811.workers.dev";

// https://astro.build/config
export default defineConfig({
	// output: "server",
	// adapter: node({
	// 	mode: "standalone",
	// }),
	site,
	trailingSlash: "never",
	integrations: [
		starlight({
			title: "starlight-dot-md",
			lastUpdated: true,
			components: {
				Hero: "./src/components/HeroWithoutImage.astro",
				PageTitle: "./src/components/PageTitleWithCopyAsMarkdown.astro",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/morinokami/starlight-dot-md",
				},
			],
			sidebar: [
				{ label: "Home", link: "/" },
				"getting-started",
				"configuration",
			],
			plugins: [starlightDotMd()],
		}),
		astroOg(),
		markdoc(),
		sitemap({
			filter: (page) => page !== `${site}/markdoc`,
		}),
	],
});
