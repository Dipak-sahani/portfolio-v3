// components/sections/LikedPostsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function LikedPostsSection({ posts, onPostClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Posts You Liked</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {posts?.map((post) => (
          <div key={post._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#EDBF9B] dark:bg-[#FD7B41] flex items-center justify-center overflow-hidden">
                {post?.authorId?.avatar ? (
                  <img src={post.authorId.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#3C4044] font-bold">{post?.authorId?.fullName?.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-[#3C4044] dark:text-white">{post?.authorId?.fullName || "Unknown Author"}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Posted on {dayjs(post?.createdAt).format("DD MMM YYYY")}</p>
                  </div>
                  <button className="text-[#FD7B41] hover:text-opacity-80 font-medium text-sm">
                    ❤️ Liked
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#3C4044] dark:text-white">
                  <button onClick={() => onPostClick(post._id)} className="hover:text-[#FD7B41] transition-colors text-left">
                    {post.title}
                  </button>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{post.content}</p>
                <button onClick={() => onPostClick(post._id)} className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                  View Post
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No liked posts found.
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedPostsSection;