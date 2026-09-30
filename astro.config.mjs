// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Бойовий домен: від нього будуються canonical, Open Graph, sitemap і robots.txt
  site: "https://blesscuts-barbershop.com.ua",
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
