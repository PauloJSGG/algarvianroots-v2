import { ActivityPreview } from "@/components/ActivityPreview";
import { getActivity } from "@/services/firebase/activities";

const page = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt"; slug: string }>;
}) => {
  const slug = (await params).slug;
  const activity = await getActivity(slug);
  return (
    <div>
      <ActivityPreview activity={activity} />
    </div>
  );
};

export default page;