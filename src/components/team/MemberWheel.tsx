import React, { useState } from "react";
import TiltCard from "./TiltCard";

// ── Types ───────────────────────────────────────────────────────────────

export type Member = {
    name: string;
    role: string;
    bio: string;
    image: string;
};

// ── Avatar ──────────────────────────────────────────────────────────────

function Avatar({
    member,
    size,
    isCenter,
    onClick,
    style,
}: {
    member: Member;
    size: number;
    isCenter?: boolean;
    onClick: () => void;
    style?: React.CSSProperties;
}) {
    return (
        <button
            onClick={onClick}
            className="group absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus:outline-none"
            style={{
                width: size,
                height: size,
                transform: "translate(-50%, -50%)",
                zIndex: isCenter ? 20 : 10,
                ...style,
            }}
        >
            <div
                className={`
                    w-full h-full rounded-full overflow-hidden transition-all duration-500
                    ${isCenter
                        ? "ring-2 ring-[#C92C2A] shadow-[0_0_30px_rgba(201,44,42,0.3)]"
                        : "ring-1 ring-[#5a1a1a]/60 hover:ring-[#C92C2A]/60 hover:shadow-[0_0_16px_rgba(201,44,42,0.15)]"
                    }
                `}
            >
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                            isCenter ? "scale-100" : "group-hover:scale-110"
                        }`}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2a1010] to-[#1a0808] flex items-center justify-center">
                        <span
                            className="text-[#5a2020] font-light"
                            style={{ fontSize: size * 0.3 }}
                        >
                            {member.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                    </div>
                )}
            </div>
            {!isCenter && (
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-[#7A6E63] font-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {member.name.split(" ")[0]}
                </span>
            )}
        </button>
    );
}

// ── Styles ───────────────────────────────────────────────────────────────

const STYLES = `
@keyframes gear-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
@media (max-width: 520px)  { .wheel-root { --wheel-scale: 0.65; } }
@media (min-width: 521px) and (max-width: 768px) { .wheel-root { --wheel-scale: 0.8; } }
`;

// ── Main Component ──────────────────────────────────────────────────────

export default function MemberWheel({ members }: { members: Member[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const wheelSize = 560;
    const center = wheelSize / 2;
    const orbitRadius = 195;
    const centerSize = 140;
    const orbitSize = 58;
    const gearSize = wheelSize * 1.6;

    const orbitMembers = members.filter((_, i) => i !== selectedIndex);

    function handleSelect(i: number) {
        setSelectedIndex(i);
    }

    function orbitGlobalIndex(orbIdx: number): number {
        return orbIdx < selectedIndex ? orbIdx : orbIdx + 1;
    }

    const orbitPositions = orbitMembers.map((_, i) => {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / orbitMembers.length;
        return {
            x: center + orbitRadius * Math.cos(angle),
            y: center + orbitRadius * Math.sin(angle),
        };
    });

    return (
        <section className="max-w-6xl mx-auto px-6 py-8">
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                {/* Wheel */}
                <div
                    className="wheel-root relative shrink-0 origin-center"
                    style={{
                        width: wheelSize,
                        height: wheelSize,
                        maxWidth: "100vw",
                        transform: "scale(var(--wheel-scale, 1))",
                    }}
                >
                    {/* Gear — centered on container, rotation around gear hole center */}
                    <img
                        src="/gear.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute pointer-events-none select-none"
                        style={{
                            width: gearSize,
                            height: gearSize,
                            top: center - gearSize / 2,
                            left: center - gearSize / 2,
                            opacity: 0.65,
                            animation: "gear-spin 120s linear infinite",
                            transformOrigin: "50% 48.3%",
                            willChange: "transform",
                        }}
                    />

                    {/* Center avatar */}
                    <Avatar
                        member={members[selectedIndex]}
                        size={centerSize}
                        isCenter
                        onClick={() => {}}
                        style={{ left: center, top: center }}
                    />

                    {/* Orbiting avatars */}
                    {orbitMembers.map((member, orbIdx) => {
                        const pos = orbitPositions[orbIdx];
                        const gIdx = orbitGlobalIndex(orbIdx);
                        return (
                            <Avatar
                                key={gIdx}
                                member={member}
                                size={orbitSize}
                                onClick={() => handleSelect(gIdx)}
                                style={{ left: pos.x, top: pos.y }}
                            />
                        );
                    })}
                </div>

                {/* Detail card */}
                <div className="flex-1 w-full lg:pt-16">
                    <TiltCard className="p-6 sm:p-8">
                        <div className="inline-block rounded-lg bg-[#570000] px-5 py-1.5 mb-4 shadow-[0_0_14px_#57000088]">
                            <h3 className="text-[#F5F0EB] font-medium text-lg">
                                {members[selectedIndex].name}
                            </h3>
                        </div>
                        <p className="text-[#D4A853] font-light text-sm uppercase tracking-wide mb-3">
                            {members[selectedIndex].role}
                        </p>
                        <p className="text-[#B8A99A] font-light text-sm leading-relaxed tracking-wide">
                            {members[selectedIndex].bio}
                        </p>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}
