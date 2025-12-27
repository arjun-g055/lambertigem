import React from "react";

export default function ProjectBox() {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-6 [text-shadow:0_0_4em_#FFFFFF]">
        2015
      </h2>

      <a
        href="https://2015.igem.org/Team:Lambert_GA"
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-48 w-auto group cursor-pointer"
      >
        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/chitinite15.png"
          alt="Chitinite 2015"
          className="
            h-48
            w-auto
            transition-opacity
            duration-300
            drop-shadow-[0_0_0.25em_#B77A5F]
            group-hover:opacity-0
          "
        />

        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/chitinite15-hover.png"
          alt="Chitinite 2015 Description"
          className="
            absolute inset-0
            h-48
            w-auto
            opacity-0
            transition-all
            duration-300
            drop-shadow-[0_0_1em_#B77A5F]
            group-hover:opacity-100
            group-hover:scale-105
          "
        />
      </a>
    </div>
  );
}
