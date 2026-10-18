# KirieNode

`KirieNode` is a Godot `Control` that owns one platform WebView.
Its methods forward to the low-level Kirie implementation.

## Properties

| Property | Default | Purpose |
| --- | --- | --- |
| `initial_url` | `""` | Initial page URL |
| `auto_create` | `true` | Create the WebView during `_ready()` |
| `auto_destroy` | `true` | Destroy the WebView when the node exits the tree |
| `pointer_input_forwarding_enabled` | `false` | Forward browser pointer sequences through the node |

For packaged applications, set `initial_url` to `res://src-web/dist/index.html`.
For explicit startup, disable `auto_create`, connect the handlers, and call `create_webview()`.

## Methods

| Method | Purpose |
| --- | --- |
| `create_webview(options = {})` | Create the WebView with this node as its parent |
| `destroy_webview()` | Destroy the owned WebView |
| `load_url(url)` | Load a page URL |
| `load_html_string(html, base_url = "")` | Load HTML with an optional base URL |
| `send_text(message)` | Send a string to the page |
| `send_binary(bytes)` | Send a `PackedByteArray` to the page |
| `send_data(value)` | Send a supported structured value to the page |
| `get_launch_option(key)` | Read a Kirie launch option as a string |
| `grant_permission(request_id)` | Resolve a supported desktop permission request with approval |
| `deny_permission(request_id)` | Resolve a supported desktop permission request with denial |
| `is_available()` | Return whether the backend is available |

`create_webview()` supplies `parent_node` and uses `initial_url` unless the options override the URL.
The data lane accepts only the [cross-platform data subset](../architecture.md).

## Signals

| Signal | Payload |
| --- | --- |
| `webview_ready` | No arguments |
| `text_received` | `message: String` |
| `binary_received` | `bytes: PackedByteArray` |
| `data_received` | `value: Variant` |
| `permission_requested` | `permission_type: String`, `origin: String`, `request_id: int` |
| `ipc_error` | `error: String` |

The application owns permission policy and must resolve each emitted request.
Android and iOS do not currently emit `permission_requested`.
The [addon reference](../../packages/kirie/README.md#webview-permission-requests) describes the desktop policy and request lifetime.

## C# ownership

`KirieClient.FromNode(...)` borrows an existing node.
Disposing that client disconnects its callbacks without destroying the node or its WebView.
The node must outlive the borrowed client.

See the [C# binding examples](../../packages/kirie/README.md#c-binding) for direct and borrowed clients.

## Source

The API is defined in [`packages/kirie/src-godot/kirie_node.ts`](https://github.com/gd-kirie/gd-kirie/blob/main/packages/kirie/src-godot/kirie_node.ts).
The generated GDScript is not edited directly.
