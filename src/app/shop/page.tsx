"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductFilter from "@/components/shop/ProductFilter";
import ProductGrid from "@/components/shop/ProductGrid";
import Footer from "@/components/ui/Footer";
import ResponsiveHeader from "@/components/ui/ResponsiveHeader";
import CartDrawer from "@/components/ui/CartDrawer";
import CustomCursor from "@/components/ui/CustomCursor";
import StorySection from "@/components/ui/StorySection";
import BespokeHoops from "@/components/shop/BespokeHoops";
import VideoShowcase from "@/components/ui/VideoShowcase";

const products = [
  { id: 1, name: "The Chanderi Whisper", price: "₹2,500", priceCents: 250000, craft: "Hand-painted", status: "Unstitched", occasion: "Festive", image: "/suit_floral_chiffon_1778237758340.png" },
  { id: 2, name: "Pastel Rose Ghera", price: "₹4,200", priceCents: 420000, craft: "Embroidery", status: "Semi-stitched", occasion: "Wedding Guest", image: "/suit_hand_embroidery_1778237780847.png" },
  { id: 3, name: "Gulabi Hot Pink", price: "₹1,800", priceCents: 180000, craft: "Lace Work", status: "Unstitched", occasion: "Mehendi", image: "/suit_hot_pink_lace_1778237803565.png" },
  { id: 4, name: "Summer Ocean Breeze", price: "₹3,500", priceCents: 350000, craft: "Embroidery", status: "Ready to Wear", occasion: "Formal Office", image: "/suit_blue_floral_1778237827119.png" },
  { id: 5, name: "Dusty Rose Bullion", price: "₹5,800", priceCents: 580000, craft: "Embroidery", status: "Unstitched", occasion: "Jaggo", image: "/suit_dusty_rose_bullion_1778247137355.png" },
  { id: 6, name: "Mint Damask Palazzo", price: "₹2,900", priceCents: 290000, craft: "Fusion", status: "Semi-stitched", occasion: "Festive", image: "/suit_mint_damask_1778247167976.png" },
  { id: 7, name: "Bright Pink Luxe", price: "₹4,500", priceCents: 450000, craft: "Lace Work", status: "Ready to Wear", occasion: "Wedding Guest", image: "/suit_bright_pink_cutout_1778247184467.png" },
  { id: 8, name: "Peach Blossom Bell", price: "₹3,200", priceCents: 320000, craft: "Fusion", status: "Unstitched", occasion: "Formal Office", image: "/suit_peach_floral_bell_1778247200657.png" },
  { id: 9, name: "Spring Green Garden", price: "₹2,200", priceCents: 220000, craft: "Hand-painted", status: "Semi-stitched", occasion: "Mehendi", image: "/suit_green_red_flowers_1778248114194.png" },
  { id: 10, name: "Classic Beige Bullion", price: "₹6,500", priceCents: 650000, craft: "Embroidery", status: "Unstitched", occasion: "Wedding Guest", image: "/suit_beige_bullion_rose_1778248135580.png" },
];

export default function ShopPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    craft: [],
    status: [],
    occasion: [],
    fabric: []
  });

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const filteredProducts = products.filter(product => {
    const craftMatch = selectedFilters.craft.length === 0 || selectedFilters.craft.includes(product.craft);
    const statusMatch = selectedFilters.status.length === 0 || selectedFilters.status.includes(product.status);
    const occasionMatch = selectedFilters.occasion.length === 0 || selectedFilters.occasion.includes(product.occasion);
    const priceMatch = product.priceCents / 100 <= maxPrice;
    return craftMatch && statusMatch && occasionMatch && priceMatch;
  });

  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <ResponsiveHeader onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <div className="pt-40 pb-20 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#fdf8f6] -skew-y-3 origin-top-right -z-10" />
        
        <div className="container mx-auto px-6 lg:px-12 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-script text-neutral-900"
          >
            The Collection
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-8 bg-neutral-200" />
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
              Artisanal Hand-painted & Embroidered Suites
            </p>
            <div className="h-[1px] w-8 bg-neutral-200" />
          </motion.div>
        </div>
      </div>

      <section className="container mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-12">
        <ProductFilter 
          selectedFilters={selectedFilters} 
          onFilterChange={handleFilterChange}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          onClearAll={() => {
            setSelectedFilters({ craft: [], status: [], occasion: [], fabric: [] });
            setMaxPrice(10000);
          }}
        />
        <ProductGrid products={filteredProducts} />
      </section>

      <StorySection />
      <VideoShowcase />
      <BespokeHoops />
      <Footer />
    </main>
  );
}
