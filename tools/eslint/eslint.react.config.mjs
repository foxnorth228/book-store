import eslintReact from "@eslint-react/eslint-plugin";

export default [
  {
    ...eslintReact.configs["recommended-typescript"],
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
