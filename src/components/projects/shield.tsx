import React from "react";

export default function ProjectBox() {
  return (
    <div className="relative flex flex-col items-center">
        <h2 className="text-white text-3xl font-bold mb-6 [text-shadow:0_0_4em_#FFFFFF]">2024</h2>
        <img
        src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/shield.png"
        alt="Lancet"
        className="
                    h-48
                    w-auto
                    transition
                    duration-300
                    drop-shadow-[0_0_0.25em_#C60E60]
                    hover:drop-shadow-[0_0_1em_#C60E60]
                    "
        />
    </div>
  );
}
