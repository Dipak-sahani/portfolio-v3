import React, { useState } from 'react';
import { useAuthStore } from '../store/auth.store';

import { toast } from 'react-toastify';


import { updateProfileApi, changePasswordApi, deleteAccountApi } from '../services/auth.service';

const AccountSettings = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        isPublic: user?.isPublic ?? true, // Default to true if undefined
    });
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const data = await updateProfileApi(formData);
            setUser(data.data || data); // Update store, handling potential response structure differences
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await changePasswordApi(passwords);
            toast.success("Password changed successfully");
            setPasswords({ oldPassword: '', newPassword: '' });
        } catch (error) {
            // Error handling is largely done by interceptor, but we catch here just in case specific logic is needed
            // The interceptor shows toast for error messages usually
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteAccountApi();
                toast.success("Account deleted successfully");
                logout();
            } catch (error) {
                // Interceptor handles errors
            }
        }
    };

    return (
        <div className="space-y-8 text-[#3C4044] dark:text-gray-200">
            <h3 className="text-xl font-bold border-b dark:border-gray-700 pb-2">Account Settings</h3>

            {/* Implementation details for Account Settings */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Profile Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Full Name</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 shadow-sm focus:border-[#FD7B41] focus:ring-[#FD7B41] outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 shadow-sm focus:border-[#FD7B41] focus:ring-[#FD7B41] outline-none transition-colors"
                        />
                    </div>

                    <div className="md:col-span-2 pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="Checkbox"
                                    className="sr-only"
                                    checked={formData.isPublic}
                                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublic ? 'bg-[#FD7B41]' : 'bg-gray-400'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublic ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <div className="text-gray-700 dark:text-gray-200 font-medium">
                                {formData.isPublic ? 'Public Profile' : 'Private Profile'}
                            </div>
                        </label>
                        <p className="text-xs text-gray-500 mt-1 ml-16">
                            {formData.isPublic
                                ? "Your profile is visible to everyone on the platform."
                                : "Your profile is hidden from search and public lists."}
                        </p>
                    </div>
                </div>
                <button type="submit" className="bg-[#3C4044] dark:bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                    Update Profile
                </button>
            </form>

            <form onSubmit={handleChangePassword} className="space-y-4">
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Current Password</label>
                        <input
                            type="password"
                            value={passwords.oldPassword}
                            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 shadow-sm focus:border-[#FD7B41] focus:ring-[#FD7B41] outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">New Password</label>
                        <input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 shadow-sm focus:border-[#FD7B41] focus:ring-[#FD7B41] outline-none transition-colors"
                        />
                    </div>
                </div>
                <button type="submit" className="bg-[#3C4044] dark:bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                    Change Password
                </button>
            </form>

            <div className="pt-6 border-t border-red-200 dark:border-red-900/30">
                <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Danger Zone</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;
