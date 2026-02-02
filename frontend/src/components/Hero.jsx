import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaArrowDown } from 'react-icons/fa';
import ParticleBackground from './ParticleBackground';
import { usePortfolio } from '../context/PortfolioContext';
import { createConfetti } from '../utils/confetti';

import GlitchText from './GlitchText';
import { useSound } from '../hooks/useSound';

const Hero = () => {
    const { personalInfo, rotatingSkills } = usePortfolio();
    const [isAvatarClicked, setIsAvatarClicked] = useState(false);
    const { playHover, playClick } = useSound();

    const handleAvatarClick = (e) => {
        playClick();
        createConfetti(e.clientX, e.clientY);
        setIsAvatarClicked(true);
        setTimeout(() => setIsAvatarClicked(false), 1000);
    };

    const scrollToNext = () => {
        playClick();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-dark/50 to-cyber-dark" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Greeting */}
                        <motion.p
                            className="text-neon-blue text-xl md:text-2xl mb-4 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <GlitchText text="<Hello, Developers! />" />
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            I'm{' '}
                            <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] text-glow">
                                <GlitchText text={personalInfo.name} />
                            </span>
                        </motion.h1>

                        {/* Rotating Skills */}
                        <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 h-20">
                            <Typewriter
                                options={{
                                    strings: rotatingSkills.map(
                                        (skill) =>
                                            `<span class="bg-gradient-to-r from-gray-200 via-neon-green to-gray-200 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">${skill}</span>`
                                    ),
                                    autoStart: true,
                                    loop: true,
                                    delay: 75,
                                    deleteSpeed: 50,
                                }}
                            />
                        </div>

                        {/* Tagline */}
                        <motion.p
                            className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {personalInfo.tagline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-6 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <a href="#contact" onClick={playClick} onMouseEnter={playHover}>
                                <button className="magnetic-btn ripple-container relative px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full text-white font-bold text-lg overflow-hidden group">
                                    <span className="relative z-10">Let's Work Together</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple"
                                        initial={{ x: '100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute inset-0 animate-pulse-glow bg-neon-purple/50 blur-xl"></div>
                                    </div>
                                </button>
                            </a>

                            <a href={personalInfo.resume} download onClick={playClick} onMouseEnter={playHover}>
                                <button className="magnetic-btn px-8 py-4 border-2 border-neon-purple rounded-full text-white font-bold text-lg hover:bg-neon-purple/20 transition-all duration-300 group">
                                    <span className="group-hover:text-glow">Download CV</span>
                                </button>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Avatar */}
                    <motion.div
                        className="flex-1 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            className="relative cursor-pointer"
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            whileHover={{ scale: 1.05 }}
                            onClick={handleAvatarClick}
                        >
                            {/* Glow rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue blur-2xl opacity-50"
                                animate={{
                                    scale: isAvatarClicked ? [1, 1.5, 1] : [1, 1.2, 1],
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    scale: { duration: 1 },
                                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                                }}
                            />

                            {/* Avatar Image */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-neon-purple shadow-neon-purple">
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20"></div>
                                <img
                                    src="/assets/cyberpunk-avatar.png"
                                    alt={personalInfo.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to original if file missing
                                        e.target.src = personalInfo.avatar;
                                    }}
                                />
                            </div>

                            {/* Floating icons */}
                            {['⚛️', '💻', '🚀', '⚡'].map((icon, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute text-4xl"
                                    style={{
                                        top: `${20 + index * 20}%`,
                                        left: index % 2 === 0 ? '-10%' : '110%',
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        y: {
                                            duration: 3 + index,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        },
                                        rotate: {
                                            duration: 10 + index * 2,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        },
                                    }}
                                >
                                    {icon}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={scrollToNext}
            >
                <FaArrowDown className="text-neon-purple text-3xl" />
            </motion.div>
        </section>
    );
};

export default Hero;
