"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface MacroLensProps {
  src: string;
  alt: string;
}

export default function MacroLens({ src, alt }: MacroLensProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    
    // Calculate relative X and Y (0 to 1)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setPosition({ x: x * 100, y: y * 100 });
  };

  return (
    <div 
      className="relative w-full aspect-[3/4] overflow-hidden cursor-crosshair rounded-sm"
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      
      {/* The Macro Lens Zoom Overlay */}
      {showLens && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "250%",
            backgroundRepeat: "no-repeat",
            // A circular mask that follows the cursor could be implemented,
            // but for a full-pane zoom effect we just scale the background.
          }}
        />
      )}
      
      <div className="absolute bottom-4 right-4 bg-brand-50/80 backdrop-blur px-3 py-1 text-xs text-brand-900 tracking-widest uppercase pointer-events-none">
        Macro View
      </div>
    </div>
  );
}
