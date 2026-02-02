import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Section3DBackground from './Section3DBackground';

const TechStack = () => {
    const { techStack } = usePortfolio();
    const categories = Object.keys(techStack || {});

    return (
        <section id="tech-stack" className="relative min-h-screen py-20 overflow-hidden">
            {/* 3D Particle Background - Reduced count for performance */}
            <Section3DBackground particleCount={200} />

            <div className="absolute inset-0 bg-cyber-dark"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        Technologies I work with
                    </p>

                    {/* Bento Grid Layout */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, catIndex) => (
                            <motion.div
                                key={category}
                                className={`glass rounded-2xl p-6 border border-neon-purple/30 hover:border-neon-purple transition-all duration-300 ${catIndex === 0 ? 'md:col-span-2' : ''
                                    }`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                            >
                                {/* Category title */}
                                <h3 className="text-2xl font-bold mb-6 capitalize text-neon-purple">
                                    {category}
                                </h3>

                                {/* Technologies */}
                                <div className="grid grid-cols-2 gap-4">
                                    {techStack[category].map((tech, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                                            whileHover={{ scale: 1.05, x: 5 }}
                                        >
                                            <div className="text-3xl group-hover:scale-125 transition-transform">
                                                {tech.logo}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">{tech.name}</div>
                                                <div
                                                    className="w-12 h-1 rounded-full mt-1"
                                                    style={{ backgroundColor: tech.color }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-neon-purple/20 rounded-tr-lg"></div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Connection visualization hint */}
                    <motion.div
                        className="text-center mt-12 text-gray-500 text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                    >
                        <p>💡 Hover over technologies to see them come alive</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
