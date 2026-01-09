import { readItems } from "@directus/sdk";
import directus from "@/server/directus";

export async function getMenuData(position: string | number) {

  let error = null;

  const data = await directus?.request(
    readItems("menu", {
      filter: { status: { _eq: "published" }, position: { _eq: Number(position) ?? 0 } },
      sort: [ "id" ],
      fields: [ "title", "link", "sub_items" ],
    }),
  );

  if (!data) {
    error = "Data not found";
  }

  if (error) {
    return { data: [] as any, error };
  }

  return { data, error };
}