import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "complexity": ["error", 10],
      "max-depth": ["error", 4],
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];