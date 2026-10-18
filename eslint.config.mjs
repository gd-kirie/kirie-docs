import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "lib",
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
      braceStyle: "1tbs",
    },
    formatters: {
      css: true,
      html: true,
    },
    markdown: false,
    toml: false,
    yaml: false,
    pnpm: false,
  },
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      "import/consistent-type-specifier-style": "off",
      "node/prefer-global/process": "off",
      "node/prefer-global/buffer": "off",
      "regexp/prefer-w": "off",
      "regexp/use-ignore-case": "off",
      "style/arrow-parens": ["error", "always"],
      "style/operator-linebreak": ["error", "after"],
      "ts/method-signature-style": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "ts/consistent-type-definitions": ["error", "interface"],
    },
  },
  {
    files: ["**/*.json", "**/*.jsonc"],
    rules: {
      "jsonc/sort-keys": "off",
      "jsonc/sort-array-values": "off",
    },
  },
);
