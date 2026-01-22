import directus from "@/server/directus.ts";
import {aggregate, readItems} from "@directus/sdk";

const nullResponse = {
  data: {
    items: [] as any,
    total_count: 0
  },
  error: "Directus client not initialized",
};

const fields = [
  "title",
  "slug",
  "summary",
  "img",
  "date_created",
  'description',
  'title_seo',
  'keywords_seo',
  'description_seo',
  "category.slug",
  "category.title",
];

type filterParams = {
  page?: number;
  limit?: number
  filter?: Record<string, any>;
  fields?: string[];
  sort?: string[];
}

export async function getPostsBlog(params?: filterParams) {

  let error = null;

  const data = await directus.request(
    readItems("blog_items", {
      limit: params?.limit || 10,
      offset: ((params?.page || 1) - 1) * (params?.limit || 10),
      filter: {
        status: {_eq: "published"}
      },
      sort: ["id", ...params?.sort || []],
      fields: params?.fields || fields,
    })
  );

  const total_count = await directus.request(
    aggregate("blog_items", {
      aggregate: {count: ["id"]},
      filter: {status: {_eq: "published"}},
    })
  )?.then((res: any) => res[0]?.count?.id).catch(() => 0);

  if (!data) {
    return nullResponse;
  }

  return {
    data: {
      items: data,
      total_count
    },
    error
  };
}