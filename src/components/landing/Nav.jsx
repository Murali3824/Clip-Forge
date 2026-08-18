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
          <div className="w-7 h-7 rounded-full bg-gray-950 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="font-heading font-semibold tracking-tight text-zinc-950 text-[20px]">
            ClipForge
          </span>
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-link-documentation"
            className="inline-flex items-center gap-1 text-[12px] sm:text-[13.5px] font-medium text-zinc-800 hover:text-zinc-950 transition-colors"
          >
            Documentation
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
            </svg>
          </a>
          <a href="https://github.com/Murali3824/Al-Clips-Studio" target="_blank" rel="noopener noreferrer"
            data-testid="nav-cta"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-[12px] sm:text-[13.5px] font-medium text-white bg-zinc-950 hover:bg-zinc-800 transition-colors rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Try ClipForge
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
