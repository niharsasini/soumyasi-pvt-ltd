"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function OrbMesh() {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.22;
    meshRef.current.rotation.y = t * 0.35;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#f59e0b" wireframe opacity={0.35} transparent />
    </mesh>
  );
}

export default function EnergyOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 48 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <OrbMesh />
    </Canvas>
  );
}
