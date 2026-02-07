import React, { useState, useEffect } from 'react';

const AppearanceSettings = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">Appearance</h3>

            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-[#FD7B41] bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-600'}`}
                    >
                        <div className="w-20 h-10 bg-white border border-gray-200 rounded mb-2"></div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Light Mode</span>
                    </button>

                    <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-[#FD7B41] bg-gray-800' : 'border-gray-200 dark:border-gray-600'}`}
                    >
                        <div className="w-20 h-10 bg-gray-900 border border-gray-700 rounded mb-2"></div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                    </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred theme for the application.</p>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-md">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">Note: Dark mode support is currently experimental.</p>
                </div>
            </div>
        </div>
    );
};

export default AppearanceSettings;
