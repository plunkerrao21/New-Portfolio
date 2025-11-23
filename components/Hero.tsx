
import React, { useEffect, useState } from 'react';
import { ArrowDown, MousePointer2, PenTool } from 'lucide-react';
import { SketchUnderline } from './SketchElements';
import MagneticObject from './MagneticObject';

interface HeroProps {
    onScrollDown: () => void;
    onConnect: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollDown, onConnect }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Generate grid cells
    const cells = Array.from({ length: 64 });

    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-paper pt-20">

            {/* Reactive Background Grid */}
            <div className="absolute inset-0 z-0 grid grid-cols-8 grid-rows-8 gap-px opacity-10 pointer-events-auto">
                {cells.map((_, i) => (
                    <MagneticObject
                        key={i}
                        isGridCell
                        strength={0.1}
                        bubbleText="Explore Space"
                        className="w-full h-full border-[0.5px] border-ink/10 hover:bg-ink/5 transition-colors duration-500"
                    >
                        <div className="w-full h-full"></div>
                    </MagneticObject>
                ))}
            </div>

            {/* Main Content */}
            <div className={`relative z-10 max-w-5xl px-6 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <div className="mb-8 flex justify-center items-center gap-3 opacity-60">
                    <div className="h-[1px] w-12 bg-stone-300"></div>
                    <span className="font-mono text-xs tracking-widest uppercase text-stone-500">Est. 2024 &middot; Badlapur, IN</span>
                    <div className="h-[1px] w-12 bg-stone-300"></div>
                </div>

                <h1 className="font-serif text-6xl md:text-8xl text-ink leading-[1.1] mb-8 relative pointer-events-none">
                    <span className="block">UI/UX Designer</span>
                    <span className="font-sans text-4xl md:text-6xl font-light text-stone-400 block my-2">&</span>
                    <span className="relative inline-block">
                        AI-Powered Prototyper
                        <SketchUnderline className="absolute -bottom-2 left-0 text-clay w-full" />
                    </span>
                </h1>

                <p className="font-sans text-stone-600 max-w-xl mx-auto leading-relaxed text-lg md:text-xl mt-12 pointer-events-none">
                    Hi, I'm <span className="font-bold text-ink">Anuj D. Dighe</span>. I blend <span className="font-serif italic">design intuition</span> with <span className="font-mono bg-stone-100 px-1 text-sm">cutting-edge AI</span> to create exceptional digital experiences.
                </p>

                <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 pointer-events-auto">
                    <MagneticObject bubbleText="View Work" strength={0.2}>
                        <button onClick={onScrollDown} className="bg-ink text-paper px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors shadow-lg">
                            View Selected Work
                        </button>
                    </MagneticObject>

                    <MagneticObject bubbleText="Let's Talk" strength={0.2}>
                        <button onClick={onConnect} className="bg-transparent border border-stone-300 text-ink px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-ink hover:bg-white transition-all">
                            Let's Connect
                        </button>
                    </MagneticObject>
                </div>
            </div>

            {/* Floating Elements */}
            <MagneticObject strength={0.1} bubbleText="Handmade" className="absolute top-32 left-10 md:left-32 hidden md:block animate-[bounce_3s_infinite]">
                <div className="flex items-center gap-2 text-stone-400 rotate-[-10deg]">
                    <PenTool size={16} />
                    <span className="font-hand text-xl">Handcrafted</span>
                </div>
            </MagneticObject>

            <MagneticObject strength={0.1} bubbleText="Algorithmic" className="absolute bottom-32 right-10 md:right-32 hidden md:block animate-[pulse_4s_infinite]">
                <div className="flex items-center gap-2 text-stone-400 rotate-[5deg]">
                    <span className="font-mono text-xs border border-stone-300 px-2 py-1 rounded">System.AI</span>
                    <MousePointer2 size={16} />
                </div>
            </MagneticObject>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-300 animate-bounce pointer-events-none">
                <ArrowDown size={24} strokeWidth={1} />
            </div>
        </section>
    );
};

export default Hero;
