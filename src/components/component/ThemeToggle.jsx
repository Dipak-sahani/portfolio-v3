import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useThemeStore } from '../../store/theme.store';

const ThemeToggle = () => {
    const { theme, toggleTheme, setTheme } = useThemeStore();

    // Initial sync
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add(theme);
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-xl" />
        </button>
    );
};

export default ThemeToggle;
