import { getImage } from "astro:assets";
import { asset } from "./images";

/**
 * Обкладинки відео першого екрана — перші кадри відео, тож старт відео без стрибка.
 * Ті самі URL ідуть і в <picture> під відео, і в <link rel="preload"> у <head>.
 */

/** Вертикальна (телефони): src/assets/hero-video.jpg → WebP 720 px */
export async function heroPoster() {
  const image = asset("hero-video");
  return image ? getImage({ src: image, width: 720, format: "webp", quality: 70 }) : null;
}

/** Горизонтальна (ноутбуки): src/assets/hero-video-wide.jpg → WebP 1280 / 1920 px */
export async function heroPosterWide() {
  const image = asset("hero-video-wide");
  return image ? getImage({ src: image, widths: [1280, 1920], format: "webp", quality: 70 }) : null;
}
