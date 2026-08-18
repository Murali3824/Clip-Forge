import { motion, AnimatePresence } from "framer-motion";

/** Each scene = a fake macOS window state for the pipeline. */

const Frame = ({ title, subtitle, children }) => (
  <div className="mac-window w-full max-w-[880px] mx-auto">
    <div className="mac-titlebar">
      <span className="mac-dot red" />
      <span className="mac-dot yellow" />
      <span className="mac-dot green" />
      <div className="ml-4 flex items-center gap-2 text-[11px] font-medium text-zinc-500">
        <span>{title}</span>
        <span className="text-zinc-300">·</span>
        <span className="text-zinc-400">{subtitle}</span>
      </div>
    </div>
    <div className="p-6 bg-white min-h-[420px]">{children}</div>
  </div>
);

const s = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

const Scene1 = () => (
  <Frame title="ClipForge" subtitle="Upload">
    <div className="border-2 border-dashed border-zinc-200 rounded-2xl h-[360px] flex flex-col items-center justify-center bg-gradient-to-b from-zinc-50/60 to-white">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={s}
        className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center mb-4"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v13M6 9l6-6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 17v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
      <div className="text-[16px] font-semibold text-zinc-950">Drop a long video here</div>
      <div className="text-[13px] text-zinc-500 mt-1">MP4 · MOV · WAV · up to 4 hours</div>
      <div className="mt-6 text-[11px] text-zinc-400 font-mono">podcast_ep_47.mp4 · 2.4 GB</div>
      <motion.div
        initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 1.6, ease: "easeInOut" }}
        className="mt-3 h-1 bg-[#2E5BFF] rounded-full"
      />
    </div>
  </Frame>
);

const Scene2 = () => (
  <Frame title="ClipForge" subtitle="Processing">
    <div className="grid grid-cols-2 gap-4 h-[360px]">
      <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-3">Queue</div>
        {[
          ["Scene detection", "Complete"],
          ["Audio extraction", "Complete"],
          ["Voice separation", "Running"],
          ["Highlight scoring", "Pending"],
        ].map(([label, status], i) => (
          <motion.div
            key={label}
            initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ ...s, delay: i * 0.08 }}
            className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-b-0"
          >
            <span className="text-[12.5px] text-zinc-800">{label}</span>
            <span className={`text-[10.5px] font-medium ${
              status === "Running" ? "text-[#2E5BFF]" : status === "Complete" ? "text-zinc-400" : "text-zinc-300"
            }`}>{status}</span>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-3">GPU · L4</div>
        <div className="grid grid-cols-6 gap-1 mb-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="h-2 rounded-sm" style={{ background: i < 32 ? "#2E5BFF" : "#e4e4e7", opacity: i < 32 ? 0.15 + (i / 48) * 0.85 : 1 }} />
          ))}
        </div>
        <div className="text-[11px] text-zinc-500 font-mono">67% · 3.4 GB / 24 GB</div>
        <div className="mt-auto text-[24px] font-heading font-semibold text-zinc-950">02:14</div>
        <div className="text-[11px] text-zinc-500">Estimated remaining</div>
      </div>
    </div>
  </Frame>
);

const Scene3 = () => (
  <Frame title="ClipForge" subtitle="Audio Extraction">
    <div className="h-[360px] flex flex-col gap-3">
      {["Vocals", "Music", "Room"].map((lane, i) => (
        <motion.div
          key={lane}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...s, delay: i * 0.12 }}
          className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 flex-1 flex items-center gap-4"
        >
          <div className="text-[11px] font-medium text-zinc-500 w-16">{lane}</div>
          <div className="flex-1 flex items-center gap-[3px]">
            {Array.from({ length: 80 }).map((_, k) => (
              <span
                key={k}
                className="rounded-full"
                style={{
                  width: 2,
                  height: 4 + Math.abs(Math.sin(k * 0.4 + i)) * (i === 0 ? 44 : i === 1 ? 22 : 12),
                  background: i === 0 ? "#2E5BFF" : "#a1a1aa",
                }}
              />
            ))}
          </div>
          <div className="text-[10.5px] font-mono text-zinc-400">{i === 0 ? "-8.2 dB" : i === 1 ? "-14.5 dB" : "-24.1 dB"}</div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene4 = () => (
  <Frame title="ClipForge" subtitle="Speech Recognition">
    <div className="h-[360px] font-mono text-[13.5px] leading-[1.9] text-zinc-800 overflow-hidden">
      {[
        "00:12 · So the biggest mistake founders make is",
        "00:14 · trying to build the perfect product before",
        "00:17 · anyone has even asked for it.",
        "00:20 · You have to ship something ugly and let",
        "00:23 · the users tell you what to fix.",
        "00:27 · That's the entire game.",
      ].map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, ...s }}
          className="flex gap-3"
        >
          <span className="text-zinc-400 tabular-nums">{line.split(" · ")[0]}</span>
          <span>{line.split(" · ")[1]}</span>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene5 = () => (
  <Frame title="ClipForge" subtitle="Speaker Detection">
    <div className="grid grid-cols-3 gap-4 h-[360px]">
      {[
        { name: "Alex Rivera", role: "Host", pct: 62, color: "#2E5BFF" },
        { name: "Mira Chen", role: "Guest", pct: 34, color: "#09090b" },
        { name: "Silence", role: "—", pct: 4, color: "#a1a1aa" },
      ].map((sp, i) => (
        <motion.div
          key={sp.name}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...s, delay: i * 0.1 }}
          className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-5 flex flex-col"
        >
          <div className="w-12 h-12 rounded-full" style={{ background: sp.color, opacity: 0.9 }} />
          <div className="mt-3 text-[15px] font-semibold text-zinc-950">{sp.name}</div>
          <div className="text-[11.5px] text-zinc-500">{sp.role}</div>
          <div className="mt-auto">
            <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${sp.pct}%`, background: sp.color }} />
            </div>
            <div className="text-[10.5px] text-zinc-400 mt-1 font-mono">{sp.pct}% airtime</div>
          </div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene6 = () => (
  <Frame title="ClipForge" subtitle="Highlight Detection">
    <div className="h-[360px] flex flex-col gap-2">
      <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Top moments</div>
      {[
        { t: "00:12 – 00:47", s: 96, label: "Strong hook · emotional peak" },
        { t: "04:22 – 05:10", s: 91, label: "Insight · quotable" },
        { t: "12:03 – 12:44", s: 88, label: "Story climax" },
        { t: "27:15 – 27:52", s: 84, label: "Contrarian take" },
      ].map((h, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, ...s }}
          className="flex items-center gap-4 py-3 border-b border-zinc-100 last:border-b-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#2E5BFF]/10 border border-[#2E5BFF]/20 flex items-center justify-center text-[13px] font-semibold text-[#2E5BFF]">
            {h.s}
          </div>
          <div className="flex-1">
            <div className="text-[13.5px] font-medium text-zinc-900">{h.label}</div>
            <div className="text-[11px] text-zinc-500 font-mono">{h.t}</div>
          </div>
          <div className="h-1.5 w-40 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2E5BFF] rounded-full" style={{ width: `${h.s}%` }} />
          </div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene7 = () => (
  <Frame title="ClipForge" subtitle="Hook Generation">
    <div className="grid grid-cols-2 gap-3 h-[360px]">
      {[
        "The biggest mistake founders make (that costs them years)",
        "Why perfect products always die",
        "Ship ugly. The 3-word rule that built a $2B company.",
        "This is the entire game — and no one tells you.",
      ].map((h, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, ...s }}
          className="rounded-xl border border-zinc-100 p-4 bg-white flex flex-col"
        >
          <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-2">Hook · {i + 1}</div>
          <div className="text-[15px] font-semibold text-zinc-950 leading-snug">{h}</div>
          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="text-[10.5px] text-zinc-500 font-mono">CTR est. {(6 + Math.random() * 4).toFixed(1)}%</div>
            <div className="text-[10.5px] font-medium text-[#2E5BFF]">Use hook →</div>
          </div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene8 = () => (
  <Frame title="ClipForge" subtitle="Captions">
    <div className="grid grid-cols-3 gap-4 h-[360px]">
      {[
        { style: "Bold", bg: "#ffffff", color: "#09090b", weight: 800, sample: "SHIP IT" },
        { style: "Highlight", bg: "#09090b", color: "#ffffff", weight: 700, sample: "Ship it" },
        { style: "Karaoke", bg: "#ffffff", color: "#2E5BFF", weight: 700, sample: "Ship it" },
      ].map((c, i) => (
        <motion.div
          key={c.style}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...s, delay: i * 0.1 }}
          className="rounded-xl border border-zinc-100 overflow-hidden bg-zinc-50/40"
        >
          <div className="aspect-[9/16] bg-gradient-to-br from-zinc-200 to-zinc-100 relative flex items-end justify-center pb-8">
            <div
              className="px-3 py-1.5 rounded-md text-center"
              style={{ background: c.bg, color: c.color, fontWeight: c.weight, fontSize: 18 }}
            >
              {c.sample}
            </div>
          </div>
          <div className="p-3 text-[12px] font-medium text-zinc-900">{c.style}</div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene9 = () => (
  <Frame title="ClipForge" subtitle="Background Music">
    <div className="h-[360px] flex flex-col gap-3">
      {["Drums", "Bass", "Melody", "Ambience"].map((track, i) => (
        <motion.div
          key={track}
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, ...s }}
          className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 flex items-center gap-4"
        >
          <div className="text-[11px] font-medium text-zinc-600 w-20">{track}</div>
          <div className="flex-1 flex items-center gap-[2px]">
            {Array.from({ length: 100 }).map((_, k) => (
              <span key={k} className="rounded-full" style={{
                width: 2,
                height: 3 + Math.abs(Math.sin(k * 0.3 + i * 2)) * (i === 0 ? 30 : i === 1 ? 24 : i === 2 ? 20 : 10),
                background: i === 2 ? "#2E5BFF" : "#a1a1aa",
              }} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

const Scene10 = () => (
  <Frame title="ClipForge" subtitle="Smart Crop">
    <div className="h-[360px] flex items-center justify-center gap-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={s} className="aspect-video w-64 rounded-lg bg-zinc-100 border border-zinc-200 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-zinc-200/50" />
          ))}
        </div>
        <div className="absolute top-1/2 left-[42%] w-24 h-24 -translate-y-1/2 rounded-full border-2 border-[#2E5BFF] shadow-[0_0_0_4px_rgba(46,91,255,0.15)]" />
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-zinc-500">16:9 · original</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ ...s, delay: 0.25 }}
        className="aspect-[9/16] h-64 rounded-lg bg-zinc-100 border border-zinc-200 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(9,9,11,0.15)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-100" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-[#2E5BFF] shadow-[0_0_0_4px_rgba(46,91,255,0.15)]" />
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/90">9:16 · smart</div>
      </motion.div>
    </div>
  </Frame>
);

const Scene11 = () => (
  <Frame title="ClipForge" subtitle="Export">
    <div className="grid grid-cols-4 gap-3 h-[360px]">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, ...s }}
          className="rounded-xl border border-zinc-100 bg-zinc-50/40 overflow-hidden"
        >
          <div className="aspect-[9/16] bg-gradient-to-br from-zinc-200 to-zinc-100 relative">
            <div className="absolute bottom-2 left-2 right-2 text-[8.5px] font-semibold text-white bg-black/50 rounded px-1.5 py-0.5 backdrop-blur">
              Short {i + 1}
            </div>
            <div className="absolute top-2 right-2 text-[9px] font-semibold text-[#2E5BFF] bg-white rounded px-1.5 py-0.5 shadow">
              {88 + i}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </Frame>
);

export const SCENES = [
  { id: 1, key: "upload", title: "Upload", subtitle: "Drop a long video, let the pipeline take over.", Comp: Scene1 },
  { id: 2, key: "processing", title: "Processing", subtitle: "A GPU-accelerated queue handles everything.", Comp: Scene2 },
  { id: 3, key: "audio", title: "Audio Extraction", subtitle: "Separate vocals, music and room ambience.", Comp: Scene3 },
  { id: 4, key: "transcript", title: "Transcript", subtitle: "Word-perfect speech recognition, in real time.", Comp: Scene4 },
  { id: 5, key: "speakers", title: "Speakers", subtitle: "Every voice, identified and tracked.", Comp: Scene5 },
  { id: 6, key: "highlights", title: "Highlights", subtitle: "The best 45 seconds of every hour surface first.", Comp: Scene6 },
  { id: 7, key: "hooks", title: "Hooks", subtitle: "Punchy openers, engineered for the first three seconds.", Comp: Scene7 },
  { id: 8, key: "captions", title: "Captions", subtitle: "Premium caption styles that convert.", Comp: Scene8 },
  { id: 9, key: "music", title: "Music", subtitle: "Layered soundtracks, matched to your energy.", Comp: Scene9 },
  { id: 10, key: "smartcrop", title: "Smart Crop", subtitle: "Landscape becomes vertical, framed on the face.", Comp: Scene10 },
  { id: 11, key: "export", title: "Export", subtitle: "Beautiful shorts, ready to publish.", Comp: Scene11 },
];

export function SceneStage({ active }) {
  const Comp = SCENES[active]?.Comp || SCENES[0].Comp;
  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Comp />
    </motion.div>
  );
}
