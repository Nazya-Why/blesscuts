import type { APIRoute } from "astro";
import { withBase } from "../lib/url";

// Односторінковий сайт — одна адреса в карті сайту
export const GET: APIRoute = ({ site }) => {
  const loc = new URL(withBase(), site).href;
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
