export type Btn = {
  label: string;
  link: string;
};

export type Hero = {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  summary?: string;
  btn?: Btn;
  img?: string;
}

export type SocialItem = {
  icon: string;
  link: string;
}

export type ItemPost = {
  title: string;
  summary: string;
  img?: string;
  date_created: string;
  category: {
    slug: string;
    title: string;
  };
  slug: string;
  keywords_seo?: string[];
}