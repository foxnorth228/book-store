import baseConfig from "../../eslint.config.mjs";
import reactConfig from "../../tools/eslint/eslint.react.config.mjs";

export default [
  ...baseConfig,
  ...reactConfig,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {},
  },
];
