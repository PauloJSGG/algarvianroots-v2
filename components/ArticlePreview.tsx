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
      className="flex flex-col items-center
    0 bg-gray-50 p-4 rounded-lg shadow-md relative h-full
    "
    >
      <Image
        src={article.image}
        alt={translations.title}
        fill
        className="w-full object-cover"
        style={{ filter: "brightness(0.5)" }}
      />
      <div className="flex flex-col w-full text-white z-50">
        <div className="text-sm sm:text-lg font-bold">{translations.title}</div>
        <div className="text-xs sm:text-sm line-clamp-2">{translations.description}</div>
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
        <Link href={`articles/${article.slug}`} key={article.id} className="w-1/2 h-48">
          <ArticlePreview key={article.id} article={article} />
        </Link>
      ))}
    </div>
  );
};

export { ArticlePreview, ArticlesPreview };
