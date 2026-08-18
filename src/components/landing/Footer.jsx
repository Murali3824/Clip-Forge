export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative py-24 md:py-32 bg-white border-t border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <h3 className="font-heading font-semibold tracking-[-0.03em] text-[48px] md:text-[80px] text-zinc-950 leading-[0.95]">
            Start cutting.
          </h3>
          <p className="text-[16px] text-zinc-500 mt-4 max-w-md">
            Your next viral short is already inside your longest video. Let ClipForge find it.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="https://github.com/Murali3824/Al-Clips-Studio" target="_blank"
              data-testid="footer-cta"
              className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-[14px] rounded-full px-6 py-3.5 transition-colors"
            >
              Generate Clips
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-12 border-t border-zinc-100">
          <div className="col-span-2 md:col-span-2">
            <a href="#top" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gray-950 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="font-heading font-semibold tracking-tight text-zinc-950 text-[15px]">
                ClipForge
              </span>
            </a>
            <p className="text-[12.5px] text-zinc-500 leading-relaxed max-w-xs">
              Turn long videos into viral shorts, powered by an eleven-stage AI pipeline. Made for creators.
            </p>
          </div>

          {[
            { title: "Product", items: ["GitHub", "Architecture", "Documentation", "Tech Stack"] },
            { title: "Company", items: ["About", "Changelog", "Careers", "Contact"] },
            { title: "Legal", items: ["Privacy", "Terms", "Security", "Status"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.items.map((item) => {
                  let href = "#";
                  let target = undefined;
                  let rel = undefined;
                  if (item === "GitHub") {
                    href = "https://github.com/Murali3824/Al-Clips-Studio";
                    target = "_blank";
                    rel = "noopener noreferrer";
                  } else if (item === "Documentation") {
                    href = "/docs";
                    target = "_blank";
                    rel = "noopener noreferrer";
                  }
                  return (
                    <li key={item}>
                      <a
                        href={href}
                        target={target}
                        rel={rel}
                        data-testid={`footer-link-${item.toLowerCase()}`}
                        className="text-[13px] text-zinc-700 hover:text-zinc-950 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11.5px] text-zinc-400">
            © 2026 ClipForge Labs · Built for creators, on the shoulders of open source.
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-[10.5px] font-medium tracking-wide text-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5BFF]" />
            Made for Creators
          </div>
        </div>
      </div>
    </footer>
  );
}
