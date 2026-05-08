"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import ResponsiveHeader from "@/components/ui/ResponsiveHeader";
import CartDrawer from "@/components/ui/CartDrawer";
import Footer from "@/components/ui/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-white">
      <ResponsiveHeader onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-script text-neutral-900">Your Wishlist</h1>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-bold">Items you've fallen in love with</p>
          </div>

          {items.length === 0 ? (
            <div className="py-32 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center">
                  <Heart className="w-12 h-12 text-neutral-200" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-neutral-500 font-light italic">Your wishlist is currently empty.</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">Save your favorite pieces here</p>
              </div>
              <Link 
                href="/shop"
                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all rounded-sm"
              >
                Explore Collection
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-6 p-6 border border-neutral-100 rounded-sm bg-neutral-50/30 group relative"
                  >
                    <div className="relative w-32 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover object-top"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-neutral-900">{item.name}</h3>
                          <button 
                            onClick={() => toggleWishlist(item)}
                            className="text-neutral-300 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xl text-neutral-900 font-light">₹{(item.priceCents / 100).toLocaleString()}</p>
                      </div>

                      <div className="pt-4">
                        <button 
                          onClick={() => {
                            addItem({ ...item, quantity: 1 });
                            setCartOpen(true);
                          }}
                          className="w-full bg-neutral-900 text-white py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 rounded-sm"
                        >
                          <ShoppingBag size={14} />
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
