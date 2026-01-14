import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  data: null,
  error: "Data not found",
};

export const getData = async (collection: string, fields?: string[]) => {

  let error = null;

  const data = await directus?.request(readItems(collection, {fields: [...fields ?? "*"]})) as any;

  if (!data) {
    return nullDataResponse;
  }

  return {
    data,
    error,
  };
}