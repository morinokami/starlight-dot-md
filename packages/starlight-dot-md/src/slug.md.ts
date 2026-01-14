import { getCollection, getEntry } from "astro:content";
import { context } from "virtual:starlight-dot-md/context";
import type { APIRoute, GetStaticPaths } from "astro";
import picomatch from "picomatch";

function isExcluded(slug: string): boolean {
	if (!context.excludePatterns || context.excludePatterns.length === 0) {
		return false;
	}

	return picomatch.isMatch(slug, context.excludePatterns);
}

function isIncluded(slug: string): boolean {
	if (!context.includePatterns || context.includePatterns.length === 0) {
		return true;
	}

	return picomatch.isMatch(slug, context.includePatterns);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection("docs");

	return docs
		.filter((entry) => isIncluded(entry.id) && !isExcluded(entry.id))
		.map((entry) => ({
			params: { slug: entry.id },
		}));
};

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug;

	if (!slug || !isIncluded(slug) || isExcluded(slug)) {
		return new Response("Not found", { status: 404 });
	}

	const entry = await getEntry("docs", slug);

	if (!entry) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(entry.body, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
