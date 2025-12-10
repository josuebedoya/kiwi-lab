import {directus} from "@/server/directus";
import {readItems} from "@directus/sdk";

const buildFilter = (keys: string[], query: string) => ({
  _or: keys?.map(k => ({[k]: {_icontains: query}}))
});

export async function GET({request}: any) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim() ?? "";

    if (query.length < 1) {
      return new Response(JSON.stringify({error: "Error getting data", status: 500}), {
        headers: {"Content-Type": "application/json"}
      });
    }

    const fields = [
      "title",
      "summary"
    ];

    // Here get data to search
    const data = await directus?.request(readItems("model", {
      filter: buildFilter(fields, query),
      fields: ['id', ...fields]
    })) as any;

    // Data others models to search

    if (!data?.length) {
      return new Response(JSON.stringify({error: "Not found data", status: 404}), {
        headers: {"Content-Type": "application/json"}
      });
    }

    const res = [...data || []]

    return new Response(
      JSON.stringify(res),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify(error),
      {
        status: 500,
        headers: {"Content-Type": "application/json"}
      }
    );
  }
}
