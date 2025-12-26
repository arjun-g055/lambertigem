import React, { useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "People", href: "/people" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-black/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Logo />
        </a>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-12 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                text-1xl
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#ffffff]
                transition-colors
                hover:text-[#9c9c9c]
              "
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#ffffff]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-[#f7f3ea]">
          <div className="flex flex-col px-6 py-4 gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#0f5a2a]
                "
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <img
      src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/logo-white.png"
      alt="Site logo"
      className="h-12 w-auto"
    />
  );
}
