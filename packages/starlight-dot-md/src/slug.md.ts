import { getCollection, getEntry } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection("docs");

	return docs.map((entry) => ({
		params: { slug: entry.id },
	}));
};

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug;

	if (!slug) {
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
