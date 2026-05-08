"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    // Clear cart on successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-script text-neutral-900">Thank You</h1>
          <p className="text-neutral-500 font-light tracking-wide">
            Your artisanal masterpiece is being prepared.
          </p>
          {orderId && (
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
              Order ID: #{orderId.slice(-8).toUpperCase()}
            </p>
          )}
        </div>

        <div className="bg-neutral-50 p-6 rounded-md space-y-4 text-left">
          <div className="flex items-center gap-3 text-neutral-900">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold">Order Confirmed</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            A confirmation email has been sent to you. We'll notify you once Sukhchain Kaur begins crafting your order.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all rounded-sm shadow-xl shadow-neutral-200"
          >
            Back to Studio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
