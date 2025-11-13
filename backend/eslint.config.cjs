// import js from "@eslint/js";

module.exports = [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
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
      // add additional rules as needed
    },
  },
];

