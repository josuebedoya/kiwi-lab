import directus from "@/server/directus";
import {readItems} from "@directus/sdk";
import resApi from "@/server/resApi.ts";

const buildFilter = (keys: string[], query: string) => ({
  _or: keys?.map(k => ({[k]: {_icontains: query}}))
});

const errorResponse = (msg: string, err: string) => {
  console.error(err, msg);
  return resApi({
    success: false,
    error: err,
    message: msg,
    data: null,
    status: 400
  })
};

const messages = {
  chars: "Ingresa almenos 2 caracteres para buscar.",
  noModels: "No se configuraron modelos para buscar.",
  notFound: "No se encontraron resultados.",
  directus: "Error: Al consultar los datos.",
  error: "Algo salió mal.",
}

export async function GET({request}: any) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim() ?? "";
    const modelsConfig = url.searchParams.get("modelsConfig") || null

    if (query.length < 2) return errorResponse(messages.chars, messages.error);
    if (!modelsConfig || modelsConfig === 'null') return errorResponse(messages.error, messages.noModels);

    // Build queries
    const models = JSON.parse(modelsConfig);

    const modelsData: any = {};

    // For to get data from each model
    for (const m in models) {
      const fieldsGet = models[m].get;
      const searchIn = models[m].in;

      modelsData[m] = await directus?.request(readItems(m, {
        filter: buildFilter(searchIn, query),
        fields: [...fieldsGet]
      })) as any;
    }

    // Validate if there's no data
    const noData = Object.keys(modelsData)?.every(m => !modelsData[m]?.length);
    if (noData) return errorResponse(messages.notFound, messages.error);

    // Response
    return resApi({
      success: true,
      error: null,
      message: undefined,
      data: modelsData,
      status: 200
    })

  } catch (error) {
    console.error(error);
    return errorResponse(messages.directus, messages.directus);
  }
}
