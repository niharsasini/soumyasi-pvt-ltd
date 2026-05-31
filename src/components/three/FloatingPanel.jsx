"use client";

import { useRef, useMemo, useEffect, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

function SmallCells({ w, h, cols, rows }) {
  const { positions, cw, ch } = useMemo(() => {
    const gap = 0.04;
    const cw = (w - gap * (cols - 1)) / cols;
    const ch = (h - gap * (rows - 1)) / rows;
    const positions = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        positions.push([
          -w / 2 + cw / 2 + c * (cw + gap),
          -h / 2 + ch / 2 + r * (ch + gap),
          0.06,
        ]);
      }
    }
    return { positions, cw, ch };
  }, [w, h, cols, rows]);

  return (
    <Instances limit={positions.length}>
      <boxGeometry args={[cw, ch, 0.01]} />
      <meshStandardMaterial color="#071d3a" metalness={0.5} roughness={0.2} />
      {positions.map((p, i) => <Instance key={i} position={p} />)}
    </Instances>
  );
}

function Panel() {
  const groupRef = useRef(null);
  const pw = 1.4, ph = 2.2;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.55;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[pw, ph, 0.12]} />
        <meshStandardMaterial
          color="#c8cdd3"
          metalness={0.9}
          roughness={0.25}
          emissive="#f59e0b"
          emissiveIntensity={0.08}
        />
      </mesh>
      <SmallCells w={pw - 0.1} h={ph - 0.1} cols={4} rows={6} />
    </group>
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

export default function FloatingPanel() {
  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} color="#fff5e0" />
        <Panel />
        <Disposer />
      </Canvas>
    </ErrorBoundary>
  );
}
