import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FaTimes } from 'react-icons/fa';

const Certifications = () => {
    const { achievements } = usePortfolio();
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-light via-cyber-dark to-cyber-light opacity-50"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-purple bg-clip-text text-transparent">
                            Achievements & Badges
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        Certifications and accomplishments unlocked
                    </p>

                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {achievements?.map((cert, index) => (
                            <CertBadge
                                key={cert.id}
                                cert={cert}
                                index={index}
                                onClick={() => setSelectedCert(cert)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

const CertBadge = ({ cert, index, onClick }) => {
    return (
        <motion.div
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: 'spring' }}
            whileHover={{ y: -10, scale: 1.05 }}
            onClick={onClick}
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-purple rounded-xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500"></div>

            {/* Badge */}
            <div className="relative glass rounded-xl p-4 border border-neon-yellow/30 group-hover:border-neon-yellow transition-all duration-300 aspect-square flex flex-col items-center justify-center text-center">
                {/* Trophy icon */}
                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">
                    🏆
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-glow">
                    {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-xs text-gray-400 line-clamp-1">
                    {cert.issuer}
                </p>

                {/* Year */}
                <div className="mt-2 px-2 py-1 bg-neon-yellow/20 rounded-full text-xs text-neon-yellow">
                    {cert.date}
                </div>

                {/* "Click to view" hint */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-neon-purple">
                    Click to view
                </div>
            </div>
        </motion.div>
    );
};

const CertModal = ({ cert, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative max-w-2xl w-full glass rounded-2xl border border-neon-purple overflow-hidden"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                    <FaTimes className="text-xl" />
                </button>

                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center">
                    <div className="text-8xl">🏆</div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-2 text-glow">{cert.title}</h2>
                    <p className="text-xl text-gray-400 mb-4">{cert.issuer}</p>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="px-4 py-2 bg-neon-purple/20 rounded-full text-neon-purple border border-neon-purple/30">
                            {cert.date}
                        </div>
                        {cert.credentialId && (
                            <div className="text-sm text-gray-400">
                                ID: {cert.credentialId}
                            </div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                        <p className="text-gray-300 mb-4">
                            This achievement represents dedication, continuous learning, and commitment to excellence in the field.
                        </p>
                        <div className="flex gap-4">
                            <motion.button
                                className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold hover:shadow-neon-purple transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Credential
                            </motion.button>
                            <motion.button
                                className="px-6 py-3 border-2 border-neon-purple rounded-lg font-semibold hover:bg-neon-purple/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                            >
                                Close
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Certifications;
