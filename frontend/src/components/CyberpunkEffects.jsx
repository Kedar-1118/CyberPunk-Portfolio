import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CyberpunkEffects = () => {
    useEffect(() => {
        // Add cyberpunk class to body
        document.body.classList.add('cyberpunk-mode');

        return () => {
            document.body.classList.remove('cyberpunk-mode');
        };
    }, []);

    return (
        <>
            {/* Scanlines effect */}
            <div className="fixed inset-0 pointer-events-none z-[9998] cyberpunk-scanlines" />

            {/* CRT screen curvature overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9998] cyberpunk-vignette" />

            {/* Random glitch effect overlay */}
            <GlitchOverlay />

            {/* Corner HUD elements */}
            <CornerHUD />

            {/* Floating data streams */}
            <DataStreams />
        </>
    );
};

const GlitchOverlay = () => {
    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9997] mix-blend-difference"
            animate={{
                opacity: [0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.1, 0.2, 0.3, 0.35, 0.4, 0.5, 0.6, 0.9, 1],
            }}
        >
            <div className="w-full h-full bg-gradient-to-r from-neon-blue via-transparent to-neon-pink opacity-50" />
        </motion.div>
    );
};

const CornerHUD = () => {
    return (
        <>
            {/* Top-left HUD */}
            <div className="fixed top-4 left-4 z-[9999] pointer-events-none">
                <div className="glass-strong rounded-lg p-3 border border-neon-purple/50">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-neon-green">SYSTEM ONLINE</span>
                    </div>
                    <div className="text-xs font-mono text-gray-400">
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                    </div>
                </div>
            </div>

            {/* Top-right HUD */}
            <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
                <div className="glass-strong rounded-lg p-3 border border-neon-pink/50">
                    <div className="text-xs font-mono text-neon-pink">
                        <div>CPU: {Math.floor(Math.random() * 30 + 10)}%</div>
                        <div>MEM: {Math.floor(Math.random() * 40 + 30)}%</div>
                    </div>
                </div>
            </div>

            {/* Bottom-left coordinates */}
            <div className="fixed bottom-4 left-4 z-[9999] pointer-events-none">
                <div className="glass-strong rounded-lg px-3 py-2 border border-neon-blue/50">
                    <span className="text-xs font-mono text-neon-blue">
                        X: {Math.floor(Math.random() * 999).toString().padStart(3, '0')}
                        Y: {Math.floor(Math.random() * 999).toString().padStart(3, '0')}
                    </span>
                </div>
            </div>
        </>
    );
};

const DataStreams = () => {
    const streams = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-[9996] overflow-hidden">
            {streams.map((stream) => (
                <motion.div
                    key={stream.id}
                    className="absolute w-px bg-gradient-to-b from-transparent via-neon-purple to-transparent"
                    style={{
                        left: stream.left,
                        height: '200px',
                    }}
                    initial={{ y: '-200px', opacity: 0 }}
                    animate={{
                        y: 'calc(100vh + 200px)',
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: stream.duration,
                        delay: stream.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

export default CyberpunkEffects;
