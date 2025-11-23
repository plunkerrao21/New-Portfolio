import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, ArrowUpRight, Send } from 'lucide-react';
import MagneticObject from './MagneticObject';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('idle');

        try {
            // Create form data for Google Apps Script
            const formData = new URLSearchParams();
            formData.append('name', formState.name);
            formData.append('email', formState.email);
            formData.append('message', formState.message);

            // Submit to Google Apps Script
            await fetch(
                'https://script.google.com/macros/s/AKfycbylwTAiTGoB-5PhFZ9DkdvHCMuwhwFMG_VoW4-tmppNeWudEdpJXLieJTwXSLY65Q-G/exec',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString(),
                    mode: 'no-cors' // Required for Google Apps Script
                }
            );

            // Success - reset form and show success message
            setSubmissionStatus('success');
            setFormState({ name: '', email: '', message: '' });

            // Hide success message after 5 seconds
            setTimeout(() => setSubmissionStatus('idle'), 5000);
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmissionStatus('error');

            // Hide error message after 5 seconds
            setTimeout(() => setSubmissionStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative w-full py-20 px-6 md:px-12 bg-ink text-paper overflow-hidden">
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
            }} />

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

                    {/* Left Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-paper/5 backdrop-blur-sm p-8 rounded-sm border border-pencil/10 h-fit"
                    >
                        <h3 className="font-serif text-2xl mb-6 text-paper">Send a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-pencil mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-pencil/30 py-2 text-paper focus:border-clay focus:outline-none transition-colors text-sm"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-pencil mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-pencil/30 py-2 text-paper focus:border-clay focus:outline-none transition-colors text-sm"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-pencil mb-1">Message</label>
                                <textarea
                                    id="message"
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    rows={3}
                                    className="w-full bg-transparent border-b border-pencil/30 py-2 text-paper focus:border-clay focus:outline-none transition-colors resize-none text-sm"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group flex items-center justify-center gap-3 bg-paper text-ink px-6 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-clay hover:text-white transition-all disabled:opacity-50 text-sm"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Success Message */}
                            {submissionStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-sm text-green-400 text-sm flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Message sent successfully! I'll get back to you soon.</span>
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {submissionStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Failed to send message. Please try again or email me directly.</span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Right Column: Contact Info */}
                    <div className="flex flex-col justify-center space-y-8">

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-serif text-2xl mb-6 text-paper">Get in Touch</h3>

                            <div className="space-y-6">
                                <div className="group">
                                    <p className="text-[10px] uppercase tracking-widest text-pencil mb-1">Email</p>
                                    <a href="mailto:anuj.d.dighe@gmail.com" className="text-lg md:text-xl text-paper group-hover:text-clay transition-colors flex items-center gap-2">
                                        anuj.d.dighe@gmail.com <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </div>

                                <div className="group">
                                    <p className="text-[10px] uppercase tracking-widest text-pencil mb-1">Phone</p>
                                    <a href="tel:+919322816921" className="text-lg md:text-xl text-paper group-hover:text-clay transition-colors flex items-center gap-2">
                                        +91 93228 16921 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-pencil mb-1">Location</p>
                                    <p className="text-lg md:text-xl text-paper flex items-center gap-2">
                                        Badlapur, Thane, Maharashtra, India
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="font-serif text-xl mb-4 text-paper">Follow Me</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/anujdighe/' },
                                    { name: 'GitHub', icon: Github, url: 'https://github.com/plunkerrao21' },
                                    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/_anujdighe/' },
                                ].map((social) => (
                                    <MagneticObject key={social.name} strength={0.2} bubbleText={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 border border-pencil/20 rounded-full hover:bg-paper hover:text-ink hover:border-paper transition-all text-pencil text-sm"
                                        >
                                            <social.icon size={16} />
                                            <span>{social.name}</span>
                                        </a>
                                    </MagneticObject>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-paper/5 rounded-lg p-4 border border-pencil/10"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <p className="text-xs font-bold uppercase tracking-wider text-paper">Available for new projects</p>
                            </div>
                            <p className="text-pencil text-xs">Currently accepting freelance projects and full-time opportunities.</p>
                        </motion.div>

                    </div>
                </div>

                {/* Iconic Footer Section */}
                <div className="text-center border-t border-pencil/10 pt-16 pb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-6xl mb-6 leading-tight"
                    >
                        Let's create <br />
                        <span className="italic text-clay">something iconic.</span>
                    </motion.h2>

                    <div className="flex flex-col md:flex-row justify-between items-center text-pencil/50 text-[10px] uppercase tracking-widest mt-12">
                        <p>© {new Date().getFullYear()} Anuj D. Dighe. All rights reserved.</p>
                        <p className="mt-2 md:mt-0">Designed & Built with ❤️ and AI</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
