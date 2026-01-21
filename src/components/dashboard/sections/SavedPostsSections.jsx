// components/sections/SavedPostsSection.jsx
import React from 'react';

function SavedPostsSection({ posts }) {
  console.log(posts);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#3C4044]">Saved Posts</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-[#3C4044]">{post.title}</h3>
                <p className="text-gray-600 mt-1">By {post.author} • {post.date}</p>
              </div>
              <button className="text-[#FD7B41] hover:text-opacity-80">
                💾 Saved
              </button>
            </div>
            <p className="text-gray-600 mb-4">{post.postId.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2 text-gray-500">
                  <span>👁️</span>
                  <span>{post.views} views</span>
                </span>
                <span className="flex items-center space-x-2 text-gray-500">
                  <span>❤️</span>
                  <span>{post.likes} likes</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-[#EDBF9B] text-[#3C4044] rounded-lg font-medium hover:bg-opacity-90">
                  View Post
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50">
                  Unsave
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPostsSection;