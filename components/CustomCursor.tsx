import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
    type: 'default' | 'hover' | 'click' | 'text' | 'drag' | 'image';
    label?: string;
}

const CustomCursor: React.FC = () => {
    const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
    const [isVisible, setIsVisible] = useState(false);

    // Smooth cursor position tracking
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Interactive element detection
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Links and buttons - expand cursor
            if (target.closest('a, button, [role="button"]')) {
                const element = target.closest('a, button, [role="button"]') as HTMLElement;
                const label = element.getAttribute('aria-label') || element.textContent?.trim().substring(0, 20) || 'View';
                setCursorState({ type: 'hover', label });
                return;
            }

            // Text selection - change to text cursor
            if (target.closest('p, h1, h2, h3, h4, h5, h6, span, li, td')) {
                setCursorState({ type: 'text' });
                return;
            }

            // Images - magnify effect
            if (target.closest('img, [data-cursor="image"]')) {
                setCursorState({ type: 'image' });
                return;
            }

            // Draggable elements
            if (target.closest('[draggable="true"], [data-cursor="drag"]')) {
                setCursorState({ type: 'drag' });
                return;
            }

            // Default state
            setCursorState({ type: 'default' });
        };

        const handleMouseDown = () => {
            setCursorState(prev => ({ ...prev, type: 'click' }));
        };

        const handleMouseUp = () => {
            setCursorState(prev => ({
                ...prev,
                type: prev.type === 'click' ? 'default' : prev.type
            }));
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isVisible, cursorX, cursorY]);

    const getCursorSize = () => {
        switch (cursorState.type) {
            case 'hover':
                return { width: 80, height: 80 };
            case 'click':
                return { width: 30, height: 30 };
            case 'text':
                return { width: 2, height: 24 };
            case 'image':
                return { width: 100, height: 100 };
            case 'drag':
                return { width: 60, height: 60 };
            default:
                return { width: 40, height: 40 };
        }
    };

    const size = getCursorSize();

    return (
        <>
            {/* Main Cursor */}
            <motion.div
                className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: size.width,
                    height: size.height,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    width: { type: 'spring', stiffness: 300, damping: 25 },
                    height: { type: 'spring', stiffness: 300, damping: 25 },
                    opacity: { duration: 0.2 },
                }}
            >
                {/* Cursor Dot/Shape */}
                <motion.div
                    className="w-full h-full relative flex items-center justify-center"
                    animate={{
                        rotate: cursorState.type === 'hover' ? 45 : 0,
                    }}
                >
                    {cursorState.type === 'text' ? (
                        // Text selection cursor
                        <div className="w-full h-full bg-white rounded-sm" />
                    ) : cursorState.type === 'image' ? (
                        // Image hover effect
                        <div className="w-full h-full border-2 border-white rounded-full relative">
                            <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full" />
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
                        </div>
                    ) : cursorState.type === 'drag' ? (
                        // Drag cursor with arrows
                        <div className="w-full h-full border-2 border-white rounded-full relative flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </div>
                    ) : (
                        // Default/Hover cursor
                        <motion.div
                            className="w-full h-full bg-white rounded-full"
                            animate={{
                                scale: cursorState.type === 'click' ? 0.8 : 1,
                            }}
                        />
                    )}
                </motion.div>

                {/* Hover Label */}
                {cursorState.type === 'hover' && cursorState.label && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white text-ink px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    >
                        {cursorState.label}
                    </motion.div>
                )}
            </motion.div>

            {/* Trailing Circle */}
            <motion.div
                className="custom-cursor-trail fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: size.width + 20,
                    height: size.height + 20,
                    opacity: isVisible && cursorState.type !== 'text' ? 0.3 : 0,
                }}
                transition={{
                    width: { type: 'spring', stiffness: 150, damping: 20 },
                    height: { type: 'spring', stiffness: 150, damping: 20 },
                    opacity: { duration: 0.3 },
                }}
            >
                <div className="w-full h-full border-2 border-white rounded-full mix-blend-difference" />
            </motion.div>
        </>
    );
};

export default CustomCursor;
