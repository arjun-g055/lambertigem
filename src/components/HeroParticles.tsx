"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particleOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  detectRetina: true,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: { enable: false },
      onHover: {
        enable: true,
        mode: ["grab", "bubble"],
      },
      resize: { enable: true },
    },
    modes: {
      bubble: {
        distance: 220,
        duration: 2,
        opacity: 0.8,
        size: 7,
      },
      grab: {
        distance: 260,
        links: {
          opacity: 0.42,
        },
      },
    },
  },
  particles: {
    color: { value: ["#C92C2A", "#D4A853", "#F5F0EB", "#E8776D"] },
    links: {
      color: "#C92C2A",
      distance: 165,
      enable: true,
      opacity: 0.2,
      width: 1.2,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "out" },
      random: true,
      speed: 0.7,
      straight: false,
    },
    number: {
      density: { enable: true, width: 900, height: 500 },
      value: 64,
    },
    opacity: {
      value: { min: 0.18, max: 0.5 },
    },
    shape: {
      type: ["circle", "triangle", "square"],
    },
    size: {
      value: { min: 1.4, max: 4.8 },
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};

export default function HeroParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (active) {
        setReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 pointer-events-none"
      options={particleOptions}
    />
  );
}
