"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  trigger?: "hover" | "scroll";
  className?: string;
  duration?: number;
}

interface CharState {
  char: string;
  resolved: boolean;
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function TextScramble({
  text,
  trigger = "scroll",
  className = "",
  duration = 1500,
}: TextScrambleProps) {
  const [chars, setChars] = useState<CharState[]>(() =>
    Array.from(text).map(() => ({ char: randomChar(), resolved: false }))
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  const runAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const length = text.length;
    const cyclesPerChar = 6;
    const totalFrames = length * cyclesPerChar;
    const msPerFrame = duration / totalFrames;
    let frame = 0;
    let lastTime = 0;

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed >= msPerFrame) {
        lastTime = timestamp;
        frame++;

        const resolveUpTo = Math.floor((frame / totalFrames) * length);

        setChars(
          Array.from(text).map((finalChar, i) => {
            if (i < resolveUpTo) {
              return { char: finalChar, resolved: true };
            }
            return { char: randomChar(), resolved: false };
          })
        );

        if (frame >= totalFrames) {
          setChars(
            Array.from(text).map((c) => ({ char: c, resolved: true }))
          );
          return;
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    setChars(
      Array.from(text).map(() => ({ char: randomChar(), resolved: false }))
    );
    animationRef.current = requestAnimationFrame(step);
  }, [text, duration]);

  // Scroll trigger via IntersectionObserver
  useEffect(() => {
    if (trigger !== "scroll") return;

    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            runAnimation();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, hasAnimated, runAnimation]);

  // Hover trigger
  const handleMouseEnter = useCallback(() => {
    if (trigger === "hover") {
      runAnimation();
    }
  }, [trigger, runAnimation]);

  // Initialize with scrambled text for scroll mode, final text for hover mode
  useEffect(() => {
    if (trigger === "hover") {
      setChars(
        Array.from(text).map((c) => ({ char: c, resolved: true }))
      );
    } else {
      setChars(
        Array.from(text).map(() => ({ char: randomChar(), resolved: false }))
      );
    }
  }, [text, trigger]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={spanRef}
      className={`tracking-wider inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            opacity: c.resolved ? 1 : 0.5,
            color: c.resolved ? "inherit" : "#C92C2A",
            transition: "opacity 0.1s, color 0.1s",
          }}
        >
          {c.char}
        </span>
      ))}
    </span>
  );
}

export default TextScramble;
