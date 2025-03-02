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
import { getLatestArticles } from "@/services/firebase/articles";
// import ArticlePreview from "@/components/ArticlePreview";
import { ArticlesPreview } from "@/components/ArticlePreview";
import Link from "next/link";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { Video } from "@/components/Video";
import Badge from "@/components/Badge";
import clsx from "clsx";
import ChevronWithScroll from "@/components/ChevronWithScroll";
import { LanguagesType, RockPath } from "@/types/types";
import Elfsight from "@/components/Elfsight";
import Logo from "@/public/images/layout/logo-green.png";
// import video from "@/public/videos/landing-page/video.mp4";

type Props = {
  params: Promise<{ lang: LanguagesType }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return {
    openGraph: {
      //main image
      images: [
        {
          url: Logo.src,
          alt: "AlgarvianRoots logo",
        },
      ],
    },
    title: dict.mainpage.metadata.title,
    description: dict.mainpage.metadata.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: LanguagesType }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  const prod = process.env.NODE_ENV === "production";

  const articles = await getLatestArticles(lang);
  const categoryGroups = dict.activities["category-groups"]
    .map((categories) =>
      categories.reduce(
        (prev, category) => (
          <div className="flex h-full flex-col items-center justify-center gap-4 sm:flex-row">
            {prev}
            <Link
              href={`/activity-categories/${category.slug}/activities`}
              key={category.title}
            >
              <Rock
                key={category.title}
                path={category.path as RockPath}
                text={category.title}
              />
            </Link>
          </div>
        ),
        <></>,
      ),
    )
    .flat();

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
        {/* centered label */}
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
          {dict.mainpage.title}
          <div className="text-sm font-semibold text-white sm:text-2xl">
            {dict.mainpage.subtitle}
          </div>
          <ChevronWithScroll />
        </div>
      </section>

      <div className="h-[100vh] bg-transparent"></div>
      <div className="flex w-full flex-col items-center gap-4 bg-white">
        <Image src={seperatorTop} alt="seperator-top" className="max-h-64" />

        {/* Activities */}
        <section className="bg-background container">
          <div className="text-center text-3xl">{dict.activities.title}</div>
          <div className="flex w-full flex-wrap justify-center gap-4 sm:flex-nowrap">
            <Carousel
              components={categoryGroups}
              autoSlide={false}
              autoSlideInterval={4000}
            />
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
            components={[
              <Image
                src={bread}
                alt="bread"
                key="bread"
                className="h-full w-full rounded-2xl object-cover"
              />,
              <Image
                src={clay}
                alt="clay"
                key="clay"
                className="h-full w-full rounded-2xl object-cover"
              />,
            ]}
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
      {prod && (
        <section className="container mt-8">
          <Elfsight />
        </section>
      )}

      {/* <Carousel images={images} autoSlide={true} autoSlideInterval={4000} /> */}
    </>
  );
}
