"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const COLORS = {
  bg: "#0D0608",
  fg: "#F5F0EB",
  accent: "#C92C2A",
  gold: "#D4A853",
  secondary: "#B8A99A",
  tertiary: "#7A6E63",
} as const;

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------
interface Project {
  year: number;
  name: string;
  description: string;
  shape: string;
}

const PROJECTS: Project[] = [
  {
    year: 2025,
    name: "Lancet",
    description: "CRISPR-based Lyme disease detection",
    shape: "helix",
  },
  {
    year: 2024,
    name: "Shield",
    description: "Bioengineered crop protection",
    shape: "hexagon",
  },
  {
    year: 2023,
    name: "CadLock",
    description: "Cadmium bioremediation",
    shape: "rings",
  },
  {
    year: 2022,
    name: "CadLock",
    description: "Coronary artery disease screening",
    shape: "heart",
  },
  {
    year: 2021,
    name: "AgroSense",
    description: "Agricultural biosensors",
    shape: "leaf",
  },
  {
    year: 2020,
    name: "AgroSense",
    description: "Soil monitoring system",
    shape: "particleSphere",
  },
  {
    year: 2019,
    name: "Labyrinth",
    description: "Gut microbiome engineering",
    shape: "torusKnot",
  },
  {
    year: 2018,
    name: "Captivate",
    description: "Carbon capture bioreactor",
    shape: "dodecahedron",
  },
  {
    year: 2017,
    name: "CLIPd",
    description: "Genetic circuit design",
    shape: "icosahedron",
  },
  {
    year: 2016,
    name: "Switch",
    description: "Gene expression control",
    shape: "octahedron",
  },
  {
    year: 2015,
    name: "Chitinite",
    description: "Chitin-based biomaterials",
    shape: "crystal",
  },
  {
    year: 2014,
    name: "Chitinite",
    description: "Chitin decomposition",
    shape: "tetrahedron",
  },
  {
    year: 2013,
    name: "First",
    description: "Lambert's first iGEM project",
    shape: "sphere",
  },
];

// ---------------------------------------------------------------------------
// 3D shape components
// ---------------------------------------------------------------------------

/** Shared wireframe + semi-transparent material */
function ScienceMaterial({ active }: { active: boolean }) {
  return (
    <MeshDistortMaterial
      color={active ? COLORS.accent : COLORS.tertiary}
      wireframe
      transparent
      opacity={active ? 0.85 : 0.4}
      distort={active ? 0.25 : 0.1}
      speed={2}
      roughness={0.3}
      metalness={0.6}
    />
  );
}

/** DNA double helix built from tubes + spheres */
function HelixModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const color = active ? COLORS.accent : COLORS.tertiary;

  const { strand1, strand2, rungs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const r: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    const turns = 2.5;
    const steps = 80;
    const radius = 0.6;
    const height = 3;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      s1.push(new THREE.Vector3(x1, y, z1));
      s2.push(new THREE.Vector3(x2, y, z2));
      if (i % 5 === 0) {
        r.push({
          a: new THREE.Vector3(x1, y, z1),
          b: new THREE.Vector3(x2, y, z2),
        });
      }
    }
    return { strand1: s1, strand2: s2, rungs: r };
  }, []);

  const curve1 = useMemo(() => new THREE.CatmullRomCurve3(strand1), [strand1]);
  const curve2 = useMemo(() => new THREE.CatmullRomCurve3(strand2), [strand2]);
  const tubeGeo1 = useMemo(
    () => new THREE.TubeGeometry(curve1, 80, 0.04, 6, false),
    [curve1],
  );
  const tubeGeo2 = useMemo(
    () => new THREE.TubeGeometry(curve2, 80, 0.04, 6, false),
    [curve2],
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={tubeGeo1}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh geometry={tubeGeo2}>
        <meshStandardMaterial
          color={COLORS.gold}
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {rungs.map((rung, i) => {
        const mid = rung.a.clone().lerp(rung.b, 0.5);
        const dir = rung.b.clone().sub(rung.a);
        const len = dir.length();
        return (
          <mesh key={i} position={mid}>
            <cylinderGeometry args={[0.015, 0.015, len, 4]} />
            <meshStandardMaterial
              color={COLORS.secondary}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
      {/* Small spheres at rung endpoints */}
      {rungs.map((rung, i) => (
        <React.Fragment key={`bp-${i}`}>
          <mesh position={rung.a}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={color} transparent opacity={0.9} />
          </mesh>
          <mesh position={rung.b}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={COLORS.gold}
              transparent
              opacity={0.9}
            />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

/** Extruded hexagonal shield */
function HexagonModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const r = 1.2;
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <ScienceMaterial active={active} />
    </mesh>
  );
}

/** Interlocking rings (torus pair) */
function RingsModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const color = active ? COLORS.accent : COLORS.tertiary;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.12, 16, 40]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.9, 0.12, 16, 40]} />
        <meshStandardMaterial
          color={COLORS.gold}
          wireframe
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.9, 0.12, 16, 40]} />
        <meshStandardMaterial
          color={COLORS.secondary}
          wireframe
          transparent
          opacity={0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

/** Heart-like organic shape (deformed torus knot) */
function HeartModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={0.6}>
        <torusKnotGeometry args={[0.8, 0.35, 128, 16, 2, 3]} />
        <MeshDistortMaterial
          color={active ? COLORS.accent : COLORS.tertiary}
          wireframe
          transparent
          opacity={active ? 0.8 : 0.4}
          distort={0.35}
          speed={1.5}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

/** Leaf / plant shape — flat extruded leaf silhouette */
function LeafModel({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const color = active ? "#3a8c3f" : COLORS.tertiary;

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.4);
    shape.bezierCurveTo(0.8, -0.6, 1.1, 0.3, 0.5, 1.0);
    shape.bezierCurveTo(0.2, 1.3, 0, 1.5, 0, 1.5);
    shape.bezierCurveTo(0, 1.5, -0.2, 1.3, -0.5, 1.0);
    shape.bezierCurveTo(-1.1, 0.3, -0.8, -0.6, 0, -1.4);
    const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.02, bevelSegments: 2 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={active ? 0.8 : 0.4}
          roughness={0.4}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

/** Sphere with orbiting particles */
function ParticleSphereModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const color = active ? COLORS.accent : COLORS.tertiary;

  const particlePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.2 + (Math.random() - 0.5) * 0.3;
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={active ? 0.5 : 0.25}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial
            color={active ? COLORS.gold : COLORS.secondary}
            transparent
            opacity={active ? 0.9 : 0.4}
            emissive={active ? COLORS.gold : COLORS.tertiary}
            emissiveIntensity={active ? 0.5 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Standard platonic solids & shapes */
function StandardShape({
  active,
  shape,
}: {
  active: boolean;
  shape: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  const geometryNode = useMemo(() => {
    switch (shape) {
      case "torusKnot":
        return <torusKnotGeometry args={[0.7, 0.25, 100, 16, 3, 5]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.1, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[1.2, 0]} />;
      case "sphere":
        return <sphereGeometry args={[1, 20, 20]} />;
      case "crystal":
        // Elongated octahedron — gives a crystal/gem silhouette
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <sphereGeometry args={[1, 20, 20]} />;
    }
  }, [shape]);

  const scaleY = shape === "crystal" ? 1.6 : 1;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={[1, scaleY, 1]}>
        {geometryNode}
        <ScienceMaterial active={active} />
      </mesh>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// Shape dispatcher
// ---------------------------------------------------------------------------
function ProjectModel({
  shape,
  active,
  visible,
}: {
  shape: string;
  active: boolean;
  visible: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = visible ? 1 : 0;
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      target,
      delta * 4,
    );
    const s = scaleRef.current;
    groupRef.current.scale.set(s, s, s);
  });

  const modelNode = useMemo(() => {
    switch (shape) {
      case "helix":
        return <HelixModel active={active} />;
      case "hexagon":
        return <HexagonModel active={active} />;
      case "rings":
        return <RingsModel active={active} />;
      case "heart":
        return <HeartModel active={active} />;
      case "leaf":
        return <LeafModel active={active} />;
      case "particleSphere":
        return <ParticleSphereModel active={active} />;
      default:
        return <StandardShape active={active} shape={shape} />;
    }
  }, [shape, active]);

  return <group ref={groupRef}>{modelNode}</group>;
}

// ---------------------------------------------------------------------------
// Scene — renders the current active model
// ---------------------------------------------------------------------------
function Scene({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight
        position={[-3, 2, 4]}
        intensity={0.4}
        color={COLORS.accent}
      />
      <pointLight
        position={[3, -2, -4]}
        intensity={0.3}
        color={COLORS.gold}
      />
      <Environment preset="night" />
      {PROJECTS.map((project, i) => (
        <ProjectModel
          key={project.year}
          shape={project.shape}
          active={i === activeIndex}
          visible={i === activeIndex}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Progress indicator
// ---------------------------------------------------------------------------
function ProgressIndicator({
  activeIndex,
  total,
  progress,
}: {
  activeIndex: number;
  total: number;
  progress: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* Track line */}
      <div
        style={{
          position: "relative",
          width: "2px",
          height: `${(total - 1) * 28 + 12}px`,
          background: `linear-gradient(to bottom, ${COLORS.tertiary}33, ${COLORS.tertiary}33)`,
          borderRadius: "1px",
        }}
      >
        {/* Active fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.gold})`,
            borderRadius: "1px",
            transition: "height 0.3s ease-out",
          }}
        />
        {/* Dots */}
        {PROJECTS.map((project, i) => {
          const isActive = i === activeIndex;
          const isPast = i / (total - 1) <= progress;
          return (
            <div
              key={project.year}
              style={{
                position: "absolute",
                top: `${(i / (total - 1)) * 100}%`,
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: isActive ? "10px" : "6px",
                height: isActive ? "10px" : "6px",
                borderRadius: "50%",
                background: isActive
                  ? COLORS.accent
                  : isPast
                    ? COLORS.gold
                    : COLORS.tertiary,
                border: isActive ? `2px solid ${COLORS.fg}` : "none",
                transition: "all 0.3s ease-out",
                boxShadow: isActive
                  ? `0 0 8px ${COLORS.accent}88`
                  : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fallback for Canvas Suspense
// ---------------------------------------------------------------------------
function CanvasFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: `2px solid ${COLORS.tertiary}`,
          borderTop: `2px solid ${COLORS.accent}`,
          borderRadius: "50%",
          animation: "timeline-spin 1s linear infinite",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const ProjectTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const lastIndexRef = useRef(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = -rect.top;
    const scrollableHeight = container.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) return;

    const rawProgress = containerTop / scrollableHeight;
    const progress = Math.max(0, Math.min(1, rawProgress));
    setScrollProgress(progress);

    const newIndex = Math.min(
      PROJECTS.length - 1,
      Math.max(0, Math.round(progress * (PROJECTS.length - 1))),
    );

    if (newIndex !== lastIndexRef.current) {
      // Trigger text fade transition
      setTextOpacity(0);
      setTimeout(() => {
        setActiveIndex(newIndex);
        lastIndexRef.current = newIndex;
        setTextOpacity(1);
      }, 150);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const currentProject = PROJECTS[activeIndex];

  return (
    <>
      <style>{`
        @keyframes timeline-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Tall scroll container — each project ~ 100vh */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: `${PROJECTS.length * 100}vh`,
          background: COLORS.bg,
        }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* ----- Left: 3D Canvas ----- */}
          <div
            style={{
              flex: "1 1 50%",
              minWidth: 0,
              height: "100%",
              position: "relative",
            }}
            className="timeline-canvas-container"
          >
            <Suspense fallback={<CanvasFallback />}>
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                style={{ width: "100%", height: "100%" }}
                dpr={[1, 1.5]}
                frameloop="always"
                gl={{ antialias: true, alpha: true }}
              >
                <Scene activeIndex={activeIndex} />
              </Canvas>
            </Suspense>

            {/* Subtle radial glow behind model */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${COLORS.accent}15 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ----- Right: Text info ----- */}
          <div
            style={{
              flex: "1 1 50%",
              minWidth: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "3rem",
              paddingRight: "5rem",
              position: "relative",
            }}
            className="timeline-text-container"
          >
            <div
              style={{
                opacity: textOpacity,
                transition: "opacity 0.3s ease-out",
              }}
            >
              {/* Year */}
              <div
                style={{
                  fontFamily:
                    "'Inter', 'SF Mono', 'Fira Code', monospace",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 800,
                  color: COLORS.accent,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {currentProject.year}
              </div>

              {/* Project name */}
              <h2
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontWeight: 700,
                  color: COLORS.fg,
                  lineHeight: 1.15,
                  margin: "0.5rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {currentProject.name}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                  color: COLORS.secondary,
                  lineHeight: 1.6,
                  maxWidth: "28ch",
                  margin: 0,
                }}
              >
                {currentProject.description}
              </p>

              {/* Year range badge */}
              <div
                style={{
                  marginTop: "2rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  border: `1px solid ${COLORS.tertiary}44`,
                  background: `${COLORS.tertiary}11`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: COLORS.accent,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', monospace",
                    fontSize: "0.8rem",
                    color: COLORS.tertiary,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {activeIndex + 1} / {PROJECTS.length} Projects
                </span>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <ProgressIndicator
            activeIndex={activeIndex}
            total={PROJECTS.length}
            progress={scrollProgress}
          />
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-canvas-container {
            flex: 1 1 45% !important;
          }
          .timeline-text-container {
            flex: 1 1 55% !important;
            padding-left: 1.5rem !important;
            padding-right: 3.5rem !important;
          }
        }

        @media (max-width: 640px) {
          .timeline-canvas-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 45% !important;
            flex: none !important;
          }
          .timeline-text-container {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 55% !important;
            flex: none !important;
            padding-left: 1.5rem !important;
            padding-right: 3.5rem !important;
            justify-content: flex-start !important;
            padding-top: 1.5rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectTimeline;
