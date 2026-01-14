# starlight-dot-md

A Starlight integration that exposes raw markdown files at `.md` URLs.

## Installation

```bash
npm install starlight-dot-md
```

## Usage

```js
// astro.config.mjs
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightDotMd from "starlight-dot-md";

export default defineConfig({
  integrations: [
    starlight({ ... }),
    starlightDotMd(),
  ],
});
```

After build, access any page's source by appending `.md` to its URL (e.g., `/guides/example.md`).

> **Note**: By default, both `.md` and `.mdx` files are served with the `.md` extension. Use the `preserveExtension` option to keep the original extension.

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

You can use both options together. Pages must match `includePatterns` (if specified) and not match `excludePatterns`.

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
