import { useState, useEffect } from "react";
import EventCreationWizard from "../components/event/EventForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import EventCard from "../components/event/EventCard";
import { useEventStore } from "../store/event.store";

const Event = () => {
  const [isCreate, setIsCreate] = useState(false);

  const getEvents = useEventStore((state) => state.getEvents);
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <div className="pt-10">
      {/* Create Event Button */}
      <div className="text-center">
        <button
          onClick={() => setIsCreate(true)}
          className="bg-amber-200 rounded-2xl hover:scale-110 py-2 px-4 mb-5"
        >
          <FontAwesomeIcon icon={faAdd} /> Create Event
        </button>
      </div>

      {isCreate && <EventCreationWizard onClose={() => setIsCreate(false)} />}

      {/* Events List */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-5xl px-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="py-5 flex justify-center">
                  <EventCard event={event} />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No events found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
