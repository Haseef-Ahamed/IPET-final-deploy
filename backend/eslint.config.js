import js from "@eslint/js";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      // Example: semi-colons required
      semi: ["error", "always"],
    },
  },
];
