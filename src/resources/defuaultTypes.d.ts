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