import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs", // <-- Node.js uses CommonJS (require) by default
      globals: {
        ...js.configs.recommended.languageOptions.globals,
        require: true,
        process: true,
        console: true,
        __dirname: true,
        __filename: true,
        module: true,
        exports: true,
        Buffer: true,
        setImmediate: true,
      },
    },
    plugins: {},
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
