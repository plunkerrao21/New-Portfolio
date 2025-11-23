import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// --- Fonts Injection ---
const FontStyles = () => (
    <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Nothing+You+Could+Do&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
    `}
    </style>
);

// --- Configuration & Data ---
const THEME = {
    paper: '#Fdfcf8',
    ink: '#2B2A29',
    clay: '#8a817c',
    charcoal: '#3d3d3d',
    pencil: '#d6d3d1',
    alert: '#ef4444',
    glow: '#eaddcf',
};

const FAQ_DATA = [
    {
        id: 1,
        question: "What is your design philosophy?",
        answer: "I believe in 'digital craftsmanship'. Every pixel should serve a purpose, and interaction should feel like a natural extension of thought. I prioritize clean typography, fluid motion, and accessibility above all else."
    },
    {
        id: 2,
        question: "Are you available for freelance work?",
        answer: "Currently, yes! I am taking on select projects for Q4. I'm particularly interested in building immersive web experiences and interactive storytelling platforms."
    },
    {
        id: 3,
        question: "What tools do you use daily?",
        answer: "My creative stack includes Figma for design, VS Code for development, and Framer Motion for bringing interfaces to life. I also sketch concepts on actual paper before touching a keyboard."
    },
    {
        id: 4,
        question: "How do you handle project timelines?",
        answer: "Transparently. I work in agile sprints, providing weekly updates and playable demos. This ensures we stay aligned on the vision and catch any pivots early in the process."
    }
];

// --- Enhanced Pickel Mascot Component ---
const PickelMascot = ({ isActive }: { isActive: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAnnoyed, setIsAnnoyed] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    // --- Physics & Tracking ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for tooltip tracking
    const springConfig = { damping: 25, stiffness: 150 };
    const tooltipX = useSpring(mouseX, springConfig);
    const tooltipY = useSpring(mouseY, springConfig);

    // Eye tracking (Limited range for realism)
    const eyeX = useTransform(mouseX, [-200, 200], [-3, 3]);
    const eyeY = useTransform(mouseY, [-200, 200], [-3, 3]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 112; // Center offset (w-56 = 224px / 2)
        const y = e.clientY - rect.top - 128;  // Center offset (h-64 = 256px / 2)

        mouseX.set(x);
        mouseY.set(y);
    };

    // Blink Logic
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (!isAnnoyed && !isActive) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 4000);
        return () => clearInterval(blinkInterval);
    }, [isAnnoyed, isActive]);

    // Annoy Handler
    const handleDoubleClick = () => {
        setIsAnnoyed(true);
        setTimeout(() => setIsAnnoyed(false), 2000);
    };

    // Determine State
    const currentState = isAnnoyed ? 'annoyed' : isActive ? 'active' : isHovered ? 'hover' : 'idle';

    return (
        <motion.div
            className="w-56 h-64 relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onDoubleClick={handleDoubleClick}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* --- Dynamic Tooltip --- */}
            <AnimatePresence>
                {isHovered && !isAnnoyed && (
                    <motion.div
                        style={{ x: tooltipX, y: tooltipY, translateX: '-50%', translateY: '-120%' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-0 left-1/2 bg-white border border-[#e5e5e5] px-3 py-2 rounded-lg shadow-md z-30 pointer-events-none whitespace-nowrap"
                    >
                        <div className="font-serif font-bold text-sm text-[#2B2A29]">Pickel</div>
                        <div className="text-[10px] text-[#8a817c] font-sans mt-0.5">Double-click to annoy me!</div>
                        {/* Tiny tail */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-[#e5e5e5] rotate-45"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.svg
                viewBox="0 0 200 240"
                className="w-full h-full overflow-visible"
            >
                <defs>
                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* --- Shadow --- */}
                <motion.ellipse
                    cx="100" cy="215" rx="40" ry="4"
                    fill={THEME.clay}
                    opacity="0.2"
                    animate={currentState === 'annoyed'
                        ? { rx: [35, 45, 35], x: [-2, 2, -2], opacity: 0.4 }
                        : {
                            rx: isActive ? 30 : isHovered ? 45 : 40,
                            opacity: isActive ? 0.3 : 0.2
                        }
                    }
                    transition={{ duration: currentState === 'annoyed' ? 0.1 : 0.5, repeat: currentState === 'annoyed' ? Infinity : 0 }}
                />

                {/* --- Body Group --- */}
                <motion.g
                    animate={
                        currentState === 'annoyed' ? {
                            x: [-4, 4, -2, 2, 0],
                            y: [0, 3, -3, 0],
                            rotate: [-2, 2, -1, 1, 0]
                        } : currentState === 'active' ? {
                            y: 20,
                            rotate: -5,
                            x: 10,
                            scale: 1.05
                        } : currentState === 'hover' ? {
                            y: -5,
                            rotate: 2
                        } : {
                            y: [0, -6, 0],
                            rotate: 0,
                            x: 0
                        }
                    }
                    transition={
                        currentState === 'annoyed'
                            ? { duration: 0.1, repeat: Infinity }
                            : currentState === 'active'
                                ? { type: "spring", stiffness: 200, damping: 20 }
                                : { repeat: Infinity, duration: 6, ease: "easeInOut" }
                    }
                >
                    {/* Main Body - Pill Shape */}
                    <motion.path
                        d="M60,200 L60,80 C60,30 140,30 140,80 L140,200 C140,215 60,215 60,200 Z"
                        fill={currentState === 'annoyed' ? THEME.alert : "#FFFFFF"}
                        stroke={THEME.ink}
                        strokeWidth="2"
                        transition={{ duration: 0.3 }}
                    />

                    {/* --- Face Container --- */}
                    <motion.g transform="translate(100, 90)">

                        {/* Eyes Group - Now follows mouse! */}
                        <motion.g style={{ x: eyeX, y: eyeY }}>
                            {currentState === 'annoyed' ? (
                                // ANGRY EYES
                                <>
                                    <motion.line x1="-22" y1="-5" x2="-8" y2="2" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                    <motion.line x1="22" y1="-5" x2="8" y2="2" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                </>
                            ) : currentState === 'active' ? (
                                // EAGER EYES
                                <>
                                    <motion.circle cx="-20" cy="0" r="6" fill={THEME.ink} />
                                    <motion.circle cx="20" cy="0" r="6" fill={THEME.ink} />
                                    {/* Highlights */}
                                    <circle cx="-18" cy="-2" r="2" fill="white" />
                                    <circle cx="22" cy="-2" r="2" fill="white" />
                                </>
                            ) : (
                                // NORMAL / BLINKING EYES
                                <>
                                    <motion.ellipse
                                        cx="-20" cy="0" rx="3" ry={isBlinking ? 0.5 : 4}
                                        fill={THEME.ink}
                                    />
                                    <motion.ellipse
                                        cx="20" cy="0" rx="3" ry={isBlinking ? 0.5 : 4}
                                        fill={THEME.ink}
                                    />
                                </>
                            )}
                        </motion.g>

                        {/* Mouth - Enhanced with full oval for active state */}
                        <motion.path
                            fill="none"
                            stroke={currentState === 'annoyed' ? "white" : THEME.ink}
                            strokeWidth={currentState === 'active' ? "2.5" : "1.5"}
                            strokeLinecap="round"
                            animate={
                                currentState === 'annoyed' ? { d: "M-10,20 Q0,8 10,20" } // Frown
                                    : currentState === 'active' ? { d: "M-6,18 C-6,25 6,25 6,18 C6,11 -6,11 -6,18" } // Full "O" Shape (Perfect Oval)
                                        : { d: "M-5,15 Q0,18 5,15" } // Gentle Smile
                            }
                            transition={{ type: "spring", stiffness: 300 }}
                        />

                        {/* Annoyed Squiggles */}
                        <AnimatePresence>
                            {isAnnoyed && (
                                <motion.path
                                    d="M-30,-40 Q-20,-50 -10,-40 T10,-40"
                                    fill="none"
                                    stroke={THEME.alert}
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.g>

                    {/* Arms - Detached & Floating */}
                    {/* Left Arm */}
                    <motion.rect
                        x="35" y="110" width="12" height="35" rx="6"
                        fill="white" stroke={THEME.ink} strokeWidth="1.5"
                        animate={
                            currentState === 'annoyed' ? { rotate: [0, 45, -10, 0], y: -5 }
                                : currentState === 'active' ? { rotate: -15, y: -5, x: 2 }
                                    : currentState === 'hover' ? { rotate: [0, -10, 0], y: -3 }
                                        : { rotate: 0, y: 0 }
                        }
                        transition={currentState === 'annoyed' ? { duration: 0.1, repeat: Infinity } : { type: "spring", stiffness: 100 }}
                    />

                    {/* Right Arm */}
                    <motion.rect
                        x="153" y="110" width="12" height="35" rx="6"
                        fill="white" stroke={THEME.ink} strokeWidth="1.5"
                        animate={
                            currentState === 'annoyed' ? { rotate: [0, -45, 10, 0], y: -5 }
                                : currentState === 'active' ? { rotate: -90, x: -15, y: -25 } // Pointing!
                                    : { rotate: 0, x: 0, y: 0 }
                        }
                        transition={currentState === 'annoyed' ? { duration: 0.1, repeat: Infinity } : { type: "spring", stiffness: 200 }}
                    />
                </motion.g>
            </motion.svg>

            {/* Interaction Text Below */}
            <motion.div
                className="absolute -bottom-8 w-full text-center font-sans text-xs tracking-widest uppercase opacity-50"
                style={{ color: isAnnoyed ? THEME.alert : THEME.clay }}
                animate={{
                    opacity: isHovered || isActive || isAnnoyed ? 1 : 0.5,
                    y: isAnnoyed ? [0, 2, -2, 0] : 0,
                    scale: isAnnoyed ? 1.1 : 1
                }}
            >
                {isAnnoyed ? "HEY! CUT IT OUT!" : isActive ? "Ooh! A classic!" : isHovered ? "At your service" : "Pickel"}
            </motion.div>
        </motion.div>
    );
};

// --- Main FAQ Component ---

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Close FAQ if clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (e.target instanceof Element && !e.target.closest('#faq-container')) {
                setActiveIndex(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-sans" style={{ backgroundColor: THEME.paper }}>
            <FontStyles />

            <section
                id="faq-container"
                className="w-full max-w-6xl px-6 py-20 md:px-12 flex flex-col items-center gap-12 relative"
            >

                {/* Header Area */}
                <div className="text-center max-w-2xl space-y-4 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2"
                    >
                        <span className="font-sans text-sm tracking-[0.2em] uppercase font-semibold" style={{ color: THEME.clay }}>
                            Insights
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold"
                        style={{ color: THEME.ink }}
                    >
                        Common <span className="italic font-normal">Queries</span>
                    </motion.h2>
                </div>

                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-16">

                    {/* Left: Pickel Mascot (Sticky) */}
                    <div className="hidden md:flex md:w-1/3 justify-center md:sticky md:top-32 h-[400px] items-center">
                        <PickelMascot isActive={activeIndex !== null} />
                    </div>

                    {/* Mobile Mascot */}
                    <div className="md:hidden w-full flex justify-center mb-[-40px] z-0 opacity-80">
                        <motion.div style={{ scale: 0.7 }}>
                            <PickelMascot isActive={activeIndex !== null} />
                        </motion.div>
                    </div>

                    {/* Right: FAQ Accordion */}
                    <div className="w-full md:w-2/3 flex flex-col gap-6 z-10">
                        {FAQ_DATA.map((item, idx) => {
                            const isActive = activeIndex === idx;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group border-b pb-2 relative"
                                    style={{ borderColor: isActive ? THEME.clay : '#e5e5e5' }}
                                >
                                    <button
                                        onClick={() => setActiveIndex(isActive ? null : idx)}
                                        className="w-full text-left py-4 flex items-center justify-between gap-4 focus:outline-none"
                                    >
                                        <span
                                            className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${isActive ? 'font-medium' : 'font-normal'}`}
                                            style={{ color: THEME.ink }}
                                        >
                                            {item.question}
                                        </span>

                                        {/* Animated Arrow */}
                                        <motion.div
                                            animate={{ rotate: isActive ? 180 : 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="shrink-0"
                                        >
                                            <ChevronDown
                                                color={isActive ? THEME.clay : THEME.ink}
                                                size={24}
                                            />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-6 pr-8 font-sans leading-relaxed text-lg" style={{ color: THEME.charcoal }}>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Hover Indicator (Left Border) */}
                                    <motion.div
                                        className="absolute left-[-16px] top-4 w-0.5 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ backgroundColor: THEME.clay }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </section>
        </div>
    );
}
