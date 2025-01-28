import Markdown from "markdown-to-jsx";
import Image from "next/image";

interface ArticleProps {
  title: string;
  image: string;
  text: string;
}

const Article = ({ title, image, text }: ArticleProps) => (
  <div className="flex flex-col items-center w-38 0 bg-gray-50 p-4 rounded-lg shadow-md">
    <div className="flex flex-col items-center w-full">
      <div className="text-lg font-bold">{title}</div>
      {text && <Markdown className="text-sm">{text}</Markdown>}
    </div>
    <Image src={image} alt={title} width={300} height={300} />
  </div>
);

export default Article;
