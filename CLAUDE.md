# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro integration called "starlight-dot-md" that allows appending `.md` to file names to render them as markdown files. The integration is currently in early development.

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

The main integration is implemented in `packages/starlight-dot-md/src/index.ts` as an Astro integration that exports a function returning an integration object with hooks. The actual functionality to handle `.md` file extensions needs to be implemented in the hooks.

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

The Astro integration should implement the following hooks to handle `.md` file extensions:
- `astro:config:setup` - Configure the integration and add middleware
- `astro:server:setup` - Handle development server requests for `.md` files
- `astro:build:setup` - Configure build process for `.md` file handling