import React from "react";

export default function ProjectBox() {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-6 [text-shadow:0_0_4em_#FFFFFF]">
        2014
      </h2>

      <a
        href="https://2014hs.igem.org/Team:Lambert_GA"
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-48 w-auto group cursor-pointer"
      >
        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/chitinite14.png"
          alt="Chitinite 2014"
          className="
            h-48
            w-auto
            transition-opacity
            duration-300
            drop-shadow-[0_0_0.25em_#3DBA2B]
            group-hover:opacity-0
          "
        />

        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/chitinite14-hover.png"
          alt="Chitinite 2014 Description"
          className="
            absolute inset-0
            h-48
            w-auto
            opacity-0
            transition-all
            duration-300
            drop-shadow-[0_0_1em_#3DBA2B]
            group-hover:opacity-100
            group-hover:scale-105
          "
        />
      </a>
    </div>
  );
}
