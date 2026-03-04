import React from "react";

const FOOTER_LINKS = [
    { label: "About Us", href: "#" },
    { label: "News", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "Projects", href: "/projects" },
];

export default function TeamFooter() {
    return (
        <footer className="border-t border-[#1f1515] mt-12">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20">
                    {/* Logo */}
                    <div className="flex flex-col items-center">
                        <img
                            src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/logo-white.png"
                            alt="iGEM logo"
                            className="h-24 w-auto drop-shadow-[0_0_2em_#C92C2A55]"
                        />
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold text-lg mb-3">Website</h4>
                        <nav className="flex flex-col gap-1.5">
                            {FOOTER_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-gray-400 text-sm hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Sponsors placeholder */}
                <div className="mt-12 py-4 rounded-xl border border-dashed border-[#C92C2A55] text-center">
                    <p className="text-gray-500 text-sm">Sponsor Logos ??? Idk</p>
                </div>

                {/* Social media */}
                <div className="mt-6 flex justify-center">
                    <div className="rounded-xl border border-dashed border-[#C92C2A55] px-8 py-3">
                        <p className="text-gray-500 text-sm">
                            Social Media Logos w/ hyperlink
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-6 border-t border-[#1f1515] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-600 text-xs">Follow Us</p>
                    <p className="text-gray-600 text-xs">
                        &copy; {new Date().getFullYear()} Lambert iGEM
                    </p>
                </div>
            </div>
        </footer>
    );
}
