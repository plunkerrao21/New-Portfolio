import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Section } from './types';
import StickyNavigation from './components/StickyNavigation';
import ParametricHero from './components/ParametricHero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Journey from './components/Journey';
import Toolkit from './components/Toolkit';
import Contact from './components/Contact';
import { LivingCursor } from './components/Cursor';
import LoadingRitual from './components/LoadingRitual';
import FloatingScrollbar from './components/FloatingScrollbar';
import FAQSection from './components/FAQSection';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<Section>(Section.HERO);

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section === Section.HERO ? 'root' : section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(section);
    }
  };

  // Force scroll to top on reload
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Simple scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = [Section.HERO, Section.WORK, Section.ABOUT, Section.CONTACT];

      for (const section of sections) {
        if (section === Section.HERO) {
          if (window.scrollY < 300) {
            setCurrentSection(Section.HERO);
            break;
          }
          continue;
        }

        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingRitual onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`relative bg-[#F6F5F3] min-h-screen overflow-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <LivingCursor />
        <FloatingScrollbar />

        <StickyNavigation
          currentSection={currentSection}
          onNavigate={scrollToSection}
        />

        <main>
          <div id="hero">
            <ParametricHero
              isLoading={isLoading}
              onScrollDown={() => scrollToSection(Section.WORK)}
              onConnect={() => scrollToSection(Section.CONTACT)}
            />
          </div>
          <Portfolio />
          <Journey />
          <About />
          <Toolkit />
          <FAQSection />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default App;
