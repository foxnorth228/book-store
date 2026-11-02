import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig(() => {
  return {
    root: import.meta.dirname,
    cacheDir: "../../node_modules/.vite/apps/web",
    server: {
      port: 5173,
      host: "localhost",
      proxy: {
        "/api": {
          target: `http://localhost:3000`,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 5173,
      host: "localhost",
    },
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      svgr(),
    ],
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "./src/app"),
        "@modules": path.resolve(__dirname, "./src/modules"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@shared": path.resolve(__dirname, "./src/shared"),
      },
    },
    build: {
      emptyOutDir: true,
      transformMixedEsModules: true,
      outDir: "./dist",
      reportCompressedSize: true,
      commonjsOptions: { transformMixedEsModules: true },
    },
    test: {
      name: "@org/web",
      watch: false,
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      reporters: ["default"],
      coverage: {
        reportsDirectory: "./test-output/vitest/coverage",
        provider: "v8" as const,
      },
    },
  };
});
