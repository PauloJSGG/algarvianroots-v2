import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "@firebase/firestore/lite";
import { db, st } from ".";
import { getDownloadURL, ref } from "firebase/storage";
import { EnumLang, IArticle } from "@/types/types";
import { where } from "@firebase/firestore";

// const getArticle = async (lang: "en" | "pt", id: string) => {
//   const categoryDocRef = doc(db, "categories", category.id);
//   const q = query(
//     collection(db, "courses"),
//     where("category_reference", "==", categoryDocRef),
//   );
// }

const getArticle = async (slug: string, lang: EnumLang) => {
  const collectionRef = collection(db, "articles");

  const docQuery = query(
    collectionRef,
    where("slug", "==", slug),
    orderBy("created_at", "desc"),
    limit(1)
  );

  const docSnapshot = await getDocs(docQuery);

  if (docSnapshot.docs.length === 0) {
    throw new Error("No articles found");
  }

  const article = docSnapshot.docs[0];

  return {
    id: article.id,
    name: article.data()[lang].name as string,
    description: article.data()[lang].description as string,
    image: (await getDownloadURL(ref(st, article.data().main_image))) as string,
    text: article.data()[lang].text as string,
  };
};

const getLatestArticles: (
  lang: EnumLang,
  limitNumber?: number
) => Promise<IArticle[]> = async (lang = "en", limitNumber = 3) => {
  const collectionRef = collection(db, "articles");

  const latestDocQuery = query(
    collectionRef,
    orderBy("created_at", "desc"),
    limit(limitNumber)
  );

  const querySnapshot = await getDocs(latestDocQuery);

  if (querySnapshot.docs.length === 0) {
    throw new Error("No articles found");
  }

  const articles = querySnapshot.docs.map(async (doc) => {
    return {
      id: doc.id,
      title: doc.data()[lang].title as string,
      description: doc.data()[lang].description as string,
      image: (await getDownloadURL(ref(st, doc.data().main_image))) as string,
    };
  });

  return Promise.all(articles);
};

export { getLatestArticles, getArticle };
