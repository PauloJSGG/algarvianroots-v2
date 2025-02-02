// import Image from "next/image";

import Rock from "@/components/Rock";
import { getDictionary } from "./dictionaries";
// import ImageSlider from "@/components/ImageSlider";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import seperatorTop from "@/public/images/seperator-top.png";
import seperatorBottom from "@/public/images/seperator-bottom.png";
import pao from "@/public/images/landing-page/pao.jpg";
import barro from "@/public/images/landing-page/barro.jpg";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getLatestArticles } from "@/services/firebase/articles";
// import ArticlePreview from "@/components/ArticlePreview";
import { ArticlesPreview } from "@/components/ArticlePreview";
import Link from "next/link";
import Loading from "@/components/Loading";
import { Suspense } from "react";
// import video from "@/public/videos/landing-page/video.mp4";

type Props = {
  params: Promise<{ lang: "en" | "pt" }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return {
    title: dict.mainpage.metadata.title,
    description: dict.mainpage.metadata.description,
  };
}
const images = [pao, barro];

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const articles = await getLatestArticles(lang);

  return (
    <main className="flex flex-col items-center w-full">
      <video
        className="w-full h-dvh sticky top-0 -z-10 object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/videos/landing-page/video.mp4" type="video/mp4" />
      </video>
      <div className="w-full flex flex-col items-center gap-4 bg-white">
        <Image src={seperatorTop} alt="seperator-top" className="max-h-64" />

        {/* Activities */}
        <>
          <div className="text-3xl">{dict.activities.title}</div>
          <div className="flex gap-4 w-full flex-wrap sm:flex-nowrap">
            {dict.activities.categories.map((category) => (
              <Link
                href={`/activity-categories/${category.slug}/activities`}
                key={category.title}
              >
                <Rock
                  key={category.title}
                  color={category.color as "yellow" | "blue" | "green"}
                  text={category.title}
                />
              </Link>
            ))}
          </div>
        </>

        {/* About Us */}
        <div className="text-3xl">{dict.mainpage["about-us"].title}</div>
        <div className="text-xl w-80 text-center">
          {dict.mainpage["about-us"].description}
        </div>

        <Carousel images={images} autoSlide={true} autoSlideInterval={4000} />

        {/* Latest 3 articles */}
        <div className="text-4xl w-80 text-center">{dict.articles.title}</div>

        <Suspense fallback={<Loading />}>
          <ArticlesPreview articles={articles} />
        </Suspense>

        {/* Other */}
        <Image
          src={seperatorBottom}
          alt="seperator-bottom"
          className="max-h-64"
        />
      </div>

      {/* <Carousel images={images} autoSlide={true} autoSlideInterval={4000} /> */}
      <Footer />
    </main>
  );
}
