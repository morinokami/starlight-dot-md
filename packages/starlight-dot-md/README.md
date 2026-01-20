# starlight-dot-md

A Starlight plugin that serves your docs (.md, .mdx, .mdoc) as raw markdown for AI agents.

## Usage

Install the package:

```bash
npm install starlight-dot-md@latest
```

Add the plugin to your Astro config:

```js
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightDotMd from "starlight-dot-md";

export default defineConfig({
  integrations: [
    starlight({
      // ...
      plugins: [starlightDotMd()],
    }),
  ],
});
```

That's it! You can now access any page's source by appending `.md` to its URL (e.g., for a page at `/guides/example`, access `/guides/example.md`).

For more details, see the [documentation](https://starlight-dot-md.shf0811.workers.dev/).
