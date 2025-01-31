import { IActivity } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface ActivityPreviewProps {
  activity: IActivity;
  // name: string;
  // description: string;
}

const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  return (
    // blog style card
    <div
      className="flex flex-col items-center w-38
      0 bg-gray-50 p-4 rounded-lg shadow-md
      "
    >
      <div className="flex flex-col items-center w-full">
        <div className="text-lg font-bold">{activity.name}</div>
        <div className="text-sm">{activity.description}</div>
      </div>
      <Image
        src={activity.main_image}
        alt={activity.name}
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
  if (!activities) {
    return <div>No activities to show</div>;
  }

  return (
    <div className="flex gap-4">
      {activities.map((activity) => (
        <Link
          href={`/activity-categories/${category}/activities/${activity.slug}`}
          key={activity.name}
        >
          <ActivityPreview key={activity.id} activity={activity} />
        </Link>
      ))}
    </div>
  );
};
export { ActivityPreview, ActivitiesPreview };
