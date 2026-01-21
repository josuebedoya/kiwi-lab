import {parse} from "node-html-parser";
import  {PUBLIC_DIRECTUS_URL as ADMIN} from "astro:env/server";

export function formatterHTML(html: string): string {
  if (!html) return html;

  const root = parse(html);

  const images = root.querySelectorAll("img");

  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src) return;

    // https://kiwi_admin.imaginadevs.com/assets/UUID.avif?width=100
    const match = src.match(/\/assets\/([a-f0-9-]+)\./i);
    if (!match) return;

    const id = match[1];

    const newSrc = `${ADMIN}/assets/${id}.webp?format=webp`;

    img.setAttribute("src", newSrc);
  });

  return root.toString();
}
