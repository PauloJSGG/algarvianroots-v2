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
    <div className="0 relative flex h-full flex-col items-center rounded-lg bg-gray-50 p-4 shadow-md">
      <Image
        src={article.image}
        alt={translations.title}
        fill
        className="w-full object-cover"
        style={{ filter: "brightness(0.5)" }}
      />
      <div className="z-50 flex w-full flex-col text-white">
        <div className="text-sm font-bold sm:text-lg">{translations.title}</div>
        <div className="line-clamp-2 text-xs sm:text-sm">
          {translations.description}
        </div>
      </div>
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
        <Link
          href={`articles/${article.slug}`}
          key={article.id}
          className="h-48 w-1/2"
        >
          <ArticlePreview key={article.id} article={article} />
        </Link>
      ))}
    </div>
  );
};

export { ArticlePreview, ArticlesPreview };
