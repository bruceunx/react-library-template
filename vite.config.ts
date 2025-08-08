/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { globSync } from "node:fs";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: "tsconfig.app.json",
      exclude: ["tests/**/*", "**/*.stories.*"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      input: Object.fromEntries(
        globSync(["src/components/*.tsx", "src/main.ts"], {
          exclude: ["src/**/*.stories.ts"],
        }).map((file) => {
          const entryName = path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length),
          );
          const entryUrl = fileURLToPath(new URL(file, import.meta.url));
          return [entryName, entryUrl];
        }),
      ),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
        globals: {
          react: "React",
          "react-dom": "React-dom",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest.setup.ts",
  },
});
