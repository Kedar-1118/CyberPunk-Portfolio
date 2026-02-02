import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Section3DBackground from './Section3DBackground';

// Group skills by category
const groupSkillsByCategory = (skills) => {
    const grouped = {};
    skills.forEach(skill => {
        if (!grouped[skill.category]) {
            grouped[skill.category] = [];
        }
        grouped[skill.category].push(skill);
    });
    return grouped;
};

const Skills = () => {
    const { skills } = usePortfolio();
    const groupedSkills = groupSkillsByCategory(skills);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    return (
        <section id="skills" className="relative min-h-screen py-20 overflow-hidden">
            {/* 3D Particle Background - Reduced count for performance */}
            <Section3DBackground particleCount={250} />

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-light to-cyber-dark"></div>

            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 mesh-gradient opacity-30"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                            Skills & Expertise
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        Technologies I master and use daily
                    </p>

                    {/* Hexagonal grid layout */}
                    <div className="max-w-7xl mx-auto">
                        {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
                            <motion.div
                                key={category}
                                className="mb-16 last:mb-0"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.1 }}
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
                                    <h3 className="text-2xl font-bold capitalize px-6 py-2 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-full border border-neon-purple/30">
                                        {category}
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
                                </div>

                                {/* Hexagonal skill cards */}
                                <div className="flex flex-wrap justify-center gap-8">
                                    {categorySkills.map((skill, index) => (
                                        <SkillHexagon
                                            key={index}
                                            skill={skill}
                                            index={index}
                                            isHovered={hoveredSkill === `${category}-${index}`}
                                            onHover={() => setHoveredSkill(`${category}-${index}`)}
                                            onLeave={() => setHoveredSkill(null)}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Legend */}
                    <motion.div
                        className="text-center mt-16 glass-weak rounded-2xl p-6 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-gray-400">
                            💡 <span className="text-neon-purple font-semibold">Click</span> or <span className="text-neon-blue font-semibold">hover</span> on any skill to see details
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const SkillHexagon = ({ skill, index, isHovered, onHover, onLeave }) => {
    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: index * 0.05
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Outer glow */}
            <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500"
                animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Hexagon container */}
            <div className="relative w-36 h-36 flex items-center justify-center cursor-pointer">
                {/* Hexagon shape background */}
                <motion.div
                    className="absolute inset-0 glass-strong rounded-3xl"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                    animate={isHovered ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 0.6 }}
                />

                {/* Inner hexagon detail */}
                <motion.div
                    className="absolute inset-4 rounded-3xl border-2 border-neon-purple/30"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                    animate={isHovered ? {
                        borderColor: ['rgba(139, 92, 246, 0.3)', 'rgba(0, 243, 255, 0.8)', 'rgba(139, 92, 246, 0.3)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Skill content */}
                <div className="relative z-10 flex flex-col items-center justify-center p-4">
                    {/* Icon */}
                    <motion.div
                        className="text-5xl mb-2 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                        animate={isHovered ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                        } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {skill.icon}
                    </motion.div>

                    {/* Name */}
                    <div className="text-center">
                        <p className="text-sm font-bold text-white group-hover:text-glow transition-all">
                            {skill.name}
                        </p>
                    </div>

                    {/* Particle power dots */}
                    <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(skill.particles / 5)
                                    ? 'bg-neon-green'
                                    : 'bg-gray-700'
                                    }`}
                                animate={isHovered && i < Math.floor(skill.particles / 5) ? {
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5]
                                } : {}}
                                transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>

                {/* Expanded details tooltip on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 glass-strong rounded-xl border border-neon-purple/50 z-20 -bottom-40 p-4 w-64 text-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h4 className="text-neon-purple font-bold mb-1">{skill.name}</h4>
                            <p className="text-xs text-gray-300 mb-2 leading-relaxed text-wrap">
                                {skill.desc || skill.category}
                            </p>
                            {skill.link && (
                                <a
                                    href={skill.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-neon-purple/20 hover:bg-neon-purple/40 text-neon-purple border border-neon-purple/50 px-3 py-1 rounded-full transition-colors inline-flex items-center gap-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Docs <span>↗</span>
                                </a>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Skills;
