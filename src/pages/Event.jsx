import { useState, useEffect } from "react";
import EventCreationWizard from "../components/event/EventForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faComment } from "@fortawesome/free-solid-svg-icons";
import EventCard from "../components/event/EventCard";
import { useEventStore } from "../store/event.store";
import { useAuthStore } from "../store/auth.store";
import CommentOverlay from "../components/comment/CommentOverlay";
import HorizontalAutoScrollEvents from "../components/component/HorizontalScrollForEvent";
import { useNavigate, useNavigation } from "react-router-dom";


const FEATURED_COUNT = 3;




const Event = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [verEvent, setVerEvent] = useState([]);
  const [horEvent, setHorEvent] = useState([]);
  const getEvents = useEventStore((state) => state.getEvents);
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  const getMyRegisteredEvents = useEventStore(
    (state) => state.getMyRegisteredEvents,
  );
  const myRegisteredEvents = useEventStore((state) => state.myRegisteredEvents);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const splitData = (data) => {
    const featured = data.slice(0, FEATURED_COUNT);
    const rest = data.slice(FEATURED_COUNT);
    return { featured, rest };
  };



  const setEventsData = () => {
    const { featured, rest } = splitData(events);

    setHorEvent(featured);
    setVerEvent(rest);
  }

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    setEventsData();

  }, [events]);


  useEffect(() => {
    getMyRegisteredEvents();
  }, []);

  const [open, setOpen] = useState(false);

  const [commentDisplay, setCommentDisplay] = useState({
    isOpen: false,
    id: null,
  });

  const openCommentOverlay = (id) => {


    setCommentDisplay({
      isOpen: true,
      id,
    });
  };

  const closeCommentOverlay = () => {
    setCommentDisplay({
      isOpen: false,
      id: null,
    });
  };



  const navigate = useNavigate()
  const handleEventClick = (event) => {
    navigate(`/event/${event._id}`)
  };



  return (
    <div className="pt-10">
      {/* Create Event Button */}

      <h1 className="text-2xl font-bold text-center">Events</h1>
      {user?.ableToPostEvent && (
        <div className="text-center">
          <button
            onClick={() => setIsCreate(true)}
            className="bg-orange-700 rounded-2xl hover:scale-110 py-2 px-4 mb-5"
          >
            <FontAwesomeIcon icon={faAdd} /> Create Event
          </button>
        </div>
      )}

      {isCreate && <EventCreationWizard onClose={() => setIsCreate(false)} />}






      {/* Events List */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-col items-center w-full">

          <HorizontalAutoScrollEvents horEvent={horEvent} openCommentOverlay={openCommentOverlay} onEventClick={handleEventClick} />






          <div className="w-full max-w-5xl sm:px-4">
            {verEvent?.length > 0 ? (
              verEvent.map((event) => (
                <div
                  key={event._id}
                  className="py-2 sm:py-5 flex justify-center"
                >
                  <EventCard event={event} callBack={openCommentOverlay} />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No events found</div>
            )}
          </div>

          <>
            {commentDisplay.isOpen && (
              <CommentOverlay
                targetType="event"
                Id={commentDisplay.id}
                onClose={closeCommentOverlay}
              />
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Event;
