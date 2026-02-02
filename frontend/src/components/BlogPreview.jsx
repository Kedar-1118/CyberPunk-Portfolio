import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FaArrowRight, FaClock } from 'react-icons/fa';

const BlogPreview = () => {
    const { blogPosts } = usePortfolio();
    return (
        <section id="blog" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-cyber-dark"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                            Latest Articles
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        Thoughts, tutorials, and insights on web development
                    </p>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>

                    {/* View all button */}
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <a href="#" className="inline-block">
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full text-white font-bold text-lg hover:shadow-neon-purple transition-all duration-300 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center gap-2">
                                    View All Articles
                                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </span>
                            </motion.button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const BlogCard = ({ post, index }) => {
    return (
        <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue rounded-2xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500"></div>

            {/* Card */}
            <div className="relative glass rounded-2xl overflow-hidden border border-transparent group-hover:border-neon-purple transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>

                    {/* Date badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-glow transition-all">
                        {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <FaClock />
                            <span>{post.readTime}</span>
                        </div>

                        <motion.div
                            className="flex items-center gap-2 text-neon-purple font-semibold"
                            whileHover={{ x: 5 }}
                        >
                            Read More
                            <FaArrowRight />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPreview;
