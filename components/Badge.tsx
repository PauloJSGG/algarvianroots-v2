interface BadgeProps {
  text: string;
  color?: string;
}

const Badge = (props: BadgeProps) => {
  const color = props.color || "foreground";
  return (
    <div className={`bg-${color} z-30 rounded-2xl p-1 px-3 text-white`}>
      {props.text}
    </div>
  );
};

export default Badge;
