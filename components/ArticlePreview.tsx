import { IArticle } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface ArticlePreviewProps {
  article: IArticle;
}

const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  const { translations } = article;
  return (
    // blog style card
    <div
      className="flex flex-col items-center w-38
    0 bg-gray-50 p-4 rounded-lg shadow-md
    "
    >
      <div className="flex flex-col items-center w-full">
        <div className="text-lg font-bold">{translations.title}</div>
        <div className="text-sm">{translations.description}</div>
      </div>
      <Image
        src={article.image}
        alt={translations.title}
        width={300}
        height={300}
      />
    </div>
  );
};

const ArticlesPreview = ({ articles }: { articles: IArticle[] }) => {
  if (!articles) {
    return <div>No articles to show</div>;
  }

  return (
    <div className="flex gap-4">
      {articles.map((article) => (
        <Link href={`articles/${article.slug}`} key={article.id}>
          <ArticlePreview key={article.id} article={article} />
        </Link>
      ))}
    </div>
  );
};

export { ArticlePreview, ArticlesPreview };
