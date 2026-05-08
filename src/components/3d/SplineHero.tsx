'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineHero() {
  return (
    <Card className="w-full h-screen bg-black relative overflow-hidden rounded-none border-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full flex-col lg:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 lg:p-24 relative z-10 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-script tracking-wide">
            Needle Hue
          </h1>
          <p className="mt-6 text-neutral-300 max-w-lg text-lg leading-relaxed">
            Where tradition meets the future. Explore our 3D interactive collection featuring hand-painted floral prints, chiffon dupattas, and intricate hand embroidery—all brought to life through advanced WebGL technology.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black self-start font-medium tracking-widest uppercase text-sm hover:bg-neutral-200 transition-colors rounded-sm">
            Explore Collection
          </button>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
