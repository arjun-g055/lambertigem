const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "News", href: "/news" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#F5F0EB]/[0.06] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="/" className="flex items-center gap-3">
              <img
                src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/logo-white.png"
                alt="Lambert iGEM"
                className="h-16 w-auto drop-shadow-[0_0_1em_#C92C2A33]"
              />
              <span className="text-[#F5F0EB] font-light text-xl tracking-tight">
                Lambert iGEM
              </span>
            </a>
            <p className="text-[#7A6E63] text-sm font-light max-w-xs text-center md:text-left leading-relaxed">
              Synthetic biology research at Lambert High School, Suwanee GA.
              Competing in iGEM since 2013.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://www.instagram.com/lambertigem/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#7A6E63] hover:text-[#D4A853] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="mailto:lambertigem@gmail.com" aria-label="Email" className="text-[#7A6E63] hover:text-[#D4A853] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#F5F0EB] font-medium text-xs uppercase tracking-[0.2em] mb-3">
              Navigate
            </h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-underline text-[#B8A99A] text-sm font-light hover:text-[#F5F0EB] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* For Sponsors */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#F5F0EB] font-medium text-xs uppercase tracking-[0.2em] mb-3">
              For Sponsors
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="/sponsors" className="link-underline text-[#B8A99A] text-sm font-light hover:text-[#F5F0EB] transition-colors">
                Partnership Tiers
              </a>
              <a href="/contact" className="link-underline text-[#B8A99A] text-sm font-light hover:text-[#F5F0EB] transition-colors">
                Get in Touch
              </a>
            </nav>
          </div>

          {/* External */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#F5F0EB] font-medium text-xs uppercase tracking-[0.2em] mb-3">
              External
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="https://igem.org"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[#B8A99A] text-sm font-light hover:text-[#F5F0EB] transition-colors"
              >
                iGEM Foundation
              </a>
              <a
                href="https://2025.igem.wiki/lambert-ga"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[#B8A99A] text-sm font-light hover:text-[#F5F0EB] transition-colors"
              >
                2025 Wiki
              </a>
            </nav>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-[#7A6E63] text-xs font-light text-center mt-6">
          Engineering biology. Inspiring the future.
        </p>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#F5F0EB]/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#5C4F45] text-xs font-light">
            &copy; {new Date().getFullYear()} Lambert iGEM. All rights reserved.
          </p>
          <p className="text-[#5C4F45] text-xs font-light">
            Lambert High School, Suwanee, GA
          </p>
        </div>
      </div>
    </footer>
  );
}
