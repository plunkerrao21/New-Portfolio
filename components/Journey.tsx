import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, Sparkles, ArrowRight, X, Layout, Code2
} from 'lucide-react';

// --- Data: The Journey with Narrative Voice ---
const MILESTONES = [
    {
        id: 1,
        year: '2024 - Present',
        title: 'AI-Enhanced Design Mastery',
        role: 'Pioneering Designer',
        company: 'Self-Directed',
        icon: Sparkles,
        speech: "I'm not just designing interfaces; I'm designing the future of how we interact with AI.",
        description: 'Pioneering AI-powered design workflows and advanced prototyping techniques. Integrating Generative AI into everyday design processes.',
        note: 'The Future.',
        tags: ['AI Integration', 'Generative Design', 'Future Tech'],
        details: 'Exploring the intersection of AI and UX. Developing workflows that leverage LLMs for content generation, Midjourney for visual exploration, and custom AI agents for design systems.'
    },
    {
        id: 2,
        year: '2025',
        title: 'UX Design Intern',
        role: 'Intern',
        company: 'Ceeras IT Services',
        icon: Layout,
        speech: "Real clients, real deadlines, real impact. This was the crucible.",
        description: '6-month intensive UX design internship. Worked on live client projects, conducting user research, and creating high-fidelity prototypes.',
        note: 'Professional Growth.',
        tags: ['Client Projects', 'User Research', 'Prototyping'],
        details: 'Collaborated with cross-functional teams to deliver user-centric design solutions. Conducted usability testing and iterated on designs based on user feedback.'
    },
    {
        id: 3,
        year: '2025',
        title: 'Web Design Intern',
        role: 'Intern',
        company: 'Olcademy',
        icon: Code2,
        speech: "Bridging the gap between 'looks good' and 'works perfectly'.",
        description: 'Focused on responsive web design, accessibility standards, and modern frontend development practices.',
        note: 'Technical Skills.',
        tags: ['Responsive Design', 'Accessibility', 'Frontend'],
        details: 'Gained hands-on experience with modern web technologies. Learned the importance of semantic HTML, accessible color contrast, and responsive layouts for various devices.'
    },
    {
        id: 4,
        year: '2022 - 2026',
        title: 'Computer Engineering',
        role: 'Bachelor of Engineering',
        company: 'University',
        icon: GraduationCap,
        speech: "Building the foundation. Understanding the machine behind the pixel.",
        description: "Bachelor's degree focusing on software development, algorithms, and Human-Computer Interaction (HCI).",
        note: 'The Foundation.',
        tags: ['Software Engineering', 'HCI', 'Algorithms'],
        details: 'A comprehensive engineering education providing a deep understanding of software architecture, data structures, and the technical constraints of digital product development.'
    },
];

// --- Components ---

/**
 * DetailModal: Opens when a milestone is clicked
 */
const DetailModal = ({ item, onClose }: { item: any, onClose: () => void }) => {
    if (!item) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-paper w-full max-w-xl shadow-2xl overflow-hidden relative border border-ink"
            >
                <div className="h-2 bg-clay" />
                <button onClick={onClose} className="absolute top-4 right-4 text-clay hover:text-ink">
                    <X size={24} />
                </button>

                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="font-serif italic text-2xl text-clay">{item.year}</span>
                        <div className="h-px flex-grow bg-pencil" />
                    </div>

                    <h3 className="text-3xl font-serif text-ink mb-1">{item.title}</h3>
                    <p className="text-sm uppercase tracking-widest text-charcoal mb-6">{item.role} @ {item.company}</p>

                    <div className="prose prose-stone mb-8">
                        <p className="text-charcoal leading-relaxed">{item.details}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-pencil/20 text-charcoal text-xs rounded-full border border-pencil">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 p-10 opacity-5 pointer-events-none">
                    <item.icon size={120} />
                </div>
            </motion.div>
        </motion.div>
    );
};

/**
 * MilestoneCard: The individual timeline entry
 */
const MilestoneCard = ({ item, index, onClick, onActive }: { item: any, index: number, onClick: (item: any) => void, onActive: (index: number) => void }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            // Notify parent when this card is in view
            onViewportEnter={() => onActive(index)}
            viewport={{ margin: "-40% 0px -40% 0px" }} // Trigger when card is roughly in middle of screen

            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative flex items-center justify-between md:justify-center w-full mb-16 md:mb-32 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Spacer for Desktop Alignment */}
            <div className="hidden md:block w-5/12" />

            {/* Center Node Indicator */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                <motion.div
                    whileInView={{ scale: [0, 1.2, 1], backgroundColor: ["#Fdfcf8", "#8a817c", "#Fdfcf8"] }}
                    viewport={{ once: false, margin: "-45% 0px -45% 0px" }}
                    className="w-4 h-4 rounded-full bg-paper border-4 border-clay shadow-sm"
                />
            </div>

            {/* Content Card */}
            <div className="w-full pl-20 md:pl-0 md:w-5/12">
                <motion.div
                    onClick={() => onClick(item)}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white/80 backdrop-blur-sm border border-pencil/50 p-6 md:p-8 rounded-sm cursor-pointer transition-all hover:shadow-xl hover:border-clay"
                >
                    {/* Floating Note (Handwritten) */}
                    <motion.span
                        initial={{ opacity: 0, rotate: isEven ? -5 : 5 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`absolute -top-6 ${isEven ? '-right-2' : '-left-2'} font-hand text-clay text-lg transform hidden lg:block`}
                    >
                        {item.note}
                    </motion.span>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="font-serif italic text-clay text-lg">{item.year}</span>
                            <h3 className="text-2xl font-serif text-ink group-hover:text-clay transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-xs uppercase tracking-wider text-pencil font-medium mt-1">
                                {item.company}
                            </p>
                        </div>
                        <div className="p-3 bg-paper rounded-full border border-pencil group-hover:border-clay group-hover:scale-110 transition-all">
                            <item.icon size={24} className="text-charcoal" />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-charcoal font-light text-sm leading-relaxed mb-4">
                        {item.description}
                    </p>

                    {/* "More" Link */}
                    <div className="flex items-center gap-2 text-ink text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        Read story <ArrowRight size={12} />
                    </div>

                    {/* Click Feedback Ripple (Conceptual) */}
                    <div className="absolute inset-0 pointer-events-none rounded-sm border border-clay opacity-0 group-active:opacity-100 group-active:scale-95 transition-all" />
                </motion.div>
            </div>
        </motion.div>
    );
};

/**
 * Journey Component
 */
const Journey: React.FC = () => {
    const containerRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track scroll progress of the specific container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Smooth spring for the line drawing
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="journey" className="relative w-full bg-paper text-ink overflow-hidden py-32">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
            }} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="font-hand text-clay text-3xl mb-4 rotate-[-2deg]">The scenic route</h2>
                    <h1 className="font-serif text-5xl md:text-6xl text-ink">My Journey</h1>
                    <p className="mt-6 text-charcoal max-w-md mx-auto font-light">
                        <span className="text-xs opacity-50 mt-2 block tracking-widest">SCROLL TO EXPLORE</span>
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative max-w-6xl mx-auto pb-20">

                    {/* The Central Line Container */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-pencil/30 -translate-x-1/2 h-full">
                        {/* The Animated Filling Line */}
                        <motion.div
                            style={{ scaleY, transformOrigin: 'top' }}
                            className="w-full bg-ink w-[2px] -ml-[0.5px]"
                        />
                    </div>

                    {/* Milestones List */}
                    <div className="relative pt-20">
                        {MILESTONES.map((item, index) => (
                            <MilestoneCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={setSelectedItem}
                                onActive={setActiveIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedItem && (
                    <DetailModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
};

export default Journey;
