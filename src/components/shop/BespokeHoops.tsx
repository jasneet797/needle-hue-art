"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function BespokeHoops() {
  const { addItem } = useCart();

  return (
    <section id="bespoke" className="w-full bg-[#fcfbf9] py-32 border-t border-neutral-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-100/50 skew-x-12 translate-x-32" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Left: The Hoop Image */}
        <div className="flex-1 w-full max-w-lg relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-square w-full rounded-full overflow-hidden shadow-2xl shadow-neutral-900/10 border-[12px] border-white"
          >
            <Image 
              src="/bespoke_hoop_1778249323204.png"
              alt="Bespoke Embroidery Hoop"
              fill
              className="object-cover object-center"
            />
          </motion.div>

          {/* Decorative Needle/Thread graphic hint */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100"
          >
            <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </motion.div>
        </div>

        {/* Right: Bespoke Typography */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase text-neutral-500 bg-neutral-200/50">
            Bespoke Gifting
          </div>
          
          <h2 className="text-5xl md:text-6xl font-script text-neutral-900 leading-tight">
            Personalized <br />
            <span className="italic text-neutral-400">Keepsakes</span>
          </h2>
          
          <p className="text-lg text-neutral-500 max-w-md mx-auto md:mx-0 leading-relaxed font-light">
            Celebrate love and milestones with our custom hand-embroidered hoops. Featuring thick bullion roses, delicate pearl borders, and personalized calligraphy crafted to last a lifetime.
          </p>

          <div className="pt-6">
            <button 
              onClick={() => addItem({
                id: 999,
                name: "Custom Bespoke Hoop",
                priceCents: 450000,
                image: "/bespoke_hoop_1778249323204.png",
                quantity: 1
              })}
              className="group relative inline-flex items-center gap-4 border border-neutral-900 px-8 py-4 overflow-hidden rounded-sm hover:bg-neutral-900 transition-colors duration-500"
            >
              <span className="relative text-xs tracking-[0.2em] uppercase font-medium text-neutral-900 group-hover:text-white transition-colors duration-500">
                Order Custom Hoop • ₹4,500
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
