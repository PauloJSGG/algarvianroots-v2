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
import { getLatestArticle } from "@/services/firebase/articles";
import ArticlePreview from "@/components/ArticlePreview";
import ArticlesPreview from "@/components/ArticlePreview";

type Props = {
  params: Promise<{ lang: "en" | "pt" }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  // read route params
  // const id = (await params).id

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: dict.mainpage.metadata.title,
    description: dict.mainpage.metadata.description,
    // openGraph: {
    //   images: [pao]
    // },
  };
}

// random pokemon Images
const images = [pao, barro];

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const articles = await getLatestArticle();

  return (
    <main className="flex flex-col items-center w-full">
      <video
        className="w-full h-dvh sticky top-0 -z-10 object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/LandingPageVideo.mp4" type="video/mp4" />
      </video>
      <div className="w-full flex flex-col items-center gap-4 bg-white">
        <Image src={seperatorTop} alt="seperator-top" className="max-h-64" />

        {/* Activities */}
        <>
          <div className="text-3xl">{dict.mainpage.activities.title}</div>
          <div className="flex gap-4 w-full flex-wrap sm:flex-nowrap">
            {dict.mainpage.activities.categories.map((category) => (
              <Rock
                key={category.title}
                color={category.color as "yellow" | "blue" | "green"}
                text={category.title}
              />
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
        <div className="text-4xl w-80 text-center">
          {dict.mainpage.articles.title}
        </div>
        
        
        <ArticlesPreview articles={articles} />
            
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
