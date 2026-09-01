/// <reference types='vitest' />
import { defineConfig, esmExternalRequirePlugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: "../../node_modules/.vite/packages/ui",
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.lib.json"),
      pathsToAliases: false,
    }),
  ],
  resolve: {
    alias: {
      "#lib": path.resolve(__dirname, "./src/lib"),
      "#components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: "src/index.ts",
      name: "ui",
      fileName: "index",
      formats: ["es" as const],
    },
    rolldownOptions: {
      plugins: [
        esmExternalRequirePlugin({ external: ["react", "react-dom", "react/jsx-runtime"] }),
      ],
      output: {
        esModule: true,
      },
    },
  },
  test: {
    name: "ui",
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "dist/coverage",
      provider: "v8" as const,
    },
  },
}));
