import Rock from "@/components/Rock";
import { getDictionary } from "../dictionaries";
import Link from "next/link";
import River from "@/public/images/activity-categories/river.jpg";
import Image from "next/image";
import clsx from "clsx";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

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
  );
}
