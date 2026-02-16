import React, { useState } from 'react';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import AppearanceSettings from './AppearanceSettings';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('account');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return <AccountSettings />;
            case 'notifications':
                return <NotificationSettings />;
            case 'appearance':
                return <AppearanceSettings />;
            default:
                return <AccountSettings />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border dark:border-gray-700">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-gray-50 dark:bg-gray-800/50 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
                    <nav className="flex flex-col space-y-2">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'account'
                                ? 'bg-[#FD7B41] text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            Account
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'notifications'
                                ? 'bg-[#FD7B41] text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('appearance')}
                            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'appearance'
                                ? 'bg-[#FD7B41] text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            Appearance
                        </button>
                        <button
                            onClick={() => window.location.href = '/blocked-users'}
                            className="text-left px-4 py-2 rounded-lg font-medium transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            Blocked Users
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 dark:text-gray-200">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
