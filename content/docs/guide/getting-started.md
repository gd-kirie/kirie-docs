# Getting started

Kirie is experimental. The `basic` template uses GDScript to demonstrate the WebView and text IPC workflow.

## Choose a Godot language

C# is optional, but we strongly recommend it for your Godot game code.

You can also use GDScript.
For that workflow, we recommend TypeScript with `typescript-to-gdscript`.
The converter generates the GDScript that Godot runs.

This choice is independent of the language you use for the web UI.

## Prerequisites

Install Node.js, pnpm, and Godot with the platform tools for your target.
For C# projects, install the .NET SDK required by the project.
The Eventa and Platform .NET packages target `net10.0`.

Repository contributors use the versions in [`mise.toml`](https://github.com/gd-kirie/gd-kirie/blob/main/mise.toml).
The desktop backend is Godot CEF. Android and iOS use their native WebViews.

## Create a project

Create a project from the official `basic` template:

```sh
pnpm dlx kirie init my-app basic
cd my-app
pnpm install
pnpm kirie doctor --fix
```

The initializer downloads the template pinned by the CLI release.
The template declares the core plugin in `kirie.config.ts`.
Doctor installs the declared Kirie and Godot CEF addons.

## Start development

Start the desktop development session:

```sh
pnpm kirie dev desktop
```

The CLI starts Vite and launches Godot with the development URL.
The template demonstrates messages between the browser page and GDScript.

For a mobile target, use the matching command after the target tools and device are available:

```sh
pnpm kirie dev android
pnpm kirie dev ios
```

## Build web content

Build the project inputs:

```sh
pnpm kirie build
```

Production web content belongs at `res://src-web/dist/index.html`.
Kirie loads the development URL during a development session and packaged content in an exported application.

For export commands and the experimental Web target, see the [CLI reference](../../packages/cli/README.md).

## Use an existing Godot project

Install the CLI in the project:

```sh
pnpm add -D kirie
```

Create `kirie.config.ts` in the project root:

```ts
import { defineKirieConfig } from "kirie";
import core from "kirie/plugin/core";

export default defineKirieConfig({
  plugins: [core],
});
```

Install the core dependencies:

```sh
pnpm kirie doctor --fix plugin:core
```

Enable Kirie in Godot under **Project Settings → Plugins**.
Use the template as a reference for the scene and frontend configuration.

For manual addon installation, follow the [repository installation instructions](../../README.md#installation).

## Next steps

Read [WebView and IPC](./webview-and-ipc.md) for the lifecycle and message lanes.
Browse [Examples](./examples.md) for Eventa, Platform, and C# projects.
