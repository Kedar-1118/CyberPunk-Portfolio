import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectModal from './ProjectModal';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState(null);
    const { projects } = usePortfolio();

    return (
        <section id="projects" className="relative min-h-screen py-20 overflow-hidden">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-cyber-dark">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold glitch-text mb-2 inline-block relative group" data-text="FEATURED_PROJECTS">
                            FEATURED_<span className="text-neon-green">PROJECTS</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                isInView={isInView}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

const ProjectCard = ({ project, index, isInView, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Holographic Card Container */}
            <div className="relative h-full bg-black/50 border border-gray-800 hover:border-neon-green/50 transition-all duration-300 rounded-xl overflow-hidden backdrop-blur-sm">

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden group">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700"
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        onError={(e) => {
                            e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(project.title)}`;
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                    {/* Access Badge */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border border-neon-green/30 px-3 py-1 rounded-full text-xs font-mono text-neon-green opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                        ACCESS_GRANTED
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                    {/* Title & Desc */}
                    <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-neon-green transition-colors truncate">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-neon-purple bg-neon-purple/10 rounded border border-neon-purple/20"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-2 py-1 text-[10px] text-gray-500 bg-gray-900/50 rounded border border-gray-800">+{project.tags.length - 3}</span>
                        )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-800/50 group-hover:border-neon-green/20 transition-colors">
                        <div className="flex gap-4">
                            {/* Icons hover effect */}
                            <motion.div whileHover={{ scale: 1.2, color: '#39ff14' }} className="text-gray-500 transition-colors">
                                <FaGithub size={18} />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2, color: '#39ff14' }} className="text-gray-500 transition-colors">
                                <FaExternalLinkAlt size={16} />
                            </motion.div>
                        </div>
                        <div className="group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-neon-green text-xl">→</span>
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-white/5 border-r-transparent group-hover:border-b-neon-green/50 transition-all duration-300"></div>
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
