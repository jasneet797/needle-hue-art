"use client";

import { motion } from "framer-motion";

export default function VideoShowcase() {
  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-20 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-[1px] bg-rose-300 mb-4"
          />
          <h2 className="text-5xl md:text-7xl font-script text-neutral-900">Cinematic Journey</h2>
          <p className="text-[10px] tracking-[0.5em] uppercase text-neutral-400 font-bold">Behind the Threads</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
          {/* Main Large Video */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 relative overflow-hidden rounded-sm group shadow-2xl"
          >
            <div className="absolute inset-0 bg-neutral-900">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000">
                <source src="/background_video.mp4" type="video/mp4" />
                <source src="/process_video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-12 left-12 space-y-2">
              <p className="text-white text-[10px] tracking-widest uppercase opacity-60">Live Studio Process</p>
              <h3 className="text-white text-4xl font-script italic">Artistry in Motion</h3>
            </div>
          </motion.div>

          {/* Side Column with Detail Photos */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 relative overflow-hidden rounded-sm group shadow-xl"
            >
              <div className="absolute inset-0 bg-neutral-100">
                <img src="/needle_detail.png" alt="Artisan Needle Detail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-6 left-6">
                <span className="text-white text-[9px] tracking-widest uppercase font-bold">Embroidery Detail</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex-1 relative overflow-hidden rounded-sm group shadow-xl"
            >
              <div className="absolute inset-0 bg-neutral-200">
                <img src="/brush_detail.png" alt="Brush Stroke Detail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-6 left-6">
                <span className="text-white text-[9px] tracking-widest uppercase font-bold">Brush Work</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
