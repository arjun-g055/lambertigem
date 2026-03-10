import React, { useState, useEffect, useRef } from "react";
import MemberWheel, { type Member } from "./team/MemberWheel";
import AdvisorsSection, { type Advisor } from "./team/AdvisorsSection";

// ── Data ────────────────────────────────────────────────────────────────

const MEMBERS: Member[] = [
    {
        name: "Vedant Kalipatnapu",
        role: "Co-Captain",
        bio: "Junior, first year on iGEM. Enjoys trying new food, going to concerts, and reading.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/vedant-hs.webp",
    },
    {
        name: "Harsha Poonepalle",
        role: "Co-Captain",
        bio: "Junior, second year on the team. Works on software and wiki development. Plays squash, watches football, and is learning French.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/harsha-hs.webp",
    },
    {
        name: "Shashwat Balamurali",
        role: "Co-Captain",
        bio: "Junior, second year on iGEM. Works on modeling and wet lab. Plays cricket and loves exploring different cultures.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/shashwat-hs.webp",
    },
    {
        name: "Julia Rho",
        role: "Human Practices Lead",
        bio: "Second-time iGEMmer leading Human Practices. Passionate about connecting science with community impact.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/julia-hs.webp",
    },
    {
        name: "Jiwoo Han",
        role: "Member",
        bio: "Junior, first year on iGEM. Helps with wetlab and graphics. Collects playing cards and reads sci-fi.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/jiwoo-hs.webp",
    },
    {
        name: "Veda Vudithyala",
        role: "Member",
        bio: "Junior, first year on the team. Self-described terrible cook with a passion for synthetic biology.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/veda-hs.webp",
    },
    {
        name: "Keerthana Anumukonda",
        role: "Member",
        bio: "First year on the team. Enjoys reading and spending time with friends.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/keerthana-hs.webp",
    },
    {
        name: "Nishchai Chawla",
        role: "Member",
        bio: "First year on the team. Interested in graphics, AI, and biotech applications. Codes and builds software.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/nish-hs.webp",
    },
    {
        name: "Rohan Kaushik",
        role: "Member",
        bio: "First year on iGEM. Part of Human Practices and Wetlab committees. Reads fantasy and watches horror movies.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/rohan-hs.webp",
    },
    {
        name: "Aiden Lee",
        role: "Member",
        bio: "Sophomore, first year on the team. Works in wet lab. Plays tennis in his spare time.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/aiden-hs.webp",
    },
    {
        name: "Arjun Gulati",
        role: "Member",
        bio: "Sophomore, first year on iGEM. Works on wetlab, hardware CAD, and wiki coding. Plays Rocket League.",
        image: "https://static.igem.wiki/teams/5612/teampage/members/arjun-hs.webp",
    },
];

const ADVISORS: Advisor[] = [
    { name: "Kate Sharer", description: "Team Advisor", image: "" },
    { name: "Catherine O'Haver", description: "Team Advisor", image: "" },
];

// ── Section config ──────────────────────────────────────────────────────

const SECTIONS = [
    { id: "members", label: "Members", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" },
    { id: "advisors", label: "Advisors", icon: "M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
] as const;

// ── Molecule Navigator ──────────────────────────────────────────────────
// A horizontal molecule diagram: each section is an atom connected by bonds.
// The active atom pulses and glows, an electron orbits around it.

// CSS for electron orbit animation (pure CSS, no re-renders)
const MOLECULE_STYLE = `
@keyframes electron-orbit {
    from { offset-distance: 0%; }
    to   { offset-distance: 100%; }
}
@keyframes pulse-ring {
    0%   { r: 30; opacity: 0.3; }
    100% { r: 40; opacity: 0; }
}
@keyframes electron-glow {
    0%, 100% { opacity: 0.9; }
    50%      { opacity: 0.4; }
}
`;

function MoleculeNav({
    activeIndex,
    onChange,
}: {
    activeIndex: number;
    onChange: (i: number) => void;
}) {
    const atomRadius = 32;
    const bondLength = 120;
    const svgWidth = SECTIONS.length * (atomRadius * 2 + bondLength) - bondLength + 60;
    const svgHeight = 120;
    const cy = svgHeight / 2;

    return (
        <div className="flex justify-center mb-12 overflow-x-auto px-4">
            <style dangerouslySetInnerHTML={{ __html: MOLECULE_STYLE }} />
            <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="shrink-0"
            >
                <defs>
                    {/* Glow filter for active atom */}
                    <filter id="atom-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Bond gradient */}
                    <linearGradient id="bond-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C92C2A" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#D4A853" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#C92C2A" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="bond-inactive" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7A6E63" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#7A6E63" stopOpacity="0.15" />
                    </linearGradient>

                    {/* Elliptical orbit paths for each atom (used by CSS offset-path) */}
                    {SECTIONS.map((_, i) => {
                        const cx = 30 + i * (atomRadius * 2 + bondLength) + atomRadius;
                        const electronR = atomRadius + 10;
                        return (
                            <ellipse
                                key={`orbit-path-${i}`}
                                id={`orbit-path-${i}`}
                                cx={cx}
                                cy={cy}
                                rx={electronR}
                                ry={electronR * 0.5}
                                fill="none"
                            />
                        );
                    })}
                </defs>

                {/* Bonds between atoms */}
                {SECTIONS.map((_, i) => {
                    if (i === 0) return null;
                    const x1 = 30 + (i - 1) * (atomRadius * 2 + bondLength) + atomRadius * 2;
                    const x2 = 30 + i * (atomRadius * 2 + bondLength);
                    const isBetweenActive = i === activeIndex || i - 1 === activeIndex;
                    return (
                        <g key={`bond-${i}`}>
                            <line
                                x1={x1} y1={cy - 3} x2={x2} y2={cy - 3}
                                stroke={isBetweenActive ? "url(#bond-grad)" : "url(#bond-inactive)"}
                                strokeWidth="1.5"
                                className="transition-all duration-500"
                            />
                            <line
                                x1={x1} y1={cy + 3} x2={x2} y2={cy + 3}
                                stroke={isBetweenActive ? "url(#bond-grad)" : "url(#bond-inactive)"}
                                strokeWidth="1.5"
                                className="transition-all duration-500"
                            />
                        </g>
                    );
                })}

                {/* Atoms */}
                {SECTIONS.map((section, i) => {
                    const cx = 30 + i * (atomRadius * 2 + bondLength) + atomRadius;
                    const isActive = i === activeIndex;
                    const electronR = atomRadius + 10;

                    return (
                        <g
                            key={section.id}
                            onClick={() => onChange(i)}
                            className="cursor-pointer"
                            role="button"
                            tabIndex={0}
                        >
                            {/* Electron orbit ring (active only) */}
                            {isActive && (
                                <ellipse
                                    cx={cx} cy={cy}
                                    rx={electronR} ry={electronR * 0.5}
                                    fill="none" stroke="#C92C2A"
                                    strokeWidth="0.5" opacity="0.2"
                                />
                            )}

                            {/* Outer shell ring */}
                            <circle
                                cx={cx} cy={cy} r={atomRadius}
                                fill="none"
                                stroke={isActive ? "#C92C2A" : "#7A6E63"}
                                strokeWidth={isActive ? 1.5 : 0.5}
                                opacity={isActive ? 0.8 : 0.3}
                                filter={isActive ? "url(#atom-glow)" : undefined}
                                className="transition-all duration-500"
                            />

                            {/* Inner nucleus */}
                            <circle
                                cx={cx} cy={cy} r={atomRadius - 6}
                                fill={isActive ? "rgba(201,44,42,0.1)" : "rgba(13,6,8,0.6)"}
                                stroke={isActive ? "#C92C2A" : "#7A6E63"}
                                strokeWidth={isActive ? 1 : 0.3}
                                opacity={isActive ? 1 : 0.3}
                                className="transition-all duration-500"
                            />

                            {/* Pulse ring (active only) */}
                            {isActive && (
                                <circle
                                    cx={cx} cy={cy} r={atomRadius - 2}
                                    fill="none" stroke="#C92C2A"
                                    strokeWidth="1"
                                    style={{ animation: "pulse-ring 2s ease-out infinite" }}
                                />
                            )}

                            {/* Icon */}
                            <g transform={`translate(${cx - 10}, ${cy - 16})`}>
                                <path
                                    d={section.icon}
                                    fill="none"
                                    stroke={isActive ? "#F5F0EB" : "#7A6E63"}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="scale(0.83)"
                                    className="transition-all duration-300"
                                />
                            </g>

                            {/* Label */}
                            <text
                                x={cx} y={cy + 14}
                                textAnchor="middle"
                                fill={isActive ? "#F5F0EB" : "#7A6E63"}
                                fontSize="9" fontWeight="300"
                                letterSpacing="0.15em"
                                className="uppercase transition-all duration-300 select-none"
                                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                            >
                                {section.label}
                            </text>

                            {/* Orbiting electron — pure CSS animation, no re-renders */}
                            {isActive && (
                                <circle
                                    r={3} fill="#D4A853"
                                    style={{
                                        offsetPath: `path("M${cx + electronR},${cy} A${electronR},${electronR * 0.5} 0 1,1 ${cx + electronR - 0.01},${cy}")`,
                                        animation: "electron-orbit 2s linear infinite, electron-glow 1s ease-in-out infinite",
                                    }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

// ── Page Component ──────────────────────────────────────────────────────

export default function Team() {
    const [activeTab, setActiveTab] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleTabChange = (i: number) => {
        setActiveTab(i);
        const section = sectionsRef.current[i];
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Track scroll position to update active tab
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = sectionsRef.current.indexOf(
                            entry.target as HTMLDivElement,
                        );
                        if (idx !== -1) setActiveTab(idx);
                    }
                });
            },
            { threshold: 0.3 },
        );

        sectionsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Staggered entrance
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll<HTMLElement>("[data-stagger-item]");

        items.forEach((child) => {
            child.style.opacity = "0";
            child.style.transform = "translateY(32px)";
            child.style.transition =
                "opacity 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1)";
        });

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target as HTMLElement;
                    const idx = Array.from(items).indexOf(el);
                    setTimeout(() => {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                    }, idx * 100);
                    obs.unobserve(el);
                });
            },
            { threshold: 0.1 },
        );

        items.forEach((child) => obs.observe(child));
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen text-[#F5F0EB]">
            {/* Hero */}
            <section data-stagger-item className="flex flex-col items-center pt-16 pb-8">
                <p className="text-[#D4A853] text-xs font-light tracking-[0.3em] uppercase mb-4">
                    OUR PEOPLE
                </p>
                <h1 className="text-5xl lg:text-6xl font-light tracking-[-0.03em] text-[#F5F0EB]">
                    Team
                </h1>
                <p className="text-[#7A6E63] font-light text-sm mt-2 uppercase tracking-widest">
                    Lambert High School
                </p>
            </section>

            {/* Molecule Navigator */}
            <div data-stagger-item>
                <MoleculeNav activeIndex={activeTab} onChange={handleTabChange} />
            </div>

            {/* Members Section */}
            <div
                data-stagger-item
                ref={(el) => {
                    sectionsRef.current[0] = el;
                }}
            >
                <MemberWheel members={MEMBERS} />
            </div>

            {/* Advisors Section */}
            <div
                data-stagger-item
                ref={(el) => {
                    sectionsRef.current[1] = el;
                }}
            >
                <AdvisorsSection advisors={ADVISORS} />
            </div>
        </div>
    );
}
