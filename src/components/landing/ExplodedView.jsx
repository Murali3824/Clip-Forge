import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LAYERS = [
  { key: "video", label: "Video", pos: [0, 0] },
  { key: "captions", label: "Captions", pos: [-180, -180] },
  { key: "transcript", label: "Transcript", pos: [180, -160] },
  { key: "speaker", label: "Speaker Track", pos: [-220, 30] },
  { key: "thumbnail", label: "Thumbnail", pos: [220, 40] },
  { key: "music", label: "Music", pos: [-160, 220] },
  { key: "hook", label: "Hook", pos: [160, 220] },
  { key: "meta", label: "Metadata", pos: [-320, -40] },
  { key: "score", label: "AI Score", pos: [320, -60] },
  { key: "crop", label: "Smart Crop", pos: [0, -260] },
  { key: "translation", label: "Translation", pos: [0, 280] },
];

function LayerCard({ label, k }) {
  const previews = {
    video: (
      <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-100 rounded-md flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-500">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    ),
    captions: (
      <div className="w-full h-full bg-zinc-950 rounded-md flex items-end justify-center pb-2">
        <span className="text-[9px] font-bold text-white bg-white/10 px-1.5 py-0.5 rounded">SHIP IT</span>
      </div>
    ),
    transcript: (
      <div className="w-full h-full bg-white rounded-md p-1.5 font-mono text-[6.5px] leading-tight text-zinc-700 overflow-hidden">
        00:12 · So the biggest<br/>mistake founders<br/>make is trying to<br/>build the perfect...
      </div>
    ),
    speaker: (
      <div className="w-full h-full bg-white rounded-md p-1.5 flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-[#2E5BFF]" />
        <span className="text-[7px] text-zinc-700 font-medium">A. Rivera</span>
      </div>
    ),
    thumbnail: (
      <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-md relative">
        <span className="absolute top-1 left-1 text-[7px] font-bold text-white">EP47</span>
      </div>
    ),
    music: (
      <div className="w-full h-full bg-white rounded-md flex items-center justify-center gap-[1px] px-2">
        {[8, 14, 6, 18, 10, 20, 12, 16, 8, 14].map((h, i) => (
          <span key={i} className="w-[2px] bg-zinc-500 rounded-full" style={{ height: h }} />
        ))}
      </div>
    ),
    hook: (
      <div className="w-full h-full bg-white rounded-md p-1.5 text-[7px] font-semibold text-zinc-900 leading-tight">
        The biggest mistake founders make →
      </div>
    ),
    meta: (
      <div className="w-full h-full bg-white rounded-md p-1.5 font-mono text-[6.5px] text-zinc-600 leading-tight">
        1080×1920<br/>29.97fps<br/>H.264 · 8Mbps
      </div>
    ),
    score: (
      <div className="w-full h-full bg-white rounded-md flex flex-col items-center justify-center">
        <span className="text-[16px] font-heading font-bold text-[#2E5BFF] leading-none">94</span>
        <span className="text-[7px] text-zinc-500 mt-0.5">AI Score</span>
      </div>
    ),
    crop: (
      <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
        <div className="w-6 h-8 border-2 border-[#2E5BFF] rounded-sm" />
      </div>
    ),
    translation: (
      <div className="w-full h-full bg-white rounded-md p-1.5 text-[7px] text-zinc-700 leading-tight">
        <span className="font-mono text-[6px] text-zinc-400">EN → ES</span><br/>
        El mayor error que...
      </div>
    ),
  };

  return (
    <div className="w-[112px] rounded-xl border border-zinc-200 bg-white shadow-[0_20px_40px_-16px_rgba(9,9,11,0.15)] overflow-hidden">
      <div className="h-[68px] p-1.5">{previews[k]}</div>
      <div className="px-2 py-1.5 border-t border-zinc-100">
        <div className="text-[10px] font-medium text-zinc-900">{label}</div>
      </div>
    </div>
  );
}

export default function ExplodedView() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  // 0→0.5: explode, 0.5→1: reconstruct
  const explosion = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

  return (
    <section
      id="exploded"
      ref={ref}
      data-testid="exploded-view"
      className="relative"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-white to-[#F8F9FB]">
        <div className="grain absolute inset-0 opacity-40" />
        <div className="absolute inset-0 dot-grid opacity-40 mask-fade-b" />

        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 grid grid-rows-[auto_1fr] items-center pt-24 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
              Anatomy of a Short
            </div>
            <h2 className="font-heading font-semibold tracking-[-0.03em] text-[38px] md:text-[56px] text-zinc-950 leading-[1.02]">
              Every clip. Every layer.
              <br />
              <span className="text-zinc-500 italic font-normal">Rendered in one pass.</span>
            </h2>
          </div>

          {/* Stage */}
          <div className="relative flex items-center justify-center">
            {/* Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-500 -400 1000 800" preserveAspectRatio="xMidYMid meet">
              {LAYERS.slice(1).map((l, i) => {
                const x = l.pos[0] * explosion;
                const y = l.pos[1] * explosion;
                return (
                  <line
                    key={l.key}
                    x1={0} y1={0} x2={x} y2={y}
                    stroke="rgba(46,91,255,0.28)" strokeWidth="0.7" strokeDasharray="2 3"
                    opacity={explosion}
                  />
                );
              })}
              {/* particles */}
              {LAYERS.slice(1).map((l, i) => {
                const t = (Date.now() / 3000 + i * 0.3) % 1;
                const x = l.pos[0] * explosion * t;
                const y = l.pos[1] * explosion * t;
                return (
                  <circle key={`p${l.key}`} cx={x} cy={y} r="1.2" fill="#2E5BFF" opacity={explosion * 0.6} />
                );
              })}
            </svg>

            {LAYERS.map((l, i) => (
              <motion.div
                key={l.key}
                data-testid={`layer-${l.key}`}
                className="absolute"
                style={{
                  x: l.pos[0] * explosion,
                  y: l.pos[1] * explosion,
                  zIndex: i === 0 ? 20 : 10,
                }}
                animate={{ rotate: (i - 5) * explosion * 4 }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
              >
                <LayerCard label={l.label} k={l.key} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-[10.5px] font-mono text-zinc-400">
            {progress < 0.5 ? "EXPLODING" : "RECONSTRUCTING"}
          </span>
          <div className="w-40 h-[2px] bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#2E5BFF] transition-all duration-100" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
