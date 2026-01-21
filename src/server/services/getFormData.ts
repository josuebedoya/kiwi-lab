import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  data: null,
  error: "Data not found",
};

const fields = [
  'id',
  'title',
  'subtitle',
  'label',
  'fields'
];

export const getFormData = async (id: string | number) => {

  let error = null;

  const data = await directus?.request(readItems('form', {
    fields,
    filter: {
      id: {_eq: id}
    }
  })) as any;

  if (!data) {
    return nullDataResponse;
  }

  return {
    data: data[0],
    error,
  };
}