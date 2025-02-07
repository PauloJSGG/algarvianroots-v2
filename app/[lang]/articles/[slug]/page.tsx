import Article from "@/components/Article";
import { getArticle } from "@/services/firebase/articles";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "pt" }>;
}) => {
  const lang = (await params).lang;
  const slug = (await params).slug;
  const article = await getArticle(slug, lang);

  return (
    <div>
      <Article key={article.id} article={article} />
    </div>
  );
};

export default page;
