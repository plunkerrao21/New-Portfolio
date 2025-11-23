import React, { useEffect, useRef, useState } from 'react';

const FloatingScrollbar: React.FC = () => {
    const barRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!barRef.current) return;

            // Show scrollbar
            setOpacity(0.8);

            // Calculate Position
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            // Avoid division by zero
            const maxScroll = docHeight - windowHeight;
            if (maxScroll <= 0) return;

            const scrollFraction = scrollTop / maxScroll;

            // Configuration
            const margin = 20;
            const barHeight = 60; // Fixed height
            const availableHeight = windowHeight - (margin * 2) - barHeight;

            const translateY = margin + (scrollFraction * availableHeight);

            // Apply transform
            barRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;

            // Handle Idle State
            if (idleTimer.current) clearTimeout(idleTimer.current);

            idleTimer.current = setTimeout(() => {
                setOpacity(0);
            }, 600);
        };

        // Initial update
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 right-5 w-[4px] h-[60px] bg-ink rounded-full z-[9999] pointer-events-none transition-opacity duration-300 ease-out will-change-transform shadow-sm backdrop-blur-sm"
            style={{
                opacity: opacity,
                // Use a subtle shadow instead of neon glow to match "Quiet Luxury"
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }}
        />
    );
};

export default FloatingScrollbar;
