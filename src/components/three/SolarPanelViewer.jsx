"use client";

import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  Instances,
  Instance,
} from "@react-three/drei";

/* -------------------------------------------------------------------------- */
/*  Swap-in point for a real .glb model                                       */
/*                                                                            */
/*  When a production model is ready:                                         */
/*    1. Drop the file at  public/models/solar-panel.glb                      */
/*    2. Uncomment RealSolarPanel + the preload below.                        */
/*    3. Render <RealSolarPanel /> in place of <PlaceholderSolarPanel />      */
/*       inside <Scene /> — both accept the same position/rotation props,     */
/*       so nothing else has to change.                                       */
/* -------------------------------------------------------------------------- */
// import { useGLTF } from "@react-three/drei";
// function RealSolarPanel(props) {
//   const { scene } = useGLTF("/models/solar-panel.glb");
//   return <primitive object={scene} {...props} />;
// }
// useGLTF.preload("/models/solar-panel.glb");

/** Grid of photovoltaic cells, instanced for performance. */
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
      {/* Dark photovoltaic blue, glassy + reflective for a premium read */}
      <meshStandardMaterial
        color="#0a2342"
        metalness={0.55}
        roughness={0.2}
        envMapIntensity={1.4}
      />
      {positions.map((p, i) => (
        <Instance key={i} position={p} />
      ))}
    </Instances>
  );
}

/**
 * Placeholder geometry that reads as a real solar panel: a thin dark-blue
 * panel with a visible grid of cells, an aluminium frame, mounted on a pole
 * at a tilt. Accepts standard object props (position/rotation) so a real
 * model can drop in later with no surrounding changes.
 */
function PlaceholderSolarPanel(props) {
  const panelW = 3.0;
  const panelH = 5.0;
  const tilt = -0.5; // radians — leans the top of the panel back

  return (
    <group {...props}>
      {/* ---- Mount: ground base + pole ---- */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.85, 0.12, 48]} />
        <meshStandardMaterial color="#2a2f36" metalness={0.7} roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 2.0, 32]} />
        <meshStandardMaterial color="#9aa3ad" metalness={0.95} roughness={0.3} />
      </mesh>

      {/* ---- Tilted panel assembly ---- */}
      <group position={[0, 2.05, 0]} rotation={[tilt, 0, 0]}>
        {/* Aluminium frame (slightly larger than the glass, with depth) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[panelW, panelH, 0.16]} />
          <meshStandardMaterial
            color="#c7ccd1"
            metalness={0.9}
            roughness={0.28}
            envMapIntensity={1.1}
          />
        </mesh>

        {/* Dark substrate / backsheet, inset so the frame reads as a border */}
        <mesh position={[0, 0, 0.07]} receiveShadow>
          <boxGeometry args={[panelW - 0.12, panelH - 0.12, 0.06]} />
          <meshStandardMaterial color="#020912" metalness={0.3} roughness={0.5} />
        </mesh>

        {/* Cell grid sitting just proud of the substrate */}
        <Cells
          width={panelW}
          height={panelH}
          cols={6}
          rows={10}
          gap={0.06}
          z={0.11}
        />

        {/* Mounting rails on the back */}
        {[-1.3, 1.3].map((y) => (
          <mesh key={y} position={[0, y, -0.12]} castShadow>
            <boxGeometry args={[panelW * 0.8, 0.12, 0.1]} />
            <meshStandardMaterial color="#6b7280" metalness={0.85} roughness={0.35} />
          </mesh>
        ))}

        {/* Bracket connecting the pole to the panel back */}
        <mesh position={[0, -0.2, -0.3]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.5]} />
          <meshStandardMaterial color="#6b7280" metalness={0.85} roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

/** Everything that lives inside <Canvas>, grouped for the Suspense boundary. */
function Scene() {
  return (
    <>
      {/* Soft studio lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 9, 6]} intensity={1.3} />
      <directionalLight position={[-6, 4, -5]} intensity={0.45} />
      <spotLight
        position={[0, 10, 4]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
      />

      <PlaceholderSolarPanel />
      {/* <RealSolarPanel /> */}

      {/* Soft grounding shadow */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={14}
        blur={2.6}
        far={6}
      />

      {/* Image-based lighting for realistic reflections on glass + metal */}
      <Environment preset="city" />
    </>
  );
}

/** In-canvas loading spinner shown while the HDRI / model assets stream in. */
function CanvasLoader() {
  return (
    <Html center>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-brand-accent" />
    </Html>
  );
}

export default function SolarPanelViewer() {
  // Auto-rotate runs by default and pauses while the user hovers or drags.
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const autoRotate = !hovered && !dragging;

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-brand-dark to-brand-darker ring-1 ring-white/10 sm:h-[480px] lg:h-[560px]"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [7, 5, 9], fov: 35 }}
        gl={{ antialias: true }}
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
          autoRotateSpeed={0.8}
          minDistance={6}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2.05}
          onStart={() => setDragging(true)}
          onEnd={() => setDragging(false)}
        />
      </Canvas>

      {/* Subtle brand accent corner glow — UI chrome */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl" />
    </div>
  );
}
