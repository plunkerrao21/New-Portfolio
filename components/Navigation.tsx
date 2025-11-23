import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../types';
import MagneticObject from './MagneticObject';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000); // Delay appearance after ritual
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { id: Section.WORK, label: 'Work' },
    { id: Section.LAB, label: 'Lab' },
    { id: Section.ABOUT, label: 'About' },
    { id: Section.CONTACT, label: 'Contact' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto"
        >
          <div className="flex items-center gap-2 px-2 py-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-2xl ring-1 ring-black/5">

            {/* Home / Logo Button */}
            <MagneticObject strength={0.2} bubbleText="Home">
              <button
                onClick={() => onNavigate(Section.HERO)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200 p-1.5"
              >
                <img
                  src="/assets/AD-logo.svg"
                  alt="AD Logo"
                  className="w-full h-full object-contain"
                />
              </button>
            </MagneticObject>

            <div className="w-px h-4 bg-stone-300 mx-1" />

            {/* Links */}
            <div className="flex gap-1">
              {links.map((link) => {
                const isActive = currentSection === link.id;
                return (
                  <MagneticObject key={link.id} strength={0.1} bubbleText={link.label}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className={`relative px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-300 ${isActive
                        ? 'text-white bg-ink shadow-md'
                        : 'text-stone-500 hover:text-ink hover:bg-stone-100'
                        }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-ink rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </MagneticObject>
                );
              })}
            </div>

            <div className="w-px h-4 bg-stone-300 mx-1" />

            {/* Status Indicator */}
            <div className="px-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider hidden sm:block">
                Online
              </span>
            </div>

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
