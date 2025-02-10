import { getDictionary } from "@/app/[lang]/dictionaries";
import { ActivitiesPreview } from "@/components/ActivityPreview";
import Loading from "@/components/Loading";
import { getActivities } from "@/services/firebase/activities";
import { Suspense } from "react";

const page = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt"; category: string }>;
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
      <div className="text-center text-3xl">
        {dict.activities["categories-key-values"][category]}
      </div>
      <Suspense fallback={<Loading />}>
        <ActivitiesPreview activities={activities} category={category} />
      </Suspense>
    </section>
  );
};

export default page;
