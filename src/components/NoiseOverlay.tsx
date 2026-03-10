"use client";

import { useEffect, useRef } from "react";

const NOISE_STYLES: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 9990,
  opacity: 0.03,
  mixBlendMode: "overlay",
};

const VIGNETTE_STYLES: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 9990,
  background:
    "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)",
};

function NoiseOverlay() {
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    const el = noiseRef.current;
    if (!el) return;

    const animate = () => {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      el.style.transform = `translate(${x}px, ${y}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      <div ref={noiseRef} style={NOISE_STYLES}>
        <svg width="100%" height="100%">
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={3}
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-filter)" />
        </svg>
      </div>
      <div style={VIGNETTE_STYLES} />
    </>
  );
}

export default NoiseOverlay;
