import { LanguagesType } from "@/types/types";
import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: LanguagesType) =>
  dictionaries[locale]();
