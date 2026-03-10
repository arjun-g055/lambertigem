import React, { useRef, useEffect, useState, useCallback } from "react";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = 48,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    // Each repeated block has the same width. The track contains 4 copies,
    // so one copy's width (including its gap contribution) is total / 4.
    // We scroll by exactly half the track (2 copies) so the loop is seamless.
    const totalWidth = trackRef.current.scrollWidth;
    const halfWidth = totalWidth / 2;
    if (halfWidth > 0 && speed > 0) {
      setAnimationDuration(halfWidth / speed);
    }
  }, [speed]);

  useEffect(() => {
    measure();

    const observer = new ResizeObserver(() => measure());
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }
    return () => observer.disconnect();
  }, [measure]);

  const keyframes =
    direction === "left"
      ? "marquee-scroll-left"
      : "marquee-scroll-right";

  return (
    <>
      <style>{`
        @keyframes marquee-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div
        className={className}
        style={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: `${gap}px`,
            width: "max-content",
            animation:
              animationDuration > 0
                ? `${keyframes} ${animationDuration}s linear infinite`
                : "none",
          }}
          onMouseEnter={(e) => {
            if (pauseOnHover) {
              (e.currentTarget as HTMLDivElement).style.animationPlayState =
                "paused";
            }
          }}
          onMouseLeave={(e) => {
            if (pauseOnHover) {
              (e.currentTarget as HTMLDivElement).style.animationPlayState =
                "running";
            }
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: `${gap}px`,
                flexShrink: 0,
              }}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteMarquee;
