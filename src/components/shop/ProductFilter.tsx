"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

const filterCategories = [
  {
    id: "craft",
    name: "Artisanal Craft",
    options: ["Hand-painted", "Embroidery", "Fusion", "Lace Work"]
  },
  {
    id: "status",
    name: "Stitch Status",
    options: ["Unstitched", "Semi-stitched", "Ready to Wear"]
  },
  {
    id: "occasion",
    name: "Occasion",
    options: ["Jaggo", "Mehendi", "Wedding Guest", "Formal Office", "Festive"]
  },
  {
    id: "fabric",
    name: "Luxury Fabric",
    options: ["Chanderi Silk", "Pure Chiffon", "Organza", "Crepe"]
  }
];

export default function ProductFilter({ 
  selectedFilters, 
  onFilterChange,
  onClearAll,
  maxPrice,
  onPriceChange
}: { 
  selectedFilters: Record<string, string[]>, 
  onFilterChange: (category: string, value: string) => void,
  onClearAll: () => void,
  maxPrice: number,
  onPriceChange: (val: number) => void
}) {
  const [openSections, setOpenSections] = useState<string[]>(["craft", "status"]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 pr-8 border-r border-neutral-100">
      <div className="sticky top-32 space-y-2">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-900">
          <h3 className="text-[10px] font-bold tracking-[0.3em] text-neutral-900 uppercase">Filters</h3>
          <button 
            onClick={onClearAll}
            className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          {filterCategories.map((category) => (
            <div key={category.id} className="border-b border-neutral-50 pb-4">
              <button 
                onClick={() => toggleSection(category.id)}
                className="w-full flex items-center justify-between py-2 text-left group"
              >
                <span className="text-[11px] font-medium tracking-widest text-neutral-900 uppercase group-hover:text-rose-500 transition-colors">
                  {category.name}
                </span>
                {openSections.includes(category.id) ? (
                  <Minus size={12} className="text-neutral-400" />
                ) : (
                  <Plus size={12} className="text-neutral-400" />
                )}
              </button>
              
              {openSections.includes(category.id) && (
                <div className="mt-4 space-y-3 pl-1">
                  {category.options.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={selectedFilters[category.id]?.includes(option)}
                          onChange={() => onFilterChange(category.id, option)}
                          className="peer appearance-none w-4 h-4 border border-neutral-200 rounded-none checked:bg-neutral-900 checked:border-neutral-900 transition-all cursor-pointer" 
                        />
                        <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none text-white transition-opacity">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4.5L3 6.5L7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-[11px] tracking-wide text-neutral-500 group-hover:text-neutral-900 transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Price Range Slider */}
        <div className="pt-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-medium tracking-widest text-neutral-900 uppercase">Max Price</h3>
            <span className="text-[11px] font-bold text-neutral-900">₹{maxPrice.toLocaleString()}</span>
          </div>
          <div className="space-y-4">
            <input 
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => onPriceChange(parseInt(e.target.value))}
              className="w-full h-1 bg-neutral-100 appearance-none cursor-pointer accent-neutral-900 rounded-lg"
            />
            <div className="flex justify-between text-[10px] tracking-widest text-neutral-400 font-bold">
              <span>₹1,000</span>
              <span>₹10,000</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
