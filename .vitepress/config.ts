import { fileURLToPath } from "node:url";

import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const repository = "https://github.com/gd-kirie/gd-kirie";
const base = process.env.KIRIE_DOCS_BASE ?? "/";

const config = withMermaid({
  title: "Kirie",
  description: "Write Godot game UI with HTML, CSS, JavaScript, and the Web ecosystem. Inspired by Chinese paper-cut window decorations.",
  lang: "en-US",
  base,
  sitemap: { hostname: `https://kirie.lemonneko.moe${base}` },
  srcDir: "content",
  rewrites: {
    "docs/index.md": "index.md",
  },
  lastUpdated: true,
  transformPageData: (page) => {
    if (page.filePath.startsWith("docs/guide/")
      || page.filePath.startsWith("docs/api/")
      || page.filePath === "docs/index.md") {
      page.frontmatter.editLink = false;
    }
  },
  mermaid: { securityLevel: "strict" },
  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: `${base}kirie-logo-color.svg` },
    ],
    [
      "meta",
      { name: "theme-color", content: "#478cbf" },
    ],
    [
      "meta",
      { property: "og:type", content: "website" },
    ],
    [
      "meta",
      { property: "og:site_name", content: "Kirie" },
    ],
  ],
  themeConfig: {
    logo: { src: "/kirie-logo-color.svg", alt: "Kirie" },
    nav: [
      { text: "Guide", link: "/docs/guide/introduction", activeMatch: "/docs/guide/" },
      { text: "API Reference", link: "/docs/api/", activeMatch: "/(docs/api/|packages/)" },
      { text: "Development", link: "/docs/architecture", activeMatch: "/docs/architecture" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/docs/guide/introduction" },
          { text: "Getting started", link: "/docs/guide/getting-started" },
          { text: "WebView and IPC", link: "/docs/guide/webview-and-ipc" },
          { text: "Plugins", link: "/docs/guide/plugins" },
          { text: "Examples", link: "/docs/guide/examples" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Package overview", link: "/docs/api/" },
          { text: "KirieNode", link: "/docs/api/kirie-node" },
          { text: "CLI", link: "/packages/cli/README" },
          { text: "Browser IPC", link: "/packages/ipc/README" },
          { text: "Browser Eventa adapter", link: "/packages/ipc-eventa/README" },
          { text: "Browser Platform", link: "/packages/platform/README" },
          { text: "Godot addon and C#", link: "/packages/kirie/README" },
          { text: ".NET Eventa adapter", link: "/packages/GdKirie.EventaAdapter/README" },
          { text: ".NET Platform", link: "/packages/GdKirie.Platform/README" },
          { text: "Vitest integration", link: "/packages/vitest/README" },
        ],
      },
      {
        text: "Development",
        collapsed: true,
        items: [
          { text: "Architecture", link: "/docs/architecture" },
        ],
      },
    ],
    search: { provider: "local" },
    outline: {
      level: [2, 3],
    },
    editLink: {
      pattern: `${repository}/edit/main/:path`,
      text: "Edit this page on GitHub",
    },
    socialLinks: [
      { icon: "github", link: repository },
    ],
    footer: {
      message: "Kirie · Web UI for Godot games.",
    },
  },
});

export default defineConfig({
  ...config,
  vite: {
    ...config.vite,
    publicDir: fileURLToPath(new URL("../content/docs/assets", import.meta.url)),
    // The plugin's direct dependency entries assume hoisting. Prebundle Mermaid
    // with its own dependency context for pnpm's isolated dependency layout.
    optimizeDeps: {
      include: ["mermaid"],
    },
  },
});
