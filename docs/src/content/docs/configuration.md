---
title: Configuration
description: Configure starlight-dot-md.
---

## Options

### `excludePatterns`

An array of glob patterns to exclude pages from being served as `.md` files.

```js
starlightDotMd({
  excludePatterns: ["private/**", "**/draft-*"],
});
```

### `includePatterns`

An array of glob patterns to include pages for being served as `.md` files. When specified, only pages matching these patterns will be served.

```js
starlightDotMd({
  includePatterns: ["guides/**"],
});
```

You can use `includePatterns` and `excludePatterns` together. Pages must match `includePatterns` (if specified) and not match `excludePatterns`.

```js
starlightDotMd({
  includePatterns: ["guides/**"],
  excludePatterns: ["guides/internal/**"],
});
```

### `preserveExtension`

When set to `true`, `.mdx` files are served with their original `.mdx` extension instead of being normalized to `.md`.

```js
starlightDotMd({
  preserveExtension: true,
});
```

With this option enabled:
- `.md` files are served at `.md` URLs (e.g., `/guides/example.md`)
- `.mdx` files are served at `.mdx` URLs (e.g., `/index.mdx`)
