import React, { useRef, useEffect, useState, useCallback } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  className?: string;
}

function easeOutExpo(t: number): number {
  return 1 - Math.pow(2, -10 * t);
}

/**
 * Renders a single digit with a slot-machine roll-up effect.
 * When `digit` changes, the previous value slides up and out
 * while the new value slides up into place.
 */
function SlotDigit({ char, animate }: { char: string; animate: boolean }) {
  const [display, setDisplay] = useState<{ current: string; prev: string | null }>({
    current: char,
    prev: null,
  });
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!animate) {
      setDisplay({ current: char, prev: null });
      return;
    }

    setDisplay((prev) => ({
      current: char,
      prev: prev.current !== char ? prev.current : null,
    }));

    if (display.current !== char) {
      setRolling(true);
      const timeout = setTimeout(() => setRolling(false), 150);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char, animate]);

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{ width: char === "," || char === "." ? "0.35em" : "0.65em", height: "1.1em" }}
    >
      {/* Previous digit sliding out upward */}
      {rolling && display.prev !== null && (
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: "countup-slide-out 150ms ease-out forwards",
          }}
        >
          {display.prev}
        </span>
      )}
      {/* Current digit sliding in from below */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: rolling ? "countup-slide-in 150ms ease-out forwards" : undefined,
        }}
      >
        {display.current}
      </span>
    </span>
  );
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  // Format number with commas
  const formatNumber = useCallback((n: number): string => {
    return Math.round(n).toLocaleString();
  }, []);

  // IntersectionObserver to trigger count on viewport entry
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [hasTriggered]);

  // requestAnimationFrame counting animation
  useEffect(() => {
    if (!hasTriggered) return;

    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCurrentValue(easedProgress * end);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCurrentValue(end);
        setAnimationDone(true);
        // Delay label fade-in by 300ms after counter finishes
        setTimeout(() => setShowLabel(true), 300);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [hasTriggered, end, duration]);

  const displayStr = `${prefix}${formatNumber(currentValue)}${suffix}`;

  return (
    <div ref={containerRef} className={`text-center ${className}`}>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes countup-slide-out {
          from { transform: translateY(0); opacity: 1; }
          to   { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes countup-slide-in {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes countup-line-expand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* Counter display */}
      <div
        className="text-5xl md:text-7xl font-light tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
        aria-label={displayStr}
      >
        {displayStr.split("").map((char, i) => (
          <SlotDigit key={i} char={char} animate={hasTriggered && !animationDone} />
        ))}
      </div>

      {/* Expanding line */}
      <div
        className="mx-auto mt-4"
        style={{
          height: "2px",
          width: "60%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          transform: hasTriggered ? "scaleX(1)" : "scaleX(0)",
          transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          transformOrigin: "center",
        }}
      />

      {/* Label with delayed fade-in */}
      <p
        className="text-gray-500 text-xs mt-4 uppercase tracking-[0.25em] font-light"
        style={{
          opacity: showLabel ? 1 : 0,
          transform: showLabel ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 500ms ease-out, transform 500ms ease-out",
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default CountUp;
