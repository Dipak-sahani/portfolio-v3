// components/sections/CommentsSection.jsx
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

function CommentsSection({ comments }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Recent Comments</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {comments?.map((comment) => (
          <div key={comment._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3C4044] dark:text-white">{comment?.postId?.title || "Untitled Post"}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Commented on {dayjs(comment?.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                  </div>
                  <Link to={`/post/${comment?.postId?._id}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    View Post
                  </Link>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">{comment?.text}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  {/* <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-[#FD7B41]">
                    <span>👍</span>
                    <span>{comment.likes || 0}</span>
                  </button> */}
                  {/* Edit/Delete functionality can be added here if backend supports it */}
                  {/* <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-[#FD7B41]">
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500">
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
        {(!comments || comments.length === 0) && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No comments found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;