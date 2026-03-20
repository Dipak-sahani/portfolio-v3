import React, { useEffect, useState } from 'react';
import { useEventStore } from '../../store/event.store';
import { useAuthStore } from '../../store/auth.store';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChartLine, faExternalLinkAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const MyEventsPage = () => {
  const getMyPostedEvents = useEventStore((state) => state.getMyPostedEvents);
  const myPostedEvents = useEventStore((state) => state.myPostedEvents);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      await getMyPostedEvents();
      setLoading(false);
    };

    if (user) {
      fetchEvents();
    }
  }, [user, getMyPostedEvents]);

  if (loading) {
    return <div className="p-10 text-center">Loading your events...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage My Events</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">View and manage all the events you have created.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/events/create"
            className="px-5 py-2 bg-[#FD7B41] text-white rounded shadow hover:bg-[#E66B3B] transition inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Create New Event
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {myPostedEvents?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-sm">
                  <th className="p-4 font-semibold border-b dark:border-gray-700">Event Title</th>
                  <th className="p-4 font-semibold border-b dark:border-gray-700">Status</th>
                  <th className="p-4 font-semibold border-b dark:border-gray-700">Date</th>
                  <th className="p-4 font-semibold border-b dark:border-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPostedEvents.map((event) => (
                  <tr key={event._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td className="p-4">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{event.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.type} • {event.category}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        event.status === 'published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {event.status?.toUpperCase() || 'DRAFT'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                      {(event.startDate || event.startTime) ? new Date(event.startDate || event.startTime).toLocaleDateString() : 'TBA'}
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <Link
                        to={`/events/dashboard/${event._id}`}
                        className="text-[#FD7B41] hover:text-[#E66B3B] font-medium text-sm inline-flex items-center gap-1"
                        title="Dashboard"
                      >
                        <FontAwesomeIcon icon={faChartLine} /> <span className="hidden sm:inline">Dashboard</span>
                      </Link>
                      
                      {/* Optional Edit Link if supported later */}
                      {/* <Link to={`/events/edit/${event._id}`} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm inline-flex items-center gap-1" title="Edit">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link> */}

                      {event.status === 'published' && (
                        <a
                          href={`/events/p/${event.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm inline-flex items-center gap-1"
                          title="View Public Page"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} /> <span className="hidden sm:inline">View</span>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            <p className="mb-4">You haven't posted any events yet.</p>
            <Link
              to="/events/create"
              className="px-4 py-2 bg-[#FD7B41] text-white rounded shadow hover:bg-[#E66B3B] transition"
            >
              Post your first event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
