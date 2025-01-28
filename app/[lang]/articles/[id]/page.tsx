import Article from "@/components/Article";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getArticle } from "@/services/firebase/articles";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; lang: "en" | "pt" }>;
}) => {
  const lang = (await params).lang;
  const id = (await params).id;
  const article = await getArticle(lang, id);

  return (
    <div>
      <Article
        key={article.name}
        title={article.name}
        image={article.image}
        text={article.text}
      />
    </div>
  );
};

export default page;
