import { IArticle } from "@/types/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface ArticlePreviewProps {
  article: IArticle;
}

const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  const { translations } = article;
  return (
    <div
      className={clsx(
        "relative flex h-full flex-col items-center rounded-2xl bg-gray-50 p-4 shadow-md",
        "transition-transform duration-700 ease-out hover:scale-102",
      )}
    >
      <Image
        src={article.image}
        alt={translations.title}
        fill
        className={clsx(
          "h-full w-full object-cover",
          "z-0 rounded-2xl shadow-md blur-[1px] brightness-50",
          // "transition-transform duration-700 ease-out hover:scale-110",
        )}
        // style={{ filter: "brightness(0.5)" }}
      />
      <div className="z-10 flex w-full flex-col text-white">
        <div className={clsx("text-sm font-bold sm:text-lg", "line-clamp-1")}>
          {translations.title}
        </div>
        {/* seperator */}
        <div className="bg-secondary mb-2 h-0.5 w-full" />
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
    <div className="flex flex-wrap justify-evenly gap-4">
      {articles.map((article) => (
        <Link
          href={`articles/${article.slug}`}
          key={article.id}
          className="h-48 w-[calc(50%-1rem)]"
        >
          <ArticlePreview key={article.id} article={article} />
        </Link>
      ))}
    </div>
  );
};

export { ArticlePreview, ArticlesPreview };
