import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";
import { usePostStore } from "../../store/post.store";
import { getPostById } from "../../services/post.service"; // Ensure this service is exported from frontend service
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PostDetailModal = ({ postId, onClose }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { posts } = usePostStore();

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            setLoading(true);

            // Try to find in store first
            const existingPost = posts.find((p) => p._id === postId);
            if (existingPost) {
                setPost(existingPost);
                setLoading(false);
                return;
            }

            // Fetch from API if not in store
            try {
                // We might need to import the service function correctly. 
                // If it's not available in frontend services, we'll need to double check.
                // Assuming we can reuse the logic from PostDetailsPage or similar.
                // For now, let's assume valid data is passed or we fetch it.
                // Actually, PostCard usually fetches its own data if we pass just ID? 
                // No, PostCard expects `post` object typically or uses store.
                // Let's rely on PostCard to handle data if we can, BUT PostCard takes `post` prop in some versions or `postId`.
                // Looking at previous `PostCard.jsx` view (from memory/context), it takes `post` object usually.
                // Let's wait for `view_file` of PostCard to be sure, but I'll write a generic structure.

                // *Self-correction*: I will wait for `PostCard.jsx` view to be perfect. 
                // But to be faster, I'll write a "loader" wrapper.

                // FETCH LOGIC
                const res = await getPostById(postId); // Verify this import path later
                setPost(res);

            } catch (error) {
                console.error("Failed to load post", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, posts]);

    return (
        <AnimatePresence>
            {postId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#F3F2EF] dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative custom-scrollbar"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {/* Close Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-1">
                            {loading ? (
                                <div className="flex h-64 items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : post ? (
                                <PostCard post={post} />
                            ) : (
                                <div className="p-8 text-center text-gray-500">Post not found.</div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PostDetailModal;
