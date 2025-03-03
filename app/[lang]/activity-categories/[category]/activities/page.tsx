import { getDictionary } from "@/app/[lang]/dictionaries";
import { ActivitiesPreview } from "@/components/ActivityPreview";
import Loading from "@/components/Loading";
import { getActivities } from "@/services/firebase/activities";
import { Category, LanguagesType } from "@/types/types";
import { Metadata } from "next/types";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguagesType; category: Category }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const category = (await params).category as Category;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.activities["categories-key-values"][category]} ${
      dict.metadata["in-the-algarve"]
    }`,
    description: dict.mainpage.metadata.description,
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ lang: LanguagesType; category: string }>;
}) => {
  const lang = (await params).lang;
  const category = (await params).category as
    | "workshops"
    | "tours"
    | "experiences";
  const activities = await getActivities(category);
  const dict = await getDictionary(lang);

  if (activities.length === 0) {
    return <div>No activities found</div>;
  }

  return (
    <section className="container">
      <div className="text-center text-3xl mb-4">
        {dict.activities["categories-key-values"][category]}
      </div>
      <Suspense fallback={<Loading />}>
        <ActivitiesPreview activities={activities} category={category} />
      </Suspense>
    </section>
  );
};

export default page;
