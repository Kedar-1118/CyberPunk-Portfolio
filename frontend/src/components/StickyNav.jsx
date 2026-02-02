import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useSound } from '../hooks/useSound';

const StickyNav = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { playClick, isMuted, toggleMute } = useSound();

    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling down 100px
            setIsVisible(window.scrollY > 100);

            // Update active section based on scroll position
            const sectionElements = sections.map(section =>
                document.getElementById(section.id)
            ).filter(el => el !== null);

            const currentSection = sectionElements.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        playClick();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 glass rounded-full px-6 py-3 border border-neon-purple/30 backdrop-blur-lg"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <ul className="flex items-center gap-6">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className={`relative px-3 py-2 font-semibold transition-all duration-300 ${activeSection === section.id
                                        ? 'text-neon-purple'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {section.label}
                                    {activeSection === section.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-pink"
                                            layoutId="activeSection"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-600/50"></div>

                    {/* Mute Toggle */}
                    <button
                        onClick={toggleMute}
                        className="text-gray-400 hover:text-neon-pink transition-colors p-2"
                        title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>

                    {/* Progress indicator */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full"
                        style={{
                            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
                        }}
                    />
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default StickyNav;
