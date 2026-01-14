import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts", "./src/slug.md.ts", "./src/slug.mdx.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	minify: true,
});
