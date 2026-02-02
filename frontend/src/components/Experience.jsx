import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const Experience = () => {
    const { experience } = usePortfolio();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="relative min-h-screen py-20 overflow-hidden text-white">
            <div className="absolute inset-0 bg-cyber-dark"></div>
            {/* Digital Rain Background effect simulated with CSS lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #00f3ff 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #00f3ff 20px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-20 relative">
                        <h2 className="text-4xl md:text-6xl font-bold inline-block relative glitch-text z-10 mix-blend-screen" data-text="EXPERIENCE_LOG">
                            EXPERIENCE_<span className="text-neon-pink">LOG</span>
                        </h2>
                        {/* Underline scanner effect */}
                        <div className="w-24 h-1 bg-neon-cyan mx-auto mt-4 shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
                    </div>

                    <div className="max-w-5xl mx-auto relative">
                        {/* Neon Timeline Backbone */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-gray-900 overflow-hidden rounded-full">
                            <div className="absolute top-0 w-full h-20 bg-neon-purple blur-md animate-[moveDown_3s_linear_infinite]"></div>
                            <div className="w-full h-full bg-gradient-to-b from-neon-blue/20 via-neon-purple/20 to-neon-pink/20"></div>
                        </div>

                        {experience.map((item, index) => (
                            <ExperienceCard key={item.id} item={item} index={index} isInView={isInView} />
                        ))}
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

const ExperienceCard = ({ item, index, isInView }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={`relative flex items-center mb-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            {/* Tech Node (Timeline Dot) */}
            <motion.div
                className="absolute left-8 md:left-1/2 w-10 h-10 -ml-5 bg-black border-[3px] border-neon-cyan/50 z-20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            >
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            </motion.div>

            {/* Experience Card */}
            <div className={`w-full md:w-5/12 ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} ml-20 md:ml-0`}>
                <motion.div
                    className="relative bg-black/60 border border-t-neon-blue/50 border-b-neon-purple/50 border-x-transparent p-1 group transition-all"
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Glowing Content Container */}
                    <div className="bg-gradient-to-br from-gray-900 to-black p-6 relative overflow-hidden">
                        {/* scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20 pointer-events-none"></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">{item.title}</h3>
                                <h4 className="text-neon-pink font-mono text-sm tracking-wider mt-1">{item.company}</h4>
                            </div>
                            <span className="text-xs font-mono font-bold text-neon-blue border border-neon-blue px-2 py-1 bg-neon-blue/10 rounded">
                                {item.period}
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-6 leading-relaxed border-l-2 border-gray-700 pl-4">
                            {item.description}
                        </p>

                        {/* Tech Achievements */}
                        <div className="space-y-2">
                            {item.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-start gap-3 group/item">
                                    <span className="text-neon-purple mt-1 text-xs">►</span>
                                    <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">{achievement}</span>
                                </div>
                            ))}
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-neon-purple/50 to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Experience;
