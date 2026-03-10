"use client";

import { useRef, useEffect, useCallback } from "react";

interface ScrollVelocityTextProps {
  text: string;
  baseVelocity?: number;
  className?: string;
}

function ScrollVelocityText({
  text,
  baseVelocity = 2,
  className,
}: ScrollVelocityTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const translateX = useRef(0);
  const velocity = useRef(0);
  const direction = useRef(-1);
  const animationId = useRef<number>(0);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.current;

    if (delta > 0) {
      direction.current = -1;
      velocity.current += Math.abs(delta) * 0.3;
    } else if (delta < 0) {
      direction.current = 1;
      velocity.current += Math.abs(delta) * 0.3;
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      velocity.current *= 0.95;

      const move =
        (baseVelocity + velocity.current) * direction.current;
      translateX.current += move;

      if (innerRef.current) {
        const halfWidth = innerRef.current.scrollWidth / 2;

        if (Math.abs(translateX.current) >= halfWidth) {
          translateX.current =
            translateX.current % halfWidth;
        }

        innerRef.current.style.transform = `translate3d(${translateX.current}px, 0, 0)`;
      }

      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId.current);
    };
  }, [baseVelocity, handleScroll]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className ?? ""}`}
    >
      <div
        ref={innerRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="text-7xl md:text-9xl font-light text-white/[0.08] uppercase tracking-[0.2em] shrink-0 px-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ScrollVelocityText;
