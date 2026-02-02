import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const { testimonials } = usePortfolio();
    const ref = useRef(null);

    return (
        <section id="testimonials" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-light to-cyber-dark opacity-50"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                            Testimonials
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        What people say about working with me
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ testimonial, index }) => {
    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue rounded-2xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500"></div>

            {/* Card */}
            <div className="relative glass rounded-2xl p-6 border border-transparent group-hover:border-neon-purple transition-all duration-300">
                {/* Avatar and Info */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-neon-purple shadow-neon-purple"
                    />
                    <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`${i < testimonial.rating ? 'text-neon-yellow' : 'text-gray-600'
                                } text-lg`}
                        />
                    ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 italic leading-relaxed">
                    "{testimonial.content}"
                </p>

                {/* Quote decoration */}
                <div className="absolute top-4 right-4 text-6xl text-neon-purple/10 font-serif">
                    "
                </div>
            </div>
        </motion.div>
    );
};

export default Testimonials;
