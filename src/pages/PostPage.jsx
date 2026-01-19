// pages/PostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/post.store';
// import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/auth.store';
// import { useWorkspaceStore } from '../store/useWorkspaceStore';
import PostCard from '../components/post/PostCard';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  // Zustand stores
  const { 
    currentPost, 
    loading,
    error: postError, 
    fetchPostById,
    likePost,
    sharePost,
    deletePost,
    fetchPosts,
    posts,

    
  } = usePostStore();
  
  const { user } = useAuthStore();
//   const { workspaces } = useWorkspaceStore();
  
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
// console.log(posts);

  // Fetch post data
  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }

    fetchPosts()
  }, [postId, fetchPostById]);

  // Fetch related posts (simulated)
  useEffect(() => {
    if (currentPost?.authorId) {
      // In a real app, you would fetch posts by same author
      const mockRelatedPosts = [
        {
          _id: '1',
          authorId: currentPost?.authorId,
          author: currentPost?.author,
          content: 'Another interesting post by the same author',
          media: [],
          likeCount: 15,
          shareCount: 3,
          commentCount: 5,
          workspaceId: null,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          isDeleted: false
        },
        {
          _id: '2',
          authorId: currentPost?.authorId,
          author: currentPost?.author,
          content: 'Check out my previous work!',
          media: ['https://example.com/image1.jpg'],
          likeCount: 42,
          shareCount: 12,
          commentCount: 8,
          workspaceId: currentPost?.workspaceId,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          isDeleted: false
        }
      ];
      setRelatedPosts(mockRelatedPosts);
    }
  }, [currentPost]);

  const handleLike = async () => {
    if (isLiking || !postId) return;
    setIsLiking(true);
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Error liking post:', error);
      alert('Failed to like post. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    if (isSharing || !postId) return;
    setIsSharing(true);
    try {
      await sharePost(postId);
      // You could add social sharing functionality here
      if (navigator.share) {
        await navigator.share({
          title: currentPost?.content?.substring(0, 50) || 'Check out this post',
          text: currentPost?.content || '',
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing post:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleDelete = async () => {
    if (!postId) return;
    try {
      await deletePost(postId);
      alert('Post deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getWorkspaceName = () => {
    if (!currentPost?.workspaceId) return 'Personal';
    const workspace = workspaces?.find(w => w._id === currentPost?.workspaceId);
    return workspace?.name || 'Unknown Workspace';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#DDDCDB] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <i className="fas fa-spinner fa-spin text-[#FD7B41] text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-[#3C4044]">Loading post...</h2>
          <p className="text-[#3C4044]/60 mt-2">Please wait while we fetch the post details</p>
        </div>
      </div>
    );
  }

  if (postError || !posts) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#DDDCDB] to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#3C4044] mb-3">Post Not Found</h2>
          <p className="text-[#3C4044]/60 mb-6">
            {postError || 'The post you are looking for does not exist or has been deleted.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-[#DDDCDB] text-[#3C4044] rounded-lg hover:bg-[#DDDCDB]/80 transition-colors font-medium"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              <i className="fas fa-home mr-2"></i>
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPost?.isDeleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#DDDCDB] to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#3C4044] to-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-trash text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#3C4044] mb-3">Post Deleted</h2>
          <p className="text-[#3C4044]/60 mb-6">
            This post has been deleted by the author.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <i className="fas fa-home mr-2"></i>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DDDCDB] to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBack}
              className="flex items-center text-[#3C4044]/60 hover:text-[#FD7B41] transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-[#EDBF9B] text-[#3C4044] rounded-lg hover:bg-[#EDBF9B]/80 transition-colors font-medium flex items-center"
              >
                <i className="fas fa-edit mr-2"></i>
                Edit
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Delete
                </button>
                
                {/* Delete Confirmation */}
                {showDeleteConfirm && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#EDBF9B] p-4 z-10">
                    <p className="text-[#3C4044] mb-3">Are you sure you want to delete this post?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDelete}
                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 px-3 py-2 bg-[#DDDCDB] text-[#3C4044] rounded-lg hover:bg-[#DDDCDB]/80 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Post Details */}
          <div className="lg:col-span-2">
            {/* Post Card */}
            <div className="mb-8">
              <PostCard post={posts} />
            </div>

            {/* Detailed Post Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#3C4044] mb-6">Post Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Author Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#3C4044] flex items-center">
                    <i className="fas fa-user-circle mr-2 text-[#FD7B41]"></i>
                    Author Information
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] rounded-full flex items-center justify-center text-white">
                      {currentPost?.author?.avatar ? (
                        <img 
                          src={currentPost?.author.avatar} 
                          alt={currentPost?.author.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-user"></i>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#3C4044]">{currentPost?.author?.name || 'Anonymous'}</h4>
                      <p className="text-sm text-[#3C4044]/60">{currentPost?.author?.email || 'No email provided'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#3C4044]/60">Posts by author:</span>
                      <span className="font-medium text-[#3C4044]">{relatedPosts.length + 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#3C4044]/60">Member since:</span>
                      <span className="font-medium text-[#3C4044]">
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Metadata */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#3C4044] flex items-center">
                    <i className="fas fa-info-circle mr-2 text-[#FD7B41]"></i>
                    Post Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#3C4044]/60">Created:</span>
                      <span className="font-medium text-[#3C4044]">{formatDate(currentPost?.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#3C4044]/60">Last Updated:</span>
                      <span className="font-medium text-[#3C4044]">{formatDate(currentPost?.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#3C4044]/60">Workspace:</span>
                      <span className="font-medium text-[#3C4044]">{getWorkspaceName()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#3C4044]/60">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        currentPost?.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {currentPost?.isDeleted ? 'Deleted' : 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Gallery Full View */}
            {currentPost?.media && currentPost?.media.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-[#3C4044] mb-6">Media Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentPost?.media.map((mediaUrl, index) => (
                    <div key={index} className="group relative rounded-lg overflow-hidden bg-gradient-to-br from-[#EDBF9B]/20 to-[#FD7B41]/10">
                      <div className="aspect-square flex items-center justify-center">
                        {mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                          <img 
                            src={mediaUrl} 
                            alt={`Post media ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : mediaUrl.match(/\.(mp4|webm|ogg)$/) ? (
                          <video 
                            src={mediaUrl}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <div className="text-center p-4">
                            <i className="fas fa-file text-[#FD7B41] text-4xl mb-3"></i>
                            <p className="text-sm text-[#3C4044]">Document</p>
                            <p className="text-xs text-[#3C4044]/60 truncate">
                              {mediaUrl.split('/').pop()}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button 
                          onClick={() => window.open(mediaUrl, '_blank')}
                          className="px-4 py-2 bg-white/90 text-[#3C4044] rounded-lg hover:bg-white transition-colors"
                        >
                          <i className="fas fa-expand mr-2"></i>
                          View Full
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section (Placeholder) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#3C4044] mb-6">Comments ({currentPost?.commentCount})</h2>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] rounded-full"></div>
                  <div className="flex-1">
                    <textarea 
                      placeholder="Add a comment..."
                      className="w-full px-4 py-3 border border-[#EDBF9B] rounded-lg focus:ring-2 focus:ring-[#FD7B41] focus:border-transparent resize-none"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Sample Comments */}
              <div className="space-y-4">
                {[1, 2].map((comment) => (
                  <div key={comment} className="border-b border-[#EDBF9B]/20 pb-4 last:border-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#DDDCDB] to-[#3C4044] rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-[#3C4044]">Commenter {comment}</h4>
                          <span className="text-xs text-[#3C4044]/60">2 hours ago</span>
                        </div>
                        <p className="text-[#3C4044]/80">
                          {comment === 1 
                            ? 'Great post! Really enjoyed reading this.' 
                            : 'Thanks for sharing this valuable information.'}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-sm text-[#3C4044]/60 hover:text-[#FD7B41]">
                            <i className="fas fa-heart mr-1"></i>
                            2
                          </button>
                          <button className="text-sm text-[#3C4044]/60 hover:text-[#FD7B41]">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Post Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#3C4044] mb-4">Post Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#FD7B41]/5 to-[#EDBF9B]/5 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#FD7B41] rounded-full flex items-center justify-center text-white mr-3">
                      <i className="fas fa-heart"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#3C4044]">Likes</p>
                      <p className="text-2xl font-bold text-[#FD7B41]">{currentPost?.likeCount}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isLiking 
                        ? 'bg-[#FD7B41]/20 text-[#FD7B41]' 
                        : 'bg-[#FD7B41] text-white hover:bg-[#FD7B41]/90'
                    }`}
                  >
                    {isLiking ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Liking...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-heart mr-2"></i>
                        Like
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#EDBF9B]/5 to-[#FD7B41]/5 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#EDBF9B] rounded-full flex items-center justify-center text-[#3C4044] mr-3">
                      <i className="fas fa-share"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#3C4044]">Shares</p>
                      <p className="text-2xl font-bold text-[#EDBF9B]">{currentPost?.shareCount}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isSharing 
                        ? 'bg-[#EDBF9B]/20 text-[#3C4044]' 
                        : 'bg-[#EDBF9B] text-[#3C4044] hover:bg-[#EDBF9B]/80'
                    }`}
                  >
                    {isSharing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Sharing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-share mr-2"></i>
                        Share
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#3C4044]/5 to-[#DDDCDB]/5 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#3C4044] rounded-full flex items-center justify-center text-white mr-3">
                      <i className="fas fa-comment"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#3C4044]">Comments</p>
                      <p className="text-2xl font-bold text-[#3C4044]">{currentPost?.commentCount}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#3C4044] text-white rounded-lg hover:bg-[#3C4044]/90 transition-colors">
                    <i className="fas fa-comment mr-2"></i>
                    Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#3C4044] mb-4">Related Posts</h3>
              
              <div className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((post) => (
                    <div 
                      key={post._id} 
                      className="p-3 border border-[#EDBF9B]/30 rounded-lg hover:border-[#FD7B41] transition-colors cursor-pointer"
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      <h4 className="font-medium text-[#3C4044] line-clamp-2 mb-2">
                        {post.content || 'Media Post'}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-[#3C4044]/60">
                        <div className="flex items-center">
                          <i className="fas fa-heart mr-1"></i>
                          <span>{post.likeCount}</span>
                        </div>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-[#3C4044]/40">
                    <i className="fas fa-inbox text-2xl mb-2"></i>
                    <p className="text-sm">No related posts found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#3C4044] mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="w-full flex items-center justify-between p-3 border border-[#EDBF9B] rounded-lg hover:bg-[#EDBF9B]/10 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#FD7B41]/20 rounded-full flex items-center justify-center text-[#FD7B41] mr-3">
                      <i className="fas fa-link"></i>
                    </div>
                    <span className="text-[#3C4044]">Copy Link</span>
                  </div>
                  <i className="fas fa-chevron-right text-[#3C4044]/40"></i>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-[#EDBF9B] rounded-lg hover:bg-[#EDBF9B]/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#EDBF9B]/20 rounded-full flex items-center justify-center text-[#3C4044] mr-3">
                      <i className="fas fa-flag"></i>
                    </div>
                    <span className="text-[#3C4044]">Report Post</span>
                  </div>
                  <i className="fas fa-chevron-right text-[#3C4044]/40"></i>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-[#EDBF9B] rounded-lg hover:bg-[#EDBF9B]/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#3C4044]/20 rounded-full flex items-center justify-center text-[#3C4044] mr-3">
                      <i className="fas fa-bookmark"></i>
                    </div>
                    <span className="text-[#3C4044]">Save Post</span>
                  </div>
                  <i className="fas fa-chevron-right text-[#3C4044]/40"></i>
                </button>
                
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center justify-between p-3 border border-[#FD7B41] bg-[#FD7B41]/5 rounded-lg hover:bg-[#FD7B41]/10 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#FD7B41] rounded-full flex items-center justify-center text-white mr-3">
                      <i className="fas fa-edit"></i>
                    </div>
                    <span className="text-[#FD7B41] font-medium">Edit Post</span>
                  </div>
                  <i className="fas fa-chevron-right text-[#FD7B41]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;