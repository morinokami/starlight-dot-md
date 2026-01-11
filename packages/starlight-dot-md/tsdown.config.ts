import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts", "./src/slug.md.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	minify: true,
});
