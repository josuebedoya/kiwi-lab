import {readItems} from "@directus/sdk";
import directus from "@/server/directus";

const nullResponse = {
  data: null,
  hero_data: null,
  info_data: null,
  position_data: null,
  info2_data: null,
  SEO_data: null,
  error: 'Directus client not initialized',
  notFound: true
};

export async function getBattlesData(fields?: string[], slug?: string) {

  let error = null;
  let notFound = false;

  const data = await directus?.request(
    readItems("battles", {
      filter: {
        status: {_eq: "published"},
        ...(slug ? {slug: {_eq: slug}} : {}),
      },
      fields: fields ?? ["*"],
    }),
  );

  if (!data || data.length === 0) {
    notFound = true;
  }

  if (!data) {
    return nullResponse;
  }

  const dataItem = data?.find(item => item.slug === slug);

  const hero_data = {
    title: dataItem?.title,
    img: dataItem?.img,
  }

  const info_data = {
    description: dataItem?.description,
    img: dataItem?.img_info,
    img2: dataItem?.img2_info,
  }

  const position_data = {
    subtitle: dataItem?.title_position,
    summary: dataItem?.summary_position,
    summaryList: dataItem?.title_position_list,
    items: dataItem?.items_position,
  }

  const info2_data = {
    description: dataItem?.description2,
  }

  const SEO_data = {
    title: dataItem?.title,
    description: dataItem?.description_page,
    keywords: dataItem?.keywords,
    image: dataItem?.img
  }

  return {
    data,
    hero_data,
    info_data,
    position_data,
    info2_data,
    SEO_data,
    error,
    notFound
  };
}