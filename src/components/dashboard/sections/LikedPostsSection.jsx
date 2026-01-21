// components/sections/LikedPostsSection.jsx
import React from 'react';

function LikedPostsSection({ posts }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#3C4044]">Posts You Liked</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#EDBF9B] flex items-center justify-center">
                {post.authorAvatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-[#3C4044]">{post.author}</h4>
                    <p className="text-sm text-gray-500">Posted on {post.date}</p>
                  </div>
                  <button className="text-[#FD7B41] hover:text-opacity-80">
                    ❤️ Liked
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedPostsSection;