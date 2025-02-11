import { ArticlesPreview } from "@/components/ArticlePreview";
import { getLatestArticles } from "@/services/firebase/articles";
import clsx from "clsx";
import { getDictionary } from "../dictionaries";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { LanguagesType } from "@/types/types";

const page = async ({
  params,
}: {
  params: Promise<{ lang: LanguagesType }>;
}) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  const articles = await getLatestArticles(lang);

  return (
    <section className={clsx("container")}>
      <div className="text-center text-3xl">{dict.articles.title}</div>
      <Suspense fallback={<Loading />}>
        <ArticlesPreview articles={articles} />
      </Suspense>
    </section>
  );
};

export default page;
