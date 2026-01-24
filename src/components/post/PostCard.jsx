// components/PostCard.jsx
import React, { useState } from 'react';
import { usePostStore } from '../../store/post.store';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPaperPlane, faPlane } from '@fortawesome/free-solid-svg-icons';
import { postComment } from '../../services/comment.service';
import CommentOverlay from '../comment/CommentOverlay';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import FollowButton from '../../button/FollowBtn';

const PostCard = ({ postId }) => {
  const post=usePostStore(state => 
    state.posts.find(p => p?._id === postId)
  );

  // console.log(post);
  
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const { likePost, sharePost, unLikePost, savePost } = usePostStore();
  
  const contentLimit = 150;
  const showSeeMore = post?.content?.length > contentLimit;
  const displayContent = expanded 
    ? post?.content 
    : post?.content?.substring(0, contentLimit) + (showSeeMore ? '...' : '');


    // like and dislike handling

  const handleLike = async () => {
    if (liked || post?.isLikedByMe){
      try {
        console.log("1");
        
        const res=await unLikePost(post?._id)
        setLiked(false)
        
      } catch (error) {
        console.error('Error unliking post:', error);
      }

    }else{
      
    try {
      await likePost(post?._id);
      setLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
    }
  };


  // share handling

  const handleShare = async () => {
    try {
      await sharePost(post?._id);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };


  // save handling

  const handleSave= async()=>{
    try {

      await savePost(post?._id);
      // setBookmarked(!bookmarked)
    } catch (error) {
      console.log(error);
      
    }
  }





  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
// console.log(post);



//// comment section 
const [comment, setComment] = useState("");
  const [commantLoading, setCommantLoading] = useState(false);

 const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      setCommantLoading(true);

      const res = await postComment({
        postId:post?._id,
        text:comment
      })

      if (res.status==201) {
        setComment("");
        toast.success("comment added !")
      }
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setCommantLoading(false);
    }
  };

/// comment


const [open, setOpen] = useState(false);



  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <Link to={`/profile/${post?.authorId?._id}`} className="flex items-center space-x-3">
            {/* Brand/Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post?.authorId?.fullName?.charAt(0) || 'B'}
              </div>
              
            </div>
            
            {/* Brand Info */}
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-900 text-base">{post?.authorId?.fullName || 'Your Brand'}</h3>
                
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

           <FollowButton
              authorId={post?.authorId?._id}
              isFollowing={post?.authorId?.isFollowing}
            />
          
          {/* Menu Button */}
          <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
        
        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-800 text-sm leading-relaxed">
            {displayContent}
            {showSeeMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:text-blue-800 font-medium ml-1"
              >
                {expanded ? ' See less' : ' See more'}
              </button>
            )}
          </p>
          
          {post?.translationAvailable && (
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
              See translation
            </button>
          )}
        </div>
        
        {/* Time and Metrics */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span> { dayjs(post?.createdAt).format("DD MMM YYYY • hh:mm A")
 } </span>
            
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="ml-1">{formatNumber(post?.commentCount || 0)}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="ml-1">{formatNumber(post?.shareCount || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      
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


      
      {/* Action Bar */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              liked || post?.isLikedByMe
 
                ? 'bg-red-50 text-red-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg 
              className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} 
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
            <span className={`font-medium ${liked ? 'text-red-600' : 'text-gray-700'}`}>
              {liked ? 'Liked' : 'Like'}
            </span>
            <span className={`text-xs ${liked ? 'text-red-500' : 'text-gray-500'}`}>
              {formatNumber(post?.likeCount || 0)}
            </span>
          </button>
          
          {/* Comment Button */}
          <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <FontAwesomeIcon icon={faComment} />
        <span className="font-medium text-gray-700">Comment</span>

        <span> {post?.commentCount} </span>
      </button>

      {open && (
        <CommentOverlay postId={post?._id} onClose={() => setOpen(false)} />
      )}
    </>
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="font-medium text-gray-700">Share</span>
          </button>
          
          {/* Bookmark Button */}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg 
              className={`w-5 h-5 ${post?.isSavedByMe ? 'fill-current text-blue-600' : ''}`} 
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
            <span className={`font-medium ${post?.isSavedByMe ? 'text-blue-600' : 'text-gray-700'}`}>
              Save
            </span>
          </button>
        </div>
        
        {/* Comments Preview */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          
          
          {/* Add Comment Input */}
           <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <button
          onClick={handleSubmitComment}
          disabled={commantLoading}
          className="text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faPaperPlane}  className='pr-10'/>
        </button>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;