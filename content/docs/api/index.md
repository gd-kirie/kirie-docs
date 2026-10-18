# API reference

Kirie separates the WebView, transport, application protocol, and host capabilities.
Each package README is published directly in this site from its source location.

## Godot and .NET

| Surface | Purpose |
| --- | --- |
| [KirieNode](./kirie-node.md) | Scene-owned WebView, lifecycle, and message lanes |
| [Godot addon and KirieClient](../../packages/kirie/README.md) | Addon sources and C# wrapper ownership |
| [GdKirie.EventaAdapter](../../packages/GdKirie.EventaAdapter/README.md) | Eventa contexts over the C# text transport |
| [GdKirie.Platform](../../packages/GdKirie.Platform/README.md) | Godot host for the Platform contract |

The .NET Eventa and Platform packages target `net10.0`.
C# wrappers expose Kirie signals as events and keep Godot signal plumbing private.

## Browser

| Package | Purpose |
| --- | --- |
| [@gd-kirie/ipc](../../packages/ipc/README.md) | Text, binary, data, and pointer input transport |
| [@gd-kirie/ipc-eventa](../../packages/ipc-eventa/README.md) | Eventa events and RPC over the text lane |
| [@gd-kirie/platform](../../packages/platform/README.md) | Host window operations and platform events |

Platform clients and optional plugin adapters borrow the application Eventa context.
The low-level IPC package contains no application capability APIs.

## Development tools

| Package | Purpose |
| --- | --- |
| [kirie](../../packages/cli/README.md) | Project initialization, development, build, export, and doctor commands |
| [@gd-kirie/vitest](../../packages/vitest/README.md) | ViDot tests through Kirie platform launchers |

The [architecture document](../architecture.md) defines the boundaries and wire semantics.
