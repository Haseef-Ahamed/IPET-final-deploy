import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs", // works for legacy/require style Node.js files
      globals: {
        require: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        exports: "readonly",
        Buffer: "readonly",
        setImmediate: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      // Put more rules here as needed...
    },
  },
];

