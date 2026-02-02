import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [isRetro, setIsRetro] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setIsDark(saved === 'dark');
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    useEffect(() => {
        if (isRetro) {
            document.body.classList.add('retro-mode', 'crt-effect');
        } else {
            document.body.classList.remove('retro-mode', 'crt-effect');
        }
    }, [isRetro]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const toggleRetro = () => {
        setIsRetro(!isRetro);
    };

    return (
        <ThemeContext.Provider value={{ isDark, isRetro, toggleTheme, toggleRetro }}>
            {children}
        </ThemeContext.Provider>
    );
};
