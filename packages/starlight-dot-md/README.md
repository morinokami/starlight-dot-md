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

> **Note**: `.mdx` files are also served as `.md`.
