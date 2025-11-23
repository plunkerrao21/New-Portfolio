import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number; // -1 to 1, negative = slower, positive = faster
    className?: string;
}

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.5, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
};

export default Parallax;
