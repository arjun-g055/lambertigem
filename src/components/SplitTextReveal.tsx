"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";

interface SplitTextRevealProps {
  text: string;
  splitBy?: "char" | "word";
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  trigger?: "scroll" | "load";
}

const getHiddenTransform = (
  direction: "up" | "down" | "left" | "right"
): string => {
  switch (direction) {
    case "up":
      return "translate3d(0, 100%, 0)";
    case "down":
      return "translate3d(0, -100%, 0)";
    case "left":
      return "translate3d(100%, 0, 0)";
    case "right":
      return "translate3d(-100%, 0, 0)";
  }
};

function SplitTextReveal({
  text,
  splitBy = "word",
  className = "",
  staggerDelay,
  direction = "up",
  trigger = "scroll",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const resolvedStagger = staggerDelay ?? (splitBy === "char" ? 50 : 100);

  const segments = useMemo(() => {
    if (splitBy === "char") {
      return text.split("").map((char) => ({
        text: char,
        isSpace: char === " ",
      }));
    }

    // Split by word, preserving spaces as separate segments
    const words = text.split(/(\s+)/);
    return words.map((segment) => ({
      text: segment,
      isSpace: /^\s+$/.test(segment),
    }));
  }, [text, splitBy]);

  // IntersectionObserver for scroll trigger
  useEffect(() => {
    if (trigger !== "scroll") return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [trigger]);

  // Load trigger
  useEffect(() => {
    if (trigger !== "load") return;

    // Small delay to allow the initial hidden state to render first,
    // so the transition actually plays.
    const frame = requestAnimationFrame(() => {
      setIsRevealed(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [trigger]);

  const hiddenTransform = getHiddenTransform(direction);

  // Track which segments have finished animating so we can remove will-change
  let animatableIndex = 0;

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "inline" }}
      aria-label={text}
    >
      {segments.map((segment, i) => {
        if (segment.isSpace) {
          // Render spaces directly without a mask wrapper.
          // Use a thin inline element to preserve whitespace.
          return (
            <span
              key={i}
              style={{
                whiteSpace: "pre",
              }}
            >
              {segment.text}
            </span>
          );
        }

        const currentIndex = animatableIndex;
        animatableIndex++;

        const delay = currentIndex * resolvedStagger;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: isRevealed
                  ? "translate3d(0, 0, 0)"
                  : hiddenTransform,
                opacity: isRevealed ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                transitionDuration: "600ms",
                transitionDelay: `${delay}ms`,
                willChange: isRevealed ? "auto" : "transform, opacity",
              }}
            >
              {segment.text}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default SplitTextReveal;
