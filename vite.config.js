import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  plugins: [
    vue(),
    vitePluginRequire(),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".svg"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
