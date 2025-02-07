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

  return (
    <header className="sticky z-50 flex w-full justify-between bg-gray-800 p-4 text-white">
      <nav>
        <ul className="flex items-center gap-4">
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
          {dict.layout.header.links.map((link) => (
            <li key={link.slug}>
              <Link href={`/${link.slug}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
