import { IActivity } from "@/types/types";
import Image from "next/image";
import { CustomMDX } from "./CustomMDX";

interface ActivityPreviewProps {
  activity: IActivity;
}

const Activity = ({ activity }: ActivityPreviewProps) => {
  const { translations } = activity;
  console.log('translations', translations);
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
      <CustomMDX source={translations.info}/>
      <CustomMDX source={translations.itinerary}/>
      <CustomMDX source={translations.what_it_includes}/>
      <CustomMDX source={translations.points_of_interest}/>
      <CustomMDX source={translations.what_to_bring}/>
    </div>
  );
};

export default Activity;