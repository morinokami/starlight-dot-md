# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Starlight integration that exposes raw markdown files at `.md` URLs. Users can access the raw markdown source by appending `.md` to any documentation page URL.

## Repository Structure

This is a pnpm monorepo with two main workspaces:
- `packages/starlight-dot-md/` - The main Astro integration package
- `docs/` - Documentation site and testing environment using Astro Starlight

## Development Commands

### Root Level Commands
```bash
# Run commands in the main package
pnpm dot-md <command>

# Run commands in the docs site
pnpm web <command>

# Code quality
pnpm biome check .      # Run formatter, linter and import sorting
pnpm biome lint .       # Run linter only
pnpm biome format .     # Run formatter only
```

### Package Development (`packages/starlight-dot-md/`)
```bash
pnpm dot-md build       # Build the package using tsdown
pnpm dot-md typecheck   # Run TypeScript type checking
```

### Docs Development (`docs/`)
```bash
pnpm web dev     # Start development server
pnpm web build   # Build the docs site
pnpm web preview # Preview production build
```

## Architecture

The integration consists of the following source files:

- **`src/index.ts`** - Astro integration entry point that uses `injectRoute` to register the markdown endpoints and configures the Vite virtual modules
- **`src/slug.md.ts`** - Static/dynamic endpoint that serves `.md` content from Starlight's `docs` collection
- **`src/slug.mdoc.ts`** - Static/dynamic endpoint that serves `.mdoc` (Markdoc) content (only used when `preserveExtension: true`)
- **`src/slug.mdx.ts`** - Static/dynamic endpoint that serves `.mdx` content (only used when `preserveExtension: true`)
- **`src/utils.ts`** - Utility functions for file type detection and pattern matching
- **`src/types.ts`** - Type definitions for options and context
- **`src/env.d.ts`** - Type declarations for the virtual modules

### How It Works

1. The integration injects a route pattern `/[...slug].md` via `astro:config:setup` (and `/[...slug].mdoc`, `/[...slug].mdx` when `preserveExtension: true`)
2. Options and file metadata are passed to the endpoint via Vite virtual modules (`virtual:starlight-dot-md/context` and `virtual:starlight-dot-md/files`)
3. The endpoint uses `getCollection("docs")` for SSG route generation (`getStaticPaths`)
4. The endpoint uses `getEntry("docs", slug)` to fetch content on each request (`GET`)
5. Pages are filtered using `includePatterns` (whitelist) and `excludePatterns` (blacklist) with glob pattern matching
6. When `preserveExtension: true`, `.md`, `.mdoc`, and `.mdx` files are served separately at their respective extensions
7. Returns raw markdown with `Content-Type: text/markdown; charset=utf-8`

### SSG/SSR Support

- **SSG mode**: Routes are pre-generated at build time via `getStaticPaths`
- **SSR mode**: Routes are dynamically handled via `GET`, with proper Content-Type headers

## Key Technical Details

- **Build Tool**: tsdown (configured in `packages/starlight-dot-md/tsdown.config.ts`)
- **Code Style**: Biome with tab indentation and double quotes
- **TypeScript**: Strictest mode for type checking
- **Package Manager**: pnpm with workspaces and catalog dependencies

## Development Workflow

1. Make changes in `packages/starlight-dot-md/src/`
2. Run `pnpm dot-md build` to compile the package
3. Test changes with `pnpm web dev` (integration is already configured)
4. Run `pnpm biome check .` before committing

## Integration Hook Points

The Astro integration uses the following hook:
- `astro:config:setup` - Inject the `/[...slug].md` route (and `/[...slug].mdoc`, `/[...slug].mdx` when `preserveExtension: true`) via `injectRoute` and register the Vite virtual module plugin via `updateConfig`