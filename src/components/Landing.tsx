import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const CBS_VIDEO_URL =
  "https://www.cbsnews.com/video/igem-students-lyme-research-60-minutes-video-2025-11-30/";

const STATEMENT_TEXT =
  "We are a nationally recognized synthetic biology research team from Lambert High School in Suwanee, Georgia. Since 2013, we have pioneered innovative solutions to real-world problems, from Lyme disease detection to heavy metal bioremediation, pushing the boundaries of high school science.";

const HIGHLIGHT_WORDS = new Set([
  "nationally",
  "recognized",
  "synthetic",
  "biology",
  "Lambert",
  "High",
  "School",
  "2013,",
  "innovative",
  "solutions",
  "Lyme",
  "disease",
  "boundaries",
  "science.",
]);

const PROJECTS = [
  {
    year: "2025",
    name: "Lancet",
    desc: "CRISPR-based Lyme disease detection and treatment",
    link: "https://2025.igem.wiki/lambert-ga",
    img: "https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/lancet.png",
    gradient: "from-[#1a1a0e] to-[#0D0608]",
    awards: ["Gold Medal", "Best Software Tool", "Top 10 Worldwide"],
  },
  {
    year: "2024",
    name: "Shield",
    desc: "Bioengineered crop protection systems",
    link: "https://2024.igem.wiki/lambert-ga",
    img: "https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/shield.png",
    gradient: "from-[#0e1218] to-[#0D0608]",
    awards: ["Gold Medal", "Top 10 Worldwide"],
  },
  {
    year: "2022",
    name: "CadLock",
    desc: "Coronary artery disease screening via microRNA biomarkers",
    link: "https://2022.igem.wiki/lambert-ga",
    img: "https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/cadlock22.png",
    gradient: "from-[#140e1a] to-[#0D0608]",
    awards: ["Grand Prize", "Gold Medal", "Best Wiki", "Best Presentation"],
  },
];

// ── Sparkle particles for award popup ────────────────────────────────────────
function AwardParticles() {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1.5,
    })),
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(212,168,83,${0.6 + Math.random() * 0.4}), transparent)`,
            animation: `sparkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      {/* Ambient glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,168,83,0.12), transparent 70%)",
          animation: "awardGlow 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,44,42,0.08), transparent 70%)",
          animation: "awardGlow 3s ease-in-out 1.5s infinite",
        }}
      />
    </div>
  );
}

// ── Project Card with Award Popup ────────────────────────────────────────────
function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const [showAwards, setShowAwards] = useState(false);

  return (
    <div className="project-item relative">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div
          className={`relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
        >
          <img
            src={project.img}
            alt={project.name}
            className="h-36 md:h-44 w-auto transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,_rgba(201,44,42,0.06)_0%,_transparent_60%)]" />
        </div>

        <div className="mt-6">
          <span className="text-[#7A6E63] text-[11px] uppercase tracking-[0.2em] font-light">
            {project.year}
          </span>
          <h3
            className="text-[#F5F0EB] font-light tracking-[-0.03em] mt-2 group-hover:text-[#F5F0EB]/80 transition-colors duration-300"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            {project.name}
          </h3>
          <p className="text-[#7A6E63] text-sm font-light mt-2 max-w-sm leading-relaxed">
            {project.desc}
          </p>
        </div>
      </a>

      {/* Floating award icon — pulsing glow */}
      <button
        onClick={() => setShowAwards(!showAwards)}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#D4A853]/10 backdrop-blur-md border border-[#D4A853]/20 flex items-center justify-center text-[#D4A853] hover:bg-[#D4A853]/25 hover:border-[#D4A853]/40 hover:scale-110 transition-all duration-300"
        style={{ animation: "awardBtnPulse 2.5s ease-in-out infinite" }}
        aria-label="View awards"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </button>

      {/* Award popup */}
      {showAwards && (
        <div className="absolute top-16 right-4 z-30 w-60 rounded-xl bg-[#1A0A0E]/90 backdrop-blur-2xl border border-[#D4A853]/15 p-5 shadow-2xl shadow-black/50 award-popup">
          <AwardParticles />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-5 h-5 text-[#D4A853]">
                  <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </span>
                <span className="text-[#D4A853] text-[10px] uppercase tracking-[0.2em] font-medium">
                  Awards
                </span>
              </div>
              <button
                onClick={() => setShowAwards(false)}
                className="text-[#7A6E63] hover:text-[#F5F0EB] transition-colors p-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-2.5">
              {project.awards.map((award, idx) => (
                <li
                  key={award}
                  className="flex items-center gap-2.5 text-[#F5F0EB]/85 text-[13px] font-light award-item"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #D4A853, #E0BB6E)",
                      boxShadow: "0 0 6px rgba(212,168,83,0.4)",
                    }}
                  />
                  {award}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom shimmer line */}
          <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden rounded-b-xl">
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(90deg, transparent, #D4A853, transparent)",
                animation: "awardShimmer 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Reel Section ─────────────────────────────────────────────────────────────
function ReelSection() {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const init = () => {
      playerRef.current = new (window as any).YT.Player("yt-player", {
        videoId: "VEj5I4CBbgU",
        playerVars: {
          start: 1,
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "VEj5I4CBbgU",
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.playVideo();
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      init();
    } else {
      (window as any).onYouTubeIframeAPIReady = init;
    }
  }, []);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) {
      (p as any).pauseVideo();
    } else {
      (p as any).playVideo();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      (p as any).unMute();
    } else {
      (p as any).mute();
    }
    setMuted(!muted);
  };

  return (
    <section className="reel-section relative z-10 pt-32 md:pt-40 pb-16 md:pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Video container */}
        <div
          ref={containerRef}
          className="reel-play relative aspect-video rounded-xl overflow-hidden group"
        >
          {/* YouTube player target — scaled up to clip YouTube overlays */}
          <div className="absolute inset-[-15%] w-[130%] h-[130%] pointer-events-none">
            <div id="yt-player" className="w-full h-full" />
          </div>

          {/* Click overlay to prevent YouTube interaction */}
          <div className="absolute inset-0 z-10" />

          {/* Custom controls — bottom left, minimal */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-[#0D0608]/60 backdrop-blur-sm flex items-center justify-center text-[#F5F0EB]/80 hover:text-[#F5F0EB] transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-[#0D0608]/60 backdrop-blur-sm flex items-center justify-center text-[#F5F0EB]/80 hover:text-[#F5F0EB] transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Text below */}
        <div className="reel-text mt-10 md:mt-14 max-w-2xl">
          <p className="text-[#7A6E63] text-[11px] uppercase tracking-[0.3em] font-light mb-4">
            As seen on CBS · November 2025
          </p>
          <h3
            className="text-[#F5F0EB] font-light tracking-[-0.03em] leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            60 Minutes: CRISPR Kids
          </h3>
          <p className="text-[#B8A99A] font-light text-sm md:text-base mt-4 leading-relaxed max-w-lg">
            Our team developed a CRISPR-based method to detect Lyme disease
            within two days of infection, placing in the top 10 worldwide as
            the highest-ranked American high school team.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
const HERO_WORDS = ["LAMBERT", "INNOVATION", "DISCOVERY", "PIONEERS", "EXCELLENCE", "IMPACT", "LAMBERT"];

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLSpanElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Lenis ────────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── Typewriter sound via Web Audio API ────────────────────────────────
    // Create AudioContext eagerly and try to unlock it before typing starts
    const audioCtx = new AudioContext();

    // Attempt to resume immediately (works in some browsers)
    audioCtx.resume().catch(() => {});

    // Unlock on ANY user gesture — covers mouse move into window, clicks, keys, touches
    const unlockAudio = () => {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    };
    const gestureEvents = ["mousedown", "mousemove", "touchstart", "keydown", "scroll", "click", "pointerdown", "pointermove"];
    gestureEvents.forEach((evt) =>
      document.addEventListener(evt, unlockAudio, { once: false, passive: true }),
    );

    const playKeystroke = () => {
      try {
        if (audioCtx.state === "suspended") audioCtx.resume();

        // Short noise burst — sharp attack, fast decay
        const duration = 0.06;
        const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          const env = Math.exp(-i / (data.length * 0.15));
          data[i] = (Math.random() * 2 - 1) * env * 0.3;
        }
        const src = audioCtx.createBufferSource();
        src.buffer = buffer;

        // Bandpass for metallic typewriter character
        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 3000 + Math.random() * 1500;
        filter.Q.value = 2;

        const gain = audioCtx.createGain();
        gain.gain.value = 0.15;

        src.connect(filter).connect(gain).connect(audioCtx.destination);
        src.start();
      } catch {}
    };

    // ── Hero typewriter with cycling words ──────────────────────────────
    const heroText = heroTextRef.current;
    const cursor = document.querySelector(".hero-cursor") as HTMLElement;
    if (!heroText || !cursor) return;

    const TYPE_SPEED = 0.1;
    const DELETE_SPEED = 0.06;
    const PAUSE_AFTER_TYPE = 0.8;
    const PAUSE_AFTER_DELETE = 0.3;

    const tl = gsap.timeline({ delay: 1.8 });

    // Show cursor
    tl.set(cursor, { opacity: 1 });

    // Type and delete each word, keep the last one
    HERO_WORDS.forEach((word, wordIdx) => {
      const isLast = wordIdx === HERO_WORDS.length - 1;

      // Type each letter
      for (let i = 0; i < word.length; i++) {
        tl.call(
          () => {
            heroText.textContent = word.slice(0, i + 1);
            playKeystroke();
          },
          [],
          `+=${i === 0 ? (wordIdx === 0 ? 0 : PAUSE_AFTER_DELETE) : TYPE_SPEED}`,
        );
      }

      if (!isLast) {
        // Pause then delete
        tl.call(() => {}, [], `+=${PAUSE_AFTER_TYPE}`);
        for (let i = word.length - 1; i >= 0; i--) {
          tl.call(
            () => {
              heroText.textContent = word.slice(0, i);
              playKeystroke();
            },
            [],
            `+=${DELETE_SPEED}`,
          );
        }
      }
    });

    // Blink cursor then reveal logo + scroll indicator
    tl.to(cursor, { opacity: 0, duration: 0.3 }, `+=${PAUSE_AFTER_TYPE}`);
    tl.to(cursor, { opacity: 1, duration: 0.3 });
    tl.to(cursor, { opacity: 0, duration: 0.3 });

    tl.to(".hero-igem", { opacity: 1, duration: 0.9, ease: "power3.out" });
    tl.from(".hero-igem", { scale: 0.4, duration: 0.9, ease: "back.out(1.7)" }, "<");
    tl.to(".hero-scroll", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // Hero parallax
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // ── Reel entrance ────────────────────────────────────────────────────
    gsap.from(".reel-play", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reel-section",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".reel-text > *", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reel-section",
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    // ── Statement word reveal ────────────────────────────────────────────
    if (statementRef.current) {
      const words = statementRef.current.querySelectorAll(".stmt-word");

      ScrollTrigger.create({
        trigger: statementRef.current,
        start: "15% top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const reveal = Math.floor(self.progress * words.length);
          words.forEach((w, i) => {
            const el = w as HTMLElement;
            if (i <= reveal) {
              el.style.color =
                el.dataset.hl === "1" ? "#C92C2A" : "#F5F0EB";
              el.style.opacity = "1";
            } else {
              el.style.color = "#2A1A1A";
              el.style.opacity = "0.35";
            }
          });
        },
      });
    }

    // ── Numbers — each line slides in from alternating sides ─────────────
    document.querySelectorAll(".num-line").forEach((el, i) => {
      const fromRight = i % 2 === 1;
      gsap.fromTo(
        el,
        { x: fromRight ? "100vw" : "-100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 98%",
            end: "top 40%",
            scrub: 0.8,
          },
        },
      );
    });

    // ── Featured projects stagger ────────────────────────────────────────
    gsap.from(".project-item", {
      y: 80,
      opacity: 0,
      duration: 1.1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // ── CTA ──────────────────────────────────────────────────────────────
    gsap.from(".cta-inner > *", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cta-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gestureEvents.forEach((evt) =>
        document.removeEventListener(evt, unlockAudio),
      );
      audioCtx.close().catch(() => {});
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* ──────────────────────────────────────────────────────────────────
          HERO
      ────────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,44,42,0.03)_0%,_transparent_50%)] pointer-events-none" />

        <div className="relative flex flex-col items-center select-none">
          <h1
            className="text-[#F5F0EB] leading-[0.85] relative flex items-baseline justify-center"
            style={{
              fontSize: "clamp(4rem, 14vw, 16rem)",
              letterSpacing: "-0.06em",
            }}
          >
            <span className="hero-text" ref={heroTextRef} />
            <span
              className="hero-cursor inline-block w-[0.06em] bg-[#C92C2A] ml-[0.04em]"
              style={{ height: "0.82em", opacity: 0 }}
            />
          </h1>

          <img
            src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/logo-white.png"
            alt="iGEM"
            className="hero-igem h-16 md:h-24 w-auto mt-6 drop-shadow-[0_0_20px_rgba(201,44,42,0.2)]"
            style={{ opacity: 0 }}
          />
        </div>

        <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <div className="w-px h-16 bg-gradient-to-b from-[#F5F0EB]/20 to-transparent relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-5 bg-[#C92C2A]/60"
              style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          REEL — CBS 60 MINUTES
      ────────────────────────────────────────────────────────────────── */}
      <ReelSection />

      {/* ──────────────────────────────────────────────────────────────────
          STATEMENT — Pinned Word Reveal
      ────────────────────────────────────────────────────────────────── */}
      <section ref={statementRef} className="relative z-10 min-h-[250vh] -mt-[25vh]">
        <div className="sticky top-0 min-h-screen flex items-center justify-center px-6 md:px-16">
          <p
            className="max-w-4xl font-light leading-[1.4] md:leading-[1.35]"
            style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.5rem)" }}
          >
            {STATEMENT_TEXT.split(" ").map((word, i) => (
              <span
                key={i}
                className="stmt-word inline-block mr-[0.3em] transition-colors duration-150"
                data-hl={HIGHLIGHT_WORDS.has(word) ? "1" : "0"}
                style={{ color: "#2A1A1A", opacity: 0.35 }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          NUMBERS — Stats as flowing text
      ────────────────────────────────────────────────────────────────── */}
      <section className="numbers-section relative z-10 -mt-[10vh] pt-0 pb-24 md:pb-32 overflow-x-clip">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-10 px-6 md:px-16">
          {[
            { num: "13+", text: "years of research" },
            { num: "13", text: "projects built" },
            { num: "100+", text: "team alumni" },
            { num: "7", text: "international awards" },
          ].map((item, i) => (
            <p
              key={i}
              className="num-line font-light tracking-[-0.04em] whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              <span className="text-[#C92C2A] font-normal">{item.num}</span>
              <span className="text-[#F5F0EB]/50 ml-4">{item.text}</span>
            </p>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          FEATURED WORK — No boxes, just imagery + text
      ────────────────────────────────────────────────────────────────── */}
      <section className="projects-section relative z-10 py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#7A6E63] text-[11px] uppercase tracking-[0.3em] font-light mb-16">
            Selected Work
          </p>

          {/* Top row — two projects side by side */}
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
            {PROJECTS.slice(0, 2).map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          {/* Bottom row — CadLock centered */}
          <div className="mt-16 flex justify-center">
            <div className="w-full md:w-1/2">
              <ProjectCard project={PROJECTS[2]} />
            </div>
          </div>

          {/* View all link */}
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-[#B8A99A] text-sm font-light mt-20 group hover:text-[#F5F0EB] transition-colors duration-300"
          >
            <span>View all projects</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          CTA
      ────────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 md:py-28 px-6">
        <div className="cta-inner max-w-2xl mx-auto text-center">
          <h2
            className="text-[#F5F0EB] font-light tracking-[-0.04em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Ready to make an impact?
          </h2>

          <p className="text-[#B8A99A] font-light mt-6 mb-16 max-w-md mx-auto leading-relaxed">
            Partner with us to advance synthetic biology education, or join our
            team of student researchers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sponsors"
              className="btn-morph px-10 py-4 text-[15px] font-medium text-[#0D0608] bg-[#D4A853] text-center hover:bg-[#E0BB6E] transition-all duration-500"
            >
              Become a Sponsor
            </a>
            <a
              href="/about#join"
              className="btn-morph px-10 py-4 text-[15px] font-light text-[#F5F0EB] border border-[#F5F0EB]/10 text-center hover:border-[#F5F0EB]/25 hover:bg-[#F5F0EB]/[0.03] transition-all duration-500"
            >
              Join the Team
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(200%); opacity: 1; }
        }

        /* Award button pulse */
        @keyframes awardBtnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0); }
          50% { box-shadow: 0 0 12px 3px rgba(212,168,83,0.2); }
        }

        /* Award popup entrance */
        .award-popup {
          animation: awardPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes awardPopIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Award list items stagger in */
        .award-item {
          opacity: 0;
          animation: awardSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes awardSlideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Sparkle particles */
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 0.6; transform: scale(0.8); }
        }

        /* Ambient glow pulse */
        @keyframes awardGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        /* Bottom shimmer */
        @keyframes awardShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
