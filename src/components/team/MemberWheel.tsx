import React, { useState } from "react";

// ── Types ───────────────────────────────────────────────────────────────

export type Member = {
    name: string;
    role: string;
    bio: string;
    image: string;
};

// ── Wheel positions ─────────────────────────────────────────────────────
// Compute positions around a circle for the small orbiting photos

function getOrbitPositions(count: number, radius: number, centerX: number, centerY: number) {
    const positions: { x: number; y: number }[] = [];
    const startAngle = -Math.PI / 2; // start from the top
    for (let i = 0; i < count; i++) {
        const angle = startAngle + (2 * Math.PI * i) / count;
        positions.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
        });
    }
    return positions;
}

// ── MemberCard (detail sidebar) ─────────────────────────────────────────

function MemberCard({ member }: { member: Member }) {
    return (
        <div className="rounded-2xl border border-[#3a1111] bg-[#0e0a0a]/80 p-6 sm:p-8 backdrop-blur-sm">
            <div className="inline-block rounded-lg bg-[#570000] px-5 py-1.5 mb-4 shadow-[0_0_14px_#57000088]">
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
            </div>
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-3">
                {member.role}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
        </div>
    );
}

// ── Avatar ──────────────────────────────────────────────────────────────

function Avatar({
    member,
    size,
    isSelected,
    onClick,
}: {
    member: Member;
    size: number;
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`
        rounded-full overflow-hidden border-2 transition-all duration-300 cursor-pointer
        ${isSelected
                    ? "border-[#C92C2A] shadow-[0_0_20px_#C92C2A]"
                    : "border-[#5a1a1a] hover:border-[#C92C2A] hover:shadow-[0_0_14px_#C92C2A88]"
                }
      `}
            style={{ width: size, height: size }}
        >
            {member.image ? (
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2a1010] to-[#1a0808] flex items-center justify-center">
                    <span className="text-[#5a2020] font-bold" style={{ fontSize: size * 0.35 }}>
                        {member.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                    </span>
                </div>
            )}
        </button>
    );
}

// ── Main Component ──────────────────────────────────────────────────────

export default function MemberWheel({ members }: { members: Member[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Wheel dimensions
    const wheelSize = 420; // px — container size
    const center = wheelSize / 2;
    const orbitRadius = 155;
    const centerAvatarSize = 140;
    const orbitAvatarSize = 64;

    // If we have fewer than 2 members only show center
    const centerMemberIndex = selectedIndex ?? 0;
    const orbitMembers =
        members.length > 1
            ? members.filter((_, i) => i !== centerMemberIndex)
            : [];
    const positions = getOrbitPositions(
        orbitMembers.length,
        orbitRadius,
        center,
        center
    );

    function handleSelect(globalIndex: number) {
        setSelectedIndex(globalIndex === selectedIndex ? null : globalIndex);
    }

    // Map orbit index back to global index
    function orbitGlobalIndex(orbitIdx: number): number {
        // orbit array skips centerMemberIndex
        if (orbitIdx < centerMemberIndex) return orbitIdx;
        return orbitIdx + 1;
    }

    // Gear image sizing — slightly larger than the wheel so it peeks out
    const gearSize = wheelSize * 1.05;

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 [text-shadow:0_0_0.4em_#FFFFFF]">
                Members
            </h2>

            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                {/* Wheel */}
                <div
                    className="relative shrink-0"
                    style={{ width: wheelSize, height: wheelSize }}
                >
                    {/* Gear background image */}
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
                            opacity: 0.85,
                        }}
                    />

                    {/* Center avatar (large) */}
                    <div
                        className="absolute z-10"
                        style={{
                            width: centerAvatarSize,
                            height: centerAvatarSize,
                            top: center - centerAvatarSize / 2,
                            left: center - centerAvatarSize / 2,
                        }}
                    >
                        <Avatar
                            member={members[centerMemberIndex]}
                            size={centerAvatarSize}
                            isSelected={true}
                            onClick={() => { }}
                        />
                    </div>

                    {/* Orbiting avatars */}
                    {orbitMembers.map((member, orbIdx) => {
                        const pos = positions[orbIdx];
                        const globalIdx = orbitGlobalIndex(orbIdx);
                        return (
                            <div
                                key={globalIdx}
                                className="absolute z-10 transition-all duration-500"
                                style={{
                                    width: orbitAvatarSize,
                                    height: orbitAvatarSize,
                                    top: pos.y - orbitAvatarSize / 2,
                                    left: pos.x - orbitAvatarSize / 2,
                                }}
                            >
                                <Avatar
                                    member={member}
                                    size={orbitAvatarSize}
                                    isSelected={false}
                                    onClick={() => handleSelect(globalIdx)}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Detail card */}
                <div className="flex-1 w-full">
                    <MemberCard member={members[centerMemberIndex]} />
                </div>
            </div>
        </section>
    );
}
