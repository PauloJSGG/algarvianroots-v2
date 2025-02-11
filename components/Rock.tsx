import Image from "next/image";

const Rock = ({
  color,
  text,
}: {
  color: "yellow" | "blue" | "green";
  text: string;
}) => {
  return (
    <div className="relative h-24 sm:h-48 w-48 transform cursor-pointer transition-transform duration-300 hover:scale-110">
      <Image src={`/images/rocks/rock-${color}.svg`} alt={text} priority fill />
      <div className="flex h-full items-center justify-center text-white">
        <div className="z-20 text-sm sm:text-xl">{text}</div>
      </div>
    </div>
  );
};

export default Rock;
