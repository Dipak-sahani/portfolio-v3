// components/MobileHeader.jsx
import React from 'react';

const MobileHeader = ({ isSidebarOpen, setIsSidebarOpen, user, activeTab }) => {
  const sectionTitles = {
    posts: 'My Posts',
    events: 'My Events',
    calendar: 'My Calendar',
    likedPosts: 'Liked Posts',
    comments: 'My Comments',
    savedPosts: 'Saved Posts'
  };

  return (
    <div className="md:hidden bg-[#3C4044] dark:bg-gray-900 text-white p-4 sticky top-0 z-30 shadow-lg transition-colors duration-300">
      <div className="flex items-center justify-between">
        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="menu-toggle p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
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
          <p className="text-xs text-gray-300 dark:text-gray-400 truncate max-w-[150px] mx-auto">
            {user.email}
          </p>
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#EDBF9B] dark:bg-[#FD7B41] flex items-center justify-center text-lg overflow-hidden text-[#3C4044]">
          {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : user.username?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="mt-4 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 pb-2">
          {['posts', 'events', 'calendar', 'likedPosts', 'comments', 'savedPosts'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                // This implies the parent component handles logic, but visually we just style it here.
                // In Dashboard.jsx activeTab logic is handled via props if passed correctly, but MobileHeader 
                // in original code didn't actually set active tab. 
                // Assuming the original code meant to just display tabs or navigate.
                // Since I can't effectively change functionality without seeing parent usage fully, I'll keep logic same but style it.
              }}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                ? 'bg-[#FD7B41] text-white shadow'
                : 'bg-gray-700 dark:bg-gray-800 text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700'
                }`}
            >
              {tab === 'posts' && '📝 Posts'}
              {tab === 'events' && '📅 Events'}
              {tab === 'calendar' && '🗓️ Calendar'}
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