import { IArticle } from "@/types/types";
import Markdown from "markdown-to-jsx";
import Image from "next/image";

interface ArticleProps {
  article: IArticle;
}

const Article = ({ article }: ArticleProps) => {
  const { translations } = article;
  return (
    <div className="flex flex-col items-center w-38 0 bg-gray-50 p-4 rounded-lg shadow-md">
      <div className="flex flex-col items-center w-full">
        <div className="text-lg font-bold">{translations.title}</div>
        {translations.text && (
          <Markdown className="text-sm">{translations.text}</Markdown>
        )}
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

export default Article;
