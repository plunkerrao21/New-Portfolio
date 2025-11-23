import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    variant?: 'default' | 'minimal' | 'premium' | 'glitch';
    trigger?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({ text, className = '', delay = 0, variant = 'default', trigger = true }) => {
    const words = text.split(' ');

    // Animation Variants
    const variants = {
        default: {
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: { staggerChildren: 0.12, delayChildren: delay * i },
                }),
            },
            char: {
                hidden: { y: '100%' },
                visible: {
                    y: '0%',
                    transition: { duration: 0.65, ease: [0.2, 1, 0.3, 1] },
                },
            },
        },
        minimal: { // Alternating direction slide
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: delay * i },
                }),
            },
            char: {
                hidden: (custom: number) => ({
                    y: custom % 2 === 0 ? '120%' : '-120%',
                    opacity: 0,
                }),
                visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.6, ease: [0.2, 1, 0.3, 1] },
                },
            },
        },
        premium: { // Fade + Rise (Luxury)
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: delay * i },
                }),
            },
            char: {
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }, // easeOutExpo approx
                },
            },
        },
        glitch: { // Futuristic Flicker
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: { staggerChildren: 0.03, delayChildren: delay * i },
                }),
            },
            char: {
                hidden: { opacity: 0, x: -5, skewX: 10 },
                visible: {
                    opacity: [0, 1, 0.5, 1],
                    x: 0,
                    skewX: 0,
                    transition: { duration: 0.4, times: [0, 0.4, 0.6, 1] },
                },
            },
        },
    };

    const selectedVariant = variants[variant];

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={selectedVariant.container}
            initial="hidden"
            animate={trigger ? "visible" : "hidden"}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden"
                >
                    {word.split('').map((char, j) => (
                        <motion.span
                            key={j}
                            custom={j} // Pass index for alternating effects
                            className="inline-block"
                            variants={selectedVariant.char}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default SplitText;
