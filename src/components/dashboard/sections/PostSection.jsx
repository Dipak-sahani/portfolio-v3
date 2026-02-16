// components/sections/PostsSection.jsx
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import ImagePreview from "../../ImagePrev/ImagePreview";
import { usePostStore } from "../../../store/post.store";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function PostsSection({ posts, refresh }) {
  const { deletePost } = usePostStore();

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        toast.success("Post deleted successfully");
        if (refresh) refresh(); // Refresh list
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post");
      }
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Recent Posts</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {posts?.map((post, id) => (
          <div
            key={id}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-[#3C4044] dark:text-white">
                <Link to={`/post/${post._id}`} className="hover:text-[#FD7B41] transition-colors">
                  {post?.title}
                </Link>
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {dayjs(post?.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

            {post?.media?.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
                <div className="relative mx-auto w-full max-w-170 bg-gray-100 dark:bg-gray-900 overflow-hidden aspect-video rounded-lg">
                  <ImagePreview
                    src={`${import.meta.env.VITE_IMG_CDN}/${post.media[0]}`}
                    alt="Post media"
                    className="absolute inset-0 w-full h-full object-contain"

                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2 hover:text-[#FD7B41]">
                  <span>❤️</span>
                  <span>{post?.likeCount || 0} likes</span>
                </div>
                <Link to={`/post/${post._id}`} className="flex items-center space-x-2 hover:text-[#FD7B41]">
                  <span>💬</span>
                  <span>{post?.commentCount || 0} comments</span>
                </Link>
              </div>
              <div className="flex space-x-2">
                <Link to={`/post/${post?._id}`} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  View
                </Link>
                <Link to={`/edit-post/${post?._id}`} className="px-4 py-2 bg-[#EDBF9B] dark:bg-[#FD7B41] text-[#3C4044] dark:text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm">
                  Edit Post
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
            {/* <hr className="my-2 border-gray-100 dark:border-gray-700"/> */}
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsSection;
