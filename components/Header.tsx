"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LogoGreen from "@/public/images/layout/logo-green.png";
import LogoYellow from "@/public/images/layout/logo-yellow.png";
import LogoWhite from "@/public/images/layout/logo-white.png";
import { useEffect, useState } from "react";
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
  const DIFF_LOGO = [
    `/${lang}/activity-categories`,
    `/${lang}/activity-categories/[slug]`,
  ];
  const [menuHidden, setMenuHidden] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { setTheme } = useTheme();

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled 100vh (viewport height)
      if (window.scrollY >= window.innerHeight) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <header className="sticky top-0 z-50 flex w-full justify-between p-4 text-white bg-white/50"> */}
      <header
        className={clsx(
          "sticky top-0 z-50 flex w-full justify-between p-4 text-white",
          // show background if we have scrolled
          { "bg-white": hasScrolled },
        )}
      >
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
              (DIFF_LOGO.includes(pathname) && menuHidden) || pathname.includes("activities") && !hasScrolled
                ? LogoYellow
                : !hasScrolled && menuHidden && pathname === `/${lang}`
                  ? LogoWhite
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
          { "-translate-y-full": menuHidden },
          { "animate-fade-in": !menuHidden },
          "transition-all",
          "duration-200 ease-in-out",
        )}
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
          />
          <button
            className="bg-rootsblue h-2 w-2 cursor-pointer"
            onClick={() => setTheme("blue")}
          />
          <button
            className="bg-rootsyellow h-2 w-2 cursor-pointer"
            onClick={() => setTheme("yellow")}
          />
          <button
            className="bg-rootsbrown h-2 w-2 cursor-pointer"
            onClick={() => setTheme("brown")}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
