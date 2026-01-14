import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  kiwi_data: null,
  team_data: null,
  they_data: null,
  starting_data: null,
  error: "Data not found",
};

const fields = {
  kiwi: [
    "title_kiwi",
    "subtitle_kiwi",
    "summary_kiwi",
    "img_kiwi"
  ],
  team: [
    "title_team",
    "subtitle_team",
    "summary_team",
    "items_team.team_id.name",
    "items_team.team_id.position",
    "items_team.team_id.img",
    "items_team.team_id.social",
    "items_team.team_id.slug"
  ],
  they: [
    "title_they",
    "subtitle_they",
    "summary_they",
    "item_they.team_id.name",
    "item_they.team_id.position",
    "item_they.team_id.img",
    "item_they.team_id.social",
    "item_they.team_id.slug"
  ],
  starting: [
    "title_starting",
    "summary_starting",
    "img_starting"
  ]
}
type f = keyof typeof fields;
export const getTeamData = async (field?: f[]) => {

  let error = null;

  const joinedFields = field?.reduce<string[]>((acc, curr) => {
    const fieldList = fields[curr] ?? [];
    return [...acc, ...fieldList];
  }, []) as string[] | null;

  const data = await directus?.request(readItems('our_team', {
    fields: joinedFields ?? ["*"]
  })) as any;

  if (!data) {
    return nullDataResponse;
  }

  const kiwi_data = {
    title: data?.title_kiwi,
    subtitle: data?.subtitle_kiwi,
    summary: data?.summary_kiwi,
    img: data?.img_kiwi,
  };

  const team_data = {
    title: data?.title_team,
    subtitle: data?.subtitle_team,
    summary: data?.summary_team,
    items: data?.items_team
  };

  const they_data = {
    title: data?.title_they,
    subtitle: data?.subtitle_they,
    summary: data?.summary_they,
    items: data?.item_they,
  };

  const starting_data = {
    title: data?.title_starting,
    summary: data?.summary_starting,
    img: data?.img_starting,
  };

  return {
    kiwi_data,
    team_data,
    they_data,
    starting_data,
    error,
  };
}