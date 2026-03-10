import React, { useRef, useEffect, useState, useCallback } from "react";

interface SmoothRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  blur?: boolean;
  scale?: boolean;
}

const getTranslate = (
  direction: "up" | "down" | "left" | "right",
  distance: number
): string => {
  switch (direction) {
    case "up":
      return `translate3d(0, ${distance}px, 0)`;
    case "down":
      return `translate3d(0, ${-distance}px, 0)`;
    case "left":
      return `translate3d(${distance}px, 0, 0)`;
    case "right":
      return `translate3d(${-distance}px, 0, 0)`;
  }
};

const SmoothReveal: React.FC<SmoothRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 800,
  distance = 60,
  once = true,
  className,
  blur = true,
  scale = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        setHasAnimated(true);
      } else if (!once) {
        setIsVisible(false);
      }
    },
    [once]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [handleIntersect]);

  // Remove will-change after animation completes
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      setAnimationDone(true);
    }, delay + duration);

    return () => clearTimeout(timeout);
  }, [isVisible, delay, duration]);

  const hidden = once ? !isVisible && !hasAnimated : !isVisible;

  const style: React.CSSProperties = {
    transform: hidden
      ? getTranslate(direction, distance)
      : "translate3d(0, 0, 0)",
    opacity: hidden ? 0 : 1,
    filter: blur ? (hidden ? "blur(8px)" : "blur(0px)") : undefined,
    ...(scale
      ? { scale: hidden ? "0.95" : "1" }
      : {}),
    transition: [
      `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
      `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
      ...(blur
        ? [`filter ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`]
        : []),
      ...(scale
        ? [`scale ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`]
        : []),
    ].join(", "),
    transitionDelay: `${delay}ms`,
    willChange: animationDone ? "auto" : "transform, opacity",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default SmoothReveal;
