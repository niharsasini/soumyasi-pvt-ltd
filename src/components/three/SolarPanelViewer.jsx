"use client";

import React, { useMemo, useState, useRef, useEffect, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  Instances,
  Instance,
} from "@react-three/drei";

/** PV cell grid, instanced for GPU performance */
function Cells({ width, height, cols, rows, gap, z }) {
  const { positions, cellW, cellH } = useMemo(() => {
    const inset = 0.08;
    const innerW = width - inset * 2;
    const innerH = height - inset * 2;
    const cellW = (innerW - gap * (cols - 1)) / cols;
    const cellH = (innerH - gap * (rows - 1)) / rows;
    const positions = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = -innerW / 2 + cellW / 2 + c * (cellW + gap);
        const y = -innerH / 2 + cellH / 2 + r * (cellH + gap);
        positions.push([x, y, z]);
      }
    }
    return { positions, cellW, cellH };
  }, [width, height, cols, rows, gap, z]);

  return (
    <Instances limit={positions.length} castShadow>
      <boxGeometry args={[cellW, cellH, 0.02]} />
      {/* Deep photovoltaic blue with metallic/glass finish */}
      <meshStandardMaterial
        color="#071d3a"
        metalness={0.6}
        roughness={0.12}
        envMapIntensity={1.8}
      />
      {positions.map((p, i) => (
        <Instance key={i} position={p} />
      ))}
    </Instances>
  );
}

/** Thin silver grid lines overlaid on the cells */
function GridLines({ width, height, cols, rows, z }) {
  const lines = useMemo(() => {
    const inset = 0.08;
    const innerW = width - inset * 2;
    const innerH = height - inset * 2;
    const xStep = innerW / cols;
    const yStep = innerH / rows;
    const positions = [];
    for (let c = 1; c < cols; c++) {
      positions.push({ x: -innerW / 2 + c * xStep, y: 0, axis: "y", len: innerH });
    }
    for (let r = 1; r < rows; r++) {
      positions.push({ x: 0, y: -innerH / 2 + r * yStep, axis: "x", len: innerW });
    }
    return positions;
  }, [width, height, cols, rows]);

  return (
    <>
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, z]}>
          <boxGeometry
            args={l.axis === "y" ? [0.012, l.len, 0.005] : [l.len, 0.012, 0.005]}
          />
          <meshStandardMaterial
            color="#d0d5dd"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1.0}
          />
        </mesh>
      ))}
    </>
  );
}

/** Frame with animated emissive glow */
function PulsingFrame({ panelW, panelH }) {
  const matRef = useRef();

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.emissiveIntensity =
        0.18 + Math.sin(clock.elapsedTime * 1.8) * 0.12;
    }
  });

  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[panelW, panelH, 0.16]} />
      <meshStandardMaterial
        ref={matRef}
        color="#c8cdd3"
        metalness={0.92}
        roughness={0.25}
        emissive="#22d3ee"
        emissiveIntensity={0.18}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/** Ground reflection plane */
function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <planeGeometry args={[14, 14]} />
      <meshStandardMaterial
        color="#050d18"
        metalness={0.75}
        roughness={0.35}
        opacity={0.85}
        transparent
        envMapIntensity={0.6}
      />
    </mesh>
  );
}

/** Solar panel geometry */
function PlaceholderSolarPanel(props) {
  const panelW = 3.0;
  const panelH = 5.0;
  const tilt = -0.48;

  return (
    <group {...props}>
      {/* Base disc */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.9, 0.12, 48]} />
        <meshStandardMaterial color="#1e2530" metalness={0.75} roughness={0.4} />
      </mesh>

      {/* Pole */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.13, 2.0, 32]} />
        <meshStandardMaterial color="#9baab8" metalness={0.95} roughness={0.25} />
      </mesh>

      {/* Tilted panel assembly */}
      <group position={[0, 2.05, 0]} rotation={[tilt, 0, 0]}>
        {/* Pulsing aluminium frame */}
        <PulsingFrame panelW={panelW} panelH={panelH} />

        {/* Dark substrate */}
        <mesh position={[0, 0, 0.07]} receiveShadow>
          <boxGeometry args={[panelW - 0.12, panelH - 0.12, 0.06]} />
          <meshStandardMaterial color="#010810" metalness={0.2} roughness={0.6} />
        </mesh>

        {/* Cell grid */}
        <Cells width={panelW} height={panelH} cols={6} rows={10} gap={0.055} z={0.11} />

        {/* Silver bus-bar grid lines */}
        <GridLines width={panelW} height={panelH} cols={6} rows={10} z={0.115} />

        {/* Mounting rails (back) */}
        {[-1.3, 1.3].map((y) => (
          <mesh key={y} position={[0, y, -0.12]} castShadow>
            <boxGeometry args={[panelW * 0.78, 0.12, 0.1]} />
            <meshStandardMaterial color="#5a6370" metalness={0.88} roughness={0.3} />
          </mesh>
        ))}

        {/* Pole bracket */}
        <mesh position={[0, -0.2, -0.3]} castShadow>
          <boxGeometry args={[0.28, 0.28, 0.5]} />
          <meshStandardMaterial color="#5a6370" metalness={0.88} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/** Full scene */
function Scene() {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.3} />

      {/* Warm sun-like directional light from top-right */}
      <directionalLight
        position={[8, 10, 5]}
        intensity={2.2}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Cool fill from opposite */}
      <directionalLight position={[-5, 4, -6]} intensity={0.4} color="#cce8ff" />

      {/* Rim/accent */}
      <spotLight
        position={[0, 12, 2]}
        angle={0.45}
        penumbra={1}
        intensity={0.6}
        color="#22d3ee"
      />

      <PlaceholderSolarPanel />

      <GroundPlane />

      {/* Soft contact shadow */}
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.55}
        scale={14}
        blur={3.0}
        far={6}
        color="#000820"
      />

      {/* HDRI reflections */}
      <Environment preset="sunset" />
    </>
  );
}

function CanvasLoader() {
  return (
    <Html center>
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-white/10"
        style={{ borderTopColor: "#22d3ee" }}
      />
    </Html>
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

export default function SolarPanelViewer() {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const autoRotate = !hovered && !dragging;

  return (
    <ErrorBoundary>
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          height: "420px",
          background: "linear-gradient(to bottom, #020c1b, #0a1628)",
          boxShadow: "0 0 0 1px rgba(34,211,238,0.12), 0 20px 60px rgba(0,0,0,0.5)",
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [7, 5, 9], fov: 35 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <React.Suspense fallback={<CanvasLoader />}>
            <Scene />
          </React.Suspense>

          <OrbitControls
            makeDefault
            target={[0, 1.8, 0]}
            enablePan={false}
            enableZoom
            autoRotate={autoRotate}
            autoRotateSpeed={0.7}
            minDistance={6}
            maxDistance={16}
            maxPolarAngle={Math.PI / 2.05}
            onStart={() => setDragging(true)}
            onEnd={() => setDragging(false)}
          />
          <Disposer />
        </Canvas>

        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-gray-500 tracking-wide">
          <span>Drag to rotate · Scroll to zoom</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}
