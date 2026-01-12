export type StarlightDotMdOptions = {
	excludePatterns?: string[];
};

export type StarlightDotMdContext = {
	excludePatterns: NonNullable<StarlightDotMdOptions["excludePatterns"]>;
};
