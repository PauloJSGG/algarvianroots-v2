import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex w-full h-80 relative">
      <Image
        className="max-h-64 "
        src="/background-green-cut.png"
        alt="Algarvian Roots Logo"
        sizes="100vw"
        fill
      />
    </footer>
  );
};

export default Footer;
