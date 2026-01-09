import directus from "@/server/directus";
import { readItems } from "@directus/sdk";

const nullDataResponse = {
  data: null,
  error: "Data not found",
};

export const getCustomData = async (fields: string[]) => {

  let error = null;

  const data = await directus?.request(readItems("custom_items", { fields: [ ...fields ?? "*" ] })) as any;

  if (!data) {
    return nullDataResponse;
  }

  return {
    data,
    error,
  };
}