import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { dirname } from "node:path";

const __dirname = dirname(__filename);

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src/renderer"),
  build: {
    outDir: resolve(__dirname, "dist/renderer"),
    rollupOptions: {
      input: {
        launcher: resolve(__dirname, "src/renderer/launcher/index.html"),
        daw: resolve(__dirname, "src/renderer/daw/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    fs: {
      allow: [resolve(__dirname, "src")],
    },
  },
});
