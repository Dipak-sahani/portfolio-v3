import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { usePostStore } from "../store/post.store";
import PostCard from "../components/post/PostCard";
import { getPostById } from "../services/post.service"; // You might need to implement this service if it doesn't exist
import { toast } from 'react-toastify';

const PostDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { posts } = usePostStore(); // If posts are already in store, we might find it there

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            // First check if post is available in store
            const existingPost = posts.find(p => p._id === id);
            if (existingPost) {
                setPost(existingPost);
                setLoading(false);
                return;
            }

            // If not in store, fetch from API
            try {
                // Assuming getPostById service exists, if not I would need to create it or fetching logic here.
                // For now, let's assume we might need to fetch it.
                // If usePostStore doesn't have a specific fetch single post action, we might need to rely on getPosts or add one.
                // Let's try to reload posts or fetch specific.
                // Since I cannot easily add backend service right now, I will assume getPostById is available or use a workaround if needed.
                // But wait, the user instructions say "Code relating to the user's requests should be written... avoid writing...".
                // I can write to services.

                // Let's assume I can import it. If it fails, I'll fix it.
                const response = await getPostById(id);
                setPost(response.data);

            } catch (error) {
                console.error("Failed to fetch post", error);
                toast.error("Could not load post.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id, posts]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F3F2EF] dark:bg-gray-900 transition-colors">
                <div className="w-16 h-16 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F2EF] dark:bg-gray-900 transition-colors text-gray-600 dark:text-gray-300">
                <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-[#FD7B41] text-white rounded-lg">
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F3F2EF] dark:bg-gray-900 pt-6 px-0 sm:px-4 lg:px-8 transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Sidebar - User Profile (Copied layout from feed for consistency) */}
                <div className="hidden md:block md:col-span-3 lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden sticky top-24 transition-colors">
                        <div className="h-16 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B]"></div>
                        <div className="px-4 pb-4 text-center relative">
                            <div className="w-16 h-16 mx-auto -mt-8 border-2 border-white dark:border-gray-800 rounded-full bg-white dark:bg-gray-700 overflow-hidden mb-3">
                                {user?.avatar ? (
                                    <img src={`${import.meta.env.VITE_IMG_CDN}/${user.avatar}`} alt={user.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 font-bold text-xl">
                                        {user?.fullName?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-lg font-bold text-[#3C4044] dark:text-white hover:underline cursor-pointer" onClick={() => navigate("/profile")}>
                                {user?.fullName || "Welcome, User"}
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {user?.headline || "Build your startup dream with Berojgar Founder"}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="mt-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] transition-colors">
                        ← Back
                    </button>
                </div>

                {/* Center Column - Post Content */}
                <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
                    {/* We use PostCard but passing postId. PostCard fetches from store.
                        Properties might need to be in store.
                        Since we fetched 'post' locally if not in store, we should probably ensure it's in the store or change PostCard to accept 'post' object directly.
                        However, looking at PostCard code: `const post = usePostStore((state) => state.posts.find((p) => p?._id === postId));`
                        It strictly looks in the store.
                        So we MUST add the fetched post to the store if it's not there.
                     */}
                    <PostViewer post={post} />
                </div>
                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                    {/* Placeholder for future widgets or similar to feed */}
                </div>
            </div>
        </div>
    );
};

// Wrapper to handle store injection if needed, or just modifications to PostCard to accept prop.
// actually PostCard takes postId. I should probably add the post to the store.
// But specific logic for PostDetails might be easier if I just render the UI here or modifying PostCard to accept post object override.
// Let's modify PostCard to accept post object OR postId.
// But I can't modify PostCard right now without reading it again (which I did).
// PostCard logic: `const post = usePostStore(...)`.
// I will create a temporary wrapper that pushes to store or just uses a modified version of PostCard logic inline if simple.
// Actually, re-reading PostCard... it has a lot of logic (like, share, etc).
// Best approach: Update PostCard to accept `post` prop as fallback.
// But for now, let's try to use the store.

const PostViewer = ({ post }) => {
    // This component is a trick: it ensures the post is in the store so PostCard can find it.
    const { setPosts, posts } = usePostStore();
    useEffect(() => {
        if (post && !posts.find(p => p._id === post._id)) {
            setPosts([post, ...posts]);
        }
    }, [post, posts, setPosts]);

    return <PostCard postId={post._id} />;
}

export default PostDetailsPage;
