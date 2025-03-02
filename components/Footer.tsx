import footer from "@/public/images/footer/footer.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <Image
        className="max-h-64 bg-transparent absolute z-0"
        src={footer}
        alt="Tiles footer"
      />
      <section className="z-50 relative">logo</section>
      <section className="z-50 relative">address</section>
      <section className="z-50 relative">socials</section>
      <section className="z-50 relative">terms</section>
    </footer>
  );
};

export default Footer;
