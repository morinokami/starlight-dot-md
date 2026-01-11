import type { AstroIntegration } from "astro";

type StarlightDotMdOptions = {};

export default function starlightDotMd(
	options: StarlightDotMdOptions = {},
): AstroIntegration {
	return {
		name: "starlight-dot-md",
		hooks: {
			"astro:config:setup": ({ injectRoute }) => {
				injectRoute({
					pattern: "/[...slug].md",
					entrypoint: "starlight-dot-md/slug.md",
				});

				// TODO: Pass options through virtual module
			},
		},
	};
}
