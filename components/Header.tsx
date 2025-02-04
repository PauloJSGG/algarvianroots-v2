import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Header = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  console.log('lang', lang)

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white sticky w-full z-50">
      <nav>
        <ul className="flex gap-4 items-center">
          <li>
            <Image
              src="/Logo_AlgarvianRoots-00.png"
              alt="Algarvian Roots Logo"
              width={180}
              height={38}
              style={{
                width: "180px",
              }}
              priority
            />
          </li>
          <li>
            <Link href="/">{dict.layout.header.home}</Link>
          </li>
          <li>
            <Link href="/about-us">{dict.layout.header["about-us"]}</Link>
          </li>
          <li>
            <Link locale={lang} href={`${lang}/activities`} >
              {dict.layout.header.activities}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
