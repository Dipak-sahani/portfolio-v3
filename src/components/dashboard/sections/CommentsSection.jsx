// components/sections/CommentsSection.jsx
import dayjs from 'dayjs';
import React from 'react';

function CommentsSection({ comments }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#3C4044]">Recent Comments</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {comments.map((comment) => (
          <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-[#3C4044]">{comment.postTitle}</h4>
                    <p className="text-sm text-gray-500">Commented on {dayjs(comment?.createdAt).format('DD/MM/YYYY MM:ss')}</p>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                    View Post
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{comment?.text}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-[#FD7B41]">
                    <span>👍</span>
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-[#FD7B41]">
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;