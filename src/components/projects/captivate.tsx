import React from "react";

export default function ProjectBox() {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-6 [text-shadow:0_0_4em_#FFFFFF]">
        2018
      </h2>

      <a
        href="https://2018.igem.org/Team:Lambert_GA"
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-48 w-auto group cursor-pointer"
      >
        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/captivate.png"
          alt="Captivate 2018"
          className="
            h-48
            w-auto
            transition-opacity
            duration-300
            drop-shadow-[0_0_0.25em_#B3D7EA]
            group-hover:opacity-0
          "
        />

        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/projects/captivate-hover.png"
          alt="Captivate 2018 Description"
          className="
            absolute inset-0
            h-48
            w-auto
            opacity-0
            transition-all
            duration-300
            drop-shadow-[0_0_1em_#B3D7EA]
            group-hover:opacity-100
            group-hover:scale-105
          "
        />
      </a>
    </div>
  );
}
