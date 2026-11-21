/// <reference types='vitest' />

import { defineConfig, esmExternalRequirePlugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: "../../node_modules/.vite/packages/data-grid",

  plugins: [
    react(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.lib.json"),
      pathsToAliases: false,
    }),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    cssCodeSplit: true,

    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: "src/index.ts",
      name: "data-grid",
      formats: ["es" as const],
    },
    rolldownOptions: {
      plugins: [
        esmExternalRequirePlugin({
          external: ["react", "react-dom", "react/jsx-runtime", /^@tanstack\/.*/],
        }),
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
      external: [
        /^react-aria(-components)?(\/.*)?$/,
        /^react-stately(\/.*)?$/,
        /^@react-aria\/.*/,
        /^@react-stately\/.*/,
        /^@react-types\/.*/,
        /^@internationalized\/.*/,
      ],
    },
  },
  test: {
    name: "data-grid",
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/packages/data-grid",
      provider: "v8" as const,
    },
  },
}));
