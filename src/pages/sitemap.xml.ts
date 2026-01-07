import type {APIContext} from 'astro';
import directus from '@/server/directus'
import {readItems} from "@directus/sdk";
import {PUBLIC_SITE_URL} from "astro:env/client";

// Must be been created menu model into directus with field link
const itemsMenu = await directus.request(
  readItems('menu', {
    fields: ["link", 'date_created', 'date_updated'],
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
  const link = (item?.link.startsWith('/') || item.link.startsWith('http')) ? item?.link : `/${item?.link}`;
  return {link, date: item?.date_updated || item?.date_created || null};
});

const links = [...formatItems].flatMap(l => l);

export async function GET(context: APIContext) {
  const site = context.site?.toString() || PUBLIC_SITE_URL;

  // Generate URLs for all content
  const urls: Array<{ loc: string; changefreq?: string; priority?: number, date?: string | null }> = [];

  // Static pages
  urls.push({loc: `${site}`, changefreq: 'daily', priority: 1.0, date: '2025/12/10T14:12:23.100Z'});

  links.forEach((item) => {
    urls.push({loc: `${site}${item?.link}/`, changefreq: 'daily', priority: 0.9, date: item?.date || null})
  })

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `<url>
      <loc>${url?.loc}</loc>${url?.changefreq ? `
      <changefreq>${url?.changefreq}</changefreq>` : ''}${url.priority !== undefined ? `
      <priority>${url?.priority}</priority>` : ''}
      <lastmod>${(url?.date || new Date().toISOString())?.slice(0, -5)}</lastmod>
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