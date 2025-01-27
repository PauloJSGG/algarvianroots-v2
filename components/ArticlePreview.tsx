import { Article } from "@/services/firebase/articles";
import Image from "next/image";

interface ArticlePreviewProps {
  title: string;
  description: string;
  image: string;
}

const ArticlePreview = ({ title, description, image }: ArticlePreviewProps) => {
  return (
    // blog style card
    <div className="flex flex-col items-center w-38
    0 bg-gray-50 p-4 rounded-lg shadow-md
    ">
      <div className="flex flex-col items-center w-full">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
      <Image src={image} alt={title} width={300} height={300}/>
    </div>
  );
};

const ArticlesPreview = ({ articles }: { articles: Article[] }) => {
  if (!articles) {
    return <div>No articles to show</div>;
  }

  return (
    <div className="flex gap-4">
      {articles.map((article) => (
        <ArticlePreview
          key={article.name}
          title={article.name}
          description={article.description}
          image={article.image}
        />
      ))}
    </div>
  );
};

export default ArticlesPreview;
