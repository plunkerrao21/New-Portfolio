
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticObjectProps {
  children: React.ReactNode;
  bubbleText?: string;
  strength?: number; // 0 to 1, higher is stronger pull
  className?: string;
  onClick?: () => void;
  isGridCell?: boolean;
}

const MagneticObject: React.FC<MagneticObjectProps> = ({ 
  children, 
  bubbleText = "Open", 
  strength = 0.3, 
  className = "",
  onClick,
  isGridCell = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Apply strength factor
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const transition = isGridCell 
    ? { duration: 0.1 } 
    : { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={transition}
      className={`inline-block cursor-none ${className}`}
      // Attributes for the Cursor to read
      data-magnetic="true"
      data-cursor-text={bubbleText}
    >
      {children}
    </motion.div>
  );
};

export default MagneticObject;
