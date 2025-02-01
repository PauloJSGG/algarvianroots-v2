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
    <div
      className="flex flex-col items-center w-38
      0 bg-gray-50 p-4 rounded-lg shadow-md
      "
    >
      <div className="flex flex-col items-center w-full">
        <div className="text-lg font-bold">{translations.name}</div>
        <div className="text-sm">{translations.description}</div>
      </div>
      <Image
        src={activity.main_image}
        alt={translations.name}
        width={300}
        height={300}
      />
      <div className="text-sm">{translations.info}</div>
      <div className="text-sm">{translations.itinerary}</div>
      <div className="text-sm">{translations.what_it_includes}</div>
      <div className="text-sm">{translations.points_of_interest}</div>
      <div className="text-sm">{translations.what_to_bring}</div>
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
