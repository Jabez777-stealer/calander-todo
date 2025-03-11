import { EventInfo } from "../components/types/eventInfo"; 
import EventItem from "./eventItem";
import CloseButton from "./utils/closeBtn";

interface EventTooltipProps {
  events: EventInfo[];
  closeTooltip: () => void;
  toggleModal: (data: EventInfo) => void;
}

const EventTooltip: React.FC<EventTooltipProps> = ({ events, closeTooltip, toggleModal }) => {
  return (
    <div>
      <div className="fbc p-1 px-3">
        <p className="heading">Meetings</p>
        <CloseButton onClick={closeTooltip} />
      </div>
      <div className="scrollCont">
        {events.map((event, index) => (
          <EventItem key={`${event.id}-${index}`} event={event} onClick={() => toggleModal(event)} />
        ))}
      </div>
    </div>
  );
};

export default EventTooltip;
