import { getDictionary } from "@/app/[lang]/dictionaries";
import { getActivity } from "@/services/firebase/activities";
import Image from "next/image";
import { CustomMDX } from "@/components/CustomMDX";
import ActivityInfo from "@/components/ActivityInfo";
import { Clock, Users, Car } from "lucide-react";
import { Video } from "@/components/Video";
import { LanguagesType } from "@/types/types";

const page = async ({
  params,
}: {
  params: Promise<{ lang: LanguagesType; slug: string }>;
}) => {
  const lang = (await params).lang;
  const slug = (await params).slug;
  const dict = await getDictionary(lang);
  const activity = await getActivity(slug, lang);
  const { translations } = activity;
  return (
    <>
      <section className="w-full">
        <Video
          desktop={{
            src: "/videos/landing-page/video.mp4",
            poster: "/videos/landing-page/poster-desktop.jpg",
          }}
          mobile={{
            src: "/videos/landing-page/video-mobile.mp4",
            poster: "/videos/landing-page/poster-mobile.jpg",
          }}
          className="fixed top-0 -z-10 h-full w-full brightness-75"
        />
      </section>
      <div className="h-[50vh] bg-transparent"></div>
      <div className="bg-background/75 flex w-full flex-col items-center gap-4">
        <section className="container">
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
        </section>

        {activity.quick_info && (
          <section className="flex w-1/2 flex-wrap justify-center gap-4">
            <ActivityInfo
              icon={Clock}
              text={activity.quick_info.duration}
              tailwindClasses="w-1/2 text-black"
            />
            {activity.quick_info.group && (
              <ActivityInfo
                icon={Users}
                text={"test"}
                tailwindClasses="w-1/2"
              />
            )}
            {activity.quick_info.transport && (
              <ActivityInfo
                icon={Car}
                text={dict.activities["activity-info"].transport}
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
    </>
  );
};

export default page;
