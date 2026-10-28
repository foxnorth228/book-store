import nextEslintPluginNext from "@next/eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextEslintPluginNext,
    },
    rules: {
      ...nextEslintPluginNext.configs["core-web-vitals"].rules,

      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
