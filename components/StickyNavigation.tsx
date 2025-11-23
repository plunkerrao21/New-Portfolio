import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../types';

interface NavigationProps {
    currentSection: Section;
    onNavigate: (section: Section) => void;
}

const StickyNavigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
    const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
    const [isScrolled, setIsScrolled] = useState(false);

    // Mouse tracking for logo tilt
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    // Scroll detection for styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { id: Section.HERO, label: 'Home', number: '01' },
        { id: Section.WORK, label: 'Work', number: '02' },
        { id: Section.ABOUT, label: 'About', number: '03' },
        { id: Section.CONTACT, label: 'Contact', number: '04' },
    ];

    return (
        <header
            className={`
          fixed top-0 left-0 right-0 h-[80px] z-50 
          flex items-center justify-between px-8 md:px-16
          transition-all duration-500 ease-out
          ${isScrolled ? 'bg-[#F6F5F3]/80 backdrop-blur-md border-b border-ink/10' : 'bg-transparent border-b border-transparent'}
      `}
        >
            {/* LEFT: MONOGRAM LOGO */}
            <div onClick={() => onNavigate(Section.HERO)} className="cursor-pointer">
                <Logo mouse={mouse} />
            </div>

            {/* RIGHT: NAVIGATION */}
            <nav className="flex items-center gap-12">
                {links.map((link) => (
                    <NavItem
                        key={link.id}
                        number={link.number}
                        text={link.label}
                        isActive={currentSection === link.id}
                        onClick={() => onNavigate(link.id)}
                    />
                ))}
            </nav>
        </header>
    );
};

// --- SUB-COMPONENTS ---

const Logo = ({ mouse }: { mouse: { x: number, y: number } }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from logo center
        const dist = Math.sqrt(
            Math.pow(mouse.x - centerX, 2) + Math.pow(mouse.y - centerY, 2)
        );

        // Only tilt if within range
        if (dist < 200) {
            const rotateY = ((mouse.x - centerX) / 100) * 15; // Max 15 deg
            const rotateX = -((mouse.y - centerY) / 100) * 15;
            setRotate({ x: rotateX, y: rotateY });
        } else {
            setRotate({ x: 0, y: 0 });
        }

    }, [mouse]);

    return (
        <div
            ref={ref}
            className="perspective-500 group"
        >
            <div
                className="w-10 h-10 border border-ink flex items-center justify-center transition-transform duration-200 ease-out will-change-transform bg-[#F6F5F3]"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                }}
            >
                <span className="font-serif font-bold text-ink text-sm">AD</span>
            </div>
        </div>
    );
};

const NavItem = ({ text, number, isActive, onClick }: { text: string, number: string, isActive: boolean, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-start py-2 cursor-pointer bg-transparent border-none p-0"
        >
            {/* Micro-float text */}
            <span className={`text-[10px] text-stone-400 mb-1 transition-all duration-500 ease-out transform font-mono ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                {number}
            </span>
            <span className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-500 group-hover:translate-y-[-2px] ${isActive ? 'text-ink' : 'text-stone-500 group-hover:text-ink'}`}>
                {text}
            </span>

            {/* Structural Underline Reveal */}
            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-ink origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />

            {/* Secondary faint line for 'technical' feel */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-ink/20 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </button>
    );
};

export default StickyNavigation;
