import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      {/* Gradient 1: Dark red, bottom-left, circular path */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vh",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(201,44,42,0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
          mixBlendMode: "normal",
          animation: "gradientMove1 20s ease-in-out infinite",
        }}
      />

      {/* Gradient 2: Slightly different red, top-right, reverse circular path */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vh",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(139,26,26,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
          mixBlendMode: "normal",
          animation: "gradientMove2 25s ease-in-out infinite",
        }}
      />

      {/* Gradient 3: Purple-ish, center, pulsing */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "60vw",
          height: "60vh",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(100,20,60,0.04) 0%, transparent 70%)",
          filter: "blur(120px)",
          mixBlendMode: "normal",
          transform: "translate(-50%, -50%)",
          animation: "gradientPulse 15s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes gradientMove1 {
          0% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(8vw) translateY(-5vh);
          }
          50% {
            transform: translateX(12vw) translateY(-10vh);
          }
          75% {
            transform: translateX(5vw) translateY(-3vh);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes gradientMove2 {
          0% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-10vw) translateY(6vh);
          }
          50% {
            transform: translateX(-14vw) translateY(10vh);
          }
          75% {
            transform: translateX(-6vw) translateY(4vh);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes gradientPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
