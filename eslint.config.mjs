import nx from "@nx/eslint-plugin";
import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import importSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config([
  // IGNORES
  globalIgnores([
    "**/dist",
    "**/out-tsc",
    "**/node_modules",
    "**/build",
    "**/tmp",
    "**/vite.config.*.timestamp*",
    "**/vitest.config.*.timestamp*",
    "**/libs/prisma/client/**",
  ]),

  // NX BASE RULES
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],

  // JS/TS + REACT BASE CONFIG
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "simple-import-sort": importSort,
      prettier,
    },
    rules: {
      // NX RULES
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],

      // IMPORTS
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "no-duplicate-imports": "error",

      // TS RULES
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",

      // PRETTIER
      "prettier/prettier": "error",
    },
  },
]);
