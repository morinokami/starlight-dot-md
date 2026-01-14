/// <reference types="../../../playground/.astro/types.d.ts" />

declare module "virtual:starlight-dot-md/context" {
	export const context: import("./types").StarlightDotMdContext;
}

declare module "virtual:starlight-dot-md/files" {
	export const mdxSlugs: Set<string>;
}
