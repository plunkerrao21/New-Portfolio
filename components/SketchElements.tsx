import React from 'react';

export const SketchUnderline: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    viewBox="0 0 200 9" 
    className={`w-full h-auto overflow-visible ${className}`}
    preserveAspectRatio="none"
  >
    <path 
      d="M2.5,7.5 c50,-5 100,-5 195,0" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      className="animate-draw"
    />
  </svg>
);

export const SketchCircle: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none ${className}`}
    style={{ zIndex: -1 }}
  >
    <path 
      d="M10,50 Q25,25 50,10 T90,50 T50,90 T10,50" 
      fill="none" 
      stroke="#d6d3d1" 
      strokeWidth="1" 
      className="opacity-60"
    />
  </svg>
);

export const SketchArrow: React.FC<{ className?: string, rotate?: number }> = ({ className = "", rotate = 0 }) => (
  <svg 
    viewBox="0 0 100 50" 
    className={`absolute pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path 
      d="M10,25 C30,25 50,10 90,15 M80,5 L90,15 L80,25" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Tape: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute h-8 w-24 bg-paper/90 backdrop-blur-sm border-l border-r border-white/20 shadow-sm rotate-[-15deg] -top-3 -left-8 z-10 ${className}`} 
       style={{ 
         maskImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMTAwdjMwaC0xMDB6IiBmaWxsPSJibGFjayIvPjwvc3ZnPg==")', 
         clipPath: 'polygon(2% 0, 98% 0, 100% 100%, 0% 100%)'
       }}
  />
);

export const PencilHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-block px-1 mx-1">
    <span className="relative z-10">{children}</span>
    <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-100/50 -rotate-1 -z-0 rounded-sm"></span>
  </span>
);