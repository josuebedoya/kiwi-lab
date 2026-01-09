import directus from "@/server/directus";
import { readField, readItems } from "@directus/sdk";

const nullDataResponse = {
  data: null,
  error: "Data not found",
};

export const getInfoData = async (field = "*") => {

  let error = null;

  const data = await directus?.request(readItems("info_contact", { fields: [ field ?? "*" ] })) as any;
  const dataField = await directus?.request(readField("info_contact", 'social')) as any;

  if (!data || !dataField) {
    return nullDataResponse;
  }

  const joindedData = data?.social?.map((item: any) => {
    const label = dataField.meta?.display_options?.choices?.find((option: any) => option.value === item.icon)?.text || '';
    
    return {
      ...item,
      label
    }
  });

  return {
    data: joindedData,
    dataField,
    error,
  };
}