"use client";

import { use, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Heart, ChevronRight, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ResponsiveHeader from "@/components/ui/ResponsiveHeader";
import CartDrawer from "@/components/ui/CartDrawer";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "The Chanderi Whisper", price: "₹18,500", priceCents: 1850000, craft: "Hand-painted Floral", image: "/suit_floral_chiffon_1778237758340.png", description: "A masterpiece of hand-painted floral motifs on pure Chanderi silk. This set includes a delicately worked kurta, matching trousers, and a lightweight chiffon dupatta." },
  { id: 2, name: "Pastel Rose Ghera", price: "₹24,000", priceCents: 2400000, craft: "Detailed Hand Embroidery", image: "/suit_hand_embroidery_1778237780847.png", description: "Soft pastel hues meet intricate hand embroidery in this timeless ensemble. Features a rich ghera with bullion roses and fine needlework." },
  // ... adding more for completeness in the route
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find(p => p.id === productId) || products[0];
  
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-white">
      <ResponsiveHeader onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 mb-12">
          <Link href="/">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop">Collection</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-900 font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] bg-neutral-50 rounded-sm overflow-hidden border border-neutral-100"
            >
              <Image src={product.image} alt={product.name} fill className="object-cover object-top" priority />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-neutral-50 rounded-sm border border-neutral-100 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-rose-500 font-bold">{product.craft}</p>
              <h1 className="text-4xl md:text-5xl font-script text-neutral-900">{product.name}</h1>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">24 Reviews</span>
              </div>
            </div>

            <div className="text-3xl font-light text-neutral-900">{product.price}</div>

            <p className="text-neutral-500 leading-relaxed font-light">
              {product.description}
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-neutral-200 rounded-sm">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-neutral-50">-</button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-neutral-50">+</button>
                </div>
                <button 
                  onClick={() => {
                    addItem({ ...product, quantity });
                    setCartOpen(true);
                  }}
                  className="flex-1 bg-neutral-900 text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>
                <button className="p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <Heart size={20} className="text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-neutral-400" size={20} />
                <span className="text-[9px] uppercase tracking-widest font-bold">100% Authentic</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-neutral-400" size={20} />
                <span className="text-[9px] uppercase tracking-widest font-bold">Pan India Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="text-neutral-400" size={20} />
                <span className="text-[9px] uppercase tracking-widest font-bold">Easy Exchanges</span>
              </div>
            </div>

            {/* Details Accordion (Simplified) */}
            <div className="pt-8 space-y-4">
              {["Product Details", "Size & Fit", "Shipping & Returns"].map(item => (
                <div key={item} className="border-b border-neutral-100 pb-4 flex justify-between items-center cursor-pointer hover:text-rose-500 transition-colors">
                  <span className="text-xs uppercase tracking-widest font-bold">{item}</span>
                  <ChevronRight size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

import Link from "next/link";
