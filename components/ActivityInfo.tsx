import { LucideProps } from "lucide-react";
import { createElement, ForwardRefExoticComponent, RefAttributes } from "react";

interface ActivityInfoProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  text: string | number;
  subText?: string;
  tailwindClasses?: string;
}

const ActivityInfo = ({
  icon,
  text,
  subText,
  tailwindClasses = "",
}: ActivityInfoProps) => {
  return (
    <div className={`flex items-center px-4 gap-2 bg-foreground text-background rounded-3xl py-1 ${tailwindClasses}`}>
      {createElement(icon)}
      <div className="">{text}</div>
      {subText && <div className="">{subText}</div>}
    </div>
  );
};

export default ActivityInfo;
