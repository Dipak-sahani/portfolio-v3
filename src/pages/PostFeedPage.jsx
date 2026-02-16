
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import Posts from "./Posts";

const PostFeedPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F3F2EF] dark:bg-gray-900 pt-6 px-0 sm:px-4 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Sidebar - User Profile */}
                <div className="hidden md:block md:col-span-3 lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden sticky top-24 transition-colors duration-300">
                        {/* Cover Photo */}
                        <div className="h-16 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B]"></div>

                        {/* Avatar & Info */}
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

                            <hr className="my-4 border-gray-100 dark:border-gray-700" />

                            <div className="text-left text-sm text-gray-500 dark:text-gray-400 space-y-2">
                                <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded cursor-pointer transition-colors">
                                    <span>Profile viewers</span>
                                    <span className="text-[#FD7B41] font-medium">124</span>
                                </div>
                                <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded cursor-pointer transition-colors">
                                    <span>Post impressions</span>
                                    <span className="text-[#FD7B41] font-medium">1,203</span>
                                </div>
                            </div>

                            <hr className="my-4 border-gray-100 dark:border-gray-700" />

                            <div className="text-left">
                                <button onClick={() => navigate("/saved-items")} className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] transition-colors p-1">
                                    <i className="fas fa-bookmark mr-2 text-gray-400"></i>
                                    Saved items
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Column - Feed */}
                <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-4">
                    {/* Create Post Widget */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                                {user?.avatar ? (
                                    <img src={`${import.meta.env.VITE_IMG_CDN}/${user.avatar}`} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                                        {user?.fullName?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => navigate("/create-post")}
                                className="flex-1 text-left px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
                            >
                                Start a post
                            </button>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <button onClick={() => navigate("/create-post")} className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-sm">
                                <i className="fas fa-image text-blue-500 text-lg mr-2"></i>
                                Media
                            </button>
                            <button onClick={() => navigate("/create-post")} className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-sm">
                                <i className="fas fa-calendar-alt text-yellow-600 text-lg mr-2"></i>
                                Event
                            </button>
                            <button onClick={() => navigate("/create-post")} className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-sm">
                                <i className="fas fa-newspaper text-red-400 text-lg mr-2"></i>
                                Article
                            </button>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <hr className="border-t border-[#FD7B41] my-4" />
                    <Posts />
                </div>

                {/* Right Sidebar - Trending & Suggestions */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-24 transition-colors duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-[#3C4044] dark:text-white text-sm">Trending Now</h3>
                            <i className="fas fa-info-circle text-gray-400 text-xs cursor-pointer"></i>
                        </div>

                        <ul className="space-y-4">
                            {[
                                { topic: "#StartupIndia", likes: "125k posts" },
                                { topic: "#TechInnovation", likes: "89k posts" },
                                { topic: "Remote Work", likes: "56k posts" },
                                { topic: "AI Revolution", likes: "42k posts" },
                                { topic: "#BerojgarFounder", likes: "12k posts" },
                            ].map((item, index) => (
                                <li key={index} className="cursor-pointer">
                                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-[#FD7B41] hover:underline truncate">
                                        {item.topic}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {item.likes}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium mt-5 hover:bg-gray-50 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors">
                            Show more <i className="fas fa-chevron-down ml-1 text-xs"></i>
                        </button>

                    </div>

                    <div className="mt-4 text-center text-xs text-gray-400">
                        <p>&copy; 2024 Berojgar Founder. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostFeedPage;
