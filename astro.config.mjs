import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://vault223.com",
  output: "static",
  devToolbar: { enabled: false },
  build: { inlineStylesheets: "always" },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
