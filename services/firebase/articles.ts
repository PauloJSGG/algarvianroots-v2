import {
  collection,
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
  name: string;
  description: string;
  image: string;
}

const getLatestArticle: (lang?: "en" | "pt") => Promise<Article[]> = async (
  lang = "en"
) => {
  const collectionRef = collection(db, "articles");

  const latestDocQuery = query(
    collectionRef,
    orderBy("created_at", "desc"),
    limit(3)
  );

  const querySnapshot = await getDocs(latestDocQuery);

  if (querySnapshot.docs.length === 0) {
    throw new Error("No articles found");
  }

  const articles = querySnapshot.docs.map(async (doc) => {
    return {
      name: doc.data().name as string,
      description: doc.data().description as string,
      image: (await getDownloadURL(ref(st, doc.data().main_image))) as string,
    };
  });

  return Promise.all(articles);
};

export { getLatestArticle };
