"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeChanger = ({ color }: { color: string }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(color);
  }, [color, setTheme]);

  return <></>;
};

export default ThemeChanger;
