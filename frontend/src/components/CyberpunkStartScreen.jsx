import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CyberpunkStartScreen = ({ onStart }) => {
    const [bootStep, setBootStep] = useState(0);
    const audioContext = useRef(null);

    // Boot sequence text
    const bootSequence = [
        "INITIALIZING KERNEL...",
        "LOADING NEURAL INTERFACE...",
        "CHECKING BIOMETRICS...",
        "CONNECTING TO NETWORK...",
        "ESTABLISHING SECURE CONNECTION...",
        "SYSTEM OPTIMIZED.",
        "WELCOME, USER."
    ];

    useEffect(() => {
        // Simple typing effect for boot sequence
        if (bootStep < bootSequence.length) {
            const timeout = setTimeout(() => {
                setBootStep(prev => prev + 1);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [bootStep]);



    const playStartSound = () => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const osc = audioContext.current.createOscillator();
        const gain = audioContext.current.createGain();
        osc.connect(gain);
        gain.connect(audioContext.current.destination);
        osc.type = 'sawtooth';

        // Power up sound
        osc.frequency.setValueAtTime(100, audioContext.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioContext.current.currentTime + 0.5);

        gain.gain.setValueAtTime(0.2, audioContext.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5);

        osc.start();
        osc.stop(audioContext.current.currentTime + 0.5);
    };

    const handleStart = () => {
        playStartSound();
        onStart();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono text-neon-green overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 hex-grid opacity-20 pointer-events-none"></div>

            <div className="max-w-md w-full p-8 relative z-10">
                {/* Boot Log */}
                <div className="mb-8 font-mono text-xs md:text-sm h-48 overflow-hidden flex flex-col justify-end border-l-2 border-neon-green pl-4 bg-black/50">
                    {bootSequence.slice(0, bootStep).map((text, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-1"
                        >
                            <span className="text-neon-purple mr-2">[{new Date().toLocaleTimeString()}]</span>
                            {text}
                        </motion.div>
                    ))}
                    {bootStep < bootSequence.length && (
                        <div className="animate-pulse">_</div>
                    )}
                </div>

                {/* Start Button */}
                <AnimatePresence>
                    {bootStep >= bootSequence.length && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(57, 255, 20, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStart}
                            className="w-full py-4 border-2 border-neon-green text-neon-green hover:text-white hover:bg-neon-green/20 hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all uppercase tracking-[0.2em] font-bold text-xl relative overflow-hidden group"
                        >
                            Let's Start

                            {/* Button scanline */}
                            <div className="absolute inset-0 bg-white/20 h-[2px] w-full top-0 animate-[scan-line_2s_linear_infinite] opacity-0 group-hover:opacity-100"></div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 p-8">
                <div className="w-16 h-16 border-t-2 border-l-2 border-neon-green"></div>
            </div>
            <div className="absolute bottom-0 right-0 p-8">
                <div className="w-16 h-16 border-b-2 border-r-2 border-neon-green"></div>
            </div>
        </motion.div>
    );
};

export default CyberpunkStartScreen;
