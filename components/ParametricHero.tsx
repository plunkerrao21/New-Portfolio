import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagneticObject from './MagneticObject';
import profileImage from '../assets/Myimage.webp';
import SplitText from './SplitText';

interface ParametricHeroProps {
    isLoading?: boolean;
    onScrollDown: () => void;
    onConnect: () => void;
}

const ParametricHero: React.FC<ParametricHeroProps> = ({ isLoading = false, onScrollDown, onConnect }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();

    // Scroll animations
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
    const y = useTransform(scrollY, [0, 500], [0, 100]);

    // Grid logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width; // 0 to 1
        const y = (e.clientY - top) / height; // 0 to 1
        setMousePos({ x, y });
    };

    // Generate 8x8 grid
    const gridCells = Array.from({ length: 64 });

    return (
        <motion.section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{ opacity, scale, y }}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#F6F5F3] px-6 md:px-12"
        >
            {/* Interactive Symbol Grid Background */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-8 p-12 pointer-events-none z-0">
                {gridCells.map((_, i) => {
                    const row = Math.floor(i / 8);
                    const col = i % 8;

                    // Calculate distance from mouse (normalized)
                    const cellX = col / 8;
                    const cellY = row / 8;
                    const dist = Math.sqrt(Math.pow(cellX - mousePos.x, 2) + Math.pow(cellY - mousePos.y, 2));

                    // React only if close
                    const isActive = dist < 0.3;
                    const rotation = isActive ? (dist * 45) : 0;
                    const scale = isActive ? 1 + (0.3 - dist) : 1;
                    const opacity = isActive ? 0.4 : 0.1;

                    return (
                        <motion.div
                            key={i}
                            animate={{
                                rotateX: isActive ? (mousePos.y - cellY) * 30 : 0,
                                rotateY: isActive ? (mousePos.x - cellX) * 30 : 0,
                                scale,
                                opacity
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="flex items-center justify-center"
                        >
                            <div className="w-1 h-1 bg-ink rounded-full" />
                        </motion.div>
                    );
                })}
            </div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 h-full items-center">

                {/* Left: Editorial Portrait */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={!isLoading ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="relative aspect-[3/4] bg-stone-200 overflow-hidden shadow-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-700 ease-out"
                    >
                        <img src={profileImage} alt="Anuj D. Dighe" className="absolute inset-0 w-full h-full object-cover" />

                        {/* Specular highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </motion.div>

                    <div className="mt-6 flex justify-between items-end">
                        <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                            Based in Maharashtra, IN
                        </span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-mono text-[10px] text-ink uppercase tracking-widest">
                                Parametric Mode: Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Typography & Content */}
                <div className="lg:col-span-7 flex flex-col justify-center h-full order-1 lg:order-2 pl-0 lg:pl-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={!isLoading ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-ink leading-[0.9] tracking-tight mb-6">
                            <SplitText text="Anuj D." variant="premium" trigger={!isLoading} />
                            <br />
                            <span className="italic text-stone-400 block">
                                <SplitText text="Dighe" delay={0.5} variant="premium" trigger={!isLoading} />
                            </span>
                        </h1>

                        <div className="h-px w-24 bg-ink mb-8" />

                        <h2 className="font-sans text-xl md:text-2xl text-stone-600 font-light tracking-wide mb-12 max-w-md">
                            <SplitText text="UI/UX Designer &" variant="minimal" delay={1.0} trigger={!isLoading} />
                            <br />
                            <span className="text-ink font-normal">
                                <SplitText text="AI Prototyper" variant="minimal" delay={1.2} trigger={!isLoading} />
                            </span>
                        </h2>

                        <div className="flex flex-wrap gap-8 items-center">
                            <MagneticObject strength={0.4} bubbleText="View Projects">
                                <button
                                    onClick={onScrollDown}
                                    className="group relative px-8 py-4 bg-ink overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <span className="relative z-10 font-sans text-sm uppercase tracking-[0.2em] text-white group-hover:text-stone-200 transition-colors duration-300">
                                        Selected Work
                                    </span>
                                </button>
                            </MagneticObject>

                            <MagneticObject strength={0.4} bubbleText="Say Hello">
                                <button
                                    onClick={onConnect}
                                    className="group relative px-6 py-3 border border-stone-300 hover:border-ink transition-colors duration-300"
                                >
                                    <span className="font-sans text-sm uppercase tracking-[0.2em] text-stone-500 group-hover:text-ink transition-colors duration-300">
                                        Contact
                                    </span>
                                </button>
                            </MagneticObject>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-8 font-mono text-[10px] text-stone-400 flex items-center gap-4"
            >
                <span>SCROLL TO EXPLORE</span>
                <div className="w-12 h-px bg-stone-300" />
            </motion.div>

        </motion.section>
    );
};

export default ParametricHero;
