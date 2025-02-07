interface ActivityInfoProps {
  icon: React.ReactElement;
  text: string;
}

const ActivityInfo = ({ icon, text }:
  ActivityInfoProps
) => {
  return (
    <div className="activity-info">
      <div className="activity-info-icon">{icon}</div>
      <div className="activity-info-text">{text}</div>
    </div>
  );
}

export default ActivityInfo;