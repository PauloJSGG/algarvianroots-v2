import { ActivityPreview } from "@/components/ActivityPreview";
import { getActivity } from "@/services/firebase/activities";

const page = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt"; slug: string }>;
}) => {
  const lang = (await params).lang;
  const slug = (await params).slug;
  const activity = await getActivity(slug, lang);
  return (
    <div>
      <ActivityPreview activity={activity} />
    </div>
  );
};

export default page;
