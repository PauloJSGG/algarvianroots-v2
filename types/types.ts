export interface IArticle {
  id: string;
  image: string;
  slug: string;
  translations: {
    title: string;
    description: string;
    text?: string;
  };
}

export interface IActivity {
  id: string;
  main_image: string;
  slug: string;
  translations: {
    name: string;
    description: string;
    info: string;
    itinerary: string;
    what_it_includes: string;
    points_of_interest: string;
    what_to_bring: string;
  };
}

export type LanguagesType = "en" | "pt";
