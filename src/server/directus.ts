import {createDirectus, rest, staticToken} from "@directus/sdk";
import {SECRET_DIRECTUS_TOKEN as TOKEN} from 'astro:env/server';
import {PUBLIC_DIRECTUS_URL as URL} from 'astro:env/client';

if (!URL || !TOKEN) {
  throw new Error('PUBLIC_DIRECTUS_URL or SECRET_DIRECTUS_TOKEN is not defined in environment variables');
}

const directus = createDirectus(URL)
  .with(rest())
  .with(staticToken(TOKEN || ''));

export default directus;