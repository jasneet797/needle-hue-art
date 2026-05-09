"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export function CleanHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect for the video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#fcfbf9] flex items-center justify-center overflow-hidden pt-40 md:pt-20">
      {/* Organic Noise Overlay for Luxury Editorial Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-16 pt-24 pb-24">
        
        {/* Left: Refined Typography & CTA */}
        <div className="flex-1 space-y-10 text-center md:text-left z-20 max-w-2xl">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-script text-neutral-900 leading-[1.2] tracking-tight"
          >
            Handcrafted <br />
            <span className="italic text-rose-500 font-light pr-4">Elegance</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg text-neutral-600 max-w-md mx-auto md:mx-0 leading-relaxed font-light"
          >
            Discover the new collection featuring exquisite hand-painted floral prints, pure chiffon dupattas, and bespoke artisanal embroidery.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <Link 
              href="#shop" 
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-10 py-5 overflow-hidden rounded-sm shadow-xl"
            >
              <div className="absolute inset-0 bg-rose-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative text-xs tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors duration-500">Shop the Collection</span>
              <svg className="relative w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Right: The Editorial Arch Video Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-[420px] relative"
        >
          {/* Soft Glow Shadow behind the arch */}
          <div className="absolute inset-0 bg-rose-200/40 blur-[80px] rounded-t-full rounded-b-xl" />
          
          {/* The Arch Container */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 shadow-2xl shadow-neutral-900/10 border-[8px] border-white z-10" style={{ borderTopLeftRadius: '999px', borderTopRightRadius: '999px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
            
            <motion.div 
              className="w-full h-full"
              style={{ scale: videoScale, y: videoY }}
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover scale-[1.05]"
              >
                <source src="/process_video.mp4" type="video/mp4" />
                <source src="/background_video.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* Inner Shadow to give depth to the arch window */}
            <div className="absolute inset-0 shadow-[inset_0px_20px_40px_rgba(0,0,0,0.15)] pointer-events-none rounded-t-full rounded-b-xl" />
          </div>
          
          {/* Elegant Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-auto md:-left-12 md:translate-x-0 bg-white p-4 shadow-xl border border-neutral-100 z-20 whitespace-nowrap"
          >
            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Featured</p>
            <p className="font-script text-xl text-neutral-900">Summer Preview</p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
