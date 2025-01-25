import Image from "next/image";

const Rock = ({
  color,
  text,
}: {
  color: "yellow" | "blue" | "green";
  text: string;
}) => {
  return (
    <div className="relative w-full h-36 sm:h-72 cursor-pointer hover:scale-110 transform transition-transform duration-300">
      <Image src={`/images/rocks/rock-${color}.svg`} alt={text} priority fill />
      <div className="h-full flex justify-center items-center text-white">
        <div className="z-20 text-lg sm:text-xl">{text}</div>
      </div>
    </div>
  );
};

export default Rock;
