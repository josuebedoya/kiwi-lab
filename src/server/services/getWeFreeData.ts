import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  battles_data: null,
  text_data: null,
  battles_carousel_data: null,
  error: "Data not found",
};

const fields = {
  battles: [
    "title_battles",
    "subtitle_battles",
    "summary_battles",
    "img_battles",
  ],
  text: [
    "title_text",
    "summary_text"
  ],
  battles_carousel: [
    "title_battles_carousel",
    "subtitle_battles_carousel",
    "items_services.battles_id.title",
    "items_services.battles_id.summary",
    "items_services.battles_id.img",
    "items_services.battles_id.slug"
  ],
}

type f = keyof typeof fields;
export const getWeFreeData = async (field?: f[]) => {

  let error = null;

  const joinedFields = field?.reduce<string[]>((acc, curr) => {
    const fieldList = fields[curr] ?? [];
    return [...acc, ...fieldList];
  }, []) as string[] | null;

  const data = await directus?.request(readItems('we_free', {
    fields: joinedFields ?? ["*"]
  })) as any;

  if (!data) {
    return nullDataResponse;
  }

  const battles_data = {
    title: data?.title_battles,
    subtitle: data?.subtitle_battles,
    subtitle2: data?.subtitle2_battles,
    summary: data?.summary_battles,
    img: data?.img_battles,
  };

  const text_data = {
    title: data?.title_text,
    summary: data?.summary_text,
  };

  const battles_carousel_data = {
    subtitle: data?.title_battles_carousel,
    summary: data?.subtitle_battles_carousel,
    items: data?.items_services?.map((item: any) => ({
      item_id: {
        ...item?.battles_id,
        slug: `batallas/${item?.battles_id?.slug}`,
      }
    }))
  }

  return {
    battles_data,
    text_data,
    battles_carousel_data,
    error,
  };
}