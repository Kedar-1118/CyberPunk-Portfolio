import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    // System boot messages
    const bootMessages = [
        "INITIALIZING CORE...",
        "LOADING ASSETS...",
        "DECRYPTING DATA...",
        "ESTABLISHING SECURE CONNECTION...",
        "OPTIMIZING NEURAL NET...",
        "RENDERING 3D ENVIRONMENT...",
        "ACCESS GRANTED."
    ];

    useEffect(() => {
        // Progress simulation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => onLoadingComplete(), 800);
                    return 100;
                }
                // Randomize speed for "real" feel
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 150);

        // Random log generation
        const logInterval = setInterval(() => {
            const randomHex = Math.random().toString(16).substr(2, 8).toUpperCase();
            setLogs(prev => [`> 0x${randomHex} :: MEM_ALLOC_OK`, ...prev].slice(0, 5));
        }, 100);

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
        };
    }, [onLoadingComplete]);

    // Calculate number of progress blocks (20 blocks total)
    const blocks = Math.floor(progress / 5);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black font-mono text-neon-green overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 hex-grid opacity-10 pointer-events-none"></div>

            {/* Scanlines */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10"
                style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}>
            </div>

            <div className="relative z-20 w-full max-w-2xl px-4">
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b border-neon-green/30 pb-2">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter glitch-text" data-text="SYSTEM_BOOT">
                        SYSTEM_BOOT
                    </h1>
                    <span className="text-neon-purple animate-pulse">v2.0.77</span>
                </div>

                {/* Terminal Progress Bar */}
                <div className="mb-2 flex justify-between text-sm text-neon-blue">
                    <span>STATUS: {progress < 100 ? 'LOADING...' : 'COMPLETE'}</span>
                    <span>{progress}%</span>
                </div>

                <div className="w-full h-8 border-2 border-neon-green/50 p-1 mb-8 relative bg-black/50 backdrop-blur-sm">
                    {/* The bar itself */}
                    <div className="w-full h-full flex gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 transition-all duration-75 ${i < blocks ? 'bg-neon-green shadow-[0_0_10px_#39ff14]' : 'bg-neon-green/10'}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* System Logs */}
                <div className="font-mono text-xs md:text-sm h-32 overflow-hidden flex flex-col justify-end text-neon-green/80">
                    <AnimatePresence>
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-1"
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div className="text-neon-pink mt-2">
                        {progress < 100 ? `> ${bootMessages[Math.floor((progress / 100) * bootMessages.length)]}` : "> SYSTEM READY_"}
                        <span className="animate-pulse">_</span>
                    </div>
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-4 left-4 text-xs text-gray-500">
                MEM: {Math.floor(Math.random() * 1000) + 4000}MB
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                SECURE_CONN: <span className="text-neon-green">TRUE</span>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
