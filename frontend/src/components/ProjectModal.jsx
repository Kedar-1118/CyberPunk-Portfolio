import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto z-[9999] px-4 scrollbar-hide"
                        initial={{ opacity: 0, scale: 0.8, x: '-50%', y: 'calc(-50% + 50px)' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.8, x: '-50%', y: 'calc(-50% + 50px)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="glass rounded-3xl overflow-hidden border-2 border-neon-purple/50 shadow-2xl">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <FaTimes className="text-2xl" />
                            </button>

                            {/* Image */}
                            <div className="relative h-80">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/800x400/8b5cf6/ffffff?text=${encodeURIComponent(project.title)}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                                    {project.title}
                                </h2>

                                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-3 text-neon-blue">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag, i) => (
                                            <motion.span
                                                key={i}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple text-neon-purple font-semibold"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <motion.button
                                            className="w-full px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-neon-purple transition-all"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FaGithub className="text-xl" />
                                            View Code
                                        </motion.button>
                                    </a>
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <motion.button
                                            className="w-full px-6 py-3 border-2 border-neon-blue rounded-full font-bold flex items-center justify-center gap-2 hover:bg-neon-blue/20 transition-all"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FaExternalLinkAlt className="text-xl" />
                                            Live Demo
                                        </motion.button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
