
import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

// --- Assets ---

const InkCursorSVG = ({ isMagnetic }: { isMagnetic: boolean }) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-sm"
    style={{
      transform: isMagnetic ? 'scale(0.9)' : 'scale(1)',
      transition: 'transform 0.2s ease-out'
    }}
  >
    <path
      d="M5.5 5.5L11.5 24.5L15.5 16.5L23.5 12.5L5.5 5.5Z"
      fill="#2B2A29"
      stroke="#Fdfcf8"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Main Component ---

export const LivingCursor = () => {
  // State
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const magneticElementRef = useRef<HTMLElement | null>(null);

  // Physics Refs
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  // Springs - Smoother, slightly "heavier" feel
  const springConfig = { damping: 20, stiffness: 250, mass: 0.6, restDelta: 0.001 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, { ...springConfig, damping: 30, stiffness: 200 });
  const scale = useSpring(1, { ...springConfig, stiffness: 400, damping: 20 });

  // Bubble follows loosely but faster
  const bubbleX = useSpring(0, { damping: 20, stiffness: 300 });
  const bubbleY = useSpring(0, { damping: 20, stiffness: 300 });

  // --- Event Listeners ---

  useEffect(() => {
    // 1. Double Click Spin
    const handleDoubleClick = () => {
      accumulatedRotation.current += 1080; // 3 full spins
      rotation.set(accumulatedRotation.current);

      // Small hop
      scale.set(1.2);
      setTimeout(() => scale.set(1), 200);
    };

    // 2. Enhanced Interactive Element Detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Helper to check if element is clickable (has pointer cursor)
      const isClickable = (el: HTMLElement) => {
        try {
          return window.getComputedStyle(el).cursor === 'pointer';
        } catch {
          return false;
        }
      };

      // Check for buttons, links, OR elements with pointer cursor
      const interactiveElement = target.closest("a, button, [role='button'], [data-magnetic]") ||
        (isClickable(target) ? target : null);

      if (interactiveElement) {
        magneticElementRef.current = interactiveElement as HTMLElement;
        setIsMagnetic(true);

        // Get custom text or button text
        let hoverText = interactiveElement.getAttribute("data-cursor-text");
        if (!hoverText) {
          // Try to get text content, but keep it short
          const text = interactiveElement.textContent?.trim();
          hoverText = text && text.length < 20 ? text : "Click";
        }
        setHoveredText(hoverText);
        scale.set(1.2); // Enlarge on interactive elements
        return;
      }

      // Check for certificates
      const certificateElement = target.closest("[data-cursor='certificate'], .certificate-card, [data-certificate]");
      if (certificateElement) {
        magneticElementRef.current = null;
        setIsMagnetic(false);
        setHoveredText("Certificate");
        scale.set(1.3); // Enlarge for certificates
        return;
      }

      // Check for images
      const imageElement = target.closest("img, [data-cursor='image']");
      if (imageElement) {
        magneticElementRef.current = null;
        setIsMagnetic(false);
        setHoveredText("View");
        scale.set(1.5); // Enlarge for images
        return;
      }

      // Default state - no special interaction
      magneticElementRef.current = null;
      setIsMagnetic(false);
      setHoveredText(null);
      scale.set(1); // Normal size
    };

    // 3. Click Animation
    const handleMouseDown = () => {
      setIsClicking(true);
      scale.set(0.6); // Shrink on click
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      // Return to appropriate scale based on hover state
      if (isMagnetic) {
        scale.set(1.2);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rotation, scale, isMagnetic]); // Added isMagnetic to dependency to ensure correct scale restore

  // --- Physics Loop ---

  useEffect(() => {
    const updateVelocity = (currentPos: { x: number, y: number }) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY };
      updateVelocity(mousePos);

      let targetX = mousePos.x;
      let targetY = mousePos.y;

      // Magnetic Pull Logic
      if (magneticElementRef.current) {
        const rect = magneticElementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Pull factor: Increased for stronger magnetic feel
        const pullFactor = 0.5;
        targetX = mousePos.x + (centerX - mousePos.x) * pullFactor;
        targetY = mousePos.y + (centerY - mousePos.y) * pullFactor;
      }

      // Update Springs
      cursorX.set(targetX);
      cursorY.set(targetY);

      // Bubble lags slightly and is offset
      bubbleX.set(mousePos.x);
      bubbleY.set(mousePos.y);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );

      // Rotation Logic (only if moving fast and not locked on target)
      if (speed > 0.1 && !isMagnetic) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        // Squash/Stretch
        const squashFactor = Math.max(0.9, 1 - speed * 0.05);
        scale.set(squashFactor);

        const timeout = setTimeout(() => scale.set(1), 150);
        return () => clearTimeout(timeout);
      } else if (isMagnetic) {
        // Flatten rotation when reading text
        const nearestZero = Math.round(accumulatedRotation.current / 360) * 360;
        rotation.set(nearestZero);
        scale.set(1);
      } else {
        scale.set(1);
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e);
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, bubbleX, bubbleY, rotation, scale, isMagnetic]);

  // Hide on touch
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-15%",
          translateY: "-15%",
          rotate: rotation,
          scale: scale,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <InkCursorSVG isMagnetic={isMagnetic} />
      </motion.div>

      <AnimatePresence>
        {hoveredText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 30, y: 30 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 10 }}
            style={{
              position: "fixed",
              left: bubbleX,
              top: bubbleY,
              zIndex: 9998,
              pointerEvents: "none",
            }}
          >
            <div className="px-3 py-1.5 bg-[#Fdfcf8] text-[#2B2A29] text-xs font-medium tracking-wide rounded-md border border-[#2B2A29]/10 shadow-sm whitespace-nowrap font-serif">
              {hoveredText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
