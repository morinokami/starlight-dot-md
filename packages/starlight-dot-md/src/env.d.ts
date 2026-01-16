/// <reference types="../../../docs/.astro/types.d.ts" />

declare module "virtual:starlight-dot-md/context" {
	export const context: import("./types").StarlightDotMdContext;
}

declare module "virtual:starlight-dot-md/files" {
	export const mdxSlugs: Set<string>;
	export const mdocSlugs: Set<string>;
}
