import directus from "@/server/directus";
import {readItems} from "@directus/sdk";

const nullDataResponse = {
  main_hero_data: null,
  about_data: null,
  differentials_data: null,
  impact_data: null,
  real_impact_data: null,
  partners_data: null,
  experience_data: null,
  faq_data: null,
  SEO_data: null,
  letswork_data: null,
  error: "Data not found",
};

const fields = {
  main_hero: [
    "title_main_hero",
    "summary_main_hero",
    "btn_main_hero_label",
    "btn_main_hero_link",
    "btn2_main_hero_label",
    "btn2_main_hero_link",
    "img_main_hero",
    "img2_main_hero",
    "seal_main_hero",
  ],
  about: [
    "title_about",
    "subtitle_about",
    "summary_about",
    "btn_about_label",
    "btn_about_link",
    "img_about",
  ],
  differentials: [
    "title_differentias",
    "subtitle_differentials",
    "items_differentials"
  ],
  impact: [
    "title_impact",
    "subtitle_impact",
    "summary_impact",
    "items_impact.impact_id.title",
    "items_impact.impact_id.img",
    "items_impact.impact_id.number",
    "items_impact.impact_id.is_percentage"
  ],
  real_impact: [
    "title_real_impact",
    "subtitle_real_impact",
    "summary_real_impact",
    "btn_real_impact_label",
    "btn_real_impact_link"
  ],
  partners: [
    "title_partners",
    "items_partners.partners_id.name",
    "items_partners.partners_id.logo",
    "items_partners.partners_id.link"
  ],
  experience: [
    "title_experience",
    "subtitle_experience",
    "summary_experience",
    "btn_experience_label",
    "btn_experience_link",
    "items_experience.experience_id.img",
    "items_experience.experience_id.title",
    "items_experience.experience_id.summary"
  ],
  faq: [
    "title_faq",
    "subtitle_faq",
    "summary_faq",
    "items_faq.faq_id.*"
  ],
  letswork: [
    "title_letswork",
    "summary_letswork",
    "btn_letswork_label",
    "btn_letswork_link",
    "img_letswork"
  ],
  SEO: [
    "title_page",
    "description_page",
    "keywords"
  ]
};

type f = keyof typeof fields;

export const getHomeData = async (field?: f[]) => {

  let error = null;

  const joinedFields = field?.reduce<string[]>((acc, curr) => {
    const fieldList = fields[curr] ?? [];
    return [...acc, ...fieldList];
  }, []) as string[] | null;

  // @ts-ignore
  const data = await directus?.request(readItems("home", {fields: [...joinedFields, ...fields.SEO ?? '"*"']})) as any;

  if (!data) {
    return nullDataResponse;
  }

  const main_hero_data = {
    title: data?.title_main_hero,
    summary: data?.summary_main_hero,
    btn: {
      label: data?.btn_main_hero_label,
      link: data?.btn_main_hero_link,
    },
    btn2: {
      label: data?.btn2_main_hero_label,
      link: data?.btn2_main_hero_link,
    },
    img: data?.img_main_hero,
    img2: data?.img2_main_hero,
    sealImg: data?.seal_main_hero,
  }

  const about_data = {
    title: data?.title_about,
    subtitle: data?.subtitle_about,
    summary: data?.summary_about,
    btn: {
      label: data?.btn_about_label,
      link: data?.btn_about_link,
    },
    img: data?.img_about,
  }

  const differentials_data = {
    title: data?.title_differentias,
    subtitle: data?.subtitle_differentials,
    items: data?.items_differentials,
  }

  const impact_data = {
    title: data?.title_impact,
    subtitle: data?.subtitle_impact,
    summary: data?.summary_impact,
    items: data?.items_impact,
  }

  const real_impact_data = {
    title: data?.title_real_impact,
    subtitle: data?.subtitle_real_impact,
    summary: data?.summary_real_impact,
    btn: {
      label: data?.btn_real_impact_label,
      link: data?.btn_real_impact_link,
    },
    img: data?.img_real_impact,
  }

  const partners_data = {
    title: data?.title_partners,
    items: data?.items_partners,
  }

  const experience_data = {
    title: data?.title_experience,
    subtitle: data?.subtitle_experience,
    summary: data?.summary_experience,
    btn: {
      label: data?.btn_experience_label,
      link: data?.btn_experience_link,
    },
    items: data?.items_experience,
  }

  const faq_data = {
    title: data?.title_faq,
    subtitle: data?.subtitle_faq,
    summary: data?.summary_faq,
    items: data?.items_faq,
  }

  const letswork_data = {
    title: data?.title_letswork,
    summary: data?.summary_letswork,
    btn: {
      label: data?.btn_letswork_label,
      link: data?.btn_letswork_link,
    },
    img: data?.img_letswork,
  }

  const SEO_data = {
    title: data?.title_page,
    description: data?.description_page,
    keywords: data?.keywords,
    image: data?.img_main_hero,
  }

  return {
    main_hero_data,
    about_data,
    differentials_data,
    impact_data,
    real_impact_data,
    partners_data,
    experience_data,
    faq_data,
    SEO_data,
    letswork_data,
    error,
  };
}