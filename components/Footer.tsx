import Image from "next/image";
import footer from "@/public/images/footer.png";

const Footer = () => {
  return (
    <footer className="flex w-full">
      <Image className="max-h-64" src={footer} alt="Tiles footer" />
    </footer>
  );
};

export default Footer;
