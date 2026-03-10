import { useEffect, useRef, useCallback } from "react";

function SpotlightCursor() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isTouchDevice = useRef(false);

  const lerp = useCallback((a: number, b: number, t: number) => {
    return a + (b - a) * t;
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      isTouchDevice.current = true;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.1);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.1);

      if (overlayRef.current) {
        const x = Math.round(currentPos.current.x * 10) / 10;
        const y = Math.round(currentPos.current.y * 10) / 10;
        overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(201,44,42,0.04), transparent 60%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  if (isTouchDevice.current) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

export default SpotlightCursor;
