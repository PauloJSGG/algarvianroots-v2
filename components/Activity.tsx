import { IActivity } from "@/types/types";
import Image from "next/image";
import { CustomMDX } from "./CustomMDX";
import ActivityInfo from "./ActivityInfo";
import { Clock, Users, Car } from "lucide-react";

interface ActivityPreviewProps {
  activity: IActivity;
  dict: 
}

const Activity = ({ activity }: ActivityPreviewProps) => {
  const { translations } = activity;
  return (
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

      {activity.quick_info && (
        <section className="flex w-1/2 flex-wrap justify-center gap-4">
          <ActivityInfo
            icon={Clock}
            text={activity.quick_info.duration}
            tailwindClasses="w-1/2 text-black"
          />
          {activity.quick_info.group && (
            <ActivityInfo icon={Users} text={"test"} tailwindClasses="w-1/2" />
          )}
          {activity.quick_info.transport && (
            <ActivityInfo
              icon={Car}
              text={}
              tailwindClasses="w-1/2"
            />
          )}
        </section>
      )}

      <CustomMDX source={translations.info} />
      <CustomMDX source={translations.itinerary} />
      <CustomMDX source={translations.what_it_includes} />
      <CustomMDX source={translations.points_of_interest} />
      <CustomMDX source={translations.what_to_bring} />
    </div>
  );
};

export default Activity;
