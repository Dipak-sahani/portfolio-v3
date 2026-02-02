import { useState, useEffect } from "react";
import EventCreationWizard from "../components/event/EventForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import EventCard from "../components/event/EventCard";
import { useEventStore } from "../store/event.store";
import { useAuthStore } from "../store/auth.store";

const Event = () => {
  const [isCreate, setIsCreate] = useState(false);

  const getEvents = useEventStore((state) => state.getEvents);
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);
  const user=useAuthStore((state)=>state.user)
 const getMyRegisteredEvents=useEventStore((state)=>state.getMyRegisteredEvents)
  const myRegisteredEvents=useEventStore((state)=>state.myRegisteredEvents)
  
  
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(()=>{
    getMyRegisteredEvents()
  },[])


  

  return (
    <div className="pt-10">
      {/* Create Event Button */}

      <h1 className="text-2xl font-bold text-center">Events</h1>
      { user?.ableToPostEvent &&
      <div className="text-center">
        <button
          onClick={() => setIsCreate(true)}
          className="bg-amber-200 rounded-2xl hover:scale-110 py-2 px-4 mb-5"
        >
          <FontAwesomeIcon icon={faAdd} /> Create Event
        </button>
      </div>}

      {isCreate && <EventCreationWizard onClose={() => setIsCreate(false)} />}

      {/* Events List */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-5xl sm:px-4">
            {events?.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="py-2 sm:py-5 flex justify-center">
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
