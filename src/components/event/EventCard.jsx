import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faVideo,
  faLocationDot,
  faArrowRight,
  faTag,
  faCalendarDay,
  faCalendarCheck,
  faComment,
  faShareAlt,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

import { addToCalendar } from "../../services/calendar.service";
import { toast } from "react-toastify";
import { useState } from "react";
import dayjs from "dayjs";
import ImagePreview from "../ImagePrev/ImagePreview";
import { Link } from "react-router-dom";
import ShareModal from "../common/ShareModal";
import ReportModal from "../common/ReportModal"; // Assume this component exists or create it
import { likeService } from "../../services/like.service";
import { useAuthStore } from "../../store/auth.store";

const EventCard = ({ event, callBack }) => {

  const [liked, setLiked] = useState(event?.isLikedByMe || false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleLike = async () => {
    try {
      const res = await likeService({ targetType: "event", targetId: event._id })
      console.log(res);

      setLiked(res)

    } catch (error) {
      console.log(error);

    }
  };

  const handleSaveToCalendar = async () => {
    setIsSaving(true);
    try {
      await addToCalendar({
        type: "event",
        eventId: event._id,
        date: event.startTime,
        description: event.title,
      });
      toast.success("Event saved to your calendar!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save event");
    } finally {
      setIsSaving(false);
    }
  };

  // Status Logic
  const now = new Date();
  
  // Use startDate/endDate if available, otherwise fallback to startTime/endTime
  const start = event.startDate || event.startTime;
  const end = event.endDate || event.endTime;

  const startTime = start ? new Date(start) : null;
  const endTime = end ? new Date(end) : null;
  
  let status = "upcoming";
  let statusColor = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

  if (endTime && !isNaN(endTime.getTime())) {
    if (now > endTime) {
      status = "closed";
      statusColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    } else if (startTime && !isNaN(startTime.getTime()) && now >= startTime && now <= endTime) {
      status = "running";
      statusColor = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    }
  }

  const isClosed = status === "closed";

  return (
    <div className={`w-full max-w-3xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl border border-zinc-200 dark:border-gray-700 transition-all duration-300 ${isClosed ? 'grayscale opacity-80' : ''}`}>
      {/* Background Image */}
      <div />
      {/* <div className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-md" /> */}

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col gap-4">
        {/* Title & Status */}
        <div className="sm:flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${statusColor}`}>
                {status}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">
                {event.title}
              </h2>
            </div>
          </div>

          <h2 className="dark:text-gray-300 text-sm mt-2 sm:mt-0">
            Posted On:
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="text-orange-500 px-2"
            />
            {dayjs(event.createdAt).format("DD-MM-YYYY")}
          </h2>
        </div>

        <div className="relative mx-auto w-full max-w-170 bg-gray-100 dark:bg-gray-700 overflow-hidden aspect-video">
          <ImagePreview
            src={event?.coverImage}
            alt="event media"
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Short description */}
        <p className="text-zinc-600 dark:text-gray-400 font-medium max-w-2xl">
          {event?.description?.slice(0, 50)}...
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-zinc-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-orange-500"
            />
            <span>{start ? new Date(start).toDateString() : 'TBA'}</span>
          </div>

          {event.type === "virtual" ? (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faVideo} className="text-orange-500" />
              <span>Virtual Event</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-orange-500"
              />
              <span>{event.location?.city}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags?.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-bold text-orange-700 dark:text-orange-400"
            >
              <FontAwesomeIcon icon={faTag} />
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to={`/events/p/${event.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-black px-6 py-2 text-sm font-bold text-white hover:bg-zinc-800 dark:hover:bg-zinc-900 transition"
          >
            Read More
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          
          {user && (user._id === event?.createdBy || user.id === event?.createdBy) && (
            <Link
              to={`/events/dashboard/${event._id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#FD7B41] bg-opacity-20 px-6 py-2 text-sm font-bold text-[#FD7B41] hover:bg-opacity-30 border-2 border-[#FD7B41] transition"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={handleSaveToCalendar}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600 transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save to Calendar"}
          </button>
          <button
            onClick={() => callBack(event._id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border dark:border-gray-600"
          >
            <FontAwesomeIcon icon={faComment} />
            <span className="font-medium text-gray-700 dark:text-gray-300">Comment</span>
          </button>


          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${liked
              ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            <svg
              className={`w-5 h-5 ${liked ? "fill-current" : ""}`}
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={liked ? "0" : "2"}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span
              className={`font-medium ${liked ? "text-red-600" : "text-gray-700"}`}
            >
              {liked ? "Liked" : "Like"}
            </span>

          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border dark:border-gray-600"
          >
            <FontAwesomeIcon icon={faShareAlt} />
            {/* <span className="font-medium text-gray-700 dark:text-gray-300">Share</span> */}
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors border dark:border-gray-600"
            title="Report Event"
          >
            <FontAwesomeIcon icon={faFlag} />
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`Check out this event: ${event?.title}`}
        url={`${window.location.origin}/events/p/${event.slug}`}
        content={event?.description}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={event._id}
        targetType="Event"
      />
    </div>
  );
};

export default EventCard;
