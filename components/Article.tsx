import { IArticle } from "@/types/types";
import Image from "next/image";
import { CustomMDX } from "./CustomMDX";

interface ArticleProps {
  article: IArticle;
}

const Article = ({ article }: ArticleProps) => {
  const { translations } = article;
  return (
    <div className="flex flex-col items-center w-38 0 bg-gray-50 p-4 rounded-lg shadow-md">
      <Image
        src={article.image}
        alt={translations.title}
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center w-1/2">
        <div className="text-lg font-bold">{translations.title}</div>
        {translations.text && <CustomMDX source={translations.text} />}
      </div>
    </div>
  );
};

export default Article;
