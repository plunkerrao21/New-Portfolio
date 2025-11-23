import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
    children: React.ReactNode;
    strength?: number;
}

const MagneticWrapper: React.FC<MagneticWrapperProps> = ({ children, strength = 30 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Calculate center
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Distance from center
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        // Apply movement
        position.x.set(deltaX * (strength / 100));
        position.y.set(deltaY * (strength / 100));
    };

    const reset = () => {
        position.x.set(0);
        position.y.set(0);
    };

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(position.x, springConfig);
    const springY = useSpring(position.y, springConfig);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
            className="relative z-10"
        >
            {children}
        </motion.div>
    );
};

export default MagneticWrapper;
