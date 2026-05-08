"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingBag, Heart } from "lucide-react";

export default function ProductGrid({ products }: { products: any[] }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="flex-1 lg:pl-12 w-full">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-script tracking-wide text-neutral-900">Featured Collection</h2>
        <span className="text-sm tracking-widest text-neutral-500 uppercase">10 Items</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-8 md:gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col h-full">
            <Link href={`/product/${product.id}`} className="cursor-pointer block relative flex-1">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-4 rounded-md border border-neutral-100">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all z-10"
                >
                  <Heart 
                    size={16} 
                    className={isInWishlist(product.id) ? "fill-rose-500 text-rose-500" : "text-neutral-400"} 
                  />
                </button>
              </div>
              <div className="text-left space-y-1 pb-4">
                <h3 className="font-medium text-neutral-900 line-clamp-1">{product.name}</h3>
                <p className="text-[10px] uppercase tracking-wider text-neutral-400">{product.craft}</p>
                <p className="text-neutral-900 font-semibold pt-1">{product.price}</p>
              </div>
            </Link>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem({
                  id: product.id,
                  name: product.name,
                  priceCents: product.priceCents,
                  image: product.image,
                  quantity: 1
                });
              }}
              className="mt-auto w-full border border-neutral-900 text-neutral-900 py-2.5 md:py-3 text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-medium hover:bg-neutral-900 hover:text-white transition-all flex items-center justify-center gap-1.5 md:gap-2 rounded-sm"
            >
              <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5" />
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
