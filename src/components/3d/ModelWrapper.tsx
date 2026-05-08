"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ModelWrapper() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const materialRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // The "Giddha-style turn": Rotate based on scroll
    // 0 -> 1 scroll maps to 0 -> 2PI (full turn)
    const scrollOffset = scroll.offset;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      scrollOffset * Math.PI * 2,
      0.1
    );

    // The "dissolve-stitch" effect: Interpolate material color/properties based on rotation
    // When facing forward (offset ~0 or ~1) vs facing away (offset ~0.5)
    if (materialRef.current) {
      const isFormal = scrollOffset > 0.5;
      
      // Interpolate color: "Hand-painted semi-formal" (light warm) to "Embroidered formal" (deep red/gold)
      const targetColor = isFormal ? new THREE.Color("#8b0000") : new THREE.Color("#d2b48c");
      materialRef.current.color.lerp(targetColor, 0.05);
      
      // Interpolate distort to simulate fabric movement
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        isFormal ? 0.2 : 0.4, // More flowing/distorted for hand-painted Chiffon, stiffer for embroidered
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, 0]} castShadow receiveShadow>
      {/* Placeholder geometry: a tall capsule to represent a standing figure */}
      <capsuleGeometry args={[1, 3, 4, 32]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#d2b48c"
        speed={2}
        distort={0.4}
        radius={1}
        roughness={0.8}
      />
    </mesh>
  );
}
