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

const page = async ({ params }: { params: Promise<{ lang: "en" | "pt" }> }) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-1/2 text-center text-3xl">{dict["about-us"].title}</div>
      <div className="w-1/2 text-center text-xl">
        {dict["about-us"].description}
      </div>
      <Carousel
        images={[cliff, selfie, forest, dad, river, tour, workshop, tile]}
        autoSlide={true}
        autoSlideInterval={4000}
      />
    </div>
  );
};

export default page;
