"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -200, y = -200;
    let rx = -200, ry = -200;
    let raf;

    const onMove = (e) => { x = e.clientX; y = e.clientY; };

    const tick = () => {
      dot.style.transform  = `translate(${x}px, ${y}px)`;
      rx += (x - rx) * 0.13;
      ry += (y - ry) * 0.13;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isTouchDevice]);

  // Never render on touch devices — matches the `cursor: none` rule in
  // globals.css, which is keyed off the same (hover: none) media query.
  if (isTouchDevice) return null;

  return (
    <>
      {/* Gold dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-2 w-2 rounded-full bg-amber-400" />
      </div>

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-8 w-8 rounded-full border border-amber-400/50"
          style={{ boxShadow: "0 0 10px rgba(245,158,11,0.2)" }}
        />
      </div>
    </>
  );
}
