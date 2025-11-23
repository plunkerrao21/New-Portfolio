import React from 'react';
import { motion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';
import {
    SiJavascript, SiReact, SiOpenai
} from 'react-icons/si';
import { Layout, PenTool, Layers, Sparkles } from 'lucide-react';

// SVG Assets
import figmaIcon from '../assets/figma.svg';
import htmlIcon from '../assets/html5.svg';
import cssIcon from '../assets/css.svg';
import gitIcon from '../assets/git.svg';
import claudeIcon from '../assets/claude.svg';
import framerIcon from '../assets/framer.svg';
import webflowIcon from '../assets/webflow.svg';
import geminiIcon from '../assets/googlegemini.svg';
import wixIcon from '../assets/wix.svg';
import notionIcon from '../assets/notion.svg';

// Skills Data
const SKILLS = [
    { id: 1, name: 'Figma', level: 'Expert', years: '6', icon: figmaIcon, isSvg: true, category: 'Design', description: 'High-fidelity prototyping and design system management with advanced component libraries.', color: '#8a817c' },
    { id: 2, name: 'Framer', level: 'Advanced', years: '3', icon: framerIcon, isSvg: true, category: 'Design', description: 'Interactive sites with advanced animations and CMS integration.', color: '#2B2A29' },
    { id: 3, name: 'Webflow', level: 'Advanced', years: '4', icon: webflowIcon, isSvg: true, category: 'Design', description: 'Visual development for responsive, high-performance websites.', color: '#3d3d3d' },
    { id: 4, name: 'Wix Studio', level: 'Expert', years: '5', icon: wixIcon, isSvg: true, category: 'Design', description: 'Advanced layout capabilities and custom interactions for client projects.', color: '#d6d3d1' },
    { id: 5, name: 'Notion', level: 'Expert', years: '4', icon: notionIcon, isSvg: true, category: 'Productivity', description: 'Project management, documentation, and knowledge base organization.', color: '#8a817c' },
    { id: 6, name: 'Gemini', level: 'Advanced', years: '2', icon: geminiIcon, isSvg: true, category: 'AI Tools', description: 'Multimodal AI for content generation, code assistance, and analysis.', color: '#2B2A29' },
    { id: 7, name: 'Claude', level: 'Advanced', years: '2', icon: claudeIcon, isSvg: true, category: 'AI Tools', description: 'Advanced AI workflows for design thinking and problem-solving.', color: '#3d3d3d' },
    { id: 8, name: 'ChatGPT', level: 'Advanced', years: '2', icon: SiOpenai, isSvg: false, category: 'AI Tools', description: 'AI-assisted content creation, UX writing, and design system documentation.', color: '#8a817c' },
    { id: 9, name: 'HTML/CSS', level: 'Advanced', years: '5', icon: htmlIcon, isSvg: true, category: 'Technical', description: 'Semantic HTML and modern CSS including Grid, Flexbox, and animations.', color: '#2B2A29' },
    { id: 10, name: 'JavaScript', level: 'Advanced', years: '4', icon: SiJavascript, isSvg: false, category: 'Technical', description: 'ES6+ JavaScript for interactive web experiences and DOM manipulation.', color: '#d6d3d1' },
    { id: 11, name: 'React', level: 'Intermediate', years: '3', icon: SiReact, isSvg: false, category: 'Technical', description: 'Component-based development with hooks and modern React patterns.', color: '#3d3d3d' },
    { id: 12, name: 'Git', level: 'Intermediate', years: '4', icon: gitIcon, isSvg: true, category: 'Technical', description: 'Version control, branching strategies, and collaborative workflows.', color: '#8a817c' },
];

const Toolkit: React.FC = () => {

    return (
        <section id="toolkit" className="w-full py-32 px-6 md:px-12 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4">
                        Toolkit <span className="text-stone-400 italic">& Skills</span>
                    </h2>
                    <p className="text-stone-500 text-lg">
                        Hover to explore
                    </p>
                </motion.div>

                {/* Constellation Container */}
                <div className="relative w-full min-h-[600px] md:min-h-[700px]">
                    {/* Decorative Background Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-10 stroke-stone-300 stroke-1 pointer-events-none">
                        <line x1="20%" y1="30%" x2="45%" y2="20%" />
                        <line x1="45%" y1="20%" x2="70%" y2="40%" />
                        <line x1="20%" y1="30%" x2="25%" y2="60%" />
                        <line x1="25%" y1="60%" x2="60%" y2="70%" />
                        <line x1="70%" y1="40%" x2="60%" y2="70%" />
                        <circle cx="45%" cy="20%" r="2" fill="#8a817c" />
                        <circle cx="25%" cy="60%" r="2" fill="#8a817c" />
                        <circle cx="70%" cy="40%" r="2" fill="#8a817c" />
                    </svg>

                    {/* Skill Nodes */}
                    {SKILLS.map((skill, index) => {
                        const row = Math.floor(index / 4);
                        const col = index % 4;
                        const xOffset = (col * 23) + (Math.random() * 8 - 4);
                        const yOffset = (row * 28) + (Math.random() * 8 - 4);

                        return (
                            <div
                                key={skill.id}
                                className="absolute"
                                style={{
                                    left: `${xOffset + 8}%`,
                                    top: `${yOffset + 10}%`,
                                }}
                            >
                                <MagneticWrapper strength={40}>
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 5, zIndex: 50 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            opacity: { duration: 0.5, delay: index * 0.1 },
                                            y: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }
                                        }}
                                        className="group relative flex flex-col items-center justify-center cursor-default"
                                    >
                                        {/* Orb */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-paper border border-pencil shadow-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-ink overflow-hidden p-4">
                                            {skill.isSvg ? (
                                                <img
                                                    src={skill.icon as string}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                                />
                                            ) : (
                                                React.createElement(skill.icon as React.ComponentType<any>, {
                                                    size: 32,
                                                    className: "text-clay group-hover:text-ink transition-colors duration-300"
                                                })
                                            )}
                                        </div>

                                        {/* Label */}
                                        <motion.div
                                            className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        >
                                            <span className="text-ink font-serif italic tracking-wide whitespace-nowrap text-sm">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </MagneticWrapper>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Toolkit;
