export type StarlightDotMdOptions = {
	excludePatterns?: string[];
	includeFrontmatter?: boolean;
	includePatterns?: string[];
	preserveExtension?: boolean;
};

export type StarlightDotMdContext = {
	excludePatterns: NonNullable<StarlightDotMdOptions["excludePatterns"]>;
	includeFrontmatter: NonNullable<StarlightDotMdOptions["includeFrontmatter"]>;
	includePatterns: NonNullable<StarlightDotMdOptions["includePatterns"]>;
	preserveExtension: NonNullable<StarlightDotMdOptions["preserveExtension"]>;
	trailingSlash: "always" | "never" | "ignore";
};
