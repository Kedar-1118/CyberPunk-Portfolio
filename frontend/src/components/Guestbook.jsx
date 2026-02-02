import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUserAstronaut } from 'react-icons/fa';
import { useSound } from '../hooks/useSound';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [loading, setLoading] = useState(false);
    const { playClick, playSuccess } = useSound();

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/guestbook');
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        playClick();
        if (!formData.name || !formData.message) return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                playSuccess();
                setFormData({ name: '', message: '' });
                fetchMessages();
            }
        } catch (error) {
            console.error('Failed to post message', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="guestbook" className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
                        <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                            Cyber Guestbook
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Form */}
                        <div className="glass p-8 rounded-2xl border border-neon-pink/30">
                            <h3 className="text-2xl font-bold text-neon-pink mb-6">Leave a Mark</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-400 mb-2">Codename</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-pink outline-none transition-colors"
                                        placeholder="Enter your alias..."
                                        maxLength={20}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Transmission</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-neon-pink outline-none transition-colors h-32 resize-none"
                                        placeholder="Write your message..."
                                        maxLength={100}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-neon-pink/20 hover:bg-neon-pink/40 border border-neon-pink text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all group"
                                >
                                    {loading ? 'Transmitting...' : (
                                        <>
                                            Send <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Messages Feed */}
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-neon-purple/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                                            <FaUserAstronaut className="text-white text-xs" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-neon-purple text-sm">{msg.name}</div>
                                            <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm">{msg.message}</p>
                                </motion.div>
                            ))}
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 py-10">
                                    No transmissions yet. Be the first.
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Guestbook;
