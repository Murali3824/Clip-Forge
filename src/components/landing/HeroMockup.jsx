import { motion } from "framer-motion";

export default function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 4 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className="relative mx-auto w-full max-w-[980px]"
      data-testid="hero-mockup"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="mac-window"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="mac-titlebar">
          <span className="mac-dot red" />
          <span className="mac-dot yellow" />
          <span className="mac-dot green" />
          <div className="ml-4 flex items-center gap-2 text-[11px] font-medium text-zinc-500 tracking-tight">
            <span>ClipForge</span>
            <span className="text-zinc-300">·</span>
            <span>Studio</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[10.5px] px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-500 font-mono">
              ⌘K
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-12 gap-0">
          {/* Sidebar */}
          <div className="col-span-3 border-r border-zinc-100 bg-zinc-50/60 p-3">
            <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest px-2 mb-2">
              Library
            </div>
            {[
              ["Uploads", true],
              ["Processing", false],
              ["Clips", false],
              ["Captions", false],
              ["Exports", false],
            ].map(([label, active]) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] mb-0.5 ${
                  active
                    ? "bg-white text-zinc-950 shadow-sm border border-zinc-200"
                    : "text-zinc-600"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                {label}
              </div>
            ))}

            <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest px-2 mb-2 mt-4">
              Assets
            </div>
            <div className="space-y-1">
              {["Podcast_ep_47.mp4", "interview_raw.mov", "keynote.mp4"].map(
                (f) => (
                  <div
                    key={f}
                    className="text-[11.5px] text-zinc-500 truncate px-2 py-1 font-mono"
                  >
                    {f}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Main */}
          <div className="col-span-9 p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] text-zinc-400 font-medium">
                  Processing
                </div>
                <div className="text-[15px] font-semibold text-zinc-950 tracking-tight">
                  Podcast_ep_47.mp4
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E5BFF] animate-pulse" />
                <span className="text-[11px] text-zinc-600">
                  Detecting highlights
                </span>
              </div>
            </div>

            {/* Waveform */}
            <div className="h-24 rounded-lg border border-zinc-100 bg-zinc-50/50 flex items-center gap-[3px] px-4 mb-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <span
                  key={i}
                  className="wave-bar bg-zinc-300 rounded-full"
                  style={{
                    width: 3,
                    height: 20 + Math.abs(Math.sin(i * 0.7)) * 40,
                    animationDelay: `${i * 0.04}s`,
                    background:
                      i > 8 && i < 22
                        ? "#2E5BFF"
                        : i > 34 && i < 46
                          ? "#2E5BFF"
                          : "#d4d4d8",
                  }}
                />
              ))}
            </div>

            {/* Clip previews */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { t: "00:12 – 00:47", score: 94, label: "Hook" },
                { t: "04:22 – 05:10", score: 88, label: "Insight" },
                { t: "12:03 – 12:44", score: 91, label: "Quote" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-zinc-100 bg-zinc-50/40 p-2.5"
                >
                  <div className="aspect-[9/16] rounded-md bg-gradient-to-br from-zinc-200 to-zinc-100 relative overflow-hidden mb-2">
                    <div className="absolute bottom-2 left-2 right-2 text-[9px] font-semibold text-white bg-black/50 rounded px-1.5 py-0.5 backdrop-blur">
                      "The trick is..."
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {c.t}
                    </span>
                    <span className="text-[10px] font-semibold text-[#2E5BFF]">
                      {c.score}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-zinc-700 mt-0.5">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reflection */}
      <div
        className="absolute -bottom-20 left-8 right-8 h-40 opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(9,9,11,0.25) 0%, rgba(9,9,11,0) 70%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}
