export type StarlightDotMdOptions = {
	excludePatterns?: string[];
	includePatterns?: string[];
	preserveExtension?: boolean;
};

export type StarlightDotMdContext = {
	excludePatterns: NonNullable<StarlightDotMdOptions["excludePatterns"]>;
	includePatterns: NonNullable<StarlightDotMdOptions["includePatterns"]>;
	preserveExtension: NonNullable<StarlightDotMdOptions["preserveExtension"]>;
	trailingSlash: "always" | "never" | "ignore";
};
