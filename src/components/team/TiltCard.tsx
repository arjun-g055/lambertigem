import React, { useRef, useCallback } from "react";

/**
 * A card wrapper with 3D tilt-on-hover, cursor-following glow,
 * glass morphism, and Apple-style typography defaults.
 */
export default function TiltCard({
    children,
    className = "",
    style = {},
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Rotation angles: max ±15deg
        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((centerY - y) / centerY) * 15;

        // Glow position as percentage
        const glowX = `${(x / rect.width) * 100}%`;
        const glowY = `${(y / rect.height) * 100}%`;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty("--glow-x", glowX);
        card.style.setProperty("--glow-y", glowY);
        card.style.setProperty("--glow-opacity", "1");
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;

        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        card.style.setProperty("--glow-opacity", "0");
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                /* Glass card */
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1.25rem",
                transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                willChange: "transform",
                position: "relative",
                overflow: "hidden",
                /* Allow consumers to add more styles */
                ...style,
                /* CSS custom-property defaults set via inline for the glow */
                "--glow-x": "50%",
                "--glow-y": "50%",
                "--glow-opacity": "0",
            } as React.CSSProperties}
        >
            {/* Glow overlay — follows cursor */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                        "radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(201,44,42,0.15), transparent 60%)",
                    opacity: "var(--glow-opacity)",
                    transition: "opacity 0.4s ease",
                    borderRadius: "inherit",
                    zIndex: 0,
                }}
            />

            {/* Card content */}
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </div>
    );
}
