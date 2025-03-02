import Rock from "@/components/Rock";
import { getDictionary } from "../dictionaries";
import Link from "next/link";
import River from "@/public/images/activity-categories/river.jpg";
import Image from "next/image";
import clsx from "clsx";
import { LanguagesType, RockPath } from "@/types/types";
import Carousel from "@/components/Carousel";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: LanguagesType }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

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
    <section className="container">
      <Image
        className={clsx(
          "absolute top-0 -z-10 w-full object-cover",
          "blur-[1px] brightness-50 filter",
        )}
        src={River}
        alt="River"
        fill
      />
      <div className="text-background text-center text-3xl">
        {dict.activities.title}
      </div>
      <div className="flex w-full flex-wrap justify-center gap-4 sm:flex-nowrap">
        <Carousel
          components={categoryGroups}
          autoSlide={false}
          autoSlideInterval={4000}
        />
      </div>
    </section>
  );
}
