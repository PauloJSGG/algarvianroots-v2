import Article from "@/components/Article";
import { getArticle } from "@/services/firebase/articles";
import { LanguagesType } from "@/types/types";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string; lang: LanguagesType }>;
}) => {
  const lang = (await params).lang;
  const slug = (await params).slug;
  const article = await getArticle(slug, lang);

  return (
    <section className="container">
      <Article key={article.id} article={article} />
    </section>
  );
};

export default page;
