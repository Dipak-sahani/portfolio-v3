import { useEffect, useRef } from "react";
import EventCard from "../event/EventCard";

const HorizontalAutoScrollEvents = ({
  horEvent,
  openCommentOverlay,
  onEventClick,
}) => {
  const scrollRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);
  const speed = 0.2;

  useEffect(() => {
    if (!scrollRef.current || !horEvent?.length) return;

    const el = scrollRef.current;
    let raf;

    const resetIfNeeded = () => {
      if (position.current >= el.scrollWidth / 2) {
        position.current = 0;
        el.scrollLeft = 0;
      }
    };

    const animate = () => {
      if (!isPaused.current) {
        position.current += speed;
        el.scrollLeft = position.current;
        resetIfNeeded();
      }
      raf = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      position.current = el.scrollLeft;
      resetIfNeeded();
    };

    const handleMouseEnter = () => {
      isPaused.current = true;
    };

    const handleMouseLeave = () => {
      isPaused.current = false;
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener("resize", handleResize);

    // We can attach listeners directly to the container in the JSX, 
    // or add them here if we want to be very specific about the element.
    // However, the clearer React way is to add props in the JSX. 
    // But since we need `isPaused` inside `animate`, using a ref for `isPaused` is correct.

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [horEvent]);

  if (!horEvent?.length) {
    return <div className="text-center text-gray-500">No events found</div>;
  }

  return (
    <div className="w-full sm:w-[80%] overflow-x-hidden">
      <div
        ref={scrollRef}
        className="w-full overflow-x-hidden"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >
        <div className="flex w-max gap-4 px-3 sm:px-4">
          {[...horEvent, ...horEvent].map((event, index) => (
            <div
              key={`${event._id}-${index}`}
              className="
                flex-shrink-0
                w-[85vw]        /* mobile */
                sm:w-[60vw]
                md:w-[40vw]
                lg:w-[28rem]    /* desktop */
                py-2 sm:py-5
                cursor-pointer
              "
              onClick={() => onEventClick?.(event)}
            >
              <EventCard
                event={event}
                callBack={openCommentOverlay}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalAutoScrollEvents;
