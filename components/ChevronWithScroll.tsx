'use client'

import { ChevronDown } from "lucide-react";

const ChevronWithScroll = () => {
  return (
    <div className="cursor-pointer flex justify-center" 
      onClick={
        () => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }
      }>
      <ChevronDown size={64} className="animate-pulse" />
    </div>
  );
}

export default ChevronWithScroll;