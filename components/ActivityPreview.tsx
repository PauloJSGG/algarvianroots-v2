import { IActivity } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface ActivityPreviewProps {
  activity: IActivity;
}

const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  const { translations } = activity;
  return (
    // blog style card
    <div className="w-38 0 flex flex-col items-center rounded-lg bg-gray-50 p-4 shadow-md">
      <div className="flex w-full flex-col items-center">
        <div className="text-lg font-bold">{translations.name}</div>
        <div className="text-sm">{translations.description}</div>
      </div>
      <Image
        src={activity.main_image}
        alt={translations.name}
        width={300}
        height={300}
      />
    </div>
  );
};

const ActivitiesPreview = ({
  activities,
  category,
}: {
  activities: IActivity[];
  category: string;
}) => {
  return (
    <div className="flex gap-4">
      {activities.map((activity) => (
        <Link
          href={`/activity-categories/${category}/activities/${activity.slug}`}
          key={activity.translations.name}
        >
          <ActivityPreview key={activity.id} activity={activity} />
        </Link>
      ))}
    </div>
  );
};
export { ActivityPreview, ActivitiesPreview };
