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
