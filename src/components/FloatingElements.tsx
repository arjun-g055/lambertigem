import React from "react";

const keyframesStyles = `
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}
@keyframes floatY2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(25px); }
}
@keyframes driftX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}
@keyframes driftX2 {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-25px); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
`;

type ElementType = "circle" | "hexagon" | "ring";

interface FloatingElement {
  type: ElementType;
  top: string;
  left: string;
  size: number;
  color: string;
  opacity: number;
  floatDuration: number;
  driftDuration: number;
  spinDuration: number;
  pulseDuration: number;
  delay: number;
  floatVariant: "floatY" | "floatY2";
  driftVariant: "driftX" | "driftX2";
}

const elements: FloatingElement[] = [
  // Circles (atoms)
  { type: "circle", top: "8%", left: "12%", size: 5, color: "#ffffff", opacity: 0.07, floatDuration: 14, driftDuration: 19, spinDuration: 25, pulseDuration: 10, delay: 0, floatVariant: "floatY", driftVariant: "driftX" },
  { type: "circle", top: "25%", left: "78%", size: 6, color: "#C92C2A", opacity: 0.06, floatDuration: 12, driftDuration: 22, spinDuration: 28, pulseDuration: 9, delay: -3, floatVariant: "floatY2", driftVariant: "driftX2" },
  { type: "circle", top: "55%", left: "45%", size: 4, color: "#ffffff", opacity: 0.08, floatDuration: 18, driftDuration: 16, spinDuration: 22, pulseDuration: 11, delay: -7, floatVariant: "floatY", driftVariant: "driftX2" },
  { type: "circle", top: "72%", left: "88%", size: 7, color: "#C92C2A", opacity: 0.05, floatDuration: 15, driftDuration: 20, spinDuration: 26, pulseDuration: 8, delay: -2, floatVariant: "floatY2", driftVariant: "driftX" },
  { type: "circle", top: "90%", left: "30%", size: 5, color: "#ffffff", opacity: 0.06, floatDuration: 11, driftDuration: 24, spinDuration: 30, pulseDuration: 12, delay: -5, floatVariant: "floatY", driftVariant: "driftX" },

  // Hexagons (molecular structures)
  { type: "hexagon", top: "15%", left: "55%", size: 18, color: "#ffffff", opacity: 0.05, floatDuration: 16, driftDuration: 21, spinDuration: 24, pulseDuration: 10, delay: -1, floatVariant: "floatY2", driftVariant: "driftX" },
  { type: "hexagon", top: "40%", left: "8%", size: 22, color: "#C92C2A", opacity: 0.06, floatDuration: 13, driftDuration: 18, spinDuration: 20, pulseDuration: 9, delay: -4, floatVariant: "floatY", driftVariant: "driftX2" },
  { type: "hexagon", top: "65%", left: "65%", size: 16, color: "#ffffff", opacity: 0.07, floatDuration: 19, driftDuration: 15, spinDuration: 27, pulseDuration: 11, delay: -6, floatVariant: "floatY2", driftVariant: "driftX2" },
  { type: "hexagon", top: "82%", left: "50%", size: 20, color: "#C92C2A", opacity: 0.05, floatDuration: 10, driftDuration: 23, spinDuration: 22, pulseDuration: 8, delay: -8, floatVariant: "floatY", driftVariant: "driftX" },
  { type: "hexagon", top: "35%", left: "92%", size: 14, color: "#ffffff", opacity: 0.06, floatDuration: 17, driftDuration: 17, spinDuration: 29, pulseDuration: 12, delay: -3, floatVariant: "floatY2", driftVariant: "driftX" },

  // Rings (electron orbits)
  { type: "ring", top: "20%", left: "35%", size: 32, color: "#ffffff", opacity: 0.06, floatDuration: 20, driftDuration: 25, spinDuration: 23, pulseDuration: 10, delay: -2, floatVariant: "floatY", driftVariant: "driftX2" },
  { type: "ring", top: "48%", left: "72%", size: 26, color: "#C92C2A", opacity: 0.07, floatDuration: 14, driftDuration: 19, spinDuration: 21, pulseDuration: 9, delay: -5, floatVariant: "floatY2", driftVariant: "driftX" },
  { type: "ring", top: "75%", left: "15%", size: 38, color: "#ffffff", opacity: 0.05, floatDuration: 18, driftDuration: 22, spinDuration: 26, pulseDuration: 11, delay: -1, floatVariant: "floatY", driftVariant: "driftX" },
  { type: "ring", top: "5%", left: "85%", size: 28, color: "#C92C2A", opacity: 0.08, floatDuration: 12, driftDuration: 16, spinDuration: 28, pulseDuration: 8, delay: -7, floatVariant: "floatY2", driftVariant: "driftX2" },
];

function renderElement(el: FloatingElement, index: number) {
  const animation = [
    `${el.floatVariant} ${el.floatDuration}s ease-in-out infinite`,
    `${el.driftVariant} ${el.driftDuration}s ease-in-out infinite`,
    `spin ${el.spinDuration}s linear infinite`,
    `pulse ${el.pulseDuration}s ease-in-out infinite`,
  ].join(", ");

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    top: el.top,
    left: el.left,
    animation,
    animationDelay: `${el.delay}s`,
  };

  if (el.type === "circle") {
    return (
      <div
        key={index}
        style={{
          ...baseStyle,
          width: el.size,
          height: el.size,
          borderRadius: "50%",
          backgroundColor: el.color,
          opacity: el.opacity,
        }}
      />
    );
  }

  if (el.type === "hexagon") {
    return (
      <div
        key={index}
        style={{
          ...baseStyle,
          width: el.size,
          height: el.size,
          backgroundColor: el.color,
          opacity: el.opacity,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
    );
  }

  // Ring
  return (
    <div
      key={index}
      style={{
        ...baseStyle,
        width: el.size,
        height: el.size,
        borderRadius: "50%",
        border: `1px solid ${el.color}`,
        opacity: el.opacity,
        backgroundColor: "transparent",
      }}
    />
  );
}

const FloatingElements: React.FC = () => {
  return (
    <>
      <style>{keyframesStyles}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {elements.map((el, i) => renderElement(el, i))}
      </div>
    </>
  );
};

export default FloatingElements;
