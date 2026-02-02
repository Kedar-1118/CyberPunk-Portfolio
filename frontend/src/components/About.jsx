import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { personalInfo } = usePortfolio();

    return (
        <section id="about" className="relative min-h-screen py-20 overflow-hidden flex items-center">
            {/* Background Tech Grid */}
            <div className="absolute inset-0 bg-cyber-black">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_200px,#39ff1410,transparent)]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Cyberpunk Header */}
                    <div className="flex items-center justify-center mb-20 relative">
                        <div className="hidden md:block absolute left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-neon-purple"></div>
                        <div className="hidden md:block absolute right-0 w-1/3 h-[1px] bg-gradient-to-l from-transparent to-neon-purple"></div>
                        <h2 className="text-4xl md:text-6xl font-bold text-center px-8 py-2 border-x-2 border-neon-purple/50 bg-black/50 backdrop-blur-md relative overflow-hidden group">
                            <span className="relative z-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent group-hover:text-neon-cyan transition-colors duration-300">
                                ABOUT_ME
                            </span>
                            {/* Glitch Overlay */}
                            <div className="absolute inset-0 bg-neon-purple/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Holographic Avatar Frame */}
                        <motion.div
                            className="flex-1 w-full lg:max-w-md relative"
                            initial={{ x: -100, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="relative group">
                                {/* Rotating Rings */}
                                <div className="absolute -inset-8 border border-dashed border-neon-cyan/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute -inset-4 border border-neon-purple/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                                {/* Hexagon Crop Frame */}
                                <div className="relative aspect-square overflow-hidden clip-path-hexagon border-[3px] border-neon-cyan/50 bg-black/50 backdrop-blur-sm p-2 hover:border-neon-pink transition-colors duration-500">
                                    <div className="absolute inset-0 bg-neon-cyan/10 animate-pulse"></div>
                                    <img
                                        src={personalInfo.avatar}
                                        alt={personalInfo.name}
                                        className="w-full h-full object-cover clip-path-hexagon filter contrast-125 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    {/* Tech Overlay Lines */}
                                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-5 mix-blend-screen pointer-events-none"></div>
                                </div>

                                {/* Floating Tech Badges */}
                                <motion.div
                                    className="absolute -right-8 top-10 bg-black/80 border border-neon-green/50 px-4 py-2 rounded-none clip-path-slash text-xs font-mono text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    STATUS: ONLINE
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Cyber Terminal Content */}
                        <motion.div
                            className="flex-[2] w-full"
                            initial={{ x: 100, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative bg-black/40 border border-gray-800 p-8 md:p-12 hover:border-neon-cyan/50 transition-colors duration-500 group">
                                {/* Decorative Corner Markers */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan"></div>

                                {/* Terminal Content */}
                                <div className="font-mono space-y-6 text-gray-300">
                                    <p className="text-lg leading-relaxed relative z-10">
                                        <span className="text-neon-pink mr-2">root@portfolio:~$</span>
                                        {personalInfo.bio}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-800 mt-8">
                                        {[
                                            { label: 'PROJECTS_COMPLETED', value: '10+' },
                                            { label: 'YEARS_EXPERIENCE', value: '2+' },
                                            { label: 'SYSTEM_KNOWLEDGE', value: 'Hi-Tech' },
                                        ].map((stat, i) => (
                                            <div key={i} className="text-center bg-white/5 p-4 relative overflow-hidden group/stat hover:bg-white/10 transition-colors">
                                                <div className="text-3xl font-bold text-white mb-1 group-hover/stat:text-neon-cyan transition-colors">{stat.value}</div>
                                                <div className="text-[10px] tracking-widest text-gray-500 font-mono">{stat.label}</div>
                                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-purple transform scale-x-0 group-hover/stat:scale-x-100 transition-transform duration-300"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Highlights Ribbon */}
                            <div className="mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {[
                                    { year: '2024', text: 'Hackathon Winner' },
                                    { year: '2023', text: 'Open Source' },
                                    { year: '2022', text: 'Started Code' },
                                ].map((item, index) => (
                                    <div key={index} className="flex-shrink-0 flex items-center gap-3 bg-neon-purple/10 border border-neon-purple/20 px-4 py-2 rounded-full">
                                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
                                        <span className="font-mono text-neon-purple font-bold">{item.year}</span>
                                        <span className="text-sm text-gray-300">| {item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default About;
