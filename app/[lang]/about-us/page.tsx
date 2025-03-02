import cliff from "@/public/images/about-us/cliff.jpg";
import selfie from "@/public/images/about-us/selfie.jpg";
import forest from "@/public/images/about-us/forest.jpg";
import dad from "@/public/images/about-us/dad.jpg";
import river from "@/public/images/about-us/river.jpg";
import tour from "@/public/images/about-us/tour.jpg";
import workshop from "@/public/images/about-us/workshop.jpg";
import tile from "@/public/images/about-us/tile.jpg";
import Carousel from "@/components/Carousel";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import { LanguagesType } from "@/types/types";

const page = async ({
  params,
}: {
  params: Promise<{ lang: LanguagesType }>;
}) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const carouselImages = [
    <Image
      src={cliff}
      alt="cliff"
      key="cliff"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={selfie}
      alt="selfie"
      key="selfie"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={forest}
      alt="forest"
      key="forest"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={dad}
      alt="dad"
      key="dad"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={river}
      alt="river"
      key="river"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={tour}
      alt="tour"
      key="tour"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={workshop}
      alt="workshop"
      key="workshop"
      className="h-full w-full rounded-2xl object-cover"
    />,
    <Image
      src={tile}
      alt="tile"
      key="tile"
      className="h-full w-full rounded-2xl object-cover"
    />,
  ];

  return (
    <>
      <section className="container">
        <div className="text-center text-3xl">{dict["about-us"].title}</div>
        <div className="text-center text-xl">
          {dict["about-us"].description}
        </div>
        <Carousel
          components={carouselImages}
          autoSlide={true}
          autoSlideInterval={4000}
        />
      </section>
      <section className="container">
        <div className="text-center text-3xl">
          {dict["about-us"].team.title}
        </div>
        <div className="flex justify-center gap-4">
          {dict["about-us"].team.members.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-4">
              <Image
                src={`/images/about-us/team/${member["image-id"]}.png`}
                alt={member.name}
                width={128}
                height={128}
                className="h-32 w-32 rounded-full"
              />
              <div className="text-xl">{member.name}</div>
              <div>{member.role}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
