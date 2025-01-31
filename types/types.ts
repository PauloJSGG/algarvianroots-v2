export interface IArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  text?: string;
  slug?: string;
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  main_image: string;
  slug: string;
}

export type EnumLang = "en" | "pt";
