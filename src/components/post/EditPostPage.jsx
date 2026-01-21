// pages/EditPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostStore } from '../../store/post.store';
// import { useWorkspaceStore } from '../store/useWorkspaceStore';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  // Use Zustand stores
  const { 
    currentPost, 
    loading: postLoading, 
    fetchPostById, 
    updatePost, 
    deletePost 
  } = usePostStore();
  
  // const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  
  const [formData, setFormData] = useState({
    content: '',
    media: [],
    workspaceId: '',
    mediaInput: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }
    // fetchWorkspaces();
  }, [postId, fetchPostById]);

  useEffect(() => {
    if (currentPost) {
      setFormData({
        content: currentPost.content || '',
        media: currentPost.media || [],
        workspaceId: currentPost.workspaceId || '',
        mediaInput: ''
      });
    }
  }, [currentPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim() && formData.media.length === 0) {
      alert('Post must have content or media');
      return;
    }

    setIsSubmitting(true);

    const updateData = {
      content: formData.content,
      media: formData.media,
      workspaceId: formData.workspaceId || undefined
    };

    try {
      await updatePost(postId, updateData);
      alert('Post updated successfully!');
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Error updating post:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost(postId);
        alert('Post deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleAddMedia = () => {
    if (formData.mediaInput.trim()) {
      setFormData(prev => ({
        ...prev,
        media: [...prev.media, prev.mediaInput],
        mediaInput: ''
      }));
    }
  };

  const handleRemoveMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-[#DDDCDB] flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-[#FD7B41] text-4xl mb-4"></i>
          <p className="text-[#3C4044]">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-[#DDDCDB] flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
          <p className="text-[#3C4044]">Post not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-[#FD7B41] text-white rounded-lg hover:bg-[#FD7B41]/90"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#DDDCDB] to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/posts/${postId}`)}
            className="flex items-center text-[#3C4044]/60 hover:text-[#FD7B41] transition-colors mb-4"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Post
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3C4044]">
                Edit Post
              </h1>
              <p className="text-[#3C4044]/80 mt-2">
                Last edited: {new Date(currentPost.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={handleDeletePost}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <i className="fas fa-trash mr-2"></i>
              Delete Post
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                {/* Content */}
                <div className="mb-8">
                  <label htmlFor="content" className="block text-sm font-medium text-[#3C4044] mb-3">
                    Edit your post content
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    maxLength={5000}
                    rows={8}
                    className="w-full px-4 py-3 border border-[#EDBF9B] rounded-lg focus:ring-2 focus:ring-[#FD7B41] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Update your post content..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-[#3C4044]/60">
                      {formData.content.length}/5000 characters
                    </div>
                    <div className="text-sm text-[#3C4044]/60">
                      {Math.ceil(formData.content.length / 5)} seconds read
                    </div>
                  </div>
                </div>

                {/* Media Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-[#3C4044]">
                      Media Attachments ({formData.media.length})
                    </label>
                    <div className="text-sm text-[#3C4044]/60">
                      <i className="fas fa-image mr-1"></i>
                      {formData.media.length} media files
                    </div>
                  </div>
                  
                  {/* Media URL Input */}
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.mediaInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, mediaInput: e.target.value }))}
                        placeholder="Add new media URL..."
                        className="flex-1 px-4 py-3 border border-[#EDBF9B] rounded-lg focus:ring-2 focus:ring-[#FD7B41] focus:border-transparent outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAddMedia}
                        disabled={!formData.mediaInput.trim()}
                        className="px-6 py-3 bg-[#EDBF9B] text-[#3C4044] rounded-lg hover:bg-[#EDBF9B]/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Add
                      </button>
                    </div>
                  </div>
                  
                  {/* Media List */}
                  {formData.media.map((url, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                   gap-3 bg-linear-to-br from-[#EDBF9B]/10 to-[#FD7B41]/5
                   p-3 sm:p-4 rounded-lg w-full"
      >
        {/* Left section */}
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0
                          bg-linear-to-br from-[#FD7B41] to-[#EDBF9B]
                          rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-link text-sm sm:text-base"></i>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-[#3C4044] truncate">
              {new URL(url).pathname.split('/').pop() || url}
            </p>
            <p className="text-xs text-[#3C4044]/60 truncate max-w-full">
              {url}
            </p>
          </div>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => handleRemoveMedia(index)}
          className="self-end sm:self-auto text-[#3C4044]/40
                     hover:text-red-500 transition-colors
                     p-1"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      </div>
    ))}
                </div>

                {/* Workspace Selection */}
                <div className="mb-10">
                  <label className="block text-sm font-medium text-[#3C4044] mb-3">
                    Update Workspace
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, workspaceId: '' }))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        !formData.workspaceId
                          ? 'border-[#FD7B41] bg-linear-to-r from-[#FD7B41]/10 to-[#EDBF9B]/10'
                          : 'border-[#EDBF9B] hover:border-[#FD7B41]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-linear-to-r from-[#DDDCDB] to-[#3C4044] rounded-lg flex items-center justify-center text-white">
                          <i className="fas fa-user"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#3C4044]">Personal Space</h4>
                          <p className="text-sm text-[#3C4044]/60">Post to your personal profile</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* {workspaces.map(workspace => (
                      <div
                        key={workspace._id}
                        onClick={() => setFormData(prev => ({ ...prev, workspaceId: workspace._id }))}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.workspaceId === workspace._id
                            ? 'border-[#FD7B41] bg-linear-to-r from-[#FD7B41]/10 to-[#EDBF9B]/10'
                            : 'border-[#EDBF9B] hover:border-[#FD7B41]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-linear-to-r from-[#FD7B41] to-[#EDBF9B] rounded-lg flex items-center justify-center text-white">
                            <i className="fas fa-users"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#3C4044]">{workspace.name}</h4>
                            <p className="text-sm text-[#3C4044]/60">
                              {workspace.memberCount || 0} members
                            </p>
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-[#EDBF9B]/30">
                  <button
                    type="button"
                    onClick={() => navigate(`/posts/${postId}`)}
                    className="px-6 py-3 bg-[#DDDCDB] text-[#3C4044] rounded-lg hover:bg-[#DDDCDB]/80 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentPost) {
                          setFormData({
                            content: currentPost.content || '',
                            media: currentPost.media || [],
                            workspaceId: currentPost.workspaceId || '',
                            mediaInput: ''
                          });
                        }
                      }}
                      className="px-6 py-3 border border-[#3C4044] text-[#3C4044] rounded-lg hover:bg-[#3C4044]/10 transition-colors font-medium"
                    >
                      Reset Changes
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-linear-to-r from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg hover:opacity-90 transition-all font-medium shadow-lg flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save mr-2"></i>
                          Update Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-[#3C4044] mb-4">
                <i className="fas fa-eye text-[#FD7B41] mr-2"></i>
                Live Preview
              </h3>
              
              {/* Preview content remains the same */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;