import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full glass flex items-center justify-center magnetic-btn group"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <FaMoon className="text-2xl text-neon-purple group-hover:text-neon-blue transition-colors" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <FaSun className="text-2xl text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            </motion.div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-30 blur-xl transition-opacity"></div>
        </motion.button>
    );
};

export default ThemeToggle;
