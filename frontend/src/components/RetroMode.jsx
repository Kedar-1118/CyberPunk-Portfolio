import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const RetroMode = () => {
    const { isRetro, toggleRetro } = useTheme();

    useEffect(() => {
        if (isRetro) {
            // Optional: Add chiptune music here
            console.log('🎮 Retro Mode Activated! Welcome to the 8-bit dimension!');
        }
    }, [isRetro]);

    return (
        <AnimatePresence>
            {isRetro && (
                <motion.div
                    className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                >
                    {/* Retro notification banner */}
                    <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 p-4 text-center font-bold text-black text-xl pointer-events-auto">
                        <div className="flex items-center justify-center gap-4">
                            <span className="animate-bounce">🎮</span>
                            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px' }}>
                                RETRO MODE ACTIVATED
                            </span>
                            <span className="animate-bounce">🕹️</span>
                            <button
                                onClick={toggleRetro}
                                className="ml-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
                                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}
                            >
                                <FaTimes /> EXIT
                            </button>
                        </div>
                    </div>

                    {/* Scanline effect - Optimized */}
                    <div className="fixed inset-0 pointer-events-none z-40">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent bg-repeat animate-scan"></div>
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2) 100%)',
                                backgroundSize: '100% 4px'
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RetroMode;
