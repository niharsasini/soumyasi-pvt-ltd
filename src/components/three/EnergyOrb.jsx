"use client";

import { useRef, useEffect, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

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

function Disposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      try { gl.dispose(); } catch (_) {}
    };
  }, [gl]);
  return null;
}

export default function EnergyOrb() {
  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 48 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <OrbMesh />
        <Disposer />
      </Canvas>
    </ErrorBoundary>
  );
}
