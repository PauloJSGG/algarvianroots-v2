// import Image from "next/image";

import Rock from "@/components/Rock";
import { getDictionary } from "./dictionaries";
// import ImageSlider from "@/components/ImageSlider";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import seperatorTop from "@/public/images/seperator-top.png";
import seperatorBottom from "@/public/images/seperator-bottom.png";
import bread from "@/public/images/landing-page/bread.jpg";
import clay from "@/public/images/landing-page/clay.jpg";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getLatestArticles } from "@/services/firebase/articles";
// import ArticlePreview from "@/components/ArticlePreview";
import { ArticlesPreview } from "@/components/ArticlePreview";
import Link from "next/link";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { Video } from "@/components/Video";
import Badge from "@/components/ui/Badge";
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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const articles = await getLatestArticles(lang);

  return (
    <>
      <Video
        desktop={{
          src: "/videos/landing-page/video.mp4",
          poster: "/videos/landing-page/poster-desktop.jpg",
        }}
        mobile={{
          src: "/videos/landing-page/video-mobile.mp4",
          poster: "/videos/landing-page/poster-mobile.jpg",
        }}
        className="sticky top-0 -z-10 h-dvh w-full"
      />
      <div className="flex w-full flex-col items-center gap-4 bg-white">
        <Image src={seperatorTop} alt="seperator-top" className="max-h-64" />

        {/* Activities */}
        <section className="container">
          <div className="text-center text-3xl">{dict.activities.title}</div>
          <div className="flex w-full flex-wrap justify-center gap-4 sm:flex-nowrap">
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
        </section>

        {/* About Us */}

        <section className="container text-center">
          <div className="text-3xl">{dict.mainpage["about-us"].title}</div>
          <div className="text-center text-xl">
            {dict.mainpage["about-us"].description}
          </div>
          <Link href="/about-us" className="m-4 flex justify-center">
            <Badge text={dict.mainpage["about-us"]["see-more"]} />
          </Link>

          <Carousel
            images={[bread, clay]}
            autoSlide={true}
            autoSlideInterval={4000}
          />
        </section>

        {/* Latest 3 articles */}
        <section className="container">
          <div className="w-full text-center text-4xl">
            {dict.articles.title}
          </div>
          <Suspense fallback={<Loading />}>
            <ArticlesPreview articles={articles} />
            <Link href="/articles" className="m-4 flex justify-center">
              <Badge text={dict.articles["see-more"]} />
            </Link>
          </Suspense>
        </section>

        {/* Other */}
        <Image
          src={seperatorBottom}
          alt="seperator-bottom"
          className="max-h-64"
        />
      </div>

      {/* <Carousel images={images} autoSlide={true} autoSlideInterval={4000} /> */}
    </>
  );
}
