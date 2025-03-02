import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore/lite";
import { db, st } from ".";
import { getDownloadURL, ref } from "firebase/storage";
import { LanguagesType, IArticle } from "@/types/types";

const LOCALES_PATH = "article_locales";

const getLocales = async (id: string, lang: LanguagesType) => {
  const docRef = doc(db, "articles", id, LOCALES_PATH, lang);

  const locales = await getDoc(docRef);

  if (!locales.exists()) {
    throw new Error("No locales found");
  }

  return {
    id: locales.id,
    title: locales.data().title as string,
    description: locales.data()?.description || ("" as string),
    text: locales.data()?.text || ("" as string),
  };
};

const getArticle: (
  slug: string,
  lang: LanguagesType,
) => Promise<IArticle> = async (slug: string, lang: LanguagesType) => {
  const collectionRef = collection(db, "articles");

  const docQuery = query(
    collectionRef,
    where("slug", "==", slug),
    where("active", "==", true),
    orderBy("created_at", "desc"),
    limit(1),
  );

  const docSnapshot = await getDocs(docQuery);

  if (docSnapshot.docs.length === 0) {
    throw new Error("No articles found");
  }

  const article = docSnapshot.docs[0];
  const locales = await getLocales(article.id, lang);

  return {
    id: article.id,
    image: (await getDownloadURL(ref(st, article.data().main_image))) as string,
    slug: article.data().slug as string,
    link: article.data().link as string,
    translations: {
      title: locales.title as string,
      description: locales.description || ("" as string),
      text: locales.text || ("" as string),
    },
  };
};

const getLatestArticles: (
  lang: LanguagesType,
  limitNumber?: number,
) => Promise<IArticle[]> = async (lang = "en", limitNumber = 2) => {
  const collectionRef = collection(db, "articles");

  const latestDocQuery = query(
    collectionRef,
    where("active", "==", true),
    orderBy("created_at", "desc"),
    limit(limitNumber),
  );

  const querySnapshot = await getDocs(latestDocQuery);

  if (querySnapshot.docs.length === 0) {
    throw new Error("No articles found");
  }

  const articles = querySnapshot.docs.map(async (doc) => {
    const locales = await getLocales(doc.id, lang);
    return {
      id: doc.id,
      image: (await getDownloadURL(ref(st, doc.data().main_image))) as string,
      slug: doc.data().slug as string,
      link: doc.data().link as string,
      translations: {
        title: locales.title as string,
        description: locales.description || ("" as string),
      },
    };
  });

  return Promise.all(articles);
};

export { getLatestArticles, getArticle };
