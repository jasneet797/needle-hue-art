"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import CustomCursor from "@/components/ui/CustomCursor";
import { CleanHero } from "@/components/ui/CleanHero";
import ProductFilter from "@/components/shop/ProductFilter";
import ProductGrid from "@/components/shop/ProductGrid";
import BespokeHoops from "@/components/shop/BespokeHoops";
import StorySection from "@/components/ui/StorySection";
import CartDrawer from "@/components/ui/CartDrawer";
import Footer from "@/components/ui/Footer";
import VideoShowcase from "@/components/ui/VideoShowcase";

import ResponsiveHeader from "@/components/ui/ResponsiveHeader";
import { useCart } from "@/context/CartContext";

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

export default function Home() {
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
    <main className="min-h-screen bg-white text-black selection:bg-neutral-200 selection:text-black overflow-x-hidden">
      <CustomCursor />
      <ResponsiveHeader onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <CleanHero />
      <section id="shop" className="max-w-7xl mx-auto py-24 flex flex-col md:flex-row px-4">
        <ProductFilter 
          selectedFilters={selectedFilters} 
          onFilterChange={handleFilterChange}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          onClearAll={() => {
            setSelectedFilters({ craft: [], status: [], occasion: [] });
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
