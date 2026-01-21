// components/sections/PostsSection.jsx
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

function PostsSection({ posts }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#3C4044]">Recent Posts</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {posts?.map((post,id ) => (
          <div
            key={id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-[#3C4044]">
                {post?.title}
              </h3>
              <span className="text-sm text-gray-500">
                {dayjs(post?.createdAt).format("DD/MM/YYYY MM:ss")}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{post.content}</p>

            {post?.media?.length > 0 && (
              <div className="border-t border-gray-100">
                <div className="relative mx-auto w-full max-w-170 bg-gray-100 overflow-hidden aspect-video">
                  <img
                    src={post.media[0]}
                    alt="Post media"
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-[#FD7B41]">
                  <span>❤️</span>
                  <span>{post?.likeCount || 0} likes</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-[#FD7B41]">
                  <span>💬</span>
                  <span>{post?.comments} comments</span>
                </button>
              </div>
              <Link to={ `/edit-post/${post?._id}`} className="px-4 py-2 bg-[#EDBF9B] text-[#3C4044] rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Edit Post
              </Link>
            </div>
            <hr className="my-2 "/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsSection;
