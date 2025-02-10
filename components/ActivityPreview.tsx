import { IActivity } from "@/types/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface ActivityPreviewProps {
  activity: IActivity;
}

const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  const { translations } = activity;
  return (
    // blog style card
    <div className="0 relative flex h-full flex-col items-center bg-gray-50 p-4 shadow-md">
      <Image
        src={activity.main_image}
        alt={translations.name}
        fill
        className={clsx(
          "absolute top-0 left-0 h-full w-full object-cover",
          "z-0 rounded-3xl blur-[px] brightness-50 filter",
          // "transition-transform duration-700 ease-out hover:scale-110",
        )}
        style={{ filter: "brightness(0.5)" }}
      />
      <div className="z-50 flex w-full flex-col text-white">
        <div
          className={clsx(
            "decoration-secondary h-6 text-sm font-bold underline decoration-[2px] sm:h-8 sm:text-lg sm:decoration-[2px]",
            "mb-2 line-clamp-1 underline-offset-[6px]",
          )}
        >
          {translations.name}
        </div>
        <div className="line-clamp-3 text-xs sm:text-sm">
          {translations.description}
        </div>
      </div>
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
