/**
 * Шлях від кореня сайту з урахуванням `base` з astro.config.
 * На власному домені це "/og-image.jpg", на GitHub Pages — "/blesscuts/og-image.jpg".
 */
export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
