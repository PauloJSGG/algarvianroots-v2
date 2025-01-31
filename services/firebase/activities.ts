import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { getDownloadURL, ref } from "firebase/storage";
import { db, st } from ".";

const getActivity = async (slug: string) => {
  const collectionRef = collection(db, "activities");

  const docQuery = query(collectionRef, where("slug", "==", slug));

  const docSnapshot = await getDocs(docQuery);

  if (docSnapshot.docs.length === 0) {
    throw new Error("No activities found");
  }

  const activity = docSnapshot.docs[0];

  return {
    id: activity.id,
    name: activity.data().name as string,
    description: activity.data().description as string,
    main_image: (await getDownloadURL(
      ref(st, activity.data().main_image)
    )) as string,
    slug: activity.data().slug as string,
  };
}

const getActivities = async (category: string) => {
  const collectionRef = collection(db, "activities");
  const activitiesQuery = query(
    collectionRef,
    where("category", "==", category)
  );

  const querySnapshot = await getDocs(activitiesQuery);

  if (querySnapshot.docs.length === 0) {
    throw new Error("No activities found");
  }

  const activities = querySnapshot.docs.map(async (doc) => {
    return {
      id: doc.id,
      name: doc.data().name as string,
      description: doc.data().description as string,
      main_image: (await getDownloadURL(
        ref(st, doc.data().main_image)
      )) as string,
      slug: doc.data().slug as string,
    };
  });

  return Promise.all(activities);
};


export { getActivities, getActivity };
