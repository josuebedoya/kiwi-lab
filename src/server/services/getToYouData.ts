import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  services_data: null,
  text_data: null,
  know_data: null,
  error: "Data not found",
};

const fields = {
  services: [
    "title_services",
    "subtitle_services",
    "subtitle2_services",
    "summary_services",
    "img_services"
  ],
  text: [
    "title_text",
    "summary_text"
  ],
  know: [
    "title_know",
    "subtitle_know",
    "summary_know",
    "items_services.services_id.title",
    "items_services.services_id.summary",
    "items_services.services_id.img",
    "items_services.services_id.slug"
  ],
}

type f = keyof typeof fields;
export const getToYouData = async (field?: f[]) => {

  let error = null;

  const joinedFields = field?.reduce<string[]>((acc, curr) => {
    const fieldList = fields[curr] ?? [];
    return [...acc, ...fieldList];
  }, []) as string[] | null;

  const data = await directus?.request(readItems('to_you', {
    fields: joinedFields ?? ["*"]
  })) as any;

  if (!data) {
    return nullDataResponse;
  }

  const services_data = {
    title: data?.title_services,
    subtitle: data?.subtitle_services,
    subtitle2: data?.subtitle2_services,
    summary: data?.summary_services,
    img: data?.img_services,
  };

  const text_data = {
    title: data?.title_text,
    summary: data?.summary_text,
  };

  const know_data = {
    title: data?.title_know,
    subtitle: data?.subtitle_know,
    summary: data?.summary_know,
    items: data?.items_services?.map((item: any) => ({
      item_id: {
        ...item?.services_id,
        slug: `servicios/${item?.services_id?.slug}`,
      }
    }))
  }

  return {
    services_data,
    text_data,
    know_data,
    error,
  };
}