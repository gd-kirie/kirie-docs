# WebView and IPC

`KirieNode` owns one platform WebView in the Godot scene tree.
The browser package, `@gd-kirie/ipc`, borrows the bridge that the host provides.

## Create the WebView

Add a `KirieNode` to the scene.
Set `initial_url` to the page URL and disable `auto_create` for explicit startup.
For packaged content, use `res://src-web/dist/index.html`.

Connect the Godot handlers before calling `create_webview()`.
The browser must register its receive handlers before it sends its first application message.

The [basic template](https://github.com/moeru-ai/kirie-templates/tree/main/templates/basic) demonstrates this lifecycle.
The [KirieNode reference](../api/kirie-node.md) lists the properties, methods, and signals.

## Choose a message lane

| Lane | Browser send | Browser receive | Payload |
| --- | --- | --- | --- |
| Text | `sendText()` | `onTextReceived()` | String |
| Binary | `sendBinary()` | `onBinaryReceived()` | `Uint8Array` |
| Data | `sendData()` | `onDataReceived()` | Supported structured values |

Native transports carry these lanes as CBOR packets.
The experimental Web iframe transport uses a private `MessagePort` and structured clone.

The data lane accepts `null`, booleans, finite numbers, strings, arrays, and objects with string keys.
It excludes custom objects, cycles, and engine-local values.
The [architecture document](../architecture.md) defines the exact cross-platform limits.

## Exchange text messages

Install the browser transport in the frontend package:

```sh
pnpm add @gd-kirie/ipc
```

Subscribe before sending an application message:

```ts
import { onTextReceived, sendText } from "@gd-kirie/ipc";

const unsubscribe = onTextReceived((message) => {
  console.log("Godot → web:", message);
});

sendText("web_ready");

window.addEventListener("pagehide", unsubscribe, { once: true });
```

The application defines the meaning of `web_ready`.
Kirie does not define a JSON protocol or serialize application objects on the text lane.

For typed events and request/response calls, use the [Eventa adapter](../../packages/ipc-eventa/README.md).
Create one application context and share it with the Platform client and plugin adapters.

## Forward pointer input

Native WebViews cover their host surface. CSS transparency does not pass native pointer input to Godot controls.

Enable forwarding on the scene-owned WebView:

```gdscript
$KirieNode.pointer_input_forwarding_enabled = true
```

Import the browser listener in the frontend entry:

```ts
import "@gd-kirie/ipc/pointer-input/auto";
```

Interactive elements can retain an input sequence with `event.stopPropagation()` on `pointerdown`.
The [browser IPC reference](../../packages/ipc/README.md#pointer-input-forwarding) describes explicit listener ownership and cleanup.

## Release resources

`KirieNode` destroys its WebView on scene exit when `auto_destroy` is enabled.
A C# client created with `KirieClient.FromNode(...)` borrows that owner.
Disposing the borrowed client disconnects its callbacks. The node still owns the WebView.
