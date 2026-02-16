import React, { useEffect, useState } from "react";
import { getBlockedUsers, unblockUser } from "../services/user.service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import ImagePreview from "../components/ImagePrev/ImagePreview";
import { useNavigate } from "react-router-dom";

const BlockedUsersPage = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchBlockedUsers = async () => {
        try {
            const users = await getBlockedUsers();
            setBlockedUsers(users || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load blocked users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlockedUsers();
    }, []);

    const handleUnblock = async (userId) => {
        if (window.confirm("Are you sure you want to unblock this user?")) {
            try {
                await unblockUser(userId);
                setBlockedUsers((prev) => prev.filter((u) => u._id !== userId));
                // toast.success("User unblocked"); // Service handles toast
            } catch (error) {
                // toast.error("Failed to unblock"); // Service handles toast
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 md:p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FontAwesomeIcon icon={faUserSlash} className="text-red-500" />
                        Blocked Users
                    </h1>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : blockedUsers.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <p className="text-lg">You haven't blocked anyone yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blockedUsers.map((user) => (
                            <div
                                key={user._id}
                                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <ImagePreview
                                        src={user.avatar}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                                        alt={user.fullName || "User"}
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {user.fullName || "Unknown User"}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUnblock(user._id)}
                                    className="bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faUnlock} /> Unblock
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockedUsersPage;
