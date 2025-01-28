import { ArticlePreview } from "@/components/ArticlePreview";
import { getArticle } from "@/services/firebase/articles";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; lang: "en" | "pt" }>;
}) => {
  const lang = (await params).lang;
  const id = (await params).id;
  const articles = await getArticle(lang, id);

  return (
    <div>
      <ArticlePreview
        key={articles.name}
        title={articles.name}
        description={articles.description}
        image={articles.image}
      />
    </div>
  );
};

export default page;
