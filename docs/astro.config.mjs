// @ts-check

// import node from "@astrojs/node";
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
	integrations: [
		starlight({
			title: "starlight-dot-md",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/morinokami/starlight-dot-md",
				},
			],
			sidebar: ["getting-started", "configuration"],
		}),
		starlightDotMd({
			excludePatterns: ["reference/**"],
		}),
		astroOg(),
	],
});
