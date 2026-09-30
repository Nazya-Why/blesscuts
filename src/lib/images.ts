import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

/**
 * Зображення з src/assets за шляхом без розширення ("hero", "barbers/denys").
 * Якщо файлу ще немає — undefined, і компонент покаже сіру заглушку.
 */
export function asset(path: string): ImageMetadata | undefined {
  const key = Object.keys(files).find((k) => k.replace(/\.[^.]+$/, "") === `../assets/${path}`);
  return key ? files[key].default : undefined;
}
