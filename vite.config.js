import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    // Remove crossorigin attributes for file:// usage to avoid CORS errors
    {
      name: "remove-crossorigin-attrs",
      apply: "build",
      transformIndexHtml(html) {
        return (
          html
            .replace(/\s+crossorigin(="anonymous")?/g, "")
            .replace(/\s+type="module"/g, "") // ensure classic script tag
            // add defer to built JS to wait for DOM (so #root exists)
            .replace(
              /<script(?![^>]*defer)([^>]*src="\.\/assets\/[^"]+\.js"[^>]*)><\/script>/g,
              "<script$1 defer></script>"
            )
        );
      },
    },
    react(),
  ],
  build: {
    // Prevent adding <link rel="modulepreload"> which can trigger CORS under file://
    modulePreload: false,
    // Collapse chunks to a single JS to avoid dynamic imports over file://
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        format: "iife",
        name: "App",
      },
    },
  },
});
