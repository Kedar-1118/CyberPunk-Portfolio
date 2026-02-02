import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const Timeline = () => {
    const { timelineMilestones } = usePortfolio();
    return (
        <section id="timeline" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-light via-cyber-dark to-cyber-light opacity-50"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                            My Journey
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        Milestones and achievements along the way
                    </p>

                    <div className="max-w-4xl mx-auto">
                        {timelineMilestones.map((milestone, index) => (
                            <TimelineItem key={milestone.id} milestone={milestone} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const TimelineItem = ({ milestone, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className="relative flex items-center mb-12 last:mb-0"
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-pink to-neon-blue opacity-50 hidden md:block"></div>

            {/* Content */}
            <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                <motion.div
                    className="glass rounded-xl p-6 border border-neon-purple/30 hover:border-neon-purple transition-all duration-300 group cursor-pointer"
                    whileHover={{ scale: 1.05, y: -5 }}
                >
                    {/* Year badge */}
                    <div className={`inline-block px-4 py-1 rounded-full bg-neon-purple/20 border border-neon-purple text-neon-purple text-sm font-bold mb-3`}>
                        {milestone.year}
                    </div>

                    {/* Icon */}
                    <div className="text-4xl mb-3">{milestone.icon}</div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-glow transition-all">
                        {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                        {milestone.description}
                    </p>

                    {/* Type badge */}
                    <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 border border-neon-pink/30 text-neon-pink capitalize">
                        {milestone.type}
                    </span>
                </motion.div>
            </div>

            {/* Center dot */}
            <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink border-4 border-cyber-dark hidden md:block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.5 }}
            />
        </motion.div>
    );
};

export default Timeline;
