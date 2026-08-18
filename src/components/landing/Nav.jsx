import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "backdrop-blur-xl bg-white/70 border-b border-zinc-200/60"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-2 group"
        >
          <span className="relative w-6 h-6 rounded-full bg-zinc-950">
            <span className="absolute left-1/2 top-1/2 w-2.5 h-2.5 bg-white rounded-[3px] rotate-45 -translate-x-1/2 -translate-y-1/2"></span>
          </span>
          <span className="font-heading font-semibold tracking-tight text-zinc-950 text-[15px]">
            ClipForge
          </span>
        </a>

        <div className="flex items-center gap-5">
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-link-documentation"
            className="hidden sm:inline-flex items-center gap-1 text-[13.5px] font-medium text-zinc-800 hover:text-zinc-950 transition-colors"
          >
            Documentation
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
            </svg>
          </a>
          <a href="https://github.com/Murali3824/Al-Clips-Studio" target="_blank"
            data-testid="nav-cta"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white bg-zinc-950 hover:bg-zinc-800 transition-colors rounded-full px-4 py-2"
          >
            Try ClipForge
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
