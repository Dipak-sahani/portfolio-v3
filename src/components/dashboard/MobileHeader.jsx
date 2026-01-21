// components/MobileHeader.jsx
import React from 'react';

const MobileHeader = ({ isSidebarOpen, setIsSidebarOpen, user, activeTab }) => {
  const sectionTitles = {
    posts: 'My Posts',
    events: 'My Events',
    likedPosts: 'Liked Posts',
    comments: 'My Comments',
    savedPosts: 'Saved Posts'
  };

  return (
    <div className="md:hidden bg-[#3C4044] text-white p-4 sticky top-0 z-30 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="menu-toggle p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>

        {/* Page Title */}
        <div className="text-center flex-1">
          <h1 className="font-semibold text-lg">{sectionTitles[activeTab]}</h1>
          <p className="text-xs text-gray-300 truncate max-w-[150px] mx-auto">
            {user.email}
          </p>
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#EDBF9B] flex items-center justify-center text-lg">
          {user.avatar}
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="mt-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {['posts', 'events', 'likedPosts', 'comments', 'savedPosts'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                const sectionTitlesMap = {
                  posts: '📝 Posts',
                  events: '📅 Events',
                  likedPosts: '❤️ Liked',
                  comments: '💬 Comments',
                  savedPosts: '💾 Saved'
                };
                // This would update active tab - you need to pass setActiveTab from parent
              }}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                  ? 'bg-[#FD7B41] text-white'
                  : 'bg-gray-700 text-gray-300'
                }`}
            >
              {tab === 'posts' && '📝 Posts'}
              {tab === 'events' && '📅 Events'}
              {tab === 'likedPosts' && '❤️ Liked'}
              {tab === 'comments' && '💬 Comments'}
              {tab === 'savedPosts' && '💾 Saved'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;