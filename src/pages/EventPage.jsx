import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faTag,
  faUsers,
  faLink,
  faMoneyBill,
  faGlobe,
  faNetworkWired,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventStore } from '../store/event.store';
import { useAuthStore } from '../store/auth.store';
import { registerEvent } from '../services/event.service';
import { toast } from 'react-toastify';
import ShareModal from '../components/common/ShareModal';
import ReportModal from '../components/common/ReportModal';
import { faShareAlt, faFlag } from '@fortawesome/free-solid-svg-icons';


const defaultEvent = [{
  category: "",
  coverImage: "",
  createdAt: "",
  createdBy: "",
  description: "",
  endTime: "",
  isPaid: false,
  maxParticipants: 0,
  meetingLink: "",
  price: { amount: 0, currency: 'INR' },
  shortDescription: "",
  startTime: "",
  tags: [''],
  title: "",
  type: "",
  _id: ""
}]


const EventPage = () => {
  const [event, setEvent] = useState({
    category: "networking",
    coverImage: "",
    createdAt: "2026-01-28T11:14:37.393Z",
    createdBy: "696cb40bcfb7efdaaf0f83fd",
    description: "ththhth",
    endTime: "2026-02-01T11:00:00.000Z",
    isPaid: false,
    maxParticipants: 0,
    meetingLink: "",
    price: { amount: 0, currency: 'INR' },
    shortDescription: "",
    startTime: "2026-01-31T11:05:00.000Z",
    tags: ['fintech'],
    title: "the i am the",
    type: "virtual",
    _id: "6979ef9d015892f9ea3c24ae"
  });
  const { id } = useParams()
  const user = useAuthStore((state) => state.user);

  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const events = useEventStore((state) => state.events)

  const myRegisteredEvents = useEventStore((state) => state.myRegisteredEvents)

  // console.log(myRegisteredEvents);

  const navigate = useNavigate();
  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateTime = (dateString) => {
    return `${formatDate(dateString)} at ${formatTime(dateString)}`;
  };

  const getDuration = () => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
  };

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      // Simulate API call


      const res = await registerEvent(id);


      if (res.status == 200) {
        setIsRegistering(false);
        setRegistered(true);
        toast.success('Successfully registered for the event!');
      }
    } catch (error) {
      setIsRegistering(false);
    }
  };

  const colors = {
    background: '#DDDCDB',
    primary: '#FD7B41',
    secondary: '#EDBF9B',
    text: '#3C4044',
    lightText: '#6B7280'
  };




  useEffect(() => {
    if (id) {

      const selectedEvent = events.filter((evt) => {
        return evt._id == id
      })

      if (!selectedEvent.length > 0) {
        navigate('/event')
      }
      setEvent(selectedEvent[0] || defaultEvent)


      if (myRegisteredEvents?.includes(selectedEvent[0]?._id)) {
        setRegistered(true)
      }


    }

  }, [])

  return (
    <div
      className="min-h-screen py-8 px-4 md:px-8 dark:bg-gray-900"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-gray-100" style={{ color: colors.text }}>
              Event Details
            </h1>
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold dark:bg-gray-800 dark:text-gray-200"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text
              }}
            >
              <FontAwesomeIcon icon={faNetworkWired} className="mr-2" />
              {event?.category?.charAt(0)?.toUpperCase() + event?.category?.slice(1)}
            </span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Event Title and Type */}
            <div className="mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-100"
                style={{ color: colors.text }}
              >
                {event?.title}
              </h2>
              <div className="flex items-center gap-4">
                <span
                  className="px-3 py-1 rounded-full text-sm dark:bg-gray-800 dark:text-gray-200"
                  style={{
                    backgroundColor: event?.type === 'virtual' ? colors.secondary : colors.primary,
                    color: colors.text
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  {event?.type?.charAt(0)?.toUpperCase() + event?.type?.slice(1)} Event
                </span>
                {event?.isPaid && (
                  <span
                    className="px-3 py-1 rounded-full text-sm dark:bg-gray-800 dark:text-gray-200"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.text
                    }}
                  >
                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                    Paid Event
                  </span>
                )}
              </div>
            </div>

            {/* Event Date and Time */}
            <div
              className="rounded-xl p-6 mb-8 dark:bg-gray-800 dark:text-gray-200"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                    Start Date & Time
                  </h3>
                  <p className="text-lg">{formatDateTime(event.startTime)}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                    End Date & Time
                  </h3>
                  <p className="text-lg">{formatDateTime(event.endTime)}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-3" />
                    Duration
                  </h3>
                  <p className="text-lg">{getDuration()}</p>
                </div>
                {event.maxParticipants > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <FontAwesomeIcon icon={faUsers} className="mr-3" />
                      Maximum Participants
                    </h3>
                    <p className="text-lg">{event.maxParticipants}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-8">
              <h3
                className="text-xl font-bold mb-4 dark:text-gray-100"
                style={{ color: colors.text }}
              >
                Description
              </h3>
              <div
                className="rounded-lg p-6 dark:bg-gray-800/80 dark:text-gray-300"
                style={{
                  backgroundColor: colors.secondary + '80',
                  color: colors.text
                }}
              >
                <p className="leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mb-8">
                <h3
                  className="text-xl font-bold mb-4 dark:text-gray-100"
                  style={{ color: colors.text }}
                >
                  <FontAwesomeIcon icon={faTag} className="mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm"
                      style={{
                        backgroundColor: colors.primary,
                        color: '#FFFFFF'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting Link */}
            {event?.meetingLink && (
              <div className="mb-8">
                <h3
                  className="text-xl font-bold mb-4 dark:text-gray-100"
                  style={{ color: colors.text }}
                >
                  <FontAwesomeIcon icon={faLink} className="mr-2" />
                  Meeting Link
                </h3>
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg hover:underline"
                  style={{ color: colors.primary }}
                >
                  {event?.meetingLink}
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div
              className="rounded-xl p-6 sticky top-8 dark:bg-gray-800 dark:text-gray-200"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text
              }}
            >
              {/* Price */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2 flex items-center">
                  <FontAwesomeIcon icon={faMoneyBill} className="mr-3" />
                  Price
                </h3>
                <div className="text-2xl font-bold">
                  {event.isPaid ? (
                    <span>
                      {event.price.amount} {event.price.currency}
                    </span>
                  ) : (
                    <span style={{ color: colors.primary }}>FREE</span>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <div className="mb-6">
                {new Date() > new Date(event.endTime) ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-bold text-lg bg-gray-400 text-white cursor-not-allowed"
                  >
                    Event Ended
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering || registered}
                    className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 ${registered ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                    style={{
                      backgroundColor: registered ? colors.lightText : colors.primary,
                      color: '#FFFFFF'
                    }}
                  >
                    {isRegistering ? (
                      <span>Processing...</span>
                    ) : registered ? (
                      <span>✓ Registered</span>
                    ) : (
                      <span>Register Now</span>
                    )}
                  </button>
                )}
                {event.maxParticipants > 0 && (
                  <p className="text-sm mt-2 text-center" style={{ color: colors.lightText }}>
                    Limited to {event.maxParticipants} participants
                  </p>
                )}
              </div>

              {/* Event Type Details */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Event Type</h3>
                <div className="flex items-center justify-between bg-white bg-opacity-20 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faGlobe} className="mr-3" />
                    <span>{event?.type?.charAt(0).toUpperCase() + event?.type?.slice(1)}</span>
                  </div>
                  {event.type === 'virtual' && (
                    <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}>
                      Online
                    </span>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div
                  className="p-3 rounded-lg text-center dark:bg-gray-700"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <FontAwesomeIcon icon={faNetworkWired} className="mr-2" />
                  <span className="font-medium">{event.category?.charAt(0)?.toUpperCase() + event?.category?.slice(1)}</span>
                </div>
              </div>
            </div>

            {/* Created Info */}
            <div className="mt-6 text-center text-sm dark:text-gray-400" style={{ color: colors.lightText }}>
              <p>Event created on {formatDate(event.createdAt)}</p>
              <p>Event ID: {event._id?.slice(-8)}</p>
            </div>

            {/* Share and Report Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {user && (user._id === event?.createdBy || user.id === event?.createdBy) && (
                <button
                  onClick={() => navigate(`/events/dashboard/${event._id}`)}
                  className="w-full py-3 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:bg-opacity-10 mb-2"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    backgroundColor: colors.primary + '10'
                  }}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  View Dashboard
                </button>
              )}

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full py-3 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:bg-opacity-10"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary
                }}
              >
                <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
                Share Event
              </button>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-opacity-10 dark:hover:bg-gray-700 flex items-center justify-center dark:text-gray-400"
                style={{
                  color: colors.lightText
                }}
              >
                <FontAwesomeIcon icon={faFlag} className="mr-2" />
                Report Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`Check out this event: ${event?.title}`}
        url={window.location.href}
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

export default EventPage;