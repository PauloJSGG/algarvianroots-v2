import { ArticlesPreview } from "@/components/ArticlePreview";
import { getLatestArticles } from "@/services/firebase/articles";

const page = async () => {
  const articles = await getLatestArticles();

  return (
    <div>
      <ArticlesPreview articles={articles} />
    </div>
  );
};

export default page;
