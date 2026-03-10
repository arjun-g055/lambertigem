import React from "react";

interface MorphingBlobProps {
  color?: string;
  size?: number;
  className?: string;
  opacity?: number;
}

const MorphingBlob: React.FC<MorphingBlobProps> = ({
  color = "#C92C2A",
  size = 400,
  className = "",
  opacity = 0.15,
}) => {
  const uniqueId = React.useId();

  return (
    <>
      <style>{`
        @keyframes blob-rotate-1-${CSS.escape(uniqueId)} {
          0% {
            transform: rotate(0deg) scale(1, 0.85);
          }
          33% {
            transform: rotate(120deg) scale(0.9, 1.05);
          }
          66% {
            transform: rotate(240deg) scale(1.05, 0.9);
          }
          100% {
            transform: rotate(360deg) scale(1, 0.85);
          }
        }

        @keyframes blob-rotate-2-${CSS.escape(uniqueId)} {
          0% {
            transform: rotate(60deg) scale(0.9, 1.1);
          }
          33% {
            transform: rotate(180deg) scale(1.1, 0.85);
          }
          66% {
            transform: rotate(300deg) scale(0.85, 1.05);
          }
          100% {
            transform: rotate(420deg) scale(0.9, 1.1);
          }
        }

        @keyframes blob-rotate-3-${CSS.escape(uniqueId)} {
          0% {
            transform: rotate(120deg) scale(1.05, 0.9);
          }
          33% {
            transform: rotate(240deg) scale(0.85, 1.1);
          }
          66% {
            transform: rotate(360deg) scale(1, 0.95);
          }
          100% {
            transform: rotate(480deg) scale(1.05, 0.9);
          }
        }
      `}</style>
      <div
        className={className}
        style={{
          position: "relative",
          width: size,
          height: size,
          filter: "blur(60px)",
        }}
      >
        {/* Ellipse 1 */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            animation: `blob-rotate-1-${CSS.escape(uniqueId)} 12s ease-in-out infinite`,
          }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="120"
            fill={color}
            fillOpacity={opacity}
          />
        </svg>

        {/* Ellipse 2 */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            animation: `blob-rotate-2-${CSS.escape(uniqueId)} 16s ease-in-out infinite`,
          }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="140"
            ry="170"
            fill={color}
            fillOpacity={opacity}
          />
        </svg>

        {/* Ellipse 3 */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            animation: `blob-rotate-3-${CSS.escape(uniqueId)} 20s ease-in-out infinite`,
          }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="110"
            fill={color}
            fillOpacity={opacity}
          />
        </svg>
      </div>
    </>
  );
};

export default MorphingBlob;
