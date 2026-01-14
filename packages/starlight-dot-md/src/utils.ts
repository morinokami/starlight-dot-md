import { context } from "virtual:starlight-dot-md/context";
import { mdxSlugs } from "virtual:starlight-dot-md/files";
import picomatch from "picomatch";

export function isMdx(slug: string): boolean {
	return mdxSlugs.has(slug);
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
