// import Image from "next/image";

import Rock from "@/components/Rock";
import { getDictionary } from "./dictionaries";
import ImageSlider from "@/components/ImageSlider";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <video className="w-full h-full sticky top-0 -z-10" autoPlay muted loop>
          <source src="/LandingPageVideo.mp4" type="video/mp4" />
        </video>
        <div className="flex gap-4 w-full">
          {dict.mainpage.courses.categories.map((category) => (
            <Rock
              key={category.title}
              color={category.color as "yellow" | "blue" | "green"}
              text={category.title}
            />
          ))}
        </div>
        <ImageSlider />
      </main>
    </div>
  );
}
