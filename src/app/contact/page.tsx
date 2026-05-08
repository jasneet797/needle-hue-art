"use client";

import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 mb-20"
          >
            <h1 className="text-6xl md:text-7xl font-script text-neutral-900">Get in Touch</h1>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 font-bold">The Artisan Studio • Ludhiana</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-2xl font-medium text-neutral-900 border-b border-neutral-100 pb-4">Contact Details</h2>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Email Us</p>
                    <p className="text-neutral-900 font-medium">hello@needlehue.art</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Call Us</p>
                    <p className="text-neutral-900 font-medium">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Visit Our Artelier</p>
                    <p className="text-neutral-900 font-medium">Ludhiana, Punjab, India</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-8">
                <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all">
                    <Facebook size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-50 p-10 rounded-sm">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-neutral-900">Message Sent</h3>
                  <p className="text-sm text-neutral-500">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="text-xs uppercase tracking-widest text-rose-500 font-bold pt-4">Send another</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Full Name</label>
                    <input type="text" required className="w-full bg-white border border-neutral-200 p-4 text-sm outline-none focus:border-neutral-900 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Email Address</label>
                    <input type="email" required className="w-full bg-white border border-neutral-200 p-4 text-sm outline-none focus:border-neutral-900 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Subject</label>
                    <select className="w-full bg-white border border-neutral-200 p-4 text-sm outline-none focus:border-neutral-900 transition-colors">
                      <option>General Inquiry</option>
                      <option>Custom Order</option>
                      <option>Shipping & Delivery</option>
                      <option>Collaboration</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Message</label>
                    <textarea required rows={5} className="w-full bg-white border border-neutral-200 p-4 text-sm outline-none focus:border-neutral-900 transition-colors"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-neutral-900 text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function CheckCircle({ className, ...props }: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}
