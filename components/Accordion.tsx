"use client";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const Accordion = ({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-foreground w-full border-b">
      <div
        className="flex cursor-pointer items-center justify-between p-4 select-none"
        onClick={handleClick}
      >
        <div>{title}</div>
        <div>{isOpen ? <ChevronDown /> : <ChevronRight />}</div>
      </div>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Accordion;
