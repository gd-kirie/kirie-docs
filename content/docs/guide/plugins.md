# Plugins

A Kirie plugin declares its Godot addon and .NET dependencies.
The application enables plugins explicitly in `kirie.config.ts`.

## Enable the core plugin

Add the core descriptor to the plugin array:

```ts
import { defineKirieConfig } from "kirie";
import core from "kirie/plugin/core";

export default defineKirieConfig({
  plugins: [core],
});
```

Check the configured core dependencies:

```sh
pnpm kirie doctor plugin:core
```

Apply supported repairs explicitly:

```sh
pnpm kirie doctor --fix plugin:core
```

Core declares the Kirie addon, Godot CEF, and the .NET Eventa and Platform packages.
Doctor skips .NET checks for a Godot project without a `.csproj` file.

## Add optional capabilities

The [kirie-plugins repository](https://github.com/gd-kirie/kirie-plugins) maintains Tray and Notifications separately from the core.

Install the Tray package:

```sh
pnpm add @gd-kirie/tray
```

Add its descriptor beside the core plugin:

```ts
import { defineKirieConfig } from "kirie";
import core from "kirie/plugin/core";
import tray from "@gd-kirie/tray/plugin";

export default defineKirieConfig({
  plugins: [core, tray],
});
```

Install the declared Tray dependencies:

```sh
pnpm kirie doctor --fix plugin:tray
```

The Tray Eventa adapter borrows the application context.
The native `GdKirie.Tray` C# SDK also works independently of browser IPC.

## Use Platform capabilities

`@gd-kirie/platform` provides host window operations and platform events through an existing Eventa context.
It does not create another WebView or IPC owner.

Follow the [browser Platform reference](../../packages/platform/README.md) and the [.NET host reference](../../packages/GdKirie.Platform/README.md).
The [architecture document](../architecture.md) records platform-specific support and dependency boundaries.
