export type StarlightDotMdOptions = {
	excludePatterns?: string[];
	includePatterns?: string[];
};

export type StarlightDotMdContext = {
	excludePatterns: NonNullable<StarlightDotMdOptions["excludePatterns"]>;
	includePatterns: NonNullable<StarlightDotMdOptions["includePatterns"]>;
};
