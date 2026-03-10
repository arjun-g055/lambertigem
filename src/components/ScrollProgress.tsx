import { useEffect, useState, useCallback, useRef } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress((scrollTop / docHeight) * 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateProgress]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #C92C2A, #ff6b6b)",
        boxShadow: "0 0 10px rgba(201,44,42,0.5)",
        transition: "width 0.1s linear",
        zIndex: 50,
      }}
    >
      {progress > 0 && (
        <span
          style={{
            position: "absolute",
            right: "-3px",
            top: "-2px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#ff6b6b",
            animation: "scroll-dot-pulse 1.5s ease-in-out infinite",
          }}
        />
      )}
      <style>{`
        @keyframes scroll-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.6); }
        }
      `}</style>
    </div>
  );
}
