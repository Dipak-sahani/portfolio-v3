import { create } from 'zustand';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }

        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
            return 'dark';
        }
    }

    return 'light'; // light theme as the default;
};

export const useThemeStore = create((set) => ({
    theme: getInitialTheme(),
    toggleTheme: () => {
        set((state) => {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';

            const root = window.document.documentElement;
            root.classList.remove(state.theme);
            root.classList.add(newTheme);

            localStorage.setItem('color-theme', newTheme);

            return { theme: newTheme };
        });
    },
    setTheme: (theme) => {
        const root = window.document.documentElement;
        const oldTheme = theme === 'dark' ? 'light' : 'dark';
        root.classList.remove(oldTheme);
        root.classList.add(theme);
        localStorage.setItem('color-theme', theme);
        set({ theme });
    }
}));
