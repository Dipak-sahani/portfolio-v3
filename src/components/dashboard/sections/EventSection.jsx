// components/sections/EventsSection.jsx
import React from 'react';

function EventsSection({ events }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#3C4044]">Upcoming Events</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-[#3C4044]">{event.title}</h3>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.status === 'upcoming'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                }`}>
                {event.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">📅</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">🕒</span>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">👥</span>
                  <span>{event.participants} attending</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#FD7B41] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsSection;