import {readItems} from "@directus/sdk";
import directus from "@/server/directus";

export async function getServicesData(fields?: string[], slug?: string) {

  let error = null;
  let notFound = false;

  const data = await directus?.request(
    readItems("services", {
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

  if (error) {
    return {data: null, error};
  }

  const dataItem = data?.find(item => item.slug === slug);

  const hero_data = {
    title: dataItem?.title,
    img: dataItem?.img,
  }

  const info_data = {
    title: dataItem?.title_info,
    subtitle: dataItem?.subtitle_info,
    subtitle2: dataItem?.subtitle2_info,
    summary: dataItem?.summary_info,
    summaryList: dataItem?.title_info_list,
    items: dataItem?.list_info
  }

  const discover_data = {
    title: dataItem?.title_discover,
    subtitle: dataItem?.subtitle_discover,
    summary: dataItem?.summary_discover,
    items: dataItem?.items_discover,
  }

  const btn_data = {
    label: dataItem?.btn_label,
    link: dataItem?.btn_link,
  }

  const bottom_data = {
    title: dataItem?.title_bottom,
    subtitle: dataItem?.subtitle_bottom,
    summary: dataItem?.summary_bottom,
    img: dataItem?.img_bottom,
  }

  return {
    data,
    hero_data,
    info_data,
    discover_data,
    btn_data,
    bottom_data,
    error,
    notFound
  };
}