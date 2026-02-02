import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';
import { useGitHubStats } from '../hooks/useGitHubStats';

const GitHubStats = () => {
    const { stats, loading, error } = useGitHubStats(import.meta.env.VITE_GITHUB_USERNAME || 'kedardhotre');

    const getContributionColor = (count) => {
        if (count === 0) return 'bg-gray-800';
        if (count < 3) return 'bg-neon-purple/30';
        if (count < 6) return 'bg-neon-purple/60';
        return 'bg-neon-purple';
    };

    if (loading) {
        return (
            <section id="github-stats" className="min-h-screen py-20 flex items-center justify-center bg-black">
                <div className="text-neon-purple text-2xl animate-pulse">Loading GitHub Stats...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="github-stats" className="min-h-screen py-20 flex flex-col items-center justify-center bg-black">
                <div className="text-red-500 text-2xl mb-4">Error loading stats</div>
                <div className="text-gray-400">{error}</div>
                <div className="text-sm text-gray-500 mt-4">Make sure VITE_GITHUB_TOKEN is set in .env</div>
            </section>
        );
    }

    if (!stats) return null;

    return (
        <section id="github-stats" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-cyber-dark"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                            GitHub Statistics
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        My coding journey in numbers
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                        <StatCard icon={<FaCode />} label="Total Repos" value={stats.totalRepos} color="neon-purple" />
                        <StatCard icon={<FaStar />} label="Total Stars" value={stats.totalStars} color="neon-yellow" />
                        <StatCard icon={<FaCodeBranch />} label="Total Commits" value={stats.totalCommits} color="neon-blue" />
                        <StatCard icon={<span className="text-2xl">🔥</span>} label="Contributions" value={stats.contributions} color="neon-pink" />
                    </div>

                    {/* Contribution Heatmap */}
                    <div className="max-w-6xl mx-auto mb-16">
                        <motion.div
                            className="glass rounded-2xl p-8 border border-neon-purple/30"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-neon-green">Contribution Activity</h3>
                            <div className="overflow-x-auto">
                                <div className="inline-flex gap-1">
                                    {stats.contributionData.slice(-53).map((week, weekIndex) => (
                                        <div key={weekIndex} className="flex flex-col gap-1">
                                            {week.map((day, dayIndex) => (
                                                <motion.div
                                                    key={dayIndex}
                                                    className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)} hover:ring-2 hover:ring-neon-purple cursor-pointer transition-all`}
                                                    title={`${day.count} contributions on ${day.date}`}
                                                    whileHover={{ scale: 1.3 }}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
                                    <div className="w-3 h-3 bg-neon-purple/30 rounded-sm"></div>
                                    <div className="w-3 h-3 bg-neon-purple/60 rounded-sm"></div>
                                    <div className="w-3 h-3 bg-neon-purple rounded-sm"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Language Breakdown */}
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="glass rounded-2xl p-8 border border-neon-blue/30"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-neon-blue">Language Distribution</h3>

                            {/* Language bars */}
                            <div className="space-y-4">
                                {stats.languages.map((lang, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold">{lang.name}</span>
                                            <span className="text-gray-400">{lang.percentage}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: lang.color }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
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

const StatCard = ({ icon, label, value, color }) => {
    return (
        <motion.div
            className="glass rounded-xl p-6 border border-transparent hover:border-neon-purple transition-all duration-300 group"
            whileHover={{ y: -5, scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className={`text-4xl mb-3 text-${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div className={`text-3xl font-bold mb-1 text-${color}`}>
                {value}
            </div>
            <div className="text-sm text-gray-400">{label}</div>
        </motion.div>
    );
};

export default GitHubStats;
