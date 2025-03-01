export type RockPath =
  | "yellow-1"
  | "blue-1"
  | "green-1"
  | "brown-1"
  | "yellow-2"
  | "blue-2"
  | "green-2"
  | "brown-2";

export interface IArticle {
  id: string;
  image: string;
  slug: string;
  link?: string;
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
  quick_info?: {
    duration: number;
    group: boolean;
    guide: boolean;
    snack: boolean;
    transport: boolean;
    hike: {
      active: boolean;
      difficulty?: string;
      distance?: number;
      duration?: number;
    };
    workshop: {
      active: boolean;
      duration?: number;
      equipment?: string;
    };
  };
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
