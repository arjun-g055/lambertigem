import React from "react";

interface DNAHelixProps {
  className?: string;
  style?: React.CSSProperties;
}

const DNAHelix: React.FC<DNAHelixProps> = ({ className, style }) => {
  const width = 200;
  const height = 600;
  const centerX = width / 2;
  const amplitude = 50;
  const rungCount = 40;
  const yStep = height / rungCount;

  // Generate y-positions for sampling the helix
  const positions = Array.from({ length: rungCount + 1 }, (_, i) => i * yStep);

  // Build the two backbone strand paths procedurally
  const strand1Points = positions.map((y) => {
    const x = centerX + amplitude * Math.sin((y / height) * Math.PI * 4);
    return { x, y };
  });

  const strand2Points = positions.map((y) => {
    const x = centerX - amplitude * Math.sin((y / height) * Math.PI * 4);
    return { x, y };
  });

  const toPathD = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    const [first, ...rest] = points;
    return (
      `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}` +
      rest
        .map((p) => ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
        .join("")
    );
  };

  const strand1D = toPathD(strand1Points);
  const strand2D = toPathD(strand2Points);

  // Rungs connect the two strands at each position
  const rungs = positions.map((y, i) => ({
    x1: strand1Points[i].x,
    x2: strand2Points[i].x,
    y,
  }));

  return (
    <div className={className} style={{ opacity: 0.15, ...style }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <style>{`
          @keyframes dna-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-${yStep}px); }
          }
          .dna-helix-group {
            animation: dna-scroll 15s linear infinite;
          }
        `}</style>
        <g className="dna-helix-group">
          {/* Rungs (base pairs) */}
          {rungs.map((rung, i) => (
            <line
              key={`rung-${i}`}
              x1={rung.x1}
              y1={rung.y}
              x2={rung.x2}
              y2={rung.y}
              stroke="white"
              strokeWidth={0.5}
              opacity={0.1}
            />
          ))}

          {/* Backbone strand 1 */}
          <path
            d={strand1D}
            fill="none"
            stroke="#C92C2A"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Backbone strand 2 */}
          <path
            d={strand2D}
            fill="none"
            stroke="#ff6b6b"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default DNAHelix;
