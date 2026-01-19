import type { CollectionEntry } from "astro:content";
import { context } from "virtual:starlight-dot-md/context";
import { mdocSlugs, mdxSlugs } from "virtual:starlight-dot-md/files";
import picomatch from "picomatch";
import yaml from "yaml";

export function isMdx(slug: string): boolean {
	return mdxSlugs.has(slug);
}

export function isMdoc(slug: string): boolean {
	return mdocSlugs.has(slug);
}

export function isExcluded(slug: string): boolean {
	if (!context.excludePatterns || context.excludePatterns.length === 0) {
		return false;
	}

	return picomatch.isMatch(slug, context.excludePatterns);
}

export function isIncluded(slug: string): boolean {
	if (!context.includePatterns || context.includePatterns.length === 0) {
		return true;
	}

	return picomatch.isMatch(slug, context.includePatterns);
}

export function transformSlugForOutput(slug: string): string {
	if (context.trailingSlash === "always" && slug !== "index") {
		return `${slug}/index`;
	}
	return slug;
}

export function originalSlugFromOutput(outputSlug: string): string {
	if (
		context.trailingSlash === "always" &&
		outputSlug !== "index" &&
		outputSlug.endsWith("/index")
	) {
		return outputSlug.slice(0, -6);
	}
	return outputSlug;
}

export function generateMarkdownContent(entry: CollectionEntry<"docs">): string {
	if (!context.includeFrontmatter) {
		return entry.body ?? "";
	}

	const frontmatter = yaml.stringify(entry.data);
	return `---\n${frontmatter}---\n\n${entry.body ?? ""}`;
}
