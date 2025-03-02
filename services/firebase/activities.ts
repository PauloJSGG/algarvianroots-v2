import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { getDownloadURL, ref } from "firebase/storage";
import { db, st } from ".";
import { IActivity, LanguagesType } from "@/types/types";

const LOCALES_PATH = "activity_locales";

const getLocales = async (id: string, lang: string) => {
  const docRef = doc(db, "activities", id, LOCALES_PATH, lang);

  const locales = await getDoc(docRef);

  if (!locales.exists()) {
    throw new Error("No locales found");
  }

  return {
    id: locales.id,
    name: locales.data().name as string,
    description: locales.data().description as string,
    info: locales.data().info as string,
    itinerary: locales.data().itinerary as string,
    what_it_includes: locales.data().what_it_includes as string,
    points_of_interest: locales.data().points_of_interest as string,
    what_to_bring: locales.data().what_to_bring as string,
  };
};

const getActivity = async (
  slug: string,
  lang: LanguagesType,
): Promise<IActivity> => {
  const collectionRef = collection(db, "activities");

  const docQuery = query(collectionRef, where("slug", "==", slug));

  const docSnapshot = await getDocs(docQuery);

  if (docSnapshot.docs.length === 0) {
    throw new Error("No activities found");
  }

  const activity = docSnapshot.docs[0];
  const locales = await getLocales(activity.id, lang);

  return {
    id: activity.id,
    slug: activity.data().slug as string,
    pluralo_id: activity.data().pluralo_id as string,
    color: activity.data().color as "green" | "blue" | "yellow" | "brown",
    main_image: (await getDownloadURL(
      ref(st, activity.data().main_image),
    )) as string,
    images: (await Promise.all(
      activity.data().images.map(async (image: string) => {
        return (await getDownloadURL(ref(st, image))) as string;
      }),
    )) as string[],
    video: (await getDownloadURL(ref(st, activity.data().video))) as string,
    quick_info: {
      duration: activity.data().duration as number,
      group: activity.data().group as {
        active: boolean;
        min: number;
        max: number;
      },
      guide: activity.data().guide as boolean,
      snack: activity.data().snack as boolean,
      transport: activity.data().transport as boolean,
      meeting_point: activity.data().meeting_point as {
        name: string;
        link: string;
      },
      hike: {
        active: activity.data().hike.active as boolean,
        difficulty: activity.data().hike.difficulty as string,
        distance: activity.data().hike.distance as number,
        duration: activity.data().hike.duration as number,
      },
      workshop: {
        active: activity.data().workshop.active as boolean,
        duration: activity.data().workshop.duration as number,
        equipment: activity.data().workshop.equipment as string,
      },
    },
    translations: {
      name: locales.name as string,
      description: locales.description as string,
      info: locales.info as string,
      itinerary: locales.itinerary as string,
      what_it_includes: locales.what_it_includes as string,
      points_of_interest: locales.points_of_interest as string,
      what_to_bring: locales.what_to_bring as string,
    },
  };
};

const getActivities = async (category: string): Promise<IActivity[]> => {
  const collectionRef = collection(db, "activities");
  const activitiesQuery = query(
    collectionRef,
    where("category", "==", category),
  );

  const querySnapshot = await getDocs(activitiesQuery);

  if (querySnapshot.docs.length === 0) {
    return [];
  }

  const activities = querySnapshot.docs.map(async (doc) => {
    const locales = await getLocales(doc.id, "en");
    return {
      id: doc.id,
      slug: doc.data().slug as string,
      main_image: (await getDownloadURL(
        ref(st, doc.data().main_image),
      )) as string,
      translations: {
        name: locales.name,
        description: locales.description,
        info: locales.info,
        itinerary: locales.itinerary,
        what_it_includes: locales.what_it_includes,
        points_of_interest: locales.points_of_interest,
        what_to_bring: locales.what_to_bring,
      },
    };
  });

  return Promise.all(activities);
};

export { getActivities, getActivity };
