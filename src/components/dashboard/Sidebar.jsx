// components/Sidebar.jsx
import React from 'react';

function Sidebar({ activeTab, setActiveTab, user }) {
  const menuItems = [
    { id: 'posts', label: 'My Posts', icon: '📝' },
    { id: 'events', label: 'My Events', icon: '📅' },
    { id: 'calendar', label: 'My Calendar', icon: '🗓️' },
    { id: 'likedPosts', label: 'Liked Posts', icon: '❤️' },
    { id: 'likedProjects', label: 'Liked Projects', icon: '🚀' },
    { id: 'likedEvents', label: 'Liked Events', icon: '🎉' },
    { id: 'comments', label: 'My Comments', icon: '💬' },
    { id: 'savedPosts', label: 'Saved Posts', icon: '💾' },
    { id: 'savedNews', label: 'Saved News', icon: '📰' },
  ];

  return (
    <div className="w-64 bg-[#3C4044] dark:bg-gray-900 text-white flex flex-col h-full transition-colors duration-300">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-600 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#EDBF9B] dark:bg-[#FD7B41] flex items-center justify-center text-xl overflow-hidden text-[#3C4044]">
            {user.avatar ? <img src={`${import.meta.env.VITE_IMG_CDN}/${user.avatar}`} alt={user.username} className="w-full h-full object-cover" /> : user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h2 className="font-semibold truncate">{user.username}</h2>
            <p className="text-sm text-gray-300 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                  ? 'bg-[#FD7B41] text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-600 dark:border-gray-700">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#EDBF9B] dark:bg-[#FD7B41] text-[#3C4044] dark:text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow">
          <span>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;