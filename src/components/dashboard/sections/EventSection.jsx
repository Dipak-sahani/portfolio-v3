// components/sections/EventsSection.jsx
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

function EventsSection({ events }) {
  console.log(events);

  const getEventStatus = (startTime, endTime) => {
  const now = new Date();

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "closed";
};

  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#3C4044]">Upcoming Events</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <div key={event._id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-[#3C4044]">{event.title}</h3>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventStatus(event?.startTime, event?.endTime) === 'upcoming'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                }`}>
                {getEventStatus(event?.startTime, event?.endTime)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">📅</span>
                  <span>{dayjs(event?.startTime).format('DD-MM-YYYY')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">🕒</span>
                  <span>{dayjs(event?.startTime).format('MM:ss')}</span>
                </div>
              </div>
              <Link to={`/event/${event._id}`} className="px-4 py-2 bg-[#FD7B41] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsSection;