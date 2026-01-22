import directus from "@/server/directus";
import {readUsers} from "@directus/sdk";

const nullDataResponse = {
  data: null,
  error: "Data not found",
};

export const getUsers = async (ids: string | string[]) => {

  let error = null;

  const data = await directus?.request(readUsers(
    {
      filter: {
        ...(typeof ids === "string" ? {id: {_eq: ids}} : {}),
        ...(Array.isArray(ids) ? {id: {_in: ids}} : {}),
      },
      limit: 1
    }));

  if (!data) {
    return nullDataResponse;
  }

  return {
    data,
    error,
  };
}