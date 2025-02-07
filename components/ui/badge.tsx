interface BadgeProps {
  text: string;
  color?: string;
}

const Badge = (props: BadgeProps) => {
  const color = props.color || "foreground";
  return (
    <div
      className={`bg-${color} text-white  p-1 px-3 rounded-2xl z-50`}
    >
      {props.text}
    </div>
  );
};

export default Badge;
