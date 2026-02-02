import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { sendContactMessage } from '../services/api';
import { useSound } from '../hooks/useSound';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const { personalInfo, socialLinks } = usePortfolio();
    const { playSuccess, playClick } = useSound();

    const handleSubmit = async (e) => {
        e.preventDefault();
        playClick();
        try {
            await sendContactMessage(formData);
            playSuccess();
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error("Failed to send message", error);
            // Optionally set error state to show user feedback
            alert("Failed to send message. Please try again.");
        }
    };

    const iconMap = {
        FaGithub,
        FaLinkedin,
        FaTwitter,
        FaEnvelope,
        FaInstagram,
    };

    return (
        <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-light to-cyber-dark"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-8">
                        <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
                            Let's Connect
                        </span>
                    </h2>
                    <p className="text-center text-gray-300 text-xl mb-16 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? Drop me a message!
                    </p>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => { setFocusedField('name'); playClick(); }}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-neon-purple transition-all peer"
                                        placeholder="Your Name"
                                    />
                                    <label className={`absolute left-6 transition-all pointer-events-none ${focusedField === 'name' || formData.name
                                        ? '-top-3 text-xs text-neon-purple bg-cyber-dark px-2'
                                        : 'top-4 text-gray-400'
                                        }`}>
                                        Your Name
                                    </label>
                                    {focusedField === 'name' && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl border-2 border-neon-purple blur-sm -z-10"
                                            layoutId="input-glow"
                                        />
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-neon-purple transition-all peer"
                                        placeholder="Your Email"
                                    />
                                    <label className={`absolute left-6 transition-all pointer-events-none ${focusedField === 'email' || formData.email
                                        ? '-top-3 text-xs text-neon-purple bg-cyber-dark px-2'
                                        : 'top-4 text-gray-400'
                                        }`}>
                                        Your Email
                                    </label>
                                    {focusedField === 'email' && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl border-2 border-neon-purple blur-sm -z-10"
                                            layoutId="input-glow"
                                        />
                                    )}
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        rows={5}
                                        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-neon-purple transition-all resize-none peer"
                                        placeholder="Your Message"
                                    />
                                    <label className={`absolute left-6 transition-all pointer-events-none ${focusedField === 'message' || formData.message
                                        ? '-top-3 text-xs text-neon-purple bg-cyber-dark px-2'
                                        : 'top-4 text-gray-400'
                                        }`}>
                                        Your Message
                                    </label>
                                    {focusedField === 'message' && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl border-2 border-neon-purple blur-sm -z-10"
                                            layoutId="input-glow"
                                        />
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl font-bold text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {submitted ? '✓ Sent!' : 'Send Message'}
                                        {!submitted && <FaPaperPlane />}
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple"
                                        initial={{ x: '100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute inset-0 animate-pulse-glow bg-neon-purple/50 blur-xl"></div>
                                    </div>
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="flex flex-col justify-center space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Social Links */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-neon-blue">Connect With Me</h3>
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((social, index) => {
                                        const Icon = iconMap[social.icon];
                                        return (
                                            <motion.a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 glass rounded-xl hover:border-neon-purple border border-transparent transition-all group"
                                                whileHover={{ scale: 1.1, y: -5 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Icon className="text-3xl group-hover:text-neon-purple transition-colors" />
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-neon-purple/20 rounded-xl blur"></div>
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Direct Contact */}
                            <div className="glass p-6 rounded-2xl space-y-4">
                                <h3 className="text-xl font-bold text-neon-pink mb-4">Direct Contact</h3>
                                <div className="space-y-3">
                                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors">
                                        <FaEnvelope className="text-neon-purple" />
                                        {personalInfo.email}
                                    </a>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <span className="text-neon-purple">📍</span>
                                        {personalInfo.location}
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="glass p-6 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
                                    <span className="text-lg font-semibold">Available for freelance work</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
