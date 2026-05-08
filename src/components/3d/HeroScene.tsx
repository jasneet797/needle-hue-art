"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Environment, ContactShadows } from "@react-three/drei";
import ModelWrapper from "./ModelWrapper";
import { Suspense } from "react";

export default function HeroScene() {
  return (
    <div className="h-screen w-full relative -z-10">
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={["#fdf8f6"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.25}>
            <ModelWrapper />
          </ScrollControls>
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
