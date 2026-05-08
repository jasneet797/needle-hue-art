"use client";

import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, increment, decrement, totalCents } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                <h2 className="text-xl font-script tracking-wide text-neutral-900">Your Boutique Bag</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-neutral-300" />
                  </div>
                  <p className="text-neutral-500 font-light italic">Your bag is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="text-xs uppercase tracking-widest text-neutral-900 border-b border-neutral-900 pb-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map(item => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative w-24 aspect-[4/5] bg-neutral-50 rounded-sm overflow-hidden flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-neutral-900 pr-4">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">₹{(item.priceCents / 100).toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-neutral-200 rounded-sm">
                            <button 
                              onClick={() => decrement(item.id)}
                              className="p-1.5 hover:bg-neutral-50 transition-colors"
                            >
                              <Minus className="w-3 h-3 text-neutral-600" />
                            </button>
                            <span className="px-3 text-xs font-medium w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => increment(item.id)}
                              className="p-1.5 hover:bg-neutral-50 transition-colors"
                            >
                              <Plus className="w-3 h-3 text-neutral-600" />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-neutral-900">
                            ₹{((item.priceCents * item.quantity) / 100).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-4">
                <div className="flex justify-between items-center text-neutral-900">
                  <span className="text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-medium">₹{(totalCents / 100).toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-neutral-500 text-center uppercase tracking-widest">
                  Shipping & taxes calculated at checkout
                </p>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items }),
                      });
                      const data = await response.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        alert(data.error || "Checkout failed. Please check your environment variables.");
                      }
                    } catch (error) {
                      console.error("Checkout failed:", error);
                      alert("An unexpected error occurred. Please ensure your backend is running.");
                    }
                  }}
                  className="w-full bg-neutral-900 text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200"
                >
                  Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
