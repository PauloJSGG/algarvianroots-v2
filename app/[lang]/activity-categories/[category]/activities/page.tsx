import { ActivitiesPreview } from "@/components/ActivityPreview";
import Loading from "@/components/Loading";
import { getActivities } from "@/services/firebase/activities";
import { Suspense } from "react";

const page = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt"; category: string }>;
}) => {
  const category = (await params).category;
  const activities = await getActivities(category);

  if (activities.length === 0) {
    return <div>No activities found</div>;
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ActivitiesPreview activities={activities} category={category} />
      </Suspense>
    </div>
  );
};

export default page;
