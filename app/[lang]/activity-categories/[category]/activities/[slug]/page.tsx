import { getDictionary } from "@/app/[lang]/dictionaries";
import { getActivity } from "@/services/firebase/activities";
import Image from "next/image";
import { CustomMDX } from "@/components/CustomMDX";
import ActivityInfo from "@/components/ActivityInfo";
import { Clock, Users, Car, Apple, MapPin } from "lucide-react";
import { Video } from "@/components/Video";
import { LanguagesType } from "@/types/types";
import Pluralo from "@/components/Pluralo";
import ChevronWithScroll from "@/components/ChevronWithScroll";
import clsx from "clsx";
import Accordion from "@/components/Accordion";
import Carousel from "@/components/Carousel";

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
            <div className="text-center text-3xl font-bold">
              {translations.name}
            </div>
            <div className="text-sm">{translations.description}</div>
          </div>
          <div className="mb-4 flex w-full flex-wrap items-end justify-center gap-4">
            {activity.pluralo_id && (
              <Pluralo
                id={activity.pluralo_id}
                bookHere={dict.activities["book-here"]}
              />
            )}
          </div>
          {activity.images && (
            <Carousel
              autoSlide={true}
              autoSlideInterval={4000}
              components={activity.images.map((image) => (
                <Image
                  key={image}
                  fill
                  src={image}
                  alt={translations.name}
                  className="h-full w-full rounded-2xl object-cover"
                />
              ))}
            />
          )}
        </section>

        {activity.quick_info && (
          <section className="container flex w-full flex-wrap justify-center gap-1 sm:max-w-2xl">
            <ActivityInfo
              icon={Clock}
              text={activity.quick_info.duration}
              subText={dict.activities["activity-info"].hours}
              tailwindClasses="w-1/2 text-xs sm:w-1/4 sm:text-sm"
            />
            {activity.quick_info.transport && (
              <ActivityInfo
                icon={Car}
                text={dict.activities["activity-info"].transport}
                tailwindClasses="w-1/2 text-xs sm:w-1/4 sm:text-sm"
              />
            )}
            {activity.quick_info.group && (
              <ActivityInfo
                icon={Users}
                text={dict.activities["activity-info"].group}
                tailwindClasses="w-1/2 text-xs sm:w-1/4 sm:text-sm"
              />
            )}
            {activity.quick_info.snack && (
              <ActivityInfo
                icon={Apple}
                text={dict.activities["activity-info"].snack}
                tailwindClasses="w-1/2 text-xs sm:w-1/4 sm:text-sm"
              />
            )}
            {activity.quick_info.meeting_point && (
              <ActivityInfo
                icon={MapPin}
                text={activity.quick_info.meeting_point.name}
                // subText={activity.quick_info.meeting_point.link}
                tailwindClasses="w-1/2 text-xs sm:w-1/4"
              />
            )}
          </section>
        )}

        <div className="container">
          <Accordion title={dict.activities["activity-detailed-info"].info}>
            <CustomMDX source={translations.info} />
          </Accordion>
          <Accordion
            title={dict.activities["activity-detailed-info"].itinerary}
          >
            <CustomMDX source={translations.itinerary} />
          </Accordion>
          <Accordion
            title={
              dict.activities["activity-detailed-info"]["what-it-includes"]
            }
          >
            <CustomMDX source={translations.what_it_includes} />
          </Accordion>
          <Accordion
            title={
              dict.activities["activity-detailed-info"]["points-of-interest"]
            }
          >
            <CustomMDX source={translations.points_of_interest} />
          </Accordion>
          <Accordion
            title={dict.activities["activity-detailed-info"]["what-to-bring"]}
          >
            <CustomMDX source={translations.what_to_bring} />
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default page;
