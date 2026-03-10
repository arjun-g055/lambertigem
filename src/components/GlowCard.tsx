"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

function GlowCard({ children, className = "" }: GlowCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        padding: "1px",
        borderRadius: "1.25rem",
        background: "transparent",
      }}
    >
      {/* Glow border layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `conic-gradient(
            from 0deg at var(--mouse-x, 50%) var(--mouse-y, 50%),
            #C92C2A,
            #ff6b6b,
            transparent 120deg,
            transparent 240deg,
            #C92C2A
          )`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Soft ambient glow behind the card */}
      <div
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "inherit",
          background: `radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(201, 44, 42, 0.15),
            transparent 40%
          )`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          filter: "blur(12px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Inner card content */}
      <div
        className={className}
        style={{
          position: "relative",
          borderRadius: "calc(1.25rem - 1px)",
          background: "rgba(0, 0, 0, 0.60)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default GlowCard;
