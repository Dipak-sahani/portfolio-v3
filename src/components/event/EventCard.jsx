import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faVideo,
  faLocationDot,
  faArrowRight,
  faTag,
  faCalendarDay,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

import dayjs from 'dayjs';
import { Link } from "react-router-dom";
import ImagePreview from "../ImagePrev/ImagePreview";

const EventCard = ({ event  }) => {
  // console.log(event);
  
  return (
    <div className="relative w-full max-w-3xl overflow-hidden  bg-white/80 backdrop-blur-xl shadow-xl border border-zinc-200">
      
      {/* Background Image */}
      <div
        
      />
      <div className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-md" />

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col gap-4">

        {/* Title */}
        <div className="sm:flex justify-between">

        
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
          {event.title}
        </h2>

        <h2>
          Posted On: 
          <FontAwesomeIcon icon={faCalendarCheck} className="text-orange-500 px-2"/>
          { dayjs(event.createdAt).format('DD-MM-YYYY MM:ss') }
        </h2>
        </div>

        <div className="relative mx-auto w-full max-w-170 bg-gray-100 overflow-hidden aspect-video">
            <ImagePreview
              src={event?.coverImage}
              alt="event media"
              className="absolute inset-0 w-full h-full object-contain"
              loading="lazy"
            />
          </div>


        {/* Short description */}
        <p className="text-zinc-600 font-medium max-w-2xl">
          {event?.description?.slice(0, 15)} ....
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-zinc-700">

          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} className="text-orange-500" />
            <span>
              {new Date(event.startTime).toDateString()}
            </span>
          </div>

          {event.type === "virtual" ? (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faVideo} className="text-orange-500" />
              <span>Virtual Event</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
              <span>{event.location?.city}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags?.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700"
            >
              <FontAwesomeIcon icon={faTag} />
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link to={`/event/${event._id}`} className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-2 text-sm font-bold text-white hover:bg-zinc-800 transition">
            Read More
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>

          <button className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600 transition">
            Save to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
