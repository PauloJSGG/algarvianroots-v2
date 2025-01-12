import Image from "next/image";

const Rock = ({
  color,
  text,
}: {
  color: "yellow" | "blue" | "green";
  text: string;
}) => {
  return (
    <div className="relative w-full h-96">
      <Image
        src={`/images/rocks/rock-${color}.svg`}
        alt={text}
        fetchPriority="low"
        fill
        className="z-10 cursor-pointer hover:scale-110 transform transition-transform duration-300"
      />
      <div className="h-full flex justify-center items-center">
        <h1 className="z-20">{text}</h1>
      </div>
    </div>
  );
};

export default Rock;
