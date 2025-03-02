import { RockPath } from "@/types/types";
import Image from "next/image";

const Rock = ({ path, text }: { path: RockPath; text: string }) => {
  return (
    <div className="relative h-24 w-48 transform cursor-pointer transition-transform duration-300 hover:scale-110 sm:h-48">
      <Image src={`/images/rocks/rock-${path}.png`} alt={text} priority fill />
      <div className="flex h-full items-center justify-center text-white">
        <div className="z-20 text-sm sm:text-xl text-center">{text}</div>
      </div>
    </div>
  );
};

export default Rock;
