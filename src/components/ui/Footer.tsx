"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);


export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Logo & Newsletter */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="relative w-24 h-24 mb-4">
                <img 
                  src="/logo.jpeg" 
                  alt="Needle Hue Art Logo" 
                  className="w-full h-full object-contain rounded-full shadow-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <h2 className="font-script text-4xl text-neutral-900 leading-none">Needle Hue Art</h2>
                <p className="text-[10px] tracking-[0.3em] uppercase text-rose-500 font-medium">The Artisan Studio</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Join the Artisan Guild</p>
              <div className="flex border-b border-neutral-200 pb-2 max-w-xs">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent text-[10px] tracking-widest outline-none flex-1 placeholder:text-neutral-300"
                />
                <button className="text-[10px] tracking-widest font-bold text-rose-500 hover:text-rose-600 transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Collections</h3>
            <ul className="space-y-4">
              {["Painted Suits", "Embroidery Sets", "Name Hoops", "Bridal Store"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs uppercase tracking-widest text-neutral-900 font-semibold hover:text-rose-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Company</h3>
            <ul className="space-y-4">
              {["Our Heritage", "Shipping", "Customization", "Contact"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs uppercase tracking-widest text-neutral-900 font-semibold hover:text-rose-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Location */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Social</h3>
              <div className="flex gap-6">
                <Link href="https://instagram.com/needlehue.art" target="_blank" className="text-neutral-900 hover:text-rose-500 transition-colors">
                  <InstagramIcon size={20} className="hover:scale-110 transition-transform" />
                </Link>
                <Link href="https://facebook.com/needlehue.art" target="_blank" className="text-neutral-900 hover:text-rose-500 transition-colors">
                  <FacebookIcon size={20} className="hover:scale-110 transition-transform" />
                </Link>
                <Link href="mailto:needlehue.art@gmail.com" className="text-neutral-900 hover:text-rose-500 transition-colors">
                  <Mail size={20} strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] italic text-neutral-400">Artelier Location:</p>
              <p className="text-[10px] tracking-widest text-neutral-600 uppercase font-medium">Patiala • Punjab</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-neutral-50 gap-4">
          <p className="text-[10px] tracking-widest text-neutral-400 uppercase">
            © {new Date().getFullYear()} Needle Hue Art. All Rights Reserved.
          </p>
          <p className="text-[10px] tracking-widest text-neutral-900 uppercase font-bold">
            Owner: Sukhchain Kaur
          </p>
        </div>
      </div>
    </footer>
  );
}
