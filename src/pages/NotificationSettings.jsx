import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'react-toastify';

const NotificationSettings = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);

    // Default to true if not set
    const [preferences, setPreferences] = useState({
        email: user?.notificationPreferences?.email ?? true,
        push: user?.notificationPreferences?.push ?? true,
    });

    const handleToggle = async (type) => {
        const newPreferences = { ...preferences, [type]: !preferences[type] };
        setPreferences(newPreferences);

        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_BACKEND_URL}/api/users/notifications`,
                newPreferences,
                { withCredentials: true }
            );
            setUser(data.data);
            toast.success("Notification preferences updated");
        } catch (error) {
            // Revert on failure
            setPreferences(preferences);
            toast.error("Failed to update preferences");
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">Notification Preferences</h3>

            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Email Notifications</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates and newsletters via email.</p>
                </div>
                <button
                    onClick={() => handleToggle('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.email ? 'bg-[#FD7B41]' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.email ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Push Notifications</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive real-time alerts on your device.</p>
                </div>
                <button
                    onClick={() => handleToggle('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.push ? 'bg-[#FD7B41]' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.push ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;
