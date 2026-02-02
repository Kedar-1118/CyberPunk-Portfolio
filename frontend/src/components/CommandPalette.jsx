import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);
    const { toggleTheme, toggleRetro } = useTheme();
    const { commandPaletteActions = [] } = usePortfolio();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const filteredActions = commandPaletteActions.filter((action) =>
        action.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleAction = (action) => {
        if (action.action === 'scroll' && action.target) {
            const element = document.getElementById(action.target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (action.action === 'theme') {
            toggleTheme();
        } else if (action.action === 'retro') {
            toggleRetro();
        }
        setIsOpen(false);
        setSearch('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Command Palette */}
                    <motion.div
                        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[9999]"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="glass mx-4 rounded-2xl overflow-hidden shadow-2xl border border-neon-purple/30">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                                <FaSearch className="text-neon-purple text-xl" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                                />
                                <kbd className="px-2 py-1 text-xs bg-white/10 rounded">ESC</kbd>
                            </div>

                            {/* Actions List */}
                            <div className="max-h-96 overflow-y-auto p-2">
                                {filteredActions.length > 0 ? (
                                    filteredActions.map((action, index) => (
                                        <motion.button
                                            key={action.id}
                                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group"
                                            onClick={() => handleAction(action)}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ x: 4 }}
                                        >
                                            <span className="text-gray-200 group-hover:text-neon-purple transition-colors">
                                                {action.label}
                                            </span>
                                            <span className="text-xs text-gray-500">Enter ↵</span>
                                        </motion.button>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        No results found
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between p-3 border-t border-white/10 text-xs text-gray-400">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd>
                                        Select
                                    </span>
                                </div>
                                <span>Ctrl + K to open</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
