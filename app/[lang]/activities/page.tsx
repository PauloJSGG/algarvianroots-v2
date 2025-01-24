import Rock from "@/components/Rock";
import { getDictionary } from "../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <div className="flex gap-4 w-full">
      {dict.mainpage.activities.categories.map((category) => (
        <Rock
          key={category.title}
          color={category.color as "yellow" | "blue" | "green"}
          text={category.title}
        />
      ))}
    </div>
  );
}
