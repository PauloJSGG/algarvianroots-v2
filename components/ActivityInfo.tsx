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
    <div className={`flex items-center ${tailwindClasses}`}>
      <div className="w-1/3">{createElement(icon)}</div>
      <div className="flex w-2/3 flex-col">
        <div className="">{text}</div>
        <div className="">{subText}</div>
      </div>
    </div>
  );
};

export default ActivityInfo;
