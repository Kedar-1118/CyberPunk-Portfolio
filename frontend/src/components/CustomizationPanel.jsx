import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaTimes, FaPalette, FaAdjust, FaTachometerAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { useCustomization } from '../context/CustomizationContext';

const CustomizationPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, setSettings } = useCustomization();
    const { themes } = usePortfolio();

    const handleThemeChange = (themeName) => {
        if (!themes || !themes[themeName]) return;

        setSettings({ ...settings, theme: themeName });

        // Apply theme colors to CSS variables that Tailwind uses
        const theme = themes[themeName];
        const root = document.documentElement;

        // Set all color variables with fallbacks
        root.style.setProperty('--neon-blue', theme.colors.accent || '#00f3ff');
        root.style.setProperty('--neon-pink', theme.colors.secondary || '#ff006e');
        root.style.setProperty('--neon-purple', theme.colors.primary || '#8b5cf6');
        root.style.setProperty('--neon-green', theme.colors.accent || '#39ff14');
        root.style.setProperty('--neon-yellow', theme.colors.secondary || '#ffff00');
        root.style.setProperty('--cyber-dark', theme.colors.background || '#0a0e27');

        // Calculate lighter and darker variants
        const bgColor = theme.colors.background || '#0a0e27';
        root.style.setProperty('--cyber-darker', adjustBrightness(bgColor, -10));
        root.style.setProperty('--cyber-light', adjustBrightness(bgColor, 20));

        // Update body background
        document.body.style.backgroundColor = bgColor;
    };

    // Helper function to adjust color brightness
    const adjustBrightness = (hexColor, percent) => {
        const hex = hexColor.replace('#', '');
        const num = parseInt(hex, 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return '#' + ((R << 16) + (G << 8) + B).toString(16).padStart(6, '0');
    };

    const handleParticleDensityChange = (value) => {
        setSettings({ ...settings, particleDensity: parseInt(value) });
    };

    const handleAnimationSpeedChange = (value) => {
        setSettings({ ...settings, animationSpeed: parseInt(value) });
    };

    const handleReduceMotionChange = (checked) => {
        setSettings({ ...settings, reduceMotion: checked });
    };

    const handleReset = () => {
        setSettings({
            theme: 'cyberpunk',
            particleDensity: 50,
            animationSpeed: 100,
            reduceMotion: false
        });
        // Reset CSS variables to defaults (Cyberpunk theme)
        const root = document.documentElement;
        root.style.setProperty('--neon-blue', '#00f3ff');
        root.style.setProperty('--neon-pink', '#ff006e');
        root.style.setProperty('--neon-purple', '#8b5cf6');
        root.style.setProperty('--neon-green', '#39ff14');
        root.style.setProperty('--neon-yellow', '#ffff00');
        root.style.setProperty('--cyber-dark', '#0a0e27');
        root.style.setProperty('--cyber-darker', '#050714');
        root.style.setProperty('--cyber-light', '#1a1f3a');
        document.body.style.backgroundColor = '#0a0e27';
    };

    // Apply theme on mount (for persisted settings)
    useEffect(() => {
        if (settings.theme && themes && themes[settings.theme]) {
            handleThemeChange(settings.theme);
        }
    }, [themes]); // Run existing settings when themes load

    if (!themes || Object.keys(themes).length === 0) return null;

    return (
        <>
            {/* Floating button */}
            <motion.button
                className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full shadow-neon-purple hover:scale-110 transition-all"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open customization panel"
            >
                <FaCog className="text-2xl" />
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel content */}
                        <motion.div
                            className="fixed right-0 top-0 bottom-0 w-full md:w-96 glass border-l border-neon-purple/30 z-50 overflow-y-auto"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                        >
                            {/* Header */}
                            <div className="sticky top-0 glass border-b border-neon-purple/30 p-6 flex items-center justify-between backdrop-blur-xl">
                                <h2 className="text-2xl font-bold text-neon-purple">Customize</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Close panel"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Theme Selection */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaPalette className="text-neon-purple" />
                                        <h3 className="text-xl font-bold">Theme</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(themes).map(([key, theme]) => (
                                            <motion.button
                                                key={key}
                                                className={`p-4 rounded-lg border-2 transition-all ${settings.theme === key
                                                    ? 'border-neon-purple bg-neon-purple/20'
                                                    : 'border-gray-700 hover:border-neon-purple/50'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleThemeChange(key)}
                                            >
                                                <div className="flex gap-2 mb-2">
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-white/20"
                                                        style={{ backgroundColor: theme.colors.primary }}
                                                    />
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-white/20"
                                                        style={{ backgroundColor: theme.colors.secondary }}
                                                    />
                                                </div>
                                                <div className="text-sm font-semibold">{theme.name}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Selected: <span className="text-neon-purple font-bold">{themes[settings.theme]?.name}</span>
                                    </p>
                                </div>

                                {/* Particle Density */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaAdjust className="text-neon-blue" />
                                        <h3 className="text-xl font-bold">Particle Density</h3>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={settings.particleDensity}
                                        onChange={(e) => handleParticleDensityChange(e.target.value)}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-purple"
                                    />
                                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                                        <span>None</span>
                                        <span className="text-neon-purple font-bold">{settings.particleDensity}%</span>
                                        <span>Maximum</span>
                                    </div>
                                </div>

                                {/* Animation Speed */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaTachometerAlt className="text-neon-green" />
                                        <h3 className="text-xl font-bold">Animation Speed</h3>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="150"
                                        value={settings.animationSpeed}
                                        onChange={(e) => handleAnimationSpeedChange(e.target.value)}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-green"
                                    />
                                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                                        <span>Slow</span>
                                        <span className="text-neon-green font-bold">{settings.animationSpeed}%</span>
                                        <span>Fast</span>
                                    </div>
                                </div>

                                {/* Reduce Motion */}
                                <div>
                                    <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg border border-gray-700 hover:border-neon-pink/50 transition-all">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">Reduce Motion</h3>
                                            <p className="text-sm text-gray-400">Disable animations for accessibility</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={settings.reduceMotion}
                                            onChange={(e) => handleReduceMotionChange(e.target.checked)}
                                            className="w-5 h-5 accent-neon-pink cursor-pointer"
                                        />
                                    </label>
                                </div>

                                {/* Info panel */}
                                <div className="p-4 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
                                    <p className="text-sm text-gray-300">
                                        💡 <span className="font-bold">Tip:</span> Your settings are automatically saved and will persist across sessions!
                                    </p>
                                </div>

                                {/* Reset Button */}
                                <motion.button
                                    className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-bold hover:shadow-neon-purple transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleReset}
                                >
                                    Reset to Defaults
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomizationPanel;

