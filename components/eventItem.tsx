import { EventInfo } from "../components/types/eventInfo";

interface EventItemProps {
  event: EventInfo;
  onClick: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick }) => {
  return (
    <div className="eventItem" onClick={onClick}>
      <p className="text-black fs12">{event.job_id.jobRequest_Title}</p>
      <p className="text-black fs12">{event.user_det.handled_by.username}</p>
      <p className="text-black fs12">
        <span className="font-medium">Time:</span>{" "}
        {new Date(event.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} -{" "}
        {new Date(event.end).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
      </p>
    </div>
  );
};

export default EventItem;
