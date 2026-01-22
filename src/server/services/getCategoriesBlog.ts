import directus from "@/server/directus.ts";
import {readItems} from "@directus/sdk";

const nullResponse = {
  data: [] as any,
  error: "Directus client not initialized",
};

const fields = [
  "title",
  "slug",
  "img",
  "date_created",
  'description',
  'title_seo',
  'keywords_seo',
  'description_seo',
];

type filterParams = {
  limit?: number;
  filter?: Record<string, any>;
}

export async function getCategoriesBlog(params?: filterParams) {

  let error = null;

  const data = await directus.request(
    readItems("blog", {
      limit: params?.limit || 6,
      filter: {
        status: {_eq: "published"},
        ...params?.filter
      },
      sort: ["date_created"],
      fields,
    })
  );

  if (!data) {
    return nullResponse;
  }

  return {
    data,
    error
  };
};