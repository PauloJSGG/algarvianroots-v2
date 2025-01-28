import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "@firebase/firestore/lite";
import { db, st } from ".";
import { getDownloadURL, ref } from "firebase/storage";

// const getArticle = async (lang: "en" | "pt", id: string) => {
//   const categoryDocRef = doc(db, "categories", category.id);
//   const q = query(
//     collection(db, "courses"),
//     where("category_reference", "==", categoryDocRef),
//   );
// }

export interface Article {
  id: string;
  name: string;
  description: string;
  image: string;
  text?: string;
}

const getArticle = async (lang: "en" | "pt", id: string) => {
  const docRef = doc(db, "articles", id);

  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    throw new Error("No such article");
  }

  return {
    name: docSnapshot.data().name as string,
    description: docSnapshot.data().description as string,
    image: (await getDownloadURL(
      ref(st, docSnapshot.data().main_image)
    )) as string,
    text: docSnapshot.data().text as string,
  };
};

const getLatestArticles: (
  limitNumber?: number,
  lang?: "en" | "pt"
) => Promise<Article[]> = async (limitNumber = 3, lang = "en") => {
  console.log(lang);
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
      name: doc.data().name as string,
      description: doc.data().description as string,
      image: (await getDownloadURL(ref(st, doc.data().main_image))) as string,
    };
  });

  return Promise.all(articles);
};

export { getLatestArticles, getArticle };
