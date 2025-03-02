import { getDictionary } from "@/app/[lang]/dictionaries";
import { getActivity } from "@/services/firebase/activities";
import Image from "next/image";
import { CustomMDX } from "@/components/CustomMDX";
import ActivityInfo from "@/components/ActivityInfo";
import { Clock, Users, Car } from "lucide-react";
import { Video } from "@/components/Video";
import { LanguagesType } from "@/types/types";
import Pluralo from "@/components/Pluralo";
import ChevronWithScroll from "@/components/ChevronWithScroll";
import clsx from "clsx";

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
            src: activity.video
              ? activity.video
              : "/videos/landing-page/video-desktop.mp4",
            poster: activity.main_image,
          }}
          className="fixed top-0 -z-10 h-full w-full brightness-75"
        />
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform",
            "text-3xl font-bold text-white",
            "z-30 sm:text-6xl",
            // "shadow-lg",
            "p-4",
            "rounded-2xl",
          )}
        >
          {translations.name}
          {/* <div className="text-sm font-semibold text-white sm:text-2xl">
            {dict.mainpage.subtitle}
          </div> */}
          <ChevronWithScroll />
        </div>
      </section>
      <div className="h-[100vh] bg-transparent"></div>
      <div className="bg-background/75 flex w-full flex-col items-center gap-4">
        <section className="container">
          <div className="flex w-full flex-col items-center">
            <div className="text-lg font-bold">{translations.name}</div>
            <div className="text-sm">{translations.description}</div>
          </div>
          <div className="flex w-full flex-wrap items-end justify-center gap-4">
            {activity.pluralo_id && (
              <Pluralo
                id={activity.pluralo_id}
                bookHere={dict.activities["book-here"]}
              />
            )}
            <Image
              src={activity.main_image}
              alt={translations.name}
              className="hidden rounded-4xl sm:block"
              width={300}
              height={300}
            />
          </div>
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
