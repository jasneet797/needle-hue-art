"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Heart, Menu, X, LogOut, Instagram, Facebook } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function ResponsiveHeader({ onCartOpen }: { onCartOpen: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 w-full px-4 md:px-12 py-4 md:py-6 z-[90] bg-white/80 backdrop-blur-xl border-b border-rose-100/50 shadow-[0_4px_30px_rgba(244,63,94,0.05)]">
      {/* Vibrant Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-50" />
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="md:hidden p-1 text-neutral-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button className="hidden md:block p-1 hover:text-rose-500 transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center: Brand */}
        <Link href="/" className="flex flex-col items-center text-center group relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <img 
                src="/logo.jpeg" 
                alt="Needle Hue Art Logo" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
          </motion.div>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-[1px] w-4 bg-amber-400/50" />
            <div className="text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-rose-500 font-bold">
              Sukhchain Kaur
            </div>
            <div className="h-[1px] w-4 bg-amber-400/50" />
          </div>
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
          {session ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => signOut()}
                className="hidden md:flex items-center gap-2 p-1 hover:text-rose-500 transition-colors text-[10px] uppercase tracking-widest font-bold"
              >
                <LogOut size={18} strokeWidth={1.5} />
                Sign Out
              </button>
              <div className="w-8 h-8 rounded-full bg-neutral-100 overflow-hidden hidden md:block border border-neutral-200">
                {session.user?.image ? (
                  <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-neutral-400">
                    {session.user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button 
              onClick={() => signIn("google")}
              className="hidden md:block p-1 hover:text-rose-500 transition-colors"
              title="Sign In"
            >
              <User size={20} strokeWidth={1.5} />
            </button>
          )}
          
          <Link 
            href="/wishlist"
            className="relative p-1 hover:text-rose-500 transition-colors hidden md:block"
          >
            <Heart size={20} strokeWidth={1.5} className={wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button 
            onClick={onCartOpen} 
            className="relative p-1 hover:text-rose-500 transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-[72px] md:top-[96px] left-0 w-full h-[calc(100vh-72px)] bg-white z-[89] flex flex-col p-8 space-y-8 md:hidden"
          >
            <Link href="/shop" className="text-2xl font-script text-neutral-900" onClick={() => setMenuOpen(false)}>Shop Collection</Link>
            <Link href="/#bespoke" className="text-2xl font-script text-neutral-900" onClick={() => setMenuOpen(false)}>Name Hoops</Link>
            <Link href="/contact" className="text-2xl font-script text-neutral-900" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            
            <div className="pt-12 mt-auto border-t border-neutral-100 flex flex-col gap-6">
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Follow Us</p>
              <div className="flex gap-6">
                <InstagramIcon size={20} className="text-neutral-900" />
                <FacebookIcon size={20} className="text-neutral-900" />
              </div>
              
              {!session && (
                <button 
                  onClick={() => signIn("google")}
                  className="w-full bg-neutral-900 text-white py-4 text-xs uppercase tracking-widest font-bold"
                >
                  Sign In
                </button>
              )}
              {session && (
                <button 
                  onClick={() => signOut()}
                  className="w-full border border-neutral-200 py-4 text-xs uppercase tracking-widest font-bold"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
