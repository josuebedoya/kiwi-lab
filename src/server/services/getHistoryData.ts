import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  data: null,
  error: "Data not found",
};

const fields = [
  'items_history.history_id.title',
  'items_history.history_id.subtitle',
  'items_history.history_id.subtitle2',
  'items_history.history_id.summary',
  'items_history.history_id.img'
];

export const getHistoryData = async (collection: string) => {

  let error = null;

  const data = await directus?.request(readItems(collection, {
    fields: fields
  })) as any;

  if (!data) {
    return nullDataResponse;
  }

  return {
    data: data?.items_history,
    error,
  };
}