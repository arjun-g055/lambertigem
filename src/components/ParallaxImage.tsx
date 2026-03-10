import { useEffect, useRef, useState, useCallback } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
  containerClassName = "",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafId = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const clampedSpeed = clamp(speed, -1, 1);

  const updateTransform = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far through the viewport the element is.
    // 0 = element just entering from the bottom, 1 = element just leaving at the top.
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

    // Center the offset so the image is neutral when the container is
    // in the middle of the viewport (progress ~0.5).
    const offset = (progress - 0.5) * rect.height * clampedSpeed;

    img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.2)`;
  }, [clampedSpeed]);

  const onScroll = useCallback(() => {
    if (!isVisible) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(updateTransform);
  }, [isVisible, updateTransform]);

  // IntersectionObserver: track visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "50px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Apply / remove will-change based on visibility
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.willChange = isVisible ? "transform" : "auto";
  }, [isVisible]);

  // Scroll listener
  useEffect(() => {
    if (!isVisible) return;

    // Run once immediately so the position is correct before the user scrolls.
    updateTransform();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, onScroll, updateTransform]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${containerClassName}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover scale-[1.2] ${className}`}
        style={{ transform: "translate3d(0, 0, 0) scale(1.2)" }}
      />
    </div>
  );
}
