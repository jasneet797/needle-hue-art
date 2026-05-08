"use client";

import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section id="about" className="bg-[#f8f5f2] py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Text Content */}
          <div className="flex-1 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-7xl font-script text-neutral-900 leading-tight flex flex-col">
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  Every Stroke
                </motion.span>
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="italic text-rose-500"
                >
                  Tells a Story
                </motion.span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed max-w-xl">
                At Needle Hue Art, our process is purely hands-on. From the initial pencil sketch on pure chiffon to the final brush stroke, each piece takes 40-60 hours of artisanal dedication.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { 
                  id: "01", 
                  title: "PURE CHIFFON ART", 
                  desc: "Premium hand-painted florals using specialized textile pigments." 
                },
                { 
                  id: "02", 
                  title: "BESPOKE EMBROIDERY", 
                  desc: "Fine needlework including Dabka, Tilla, and Gota Patti detailing." 
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex gap-6 group"
                >
                  <span className="text-xs font-serif italic text-rose-400 bg-white w-10 h-10 flex items-center justify-center border border-neutral-100 shadow-sm group-hover:scale-110 transition-transform">
                    {item.id}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Cinematic Video Frame */}
          <div className="flex-1 w-full relative mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto group"
            >
              {/* Artistic Border Frame */}
              <div className="absolute inset-0 border border-rose-200 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 -z-10" />
              
              <div className="relative h-full w-full overflow-hidden bg-neutral-900 rounded-sm shadow-2xl">
                {/* Fallback Image / Video Placeholder */}
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                >
                  <source src="/process_video.mp4" type="video/mp4" />
                  <source src="/background_video.mp4" type="video/mp4" />
                </video>
                
                {/* Overlay Text */}
                <div className="absolute bottom-10 left-10 text-white z-20">
                  <p className="text-[10px] tracking-[0.5em] uppercase opacity-70 mb-2">Artisan Process</p>
                  <h3 className="text-3xl font-script italic">The Hand of the Artist</h3>
                </div>
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 -top-8 w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center text-center p-2 shadow-xl z-30"
              >
                <span className="text-[9px] font-bold text-white uppercase tracking-widest leading-tight">
                  100% <br /> Hand <br /> Made
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
