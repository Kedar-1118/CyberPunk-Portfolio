import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const LearningNow = () => {
    const { learningGoals } = usePortfolio();
    return (
        <section id="learning" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-light to-cyber-dark opacity-50"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                            Currently Learning
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        Skills I'm actively developing right now
                    </p>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        {learningGoals.map((goal, index) => (
                            <LearningCard key={goal.id} goal={goal} index={index} />
                        ))}
                    </div>

                    {/* Motivational quote */}
                    <motion.div
                        className="text-center mt-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-xl md:text-2xl text-gray-400 italic">
                            "Learning never exhausts the mind"
                        </p>
                        <p className="text-neon-purple mt-2">- Leonardo da Vinci</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const LearningCard = ({ goal, index }) => {
    return (
        <motion.div
            className="glass rounded-2xl p-6 border border-neon-green/30 hover:border-neon-green transition-all duration-300 group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="text-4xl group-hover:scale-125 transition-transform">
                        {goal.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{goal.skill}</h3>
                        <p className="text-sm text-gray-400">{goal.category}</p>
                    </div>
                </div>
                <div className="text-2xl font-bold text-neon-green">
                    {goal.progress}%
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${goal.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                >
                    {/* Animated shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            </div>

            {/* Progress stages */}
            <div className="flex justify-between text-xs text-gray-500">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
            </div>

            {/* Next milestone */}
            <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>🎯</span>
                    <span>Next: {goal.progress < 50 ? 'Complete fundamentals' : goal.progress < 80 ? 'Build real project' : 'Master advanced concepts'}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LearningNow;
