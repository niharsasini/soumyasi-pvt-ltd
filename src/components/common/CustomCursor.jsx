"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    let raf;
    const tick = () => {
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ringX += (x - ringX) * 0.12;
      ringY += (y - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="h-2 w-2 rounded-full bg-cyan-400" />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div
          className="h-8 w-8 rounded-full border border-cyan-400/50"
          style={{ boxShadow: "0 0 12px rgba(34,211,238,0.2)" }}
        />
      </div>
    </>
  );
}
