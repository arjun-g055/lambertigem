import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ────────────────────────────────────────────────────────────────

type Member = {
    name: string;
    role: string;
    image: string;
};

type Advisor = {
    name: string;
    description: string;
    image?: string;
};

// ── Data ─────────────────────────────────────────────────────────────────

const MEMBERS: Member[] = [
    { name: "Vedant Kalipatnapu", role: "Co-Captain", image: "https://static.igem.wiki/teams/5612/teampage/members/vedant-hs.webp" },
    { name: "Harsha Poonepalle", role: "Co-Captain", image: "https://static.igem.wiki/teams/5612/teampage/members/harsha-hs.webp" },
    { name: "Shashwat Balamurali", role: "Co-Captain", image: "https://static.igem.wiki/teams/5612/teampage/members/shashwat-hs.webp" },
    { name: "Jiwoo Han", role: "Member", image: "https://static.igem.wiki/teams/5612/teampage/members/jiwoo-hs.webp" },
    { name: "Veda Vudithyala", role: "Member", image: "https://static.igem.wiki/teams/5612/teampage/members/veda-hs.webp" },
    { name: "Keerthana Anumukonda", role: "Member", image: "https://static.igem.wiki/teams/5612/teampage/members/keerthana-hs.webp" },
    { name: "Rohan Kaushik", role: "Member", image: "https://static.igem.wiki/teams/5612/teampage/members/rohan-hs.webp" },
    { name: "Aiden Lee", role: "Member", image: "https://static.igem.wiki/teams/5612/teampage/members/aiden-hs.webp" },
    { name: "Arjun Gulati", role: "Member", image: "https://static.igem.wiki/teams/5612/teampage/members/arjun-hs.webp" },
];

const ADVISORS: Advisor[] = [
    { name: "Kate Sharer", description: "Team Advisor", image: "https://static.igem.wiki/teams/5612/teampage/members/sharer-hs.webp" },
];

// ── Member Card ──────────────────────────────────────────────────────────

function MemberCard({ member }: { member: Member }) {
    const isCaptain = member.role === "Co-Captain";

    return (
        <div
            data-member-card
            className="future-frame group relative overflow-hidden rounded-xl bg-[#0D0608]"
            style={{ aspectRatio: "3 / 4" }}
        >
            {/* Photo */}
            <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
            />

            {/* Gradient overlay — darkens on hover for bio readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0608] via-[#0D0608]/30 to-transparent group-hover:via-[#0D0608]/50 transition-all duration-500" />

            {/* Hover border glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/[0.06] group-hover:ring-[#C92C2A]/40 group-hover:shadow-[inset_0_0_40px_rgba(201,44,42,0.08)] transition-all duration-500 pointer-events-none" />

            {/* Co-captain gold accent line */}
            {isCaptain && (
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />
            )}

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p
                    className={`text-[10px] font-light tracking-[0.3em] uppercase mb-1.5 transition-colors duration-300 ${
                        isCaptain ? "text-[#D4A853]" : "text-[#7A6E63] group-hover:text-[#B8A99A]"
                    }`}
                >
                    {member.role}
                </p>
                <h3 className="text-[#F5F0EB] font-light text-lg tracking-[-0.01em]">
                    {member.name}
                </h3>
            </div>
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────

export default function Team() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero title clip-path reveal
            gsap.to("[data-team-title]", {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.4,
                ease: "power4.inOut",
                delay: 0.3,
            });

            // Decorative line expand
            gsap.to("[data-team-line]", {
                width: "200px",
                duration: 0.8,
                ease: "power3.out",
                delay: 1.0,
            });

            // Subtitle fade in
            gsap.to("[data-team-sub]", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 1.2,
            });

            // Section labels — slide in from left
            gsap.utils.toArray("[data-section-label]").forEach((el) => {
                gsap.from(el as Element, {
                    scrollTrigger: {
                        trigger: el as Element,
                        start: "top 88%",
                    },
                    opacity: 0,
                    x: -30,
                    duration: 0.8,
                    ease: "power3.out",
                });
            });

            // Member cards — stagger reveal on scroll
            gsap.utils.toArray("[data-member-card]").forEach((card, i) => {
                gsap.from(card as Element, {
                    scrollTrigger: {
                        trigger: card as Element,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    delay: (i % 3) * 0.12,
                    ease: "power3.out",
                });
            });

            // Advisor cards — stagger reveal
            gsap.utils.toArray("[data-advisor-card]").forEach((card, i) => {
                gsap.from(card as Element, {
                    scrollTrigger: {
                        trigger: card as Element,
                        start: "top 88%",
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "power3.out",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const captains = MEMBERS.filter((m) => m.role === "Co-Captain");
    const members = MEMBERS.filter((m) => m.role !== "Co-Captain");

    return (
        <div ref={containerRef} className="min-h-screen text-[#F5F0EB]">
            {/* ── Hero ── */}
            <section className="page-hero-maroon relative flex flex-col items-center overflow-hidden pt-16 pb-6">
                <h1
                    data-team-title
                    className="text-[#F5F0EB] font-light leading-[0.85] tracking-[-0.06em] relative z-10"
                    style={{
                        fontSize: "clamp(4rem, 14vw, 14rem)",
                        clipPath: "inset(0 100% 0 0)",
                    }}
                >
                    THE TEAM
                </h1>

                <div
                    data-team-line
                    className="h-px bg-gradient-to-r from-transparent via-[#C92C2A] to-transparent mt-8"
                    style={{ width: 0 }}
                />

                <p
                    data-team-sub
                    className="future-eyebrow text-[#7A6E63] font-light mt-6 text-center text-sm tracking-[0.3em] uppercase opacity-0"
                    style={{ transform: "translateY(16px)" }}
                >
                    Lambert High School · Suwanee, Georgia
                </p>
            </section>

            {/* ── Leadership ── */}
            <section className="max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-8">
                <p
                    data-section-label
                    className="future-eyebrow text-[#D4A853] text-[11px] font-light tracking-[0.3em] uppercase mb-10"
                >
                    Leadership
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {captains.map((member) => (
                        <MemberCard key={member.name} member={member} />
                    ))}
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="max-w-6xl mx-auto px-6 md:px-16 py-8">
                <div className="h-px bg-gradient-to-r from-transparent via-[#C92C2A]/20 to-transparent" />
            </div>

            {/* ── Team Members ── */}
            <section className="max-w-6xl mx-auto px-6 md:px-16 pt-8 pb-8">
                <p
                    data-section-label
                    className="future-eyebrow text-[#D4A853] text-[11px] font-light tracking-[0.3em] uppercase mb-10"
                >
                    Team Members
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {members.map((member) => (
                        <MemberCard key={member.name} member={member} />
                    ))}
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="max-w-6xl mx-auto px-6 md:px-16 py-8">
                <div className="h-px bg-gradient-to-r from-transparent via-[#C92C2A]/20 to-transparent" />
            </div>

            {/* ── Advisors ── */}
            <section className="max-w-6xl mx-auto px-6 md:px-16 pt-8 pb-28">
                <p
                    data-section-label
                    className="future-eyebrow text-[#D4A853] text-[11px] font-light tracking-[0.3em] uppercase mb-10"
                >
                    Advisors
                </p>
                <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
                    {ADVISORS.map((advisor) => (
                        <div
                            key={advisor.name}
                            data-advisor-card
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-1 ring-white/[0.06] group-hover:ring-[#C92C2A]/40 transition-all duration-500 mb-5">
                                {advisor.image ? (
                                    <img
                                        src={advisor.image}
                                        alt={advisor.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#2a1010] to-[#1a0808] flex items-center justify-center">
                                        <span className="text-[#5a2020] text-2xl font-light">
                                            {advisor.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-[#F5F0EB] font-light text-base tracking-[-0.01em]">
                                {advisor.name}
                            </h3>
                            <p className="text-[#7A6E63] text-xs font-light tracking-[0.15em] uppercase mt-1.5">
                                {advisor.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
