import { ArticlesPreview } from "@/components/ArticlePreview";
import { getLatestArticles } from "@/services/firebase/articles";

const page = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) => {
  const lang = (await params).lang;
  const articles = await getLatestArticles(lang);

  return (
    <div>
      <ArticlesPreview articles={articles} />
    </div>
  );
};

export default page;
