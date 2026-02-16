import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { savePost } from '../../../services/post.service';
import { toast } from 'react-toastify';

function SavedPostsSection({ posts }) {

  const handleUnsave = async (postId) => {
    try {
      await savePost(postId);
      toast.success("Post removed from saved");
      // Ideally trigger a refresh here. simpler to just reload for now or trust the user navigates away.
      // Better: use a local state to filter it out if we want immediate feedback without reload
      window.location.reload();
    } catch (error) {
      toast.error("Failed to unsave post");
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Saved Posts</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {posts?.map((post) => (
          <div key={post._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-[#3C4044] dark:text-white">{post.postId?.title || "Untitled"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">By {post.postId?.authorId?.fullName || "Unknown"} • {dayjs(post.createdAt).format("DD MMM YYYY")}</p>
              </div>
              <button
                onClick={() => handleUnsave(post.postId._id)}
                className="text-[#FD7B41] hover:text-opacity-80 font-medium text-sm flex items-center gap-1"
              >
                <span>💾</span> Saved (Remove)
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.postId?.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                {/* <span className="flex items-center space-x-2">
                  <span>👁️</span>
                  <span>{post.views} views</span>
                </span> */}
                <span className="flex items-center space-x-2">
                  <span>❤️</span>
                  <span>{post.postId?.likeCount || 0} likes</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span>💬</span>
                  <span>{post.postId?.commentCount || 0} comments</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Link to={`/post/${post.postId?._id}`} className="px-4 py-2 bg-[#EDBF9B] dark:bg-[#FD7B41] text-[#3C4044] dark:text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow">
                  View Post
                </Link>
                {/* <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Unsave
                </button> */}
              </div>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No saved posts found.
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPostsSection;