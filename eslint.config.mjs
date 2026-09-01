import nx from "@nx/eslint-plugin";
import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import importSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default [
  globalIgnores([
    "**/dist/**",
    "**/out-tsc/**",
    "**/node_modules/**",
    "**/build/**",
    "**/tmp/**",
    "**/.next/**",
    "**/vite.config.*.timestamp*",
    "**/vitest.config.*.timestamp*",
    "**/libs/prisma/**",
  ]),

  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,ts}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      "simple-import-sort": importSort,
      prettier,
    },

    rules: {
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

      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "no-duplicate-imports": "error",

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

      "prettier/prettier": "error",
    },
  },
];
