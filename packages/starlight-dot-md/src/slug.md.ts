import { getCollection, getEntry } from "astro:content";
import { context } from "virtual:starlight-dot-md/context";
import type { APIRoute, GetStaticPaths } from "astro";

import {
	generateMarkdownContent,
	isExcluded,
	isIncluded,
	isMdoc,
	isMdx,
	originalSlugFromOutput,
	transformSlugForOutput,
} from "./utils";

function shouldServe(slug: string): boolean {
	if (!isIncluded(slug) || isExcluded(slug)) {
		return false;
	}

	// When preserveExtension is true, only serve .md files from this endpoint
	if (context.preserveExtension && (isMdx(slug) || isMdoc(slug))) {
		return false;
	}

	return true;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection("docs");

	return docs
		.filter((entry) => shouldServe(entry.id))
		.map((entry) => ({
			params: { slug: transformSlugForOutput(entry.id) },
		}));
};

export const GET: APIRoute = async ({ params }) => {
	const outputSlug = params.slug;
	if (!outputSlug) {
		return new Response("Not found", { status: 404 });
	}

	const slug = originalSlugFromOutput(outputSlug);
	if (!shouldServe(slug)) {
		return new Response("Not found", { status: 404 });
	}

	const entry = await getEntry("docs", slug);
	if (!entry) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(generateMarkdownContent(entry), {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
