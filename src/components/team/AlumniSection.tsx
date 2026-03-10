import React from "react";

export type AlumniYear = {
    year: string;
    names: string[];
};

export default function AlumniSection({ alumni }: { alumni: AlumniYear[] }) {
    return (
        <section className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-light tracking-[-0.03em] text-[#F5F0EB] text-center mb-10 [text-shadow:0_0_0.4em_#FFFFFF]">
                Alumni
            </h2>

            {alumni.map((group) => (
                <div
                    key={group.year}
                    className="
            rounded-2xl border-2 border-[#3a1111]
            bg-[#0e0a0a]/80
            p-6 sm:p-8
            shadow-[0_0_20px_#1a080855]
          "
                >
                    <h3 className="text-2xl font-bold text-[#D4A853] text-center mb-6">
                        {group.year}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-1">
                        {group.names.map((name) => (
                            <p key={name} className="text-[#F5F0EB]/80 font-light text-sm sm:text-base">
                                {name}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
