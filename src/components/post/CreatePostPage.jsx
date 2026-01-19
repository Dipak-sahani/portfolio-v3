// pages/CreatePostPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../../store/post.store';
// import { useWorkspaceStore } from '../store/useWorkspaceStore';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use Zustand stores
  const { createPost } = usePostStore();
  // const { 
  //   workspaces, 
  //   loading: loadingWorkspaces, 
  //   fetchWorkspaces 
  // } = useWorkspaceStore();
  
  const [formData, setFormData] = useState({
    content: '',
    media: [],
    workspaceId: '',
    mediaInput: ''
  });

  // useEffect(() => {
  //   fetchWorkspaces();
  // }, [fetchWorkspaces]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim() && formData.media.length === 0) {
      alert('Please add content or media to your post');
      return;
    }

    setIsSubmitting(true);

    const postData = {
      content: formData.content,
      media: formData.media,
      workspaceId: formData.workspaceId || undefined
    };

    try {
      await createPost(postData);
      alert('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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

  const handleMediaUpload = (e) => {
    const files = e.target.files;
    // In a real app, you would upload files to a storage service
    // and get back URLs to add to the media array
    alert('File upload functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#DDDCDB] to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-[#3C4044]/60 hover:text-[#FD7B41] transition-colors mb-4"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3C4044]">
            Create New Post
          </h1>
          <p className="text-[#3C4044]/80 mt-2">
            Share your thoughts, ideas, or media with your community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                {/* Content */}
                <div className="mb-8">
                  <label htmlFor="content" className="block text-sm font-medium text-[#3C4044] mb-3">
                    What would you like to share?
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    maxLength={5000}
                    rows={8}
                    className="w-full px-4 py-3 border border-[#EDBF9B] rounded-lg focus:ring-2 focus:ring-[#FD7B41] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Write your post here..."
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
                      Media Attachments
                    </label>
                    <label className="px-4 py-2 bg-linear-to-br from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                      <i className="fas fa-upload mr-2"></i>
                      Upload Files
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleMediaUpload}
                        accept="image/*,video/*,.pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  
                  {/* Media URL Input */}
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.mediaInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, mediaInput: e.target.value }))}
                        placeholder="Enter media URL (image, video, document)"
                        className="flex-1 px-4 py-3 border border-[#EDBF9B] rounded-lg focus:ring-2 focus:ring-[#FD7B41] focus:border-transparent outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAddMedia}
                        disabled={!formData.mediaInput.trim()}
                        className="px-6 py-3 bg-[#EDBF9B] text-[#3C4044] rounded-lg hover:bg-[#EDBF9B]/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Add URL
                      </button>
                    </div>
                    <p className="text-sm text-[#3C4044]/60 mt-2">
                      Supported: Images, Videos, PDFs, Documents
                    </p>
                  </div>
                  
                  {/* Media Preview */}
                  {formData.media.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-[#3C4044]">Added Media:</h4>
                      {formData.media.map((url, index) => (
                        <div key={index} className="flex items-center justify-between bg-linear-to-br from-[#EDBF9B]/10 to-[#FD7B41]/5 p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-linear-to-br from-[#FD7B41] to-[#EDBF9B] rounded-lg flex items-center justify-center text-white">
                              <i className="fas fa-link"></i>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#3C4044] truncate">
                                {new URL(url).pathname.split('/').pop() || url}
                              </p>
                              <p className="text-xs text-[#3C4044]/60 truncate">{url}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(index)}
                            className="text-[#3C4044]/40 hover:text-red-500 transition-colors"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Workspace Selection */}
                {/* <div className="mb-10">
                  <label className="block text-sm font-medium text-[#3C4044] mb-3">
                    Select Workspace (Optional)
                  </label>
                  {loadingWorkspaces ? (
                    <div className="flex items-center justify-center p-4">
                      <i className="fas fa-spinner fa-spin text-[#FD7B41] mr-2"></i>
                      Loading workspaces...
                    </div>
                  ) : workspaces?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        onClick={() => setFormData(prev => ({ ...prev, workspaceId: '' }))}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          !formData.workspaceId
                            ? 'border-[#FD7B41] bg-linear-to-br from-[#FD7B41]/10 to-[#EDBF9B]/10'
                            : 'border-[#EDBF9B] hover:border-[#FD7B41]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-linear-to-br from-[#DDDCDB] to-[#3C4044] rounded-lg flex items-center justify-center text-white">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#3C4044]">Personal Space</h4>
                            <p className="text-sm text-[#3C4044]/60">Post to your personal profile</p>
                          </div>
                        </div>
                      </div>
                      
                      {workspaces?.map(workspace => (
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
                            <div className="w-12 h-12 bg-linear-to-br from-[#FD7B41] to-[#EDBF9B] rounded-lg flex items-center justify-center text-white">
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 border-2 border-dashed border-[#EDBF9B] rounded-lg">
                      <i className="fas fa-users text-[#3C4044]/40 text-2xl mb-2"></i>
                      <p className="text-[#3C4044]/60">No workspaces available</p>
                    </div>
                  )}
                </div> */}

                {/* Submit Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-[#EDBF9B]/30">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-[#DDDCDB] text-[#3C4044] rounded-lg hover:bg-[#DDDCDB]/80 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          content: '',
                          media: [],
                          workspaceId: '',
                          mediaInput: ''
                        });
                      }}
                      className="px-6 py-3 border border-[#FD7B41] text-[#FD7B41] rounded-lg hover:bg-[#FD7B41]/10 transition-colors font-medium"
                    >
                      Clear
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || (!formData.content.trim() && formData.media.length === 0)}
                      className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center shadow-lg ${
                        isSubmitting || (!formData.content.trim() && formData.media.length === 0)
                          ? 'bg-[#DDDCDB] text-[#3C4044]/40 cursor-not-allowed'
                          : 'bg-linear-to-r from-[#FD7B41] to-[#EDBF9B] text-white hover:opacity-90'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Publish Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Tips */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-b from-white to-[#EDBF9B]/10 rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-[#3C4044] mb-4">
                <i className="fas fa-lightbulb text-[#FD7B41] mr-2"></i>
                Posting Tips
              </h3>
              
              <div className="space-y-4">
                {/* Tips content remains the same */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;