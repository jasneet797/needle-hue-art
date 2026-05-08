"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* The Needle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* A simple needle shape */}
          <path d="M12 2L13 3L13 20C13 21 12.5 22 12 22C11.5 22 11 21 11 20L11 3L12 2Z" fill="#c48b71" />
          <circle cx="12" cy="4" r="0.5" fill="var(--background)" />
        </svg>
      </motion.div>

      {/* The Thread Trail (simplified as a delayed dot for now) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-40 opacity-50"
        style={{ backgroundColor: "var(--color-accent)" }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25, mass: 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-accent pointer-events-none z-40 opacity-30"
        style={{ backgroundColor: "var(--color-accent)" }}
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1.5 }}
      />
    </>
  );
}
