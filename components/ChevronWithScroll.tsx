"use client";

import { ChevronDown } from "lucide-react";

const ChevronWithScroll = () => {
  return (
    <div
      className="flex cursor-pointer justify-center"
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }}
    >
      <ChevronDown size={64} className="animate-pulse" />
    </div>
  );
};

export default ChevronWithScroll;
