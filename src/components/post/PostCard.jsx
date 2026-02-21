import React, { useState } from "react";
import { usePostStore } from "../../store/post.store";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPaperPlane,
  faEllipsisV,
  faFlag,
  faBan,
  faShareAlt
} from "@fortawesome/free-solid-svg-icons";
import { postComment } from "../../services/comment.service";
import CommentOverlay from "../comment/CommentOverlay";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FollowButton from "../../button/FollowBtn";
import { useAuthStore } from "../../store/auth.store";
import ImagePreview from "../ImagePrev/ImagePreview";
import ShareModal from "../common/ShareModal";
import ReportModal from "../common/ReportModal";
import { blockUser } from "../../services/user.service";

const PostCard = ({ postId, post: propPost }) => {
  const storePost = usePostStore((state) =>
    state.posts.find((p) => p?._id === postId),
  );
  const post = propPost || storePost;

  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(post?.isLikedByMe || false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { likePost, sharePost, unLikePost, savePost } = usePostStore();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const contentLimit = 150;
  const showSeeMore = post?.content?.length > contentLimit;
  const displayContent = expanded
    ? post?.content
    : post?.content?.substring(0, contentLimit) + (showSeeMore ? "..." : "");

  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      if (liked || post?.isLikedByMe) {
        await unLikePost(post?._id);
        setLiked(false);
      } else {
        await likePost(post?._id);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    setIsShareModalOpen(true);
    try {
      await sharePost(post?._id); // Increment share count
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleSave = async () => {
    try {
      await savePost(post?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async () => {
    if (window.confirm(`Are you sure you want to block ${post?.authorId?.username}?`)) {
      try {
        await blockUser(post?.authorId?._id);
        // Optionally remove post from view or refresh feed
        toast.success("User blocked");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toString() || "0";
  };

  const [comment, setComment] = useState("");
  const [commantLoading, setCommantLoading] = useState(false);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      setCommantLoading(true);

      const res = await postComment({
        targetType: "post",
        targetId: post?._id,
        text: comment,
      });

      if (res.status == 201) {
        setComment("");
        toast.success("comment added !");
      }
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setCommantLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 rounded-xl relative">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3 relative">
          <Link
            to={`/profile/${post?.authorId?._id}`}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                {post?.authorId?.avatar ? (
                  <ImagePreview src={`${import.meta.env.VITE_IMG_CDN}/${post.authorId.avatar}`} alt={post.authorId.username} className="w-full h-full object-cover" />
                ) : (
                  post?.authorId?.fullName?.charAt(0) || "B"
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                  {post?.authorId?.fullName || "User"}
                </h3>
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-gray-600">
                  {formatNumber(post?.authorId?.followerCount || 0)} followers
                </span>
                {post?.promoted && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">
                    Promoted
                  </span>
                )}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {isAuthenticated && post?.authorId?._id !== user?._id && (
              <FollowButton
                authorId={post?.authorId?._id}
                isFollowing={post?.authorId?.isFollowing}
              />
            )}

            {/* Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>

              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {post?.authorId?._id !== user?._id && (
                    <>
                      <button
                        onClick={() => {
                          setIsReportModalOpen(true);
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faFlag} className="w-4" /> Report Post
                      </button>
                      <button
                        onClick={() => {
                          handleBlock();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700"
                      >
                        <FontAwesomeIcon icon={faBan} className="w-4" /> Block User
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      handleShare();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faShareAlt} className="w-4" /> Share Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line text-start">
            {displayContent}
            {showSeeMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium ml-1"
              >
                {expanded ? " See less" : " See more"}
              </button>
            )}
          </p>

          {post?.translationAvailable && (
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium mt-2">
              See translation
            </button>
          )}
        </div>

        {/* Time and Metrics */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>
              {dayjs(post?.createdAt).format("DD MMM YYYY • hh:mm A")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1">
                {formatNumber(post?.commentCount || 0)}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-green-600 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="ml-1">
                {formatNumber(post?.shareCount || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {post?.media?.length > 0 && (
        <div className="border-t border-gray-100 dark:border-gray-700">
          <div className="relative mx-auto w-full max-w-170 bg-gray-100 dark:bg-gray-900 overflow-hidden aspect-video rounded-lg">
            <ImagePreview
              src={`${import.meta.env.VITE_IMG_CDN}/${post.media[0]}`}
              alt="Post media"
              className="absolute inset-0 w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isLiking ? "opacity-50 cursor-not-allowed" : ""
              } ${liked || post?.isLikedByMe
                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            <svg
              className={`w-5 h-5 ${liked ? "fill-current" : ""}`}
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={liked ? "0" : "2"}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span
              className={`font-medium ${liked ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300"}`}
            >
              {liked ? "Liked" : "Like"}
            </span>
            <span
              className={`text-xs ${liked ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}
            >
              {formatNumber(post?.likeCount || 0)}
            </span>
          </button>

          {/* Comment Button */}
          <>
            {isAuthenticated && (
              <button
                onClick={() => setOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faComment} />
                <span className="font-medium text-gray-700 dark:text-gray-300">Comment</span>

                <span> {post?.commentCount} </span>
              </button>
            )}

            {open && (
              <CommentOverlay

                targetType="post"
                Id={post?._id}
                onClose={() => setOpen(false)}
              />
            )}
          </>
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon={faShareAlt} className="text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Share</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${post?.isSavedByMe ? "fill-current text-blue-600 dark:text-blue-400" : ""}`}
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={bookmarked ? "0" : "2"}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span
              className={`font-medium ${post?.isSavedByMe ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
            >
              Save
            </span>
          </button>
        </div>

        {/* Comments Preview */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Add Comment Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <button
                onClick={handleSubmitComment}
                disabled={commantLoading}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="pr-10" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`Check out this post by ${post?.authorId?.username}`}
        url={`${window.location.origin}/post/${post?._id}`}
        content={post?.content}
      />

      {post?.authorId && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetId={post._id}
          targetType="Post"
        />
      )}
    </div>
  );
};

export default PostCard;
