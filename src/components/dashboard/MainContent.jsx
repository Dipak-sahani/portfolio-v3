// components/MainContent.jsx
import React from 'react';
import PostsSection from './sections/PostSection';
import EventsSection from './sections/EventSection';
import LikedPostsSection from './sections/LikedPostsSection';
import CommentsSection from './sections/CommentsSection';
import SavedPostsSection from './sections/SavedPostsSections';
import { motion, AnimatePresence } from 'framer-motion';

import CalendarSection from './CalendarSection';
import { Link } from 'react-router-dom';

function MainContent({ activeTab, data, user, allData, onPostClick, onProjectClick }) {
  const sectionTitles = {
    posts: 'My Posts',
    events: 'Participated Events',
    calendar: 'My Calendar',
    likedPosts: 'Liked Posts',
    likedProjects: 'Liked Projects',
    likedEvents: 'Liked Events',
    comments: 'My Comments',
    savedPosts: 'Saved Posts'
  };

  // Helper component for Liked Projects (Simple List)
  const LikedProjectsList = ({ projects }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Projects You Liked</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-[#3C4044] dark:text-white">
                    <button onClick={() => onProjectClick(project)} className="hover:text-[#FD7B41] transition-colors text-left">
                      {project.title}
                    </button>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {project.createdBy?.fullName || "Unknown"}</p>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    {project.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">#{tag}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => onProjectClick(project)} className="text-[#FD7B41] border border-[#FD7B41] px-3 py-1 rounded-lg text-sm hover:bg-[#FD7B41] hover:text-white transition-colors">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">No liked projects found.</div>
        )}
      </div>
    </div>
  );

  // Helper component for Liked Events (Simple List)
  const LikedEventsList = ({ events }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Events You Liked</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {events?.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-[#3C4044] dark:text-white">
                    <Link to={`/event/${event._id}`} className="hover:text-[#FD7B41] transition-colors">{event.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(event.startTime).toLocaleDateString()} at {new Date(event.startTime).toLocaleTimeString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${event.type === 'virtual' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                    {event.type}
                  </span>
                </div>
                <Link to={`/event/${event._id}`} className="text-[#FD7B41] border border-[#FD7B41] px-3 py-1 rounded-lg text-sm hover:bg-[#FD7B41] hover:text-white transition-colors">
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">No liked events found.</div>
        )}
      </div>
    </div>
  );


  const renderSection = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsSection posts={data} />;
      case 'events':
        return <EventsSection events={data} />;
      case 'calendar':
        return <CalendarSection />;
      case 'likedPosts':
        return <LikedPostsSection posts={data} onPostClick={onPostClick} />;
      case 'likedProjects':
        return <LikedProjectsList projects={data} />;
      case 'likedEvents':
        return <LikedEventsList events={data} />;
      case 'comments':
        return <CommentsSection comments={data} />;
      case 'savedPosts':
        return <SavedPostsSection posts={data} />;
      default:
        return <PostsSection posts={data} />;
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#3C4044] dark:text-white mb-2">
            {sectionTitles[activeTab]}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view your {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Total Posts"
            value={`${allData?.posts?.totalCount || 0}`}
            icon="📝"
            color="bg-[#FD7B41]"
          />
          <StatCard
            title="Participated Events"
            value={`${allData?.registeredEvent?.totalCount || 0}`}
            icon="📅"
            color="bg-[#EDBF9B]"
          />
          <StatCard
            title="Likes Received"
            value={`${allData?.likesReceived || 0}`}
            icon="❤️"
            color="bg-[#FD7B41]"
          />
          <StatCard
            title="Saved Items"
            value={`${allData?.savedPosts?.totalCount || 0}`}
            icon="💾"
            color="bg-[#EDBF9B]"
          />
        </motion.div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300 hover:scale-105 transition-transform">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-[#3C4044] dark:text-white">{value}</p>
      </div>
      <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center shadow-sm`}>
        <span className="text-xl text-white">{icon}</span>
      </div>
    </div>
  </div>
);

export default MainContent;