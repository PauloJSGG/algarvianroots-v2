export type Category =
| "workshops"
| "tours"
| "experiences"
| "hikes"
| "birdwatching"
| "accomdation"
| "transportation"
| "tailor-made";

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
  slug: string;
  pluralo_id?: string;
  color: "green" | "blue" | "yellow" | "brown";
  main_image: string;
  images?: string[];
  video?: string;
  quick_info?: {
    duration: number;
    group: {
      active: boolean;
      min: number;
      max: number;
    };
    guide: boolean;
    snack: boolean;
    transport: boolean;
    meeting_point: {
      name: string;
      link: string;
    };
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
