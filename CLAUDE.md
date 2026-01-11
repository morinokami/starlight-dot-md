# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Starlight integration that copies markdown source files to the build output directory, allowing users to access raw `.md` files by appending `.md` to page URLs.

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

The main integration is implemented in `packages/starlight-dot-md/src/index.ts` as an Astro integration. It scans `src/content/docs/` for markdown files and copies them to the output directory after build.

## Key Technical Details

- **Build Tool**: tsdown (configured in `packages/starlight-dot-md/tsdown.config.ts`)
- **Code Style**: Biome with tab indentation and double quotes
- **TypeScript**: Strict mode for type checking
- **Package Manager**: pnpm with workspaces and catalog dependencies

## Development Workflow

1. Make changes in `packages/starlight-dot-md/src/`
2. Run `pnpm dot-md build` to compile the package
3. Test changes with `pnpm playground dev` (integration is already configured)
4. Run `pnpm biome check .` before committing

## Integration Hook Points

The Astro integration uses the following hooks:
- `astro:config:setup` - Capture the source directory path
- `astro:build:done` - Copy markdown files to the output directory