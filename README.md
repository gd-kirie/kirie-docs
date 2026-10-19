# Kirie documentation

This independent repository contains the Kirie documentation site.
The documentation repository is [gd-kirie/kirie-docs](https://github.com/gd-kirie/kirie-docs).
The application repository is [gd-kirie/gd-kirie](https://github.com/gd-kirie/gd-kirie).

The site follows the [Godot CEF documentation](https://godotcef.org/) structure.
It includes guides, API references, architecture notes, local search, and Mermaid diagrams.

## Development

Install the tools and dependencies:

```sh
mise install
mise x -- pnpm install --frozen-lockfile
```

Start the development server:

```sh
mise run dev
```

Build and preview the site:

```sh
mise run build
mise run preview
```

The development server listens on `127.0.0.1` and prints its port.
In Lody, the agent reports the server address to enable the **Browser** preview.
The repository is registered separately from the application project.

## Engineering configuration

The site inherits the application repository conventions:

- Node.js 24.15.0 and pnpm 12.3.4 through mise
- A pnpm catalog and a frozen lockfile
- The Antfu ESLint configuration with two spaces, double quotes, and semicolons
- TypeScript interfaces for object shapes
- CSS and HTML formatting through ESLint
- GitHub Actions with the same mise tool installation pattern.

Only the web documentation tools are required. Native Godot, Android, iOS, and .NET build tools are outside this repository.

Run the checks:

```sh
mise run lint
mise run typecheck
mise run build
```

## Content ownership

`content/docs/guide`, `content/docs/api`, `content/docs/index.md`, and `content/docs/naming-story.md` contain site-authored pages.
The remaining reference pages are a checked-in snapshot from the application repository.
`upstream.json` records their source commit and file list.
These files make the site independent of a sibling checkout and network access during builds.

When an upstream API or architecture changes, update the affected snapshot files and the source commit together.
Preserve source-relative links and run the site checks after the update.
Snapshots omit links and sections for pages outside the documentation site.
Architecture decision links point to the recorded upstream commit.
The root project README snapshot adds `./` to its logo path for Vite asset resolution.

The site configuration is `.vitepress/config.ts`.
The theme reuses the existing Kirie assets under `content/docs/assets`.
Production output belongs in `.vitepress/dist` and is ignored by Git.
