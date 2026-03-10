"use client";

import React, { useRef, useState, useCallback } from "react";

interface HoverDistortionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const HoverDistortion: React.FC<HoverDistortionProps> = ({
  children,
  className = "",
  intensity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // Normalized position from -1 to 1, where 0 is center
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      const skewX = x * 2 * intensity;
      const skewY = y * 2 * intensity;
      const hueShift = (x + 1) * 15 * intensity; // 0 to 30deg range
      const brightness = 1.0 + (1 - Math.sqrt(x * x + y * y) / Math.SQRT2) * 0.1 * intensity;

      setTransform({
        transform: `scale(1.02) skew(${skewX}deg, ${skewY}deg)`,
        filter: `hue-rotate(${hueShift}deg) brightness(${brightness})`,
        transition: "transform 0.15s ease-out, filter 0.15s ease-out",
      });
    },
    [intensity]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform({
      transform: "scale(1) skew(0deg, 0deg)",
      filter: "hue-rotate(0deg) brightness(1)",
      transition: "transform 0.5s ease, filter 0.5s ease",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          willChange: isHovered ? "transform, filter" : "auto",
          ...(!isHovered && !transform.transform
            ? {
                transform: "scale(1) skew(0deg, 0deg)",
                filter: "hue-rotate(0deg) brightness(1)",
                transition: "transform 0.5s ease, filter 0.5s ease",
              }
            : transform),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HoverDistortion;
