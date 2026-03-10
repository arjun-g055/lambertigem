import React from "react";
import TiltCard from "./TiltCard";

export type Advisor = {
    name: string;
    description: string;
    image?: string;
    initial?: string;
    color?: string;
};

export default function AdvisorsSection({ advisors }: { advisors: Advisor[] }) {
    return (
        <section className="max-w-5xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-light tracking-[-0.03em] text-[#F5F0EB] text-center mb-10 [text-shadow:0_0_0.4em_#FFFFFF]">
                Advisors
            </h2>
            <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
                {advisors.map((advisor) => (
                    <TiltCard
                        key={advisor.name}
                        className="flex flex-col items-center text-center w-32 sm:w-36 p-4"
                    >
                        <div
                            className="
                w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden
                border-2 border-[#3a1111]
                shadow-[0_0_14px_#0a0a0a]
                mb-3
              "
                        >
                            {advisor.image ? (
                                <img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : advisor.initial ? (
                                <div
                                    className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#F5F0EB]"
                                    style={{ backgroundColor: advisor.color ?? "#6366f1" }}
                                >
                                    {advisor.initial}
                                </div>
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#2a1010] to-[#1a0808] flex items-center justify-center">
                                    <span className="text-gray-600 text-3xl font-bold">
                                        {advisor.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <h3 className="text-[#F5F0EB] font-medium text-sm sm:text-base leading-tight">
                            {advisor.name}
                        </h3>
                        <p className="text-[#B8A99A] font-light tracking-wide text-xs sm:text-sm mt-0.5">
                            {advisor.description}
                        </p>
                    </TiltCard>
                ))}
            </div>
        </section>
    );
}
