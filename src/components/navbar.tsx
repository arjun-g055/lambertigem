import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "News", href: "/news" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState("/");
  const lastScrollY = useRef(0);

  // Sliding indicator state
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const navPillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY > 100) {
        setVisible(currentY < lastScrollY.current || currentY < 20);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Position indicator over a specific link
  const positionIndicator = useCallback((el: HTMLAnchorElement | null) => {
    if (!el || !navPillRef.current) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const pillRect = navPillRef.current.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - pillRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, []);

  // On mount, position indicator on active link
  useEffect(() => {
    const activeIdx = NAV_ITEMS.findIndex(
      (item) =>
        currentPath === item.href ||
        (item.href !== "/" && currentPath.startsWith(item.href)),
    );
    if (activeIdx >= 0) {
      // Small delay to ensure refs are measured after render
      requestAnimationFrame(() => positionIndicator(linkRefs.current[activeIdx]));
    }
  }, [currentPath, positionIndicator]);

  const isActive = (href: string) =>
    currentPath === href || (href !== "/" && currentPath.startsWith(href));

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group relative z-10">
          <img
            src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/logo-white.png"
            alt="Lambert iGEM"
            className="h-10 w-auto transition duration-300 group-hover:drop-shadow-[0_0_1em_rgba(201,44,42,0.4)]"
          />
        </a>

        {/* Desktop — floating pill */}
        <div
          ref={navPillRef}
          className={`nav-pill-future hidden md:flex items-center gap-1 relative rounded-full px-1.5 py-1.5 transition-all duration-500 ${
            scrolled
              ? "bg-[#F5F0EB]/[0.09] backdrop-blur-2xl border border-[#F5F0EB]/[0.12] shadow-lg shadow-black/15"
              : "bg-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          }`}
          onMouseLeave={() => {
            // Return indicator to active link
            const activeIdx = NAV_ITEMS.findIndex((item) => isActive(item.href));
            if (activeIdx >= 0) {
              positionIndicator(linkRefs.current[activeIdx]);
            } else {
              setIndicator((prev) => ({ ...prev, opacity: 0 }));
            }
          }}
        >
          {/* Sliding indicator */}
          <div
            className="nav-indicator-future absolute top-1.5 bottom-1.5 rounded-full bg-[#F5F0EB]/[0.14] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />

          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              ref={(el) => { linkRefs.current[i] = el; }}
              href={item.href}
              className={`relative z-10 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] rounded-full transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-[#D4A853]"
                  : "text-[#F5F0EB]/75 hover:text-[#F5F0EB]"
              }`}
              onMouseEnter={() => positionIndicator(linkRefs.current[i])}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-full bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.06]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu — fullscreen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-400 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[rgba(20,7,11,0.95)] backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-2xl font-light tracking-[0.08em] uppercase transition-all duration-300 ${
                isActive(item.href)
                  ? "text-[#D4A853]"
                  : "text-[#F5F0EB]/60 hover:text-[#F5F0EB]"
              }`}
              style={{
                transitionDelay: open ? `${i * 50}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
              }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
