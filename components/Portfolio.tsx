
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { Tape } from './SketchElements';
import { Code, Figma, ExternalLink } from 'lucide-react';
import MagneticObject from './MagneticObject';
import Parallax from './Parallax';

import glassCalculator from '../assets/glass calculator.png';
import focusHub from '../assets/Gemini_Generated_Image_cktoekcktoekckto.png';
import nexusCheck from '../assets/nexpro tpdo.png';
import moodChanger from '../assets/mood changer.png';
import squidly from '../assets/Case study screen 1.png';
import cookbook from '../assets/cookbook.png';
import quizify from '../assets/Quizify.png';
import safegurdian from '../assets/safegurdian.png';
import townSync from '../assets/townsync.png';

const allProjects: Project[] = [
  {
    id: '1',
    title: 'Glass Calculator',
    category: 'Development',
    description: 'Minimalistic glassmorphic calculator with responsive UI.',
    year: '2024',
    image: glassCalculator,
    tags: ['HTML', 'CSS', 'JS'],
    links: {
      demo: 'https://glasscalcuator.vercel.app/',
      code: 'https://github.com/plunkerrao21/glasscalcuator'
    }
  },
  {
    id: '2',
    title: 'FocusHub Landing',
    category: 'Development',
    description: 'Modern landing page with beautiful animations.',
    year: '2024',
    image: focusHub,
    tags: ['Frontend', 'Animation'],
    links: {
      demo: 'https://focus-hub-landingpage.vercel.app/',
      code: 'https://github.com/plunkerrao21/FocusHub-Landingpage'
    }
  },
  {
    id: '3',
    title: 'NexusCheck To-Do',
    category: 'Development',
    description: 'Interactive to-do list with advanced task management.',
    year: '2023',
    image: nexusCheck,
    tags: ['Productivity', 'Web App'],
    links: {
      demo: 'https://to-do-list-nexuscheck.vercel.app/',
      code: 'https://github.com/plunkerrao21/TO-do-list-nexuscheck-'
    }
  },
  {
    id: '4',
    title: 'Mood Changer',
    category: 'Development',
    description: 'Interactive mood tracking app with dynamic themes.',
    year: '2023',
    image: moodChanger,
    tags: ['Interactive', 'Theme'],
    links: {
      demo: 'https://mood-changer-plunkerrao21-git-main-anuj-dighes-projects.vercel.app/',
      code: 'https://github.com/plunkerrao21/Mood-changer-plunkerrao21'
    }
  },
  {
    id: '5',
    title: 'Squidly Expense Tracker',
    category: 'Design',
    description: 'Dark/light mode budgeting app with data visualization.',
    year: '2024',
    image: squidly,
    tags: ['Figma', 'UI/UX'],
    links: {
      design: 'https://www.figma.com/design/J86EQsEnzj57EC20XsM6Hl/SQUIDLY--UI---expense-tracker-?node-id=432-1015',
      caseStudy: 'https://www.figma.com/design/HCZJBJCgYDjp2loBT69Ext/Case-study-expense-tracker?node-id=527-12295'
    }
  },
  {
    id: '6',
    title: 'Cookbook Recipe App',
    category: 'Design',
    description: 'Cooking assistant with step-by-step guides & interesting recipes.',
    year: '2024',
    image: cookbook,
    tags: ['Mobile App', 'Micro-interactions'],
    links: {
      design: 'https://www.figma.com/design/8JtSFzHXpSFpYWTqF8bI8M/COOKBOOK--recipe-app-'
    }
  },
  {
    id: '7',
    title: 'Quizify',
    category: 'Design',
    description: 'Interactive quiz platform with engaging user experience.',
    year: '2024',
    image: quizify,
    tags: ['Web Design', 'Internship'],
    links: {
      design: 'https://www.figma.com/design/Og3hfsUcIZBQTmeHcPp1Ty/Quiz_Prototype?node-id=0-1&p=f&t=Ku0xLuwBKztX8sQJ-0'
    }
  },
  {
    id: '8',
    title: "Women's Safety App",
    category: 'Design',
    description: 'Emergency alert system with location sharing.',
    year: '2024',
    image: safegurdian,
    tags: ['UX Research', 'Social Impact'],
    links: {
      design: 'https://www.figma.com/design/ZX7Q3osw3j2FhtgZuCGMUM/Womens-safety-app'
    }
  },
  {
    id: '9',
    title: 'TownSync Event App',
    category: 'Design',
    description: 'Local event discovery platform & social connection.',
    year: '2024',
    image: townSync,
    tags: ['App Design', 'Community'],
    links: {
      design: 'https://www.figma.com/design/3CXSii227KL1vQVcznqOfd/Townsync'
    }
  }
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Development' | 'Design'>('All');

  const filteredProjects = allProjects.filter(p => filter === 'All' || p.category === filter);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="work" className="w-full py-32 px-6 md:px-12 bg-paper relative min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header & Filter */}
        <Parallax speed={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-stone-200 pb-8">
            <div>
              <motion.h2
                className="font-serif text-4xl md:text-5xl text-ink mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Selected Works
              </motion.h2>
              <div className="flex gap-4 font-sans text-sm tracking-wide">
                {['All', 'Development', 'Design'].map((f) => (
                  <MagneticObject key={f} bubbleText={`Filter: ${f}`} strength={0.2}>
                    <button
                      onClick={() => setFilter(f as any)}
                      className={`pb-1 transition-all ${filter === f ? 'text-ink border-b border-clay' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                      {f}
                    </button>
                  </MagneticObject>
                ))}
              </div>
            </div>
            <p className="text-sm font-hand text-stone-400 mt-6 md:mt-0 rotate-[-2deg]">
              From concept to code
            </p>
          </div>
        </Parallax>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-24">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative flex flex-col"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {/* Image Area */}
              <Parallax speed={index % 2 === 0 ? 0.3 : -0.3}>
                <MagneticObject bubbleText="View Details" strength={0.1}>
                  <motion.div
                    className="relative aspect-[4/3] w-full mb-6 transition-transform duration-500 group-hover:-translate-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Tape className={index % 2 === 0 ? '-rotate-12' : 'rotate-12 right-0 left-auto'} />

                    <div className="w-full h-full overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  </motion.div>
                </MagneticObject>
              </Parallax>

              {/* Content */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-mono text-[10px] font-medium text-clay uppercase tracking-widest">
                    {project.category}
                  </span>
                  <span className="font-hand text-stone-400 text-xs">{project.year}</span>
                </div>

                <h3 className="font-serif text-2xl text-ink mb-2 group-hover:underline decoration-1 underline-offset-4 decoration-stone-300">
                  {project.title}
                </h3>

                <p className="text-stone-600 font-sans text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {project.links.demo && (
                    <MagneticObject bubbleText="Launch" strength={0.1}>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-ink text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-all shadow-sm hover:shadow-md"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    </MagneticObject>
                  )}
                  {project.links.code && (
                    <MagneticObject bubbleText="Source Code" strength={0.1}>
                      <a
                        href={project.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 border border-stone-300 text-ink px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:border-ink hover:bg-white transition-all"
                      >
                        <Code size={14} /> Code
                      </a>
                    </MagneticObject>
                  )}

                  {/* Design Links use the Outline Style */}
                  {project.links.design && (
                    <MagneticObject bubbleText="Figma File" strength={0.1}>
                      <a
                        href={project.links.design}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-ink text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-all shadow-sm hover:shadow-md"
                      >
                        <Figma size={14} /> View Design
                      </a>
                    </MagneticObject>
                  )}
                  {project.links.caseStudy && (
                    <MagneticObject bubbleText="Read Case Study" strength={0.1}>
                      <a
                        href={project.links.caseStudy}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 border border-stone-300 text-ink px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:border-ink hover:bg-white transition-all"
                      >
                        Case Study
                      </a>
                    </MagneticObject>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
