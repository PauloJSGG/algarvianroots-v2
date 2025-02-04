import Rock from "@/components/Rock";
import { getDictionary } from "../dictionaries";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div className="flex gap-4 w-full">
      {dict.activities.categories.map((category) => (
        <Link
          href={`/${lang}/activity-categories/${category.slug}/activities`}
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
  );
}
