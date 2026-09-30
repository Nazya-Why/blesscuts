// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Бойовий домен: від нього будуються canonical, Open Graph, sitemap і robots.txt.
  // SITE_URL і BASE_PATH задає scripts/deploy-pages.mjs для публікації на GitHub Pages.
  site: process.env.SITE_URL ?? "https://blesscuts-barbershop.com.ua",
  base: process.env.BASE_PATH ?? "/",
  build: {
    // Один лендинг — CSS вбудовується в HTML, без окремого блокуючого запиту
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      // Onest завантажується з Google Fonts під час збірки й віддається з власного домену
      provider: fontProviders.google(),
      name: "Onest",
      cssVariable: "--font-onest",
      weights: [400, 500, 600, 700],
      subsets: ["cyrillic", "latin"],
      fallbacks: ["sans-serif"],
    },
  ],
});
