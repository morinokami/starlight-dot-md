# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Starlight integration that exposes raw markdown files at `.md` URLs. Users can access the raw markdown source by appending `.md` to any documentation page URL.

## Repository Structure

This is a pnpm monorepo with two main workspaces:
- `packages/starlight-dot-md/` - The main Astro integration package
- `playground/` - Testing environment for the integration using Astro Starlight

## Development Commands

### Root Level Commands
```bash
# Run commands in the main package
pnpm dot-md <command>

# Run commands in the playground
pnpm playground <command>

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

### Playground Development
```bash
pnpm playground dev     # Start development server
pnpm playground build   # Build the playground site
pnpm playground preview # Preview production build
```

## Architecture

The integration consists of the following source files:

- **`src/index.ts`** - Astro integration entry point that uses `injectRoute` to register the markdown endpoint and configures the Vite virtual module
- **`src/slug.md.ts`** - Static/dynamic endpoint that serves raw markdown content from Starlight's `docs` collection
- **`src/types.ts`** - Type definitions for options and context
- **`src/env.d.ts`** - Type declarations for the virtual module

### How It Works

1. The integration injects a route pattern `/[...slug].md` via `astro:config:setup`
2. Options are passed to the endpoint via a Vite virtual module (`virtual:starlight-dot-md/context`)
3. The endpoint uses `getCollection("docs")` for SSG route generation (`getStaticPaths`)
4. The endpoint uses `getEntry("docs", slug)` to fetch content on each request (`GET`)
5. Pages are filtered using `includePatterns` (whitelist) and `excludePatterns` (blacklist) with glob pattern matching
6. Returns raw markdown with `Content-Type: text/markdown; charset=utf-8`

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
3. Test changes with `pnpm playground dev` (integration is already configured)
4. Run `pnpm biome check .` before committing

## Integration Hook Points

The Astro integration uses the following hook:
- `astro:config:setup` - Inject the `/[...slug].md` route via `injectRoute` and register the Vite virtual module plugin via `updateConfig`