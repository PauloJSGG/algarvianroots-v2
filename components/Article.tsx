import { IArticle } from "@/types/types";
import Image from "next/image";
import { CustomMDX } from "./CustomMDX";

interface ArticleProps {
  article: IArticle;
}

const Article = ({ article }: ArticleProps) => {
  const { translations } = article;
  return (
    <div className="flex flex-col items-center rounded-lg p-4 shadow-md">
      <Image
        src={article.image}
        alt={translations.title}
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold">{translations.title}</div>
        {translations.text && <CustomMDX source={translations.text} />}
      </div>
    </div>
  );
};

export default Article;
