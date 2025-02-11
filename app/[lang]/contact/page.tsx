import clsx from "clsx";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { LanguagesType } from "@/types/types";

const page = async ({
  params,
}: {
  params: Promise<{ lang: LanguagesType }>;
}) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <section className={clsx("container")}>
      <div className="text-center text-3xl">{dict.articles.title}</div>
    </section>
  );
}

export default page;