import {PUBLIC_DIRECTUS_URL as URL} from "astro:env/server";
import slugify from "@/utils/slugify.ts";
import buildQuery from "@/utils/buildQuery.ts";

const readFile = async (id: string, name: string, params?: Record<string, any>): Promise<string | null> => {
  try {
    if (!id) throw new Error('ID is required');

    const queryParams = {format: 'webp', ...params};
    return `${URL}/assets/${id}/${slugify(name || 'image')}.webp?${buildQuery(queryParams)}`;

  } catch (error) {
    console.error(`Error trying to get media. ID: ${id}`, error);
    return null;
  }
};

export default readFile;