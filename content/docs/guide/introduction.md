# Introduction

## What is Kirie?

Kirie is a framework for writing Godot game UI with Web technology.
Build your interface with HTML, CSS, and JavaScript, then layer it over your Godot scene like a decoration on a window.
Think of a HUD, a dialogue box, an inventory panel, or a game menu.

Godot runs your game. The web interface displays its UI and exchanges messages with your game code.
You can use plain JavaScript, TypeScript, or a frontend framework of your choice.

## Name and pronunciation

**Kirie** is pronounced **ki-ri-e**.
The name was inspired by a **窗花 (chuānghuā)**, a Chinese paper-cut decoration on my window.
Read [the story behind Kirie](../naming-story.md) for the gift, the window decoration, and the choice of name.

## Why Kirie?

I am a frontend developer, and I want to use the tools I already know to build game UI.
The Web already has mature layout and styling systems. Kirie lets us use them directly in Godot games.

CSS provides Flexbox and Grid for layout, plus typography, responsive styles, and animations.
These tools can shape a dialogue box, arrange an inventory, or adapt a menu to different screen sizes.

There is also a vast Web ecosystem to draw from: frontend frameworks, component libraries, JavaScript packages, and browser development tools.
You can bring familiar components and tools into your game UI instead of building every piece from scratch.

That is the idea behind Kirie: use Godot for the game, and use the Web to build the interface over it.

## How does it fit into a game?

Kirie embeds a browser view, called a WebView, in your Godot scene.
The web page draws the interface, and Kirie carries messages between that page and your C# or GDScript code.

For example, an inventory panel can send a message when the player selects an item.
Your Godot code handles the selection and sends the updated inventory back to the UI.
The [WebView and IPC guide](./webview-and-ipc.md) explains this message exchange.

During development, the Kirie CLI starts Vite and Godot together.
You can work on your web UI inside the running game.
Exported games load the packaged web content.

## Get started

Basic HTML, CSS, and JavaScript knowledge, plus familiarity with Godot scenes and scripts, will help you follow the guide.

Follow [Getting started](./getting-started.md) to create a project and run your first web UI in Godot.
The [examples](./examples.md) show other ways to connect the UI to your game.

Kirie is experimental. Its APIs and platform support are still evolving.
The [architecture notes](../architecture.md) describe the current platform support and limitations.
