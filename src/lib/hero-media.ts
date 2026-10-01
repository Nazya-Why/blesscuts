import { getImage } from "astro:assets";
import { asset } from "./images";

/**
 * Обкладинка відео першого екрана (src/assets/hero-video.jpg → WebP 720 px).
 * Один і той самий URL іде і в <video poster>, і в <link rel="preload"> у <head>.
 */
export async function heroPoster() {
  const image = asset("hero-video");
  return image ? getImage({ src: image, width: 720, format: "webp", quality: 70 }) : null;
}
