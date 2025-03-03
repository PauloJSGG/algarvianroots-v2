import { IActivity } from "@/types/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./Carousel";
import { JSX } from "react";

interface ActivityPreviewProps {
  activity: IActivity;
}

const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  const { translations } = activity;
  return (
    // blog style card
    <div
      className={clsx(
        "relative flex h-full max-w-80 flex-col items-center rounded-2xl bg-gray-50 p-4 shadow-md",
        "w-full transition-transform duration-700 ease-out hover:scale-102",
      )}
    >
      <Image
        src={activity.main_image}
        alt={translations.name}
        fill
        className={clsx(
          "h-full w-1/2 object-cover",
          "z-0 rounded-2xl shadow-md blur-[1px] brightness-50",
          // "transition-transform duration-700 ease-out hover:scale-110",
        )}
      />
      <div className="z-10 flex h-full w-full flex-col text-white">
        <div
          className={clsx(
            "decoration-secondary flex h-full items-end justify-center text-sm font-bold decoration-[2px] sm:h-full sm:text-lg sm:decoration-[2px]",
            "mb-2 line-clamp-1 text-center underline-offset-[6px]",
          )}
        >
          {translations.name}
        </div>
        {/* <div className="line-clamp-6 text-xs sm:text-sm">
          {translations.description}
        </div> */}
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
  // return (
  //   <div className="flex gap-4 justify-between">
  //     {activities.map((activity) => (
  //       <Link
  //         className="h-82 w-1/2 flex justify-center"
  //         href={`/activity-categories/${category}/activities/${activity.slug}`}
  //         key={activity.translations.name}
  //       >
  //         <ActivityPreview key={activity.id} activity={activity} />
  //       </Link>
  //     ))}
  //   </div>
  // );

  return (
    <Carousel
      autoSlide={false}
      components={activities.reduce((acc, activity, i) => {
        if (i % 2 === 0) {
          acc.push(
            <Link
              className="flex h-full w-1/2 justify-center"
              href={`/activity-categories/${category}/activities/${activity.slug}`}
              key={activity.translations.name}
            >
              <ActivityPreview key={activity.id} activity={activity} />
            </Link>,
          );
        } else {
          acc[acc.length - 1] = (
            <div className="flex h-full gap-4">
              {acc[acc.length - 1]}
              <Link
                className="flex h-full w-1/2 justify-center"
                href={`/activity-categories/${category}/activities/${activity.slug}`}
                key={activity.translations.name}
              >
                <ActivityPreview key={activity.id} activity={activity} />
              </Link>
            </div>
          );
        }
        return acc;
      }, [] as JSX.Element[])}
    />
  );
};
export { ActivityPreview, ActivitiesPreview };
