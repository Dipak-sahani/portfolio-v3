// pages/CreatePostPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/post.store";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { createPost } = usePostStore();

  const [formData, setFormData] = useState({
    content: "",
    media: [], // This will now hold both File objects and URL strings
    workspaceId: "",
    mediaInput: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content.trim() && formData.media.length === 0) {
      toast.warn("Please add content or media to your post");
      return;
    }

    setIsSubmitting(true);

    // Create FormData object to send binary files
    const dataToSend = new FormData();
    dataToSend.append("content", formData.content);
    if (formData.workspaceId) {
      dataToSend.append("workspaceId", formData.workspaceId);
    }

    // Append files and URLs separately or together depending on your backend
    formData.media.forEach((item) => {
      if (item instanceof File) {
        dataToSend.append("files", item); // 'files' is the key your backend should look for
      } else {
        dataToSend.append("mediaUrls", item); // For links/strings
      }
    });

    try {
      // Ensure your store's createPost action handles FormData (don't JSON.stringify it in the API call)
      await createPost(dataToSend);
      toast.success("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Just add the raw file objects to the state
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, ...files],
    }));

    e.target.value = ""; // reset file input
  };

  const handleAddMedia = () => {
    if (formData.mediaInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, prev.mediaInput],
        mediaInput: "",
      }));
    }
  };

  const handleRemoveMedia = (index) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const getPreviewSrc = (media) => {
    if (media instanceof File) {
      return URL.createObjectURL(media);
    }
    return media;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#DDDCDB] to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-[#3C4044]/60 dark:text-gray-400 hover:text-[#FD7B41] dark:hover:text-[#FD7B41] transition-colors mb-4"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3C4044] dark:text-white">Create New Post</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label htmlFor="content" className="block text-sm font-medium text-[#3C4044] dark:text-gray-300 mb-3">
                    What would you like to share?
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    maxLength={5000}
                    rows={8}
                    className="w-full px-4 py-3 border border-[#EDBF9B] dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FD7B41] outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Write your post here..."
                  />
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-[#3C4044] dark:text-gray-300">Media Attachments</label>
                    <label
                      htmlFor="media-upload"
                      className="px-4 py-2 bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer flex items-center shadow-md"
                    >
                      <i className="fas fa-upload mr-2"></i>
                      Select Files
                    </label>
                    <input
                      id="media-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleMediaUpload}
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                  </div>

                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={formData.mediaInput}
                      onChange={(e) => setFormData((prev) => ({ ...prev, mediaInput: e.target.value }))}
                      placeholder="Enter media URL"
                      className="flex-1 px-4 py-3 border border-[#EDBF9B] dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FD7B41] outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddMedia}
                      className="px-6 py-3 bg-[#EDBF9B] dark:bg-[#FD7B41]/80 text-[#3C4044] dark:text-white rounded-lg hover:bg-[#EDBF9B]/80 dark:hover:bg-[#FD7B41] font-medium transition-colors"
                    >
                      Add URL
                    </button>
                  </div>

                  {formData.media.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {formData.media.map((media, index) => (
                        <div key={index} className="relative border dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 shadow-sm group">
                          {(media instanceof File && media.type.startsWith("image/")) || (typeof media === "string" && !media.endsWith(".pdf")) ? (
                            <img
                              src={getPreviewSrc(media)}
                              alt="preview"
                              className="w-full h-32 object-cover rounded"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-32 text-xs text-gray-500 dark:text-gray-300 overflow-hidden break-all p-2">
                              {media.name || "Document"}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md transform scale-0 group-hover:scale-100 transition-transform"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-[#EDBF9B]/30 dark:border-gray-700">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] text-white rounded-lg font-medium shadow-lg disabled:opacity-50 hover:shadow-xl transition-shadow"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tips Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8 transition-colors duration-300">
              <h2 className="text-xl font-bold text-[#3C4044] dark:text-white mb-4 flex items-center">
                <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 p-2 rounded-lg mr-3">
                  💡
                </span>
                Post Tips
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Keep it concise</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Short, punchy posts often get more engagement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Use High-Quality Media</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Images and videos help your post stand out in the feed.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Engage your audience</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ask questions or encourage discussions in the comments.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Check your spelling</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">A polished post looks more professional.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;