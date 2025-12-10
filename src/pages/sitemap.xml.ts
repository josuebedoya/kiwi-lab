import type {APIContext} from 'astro';
import {directus} from '@/server/directus'
import {readItems} from "@directus/sdk";
import {SITE_URL} from "astro:env/client";

// Must be been created menu model into directus with field link
const itemsMenu = await directus.request(
  readItems('menu', {
    fields: ["link"],
    filter: {
      status: {
        _eq: "published",
      },
      link: {
        _neq: "/",   // Exclude homepage
        _ncontains: "#" // Exclude anchors
      }
    },
  })
);

// Join items lang into a single array
const formatItems = itemsMenu.map((item) => {
  const link = (item.link.startsWith('/') || item.link.startsWith('http')) ? item.link : `/${item.link}`;
  return {link};
});

const links = [...formatItems].flatMap(l => l);

export async function GET(context: APIContext) {
  const site = context.site?.toString() || SITE_URL;

  // Generate URLs for all content
  const urls: Array<{ loc: string; changefreq?: string; priority?: number, lastMod?: string }> = [];

  // Static pages
  urls.push({loc: `${site}`, changefreq: 'daily', priority: 1.0, lastMod: '2025/10/01'});

  links.forEach((item) => {
    urls.push({loc: `${site}${item.link}/`, changefreq: 'daily', priority: 0.9})
  })

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `<url>
      <loc>${url.loc}</loc>${url.changefreq ? `
      <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority !== undefined ? `
      <priority>${url.priority}</priority>` : ''}
      <lastMod>${url.lastMod || new Date()}</lastMod>
      </url>`).join('\n')}
    </urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
}