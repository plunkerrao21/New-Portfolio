import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, LucideIcon } from 'lucide-react';

interface SkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    skill: {
        name: string;
        category: string;
        level: string;
        years: string;
        description: string;
        icon: LucideIcon;
    } | null;
}

const SkillModal: React.FC<SkillModalProps> = ({ isOpen, onClose, skill }) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!skill) return null;

    const Icon = skill.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-paper max-w-lg w-full shadow-2xl overflow-hidden"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative Header Line */}
                        <div className="h-1 w-full bg-ink" />

                        <div className="p-8 md:p-12 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-clay" />
                            </button>

                            {/* Header */}
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h2 className="text-4xl font-serif text-ink mb-2">{skill.name}</h2>
                                    <span className="text-clay uppercase tracking-widest text-xs font-medium">
                                        {skill.category} • {skill.years} Experience
                                    </span>
                                </div>
                                <div className="p-4 bg-paper border border-pencil rounded-full">
                                    <Icon size={32} className="text-ink" strokeWidth={1} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <p className="text-charcoal text-lg font-light leading-relaxed">
                                    {skill.description}
                                </p>

                                <div className="h-px w-full bg-pencil/50" />

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-clay uppercase tracking-wider mb-1">Proficiency</p>
                                        <p className="font-serif text-xl italic text-ink">{skill.level}</p>
                                    </div>
                                    <button className="group flex items-center gap-2 text-ink hover:text-clay transition-colors">
                                        <span className="text-sm font-medium border-b border-transparent group-hover:border-clay">
                                            View Projects
                                        </span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SkillModal;
