// components/Sidebar.jsx
import React from 'react';

function Sidebar({ activeTab, setActiveTab, user }) {
  const menuItems = [
    { id: 'posts', label: 'My Posts', icon: '📝' },
    { id: 'events', label: 'My Events', icon: '📅' },
    { id: 'likedPosts', label: 'Liked Posts', icon: '❤️' },
    { id: 'comments', label: 'My Comments', icon: '💬' },
    { id: 'savedPosts', label: 'Saved Posts', icon: '💾' },
  ];

  return (
    <div className="w-64 bg-[#3C4044] text-white flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#EDBF9B] flex items-center justify-center text-xl">
            {user.avatar}
          </div>
          <div>
            <h2 className="font-semibold">{user.username}</h2>
            <p className="text-sm text-gray-300">{user.email}</p>
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
                    ? 'bg-[#FD7B41] text-white'
                    : 'text-gray-300 hover:bg-gray-700'
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
      <div className="p-4 border-t border-gray-600">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#EDBF9B] text-[#3C4044] rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          <span>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;