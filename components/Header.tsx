"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LogoGreen from "@/public/images/layout/logo-green.png";
import LogoYellow from "@/public/images/layout/logo-yellow.png";
import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { LanguagesType } from "@/types/types";

const Header = ({
  lang,
  links,
}: {
  lang: LanguagesType;
  links: { slug: string; title: string }[];
}) => {
  const DIFF_LOGO = [`/${lang}/activity-categories`];
  const [menuHidden, setMenuHidden] = useState(true);
  const { setTheme } = useTheme();

  // const handleClickOutside = (e:
  //   | React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   if (e.target.closest("header")) return;
  //   setMenuHidden(true);
  // };

  // get path name with hook
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full justify-between bg-transparent p-4 text-white">
        <div className="flex items-center gap-4">
          {menuHidden ? (
            <button
              onClick={() => setMenuHidden(!menuHidden)}
              className="text-foreground"
            >
              <Menu
                size={48}
                // color="#197246"
                className="hover:animate-heartbeat-slow cursor-pointer"
              />
            </button>
          ) : (
            <button
              onClick={() => setMenuHidden(!menuHidden)}
              className="text-foreground"
            >
              <X
                size={48}
                className="hover:animate-heartbeat-slow cursor-pointer"
                onClick={() => setMenuHidden(!menuHidden)}
              />
            </button>
          )}

          <Image
            src={
              DIFF_LOGO.includes(pathname) && menuHidden
                ? LogoYellow
                : LogoGreen
            }
            alt="Algarvian Roots Logo"
            width={180}
            height={38}
            style={{
              width: "180px",
            }}
            priority
          />
        </div>
      </header>
      {/* hidden menu */}
      <div
        className={clsx(
          "bg-opacity-75 fixed top-0 z-40 flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-white",
          { hidden: menuHidden },
          // animate on show
          // { "animate-fade-in": !menuHidden },
        )}
        // onClick={handleClickOutside}
      >
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${lang}/${link.slug}`}
            className="link-underline cursor-pointer"
            onClick={() => setMenuHidden(true)}
          >
            {link.title}
          </Link>
        ))}
        <div className="flex gap-4">
          <button
            className="bg-rootsgreen h-2 w-2 cursor-pointer"
            onClick={() => setTheme("green")}
          ></button>
          <button
            className="bg-rootsblue h-2 w-2 cursor-pointer"
            onClick={() => setTheme("blue")}
          ></button>
          <button
            className="bg-rootsyellow h-2 w-2 cursor-pointer"
            onClick={() => setTheme("yellow")}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Header;
