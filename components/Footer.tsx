import footer from "@/public/images/footer/footer.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <Image className="max-h-64 bg-transparent" src={footer} alt="Tiles footer" />
      {/* <footer className="flex w-full bg-transparent">
    </footer> */}
    </footer>
  );
};

export default Footer;
