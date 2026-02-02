import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaPlay, FaPause } from 'react-icons/fa';

const SpotifyWidget = () => {
    // Mock state - In a real app, this would come from an API endpoint
    const [isPlaying, setIsPlaying] = useState(true);
    const [song, setSong] = useState({
        title: "Cyberpunk 2077 Theme",
        artist: "Hyper Corp",
        albumArt: "https://placehold.co/100x100/8b5cf6/ffffff?text=CP2077",
        progress: 30,
        duration: 180
    });

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setSong(prev => {
                    if (prev.progress >= prev.duration) {
                        return { ...prev, progress: 0 };
                    }
                    return { ...prev, progress: prev.progress + 1 };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <motion.div
            className="fixed bottom-4 left-4 z-40 glass rounded-2xl p-4 border border-neon-green/30 w-72 hidden md:block" // Hidden on mobile to save space
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, type: 'spring' }}
        >
            <div className="flex items-center gap-4">
                {/* Album Art with spinning effect when playing */}
                <motion.div
                    className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neon-green"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                    <img src={song.albumArt} alt="Album Art" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                </motion.div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <FaSpotify className="text-neon-green text-sm" />
                        <span className="text-[10px] uppercase tracking-wider text-neon-green font-bold">Now Playing</span>
                    </div>
                    <div className="overflow-hidden">
                        <motion.p
                            className="text-sm font-bold text-white truncate"
                            animate={{ x: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, repeatDelay: 2 }}
                        >
                            {song.title}
                        </motion.p>
                        <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                    </div>
                </div>

                {/* Controls */}
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-neon-green transition-colors"
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-neon-green"
                    style={{ width: `${(song.progress / song.duration) * 100}%` }}
                />
            </div>
        </motion.div>
    );
};

export default SpotifyWidget;
