import { motion } from "framer-motion";

const WIN = ({ children, title, subtitle }) => (
  <div className="mac-window">
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
    <div className="bg-white">{children}</div>
  </div>
);

export default function Showcase() {
  return (
    <section
      data-testid="showcase-section"
      className="relative py-32 md:py-48 bg-[#F8F9FB] border-y border-zinc-200/60 overflow-hidden"
    >
      <div className="grain absolute inset-0 opacity-40" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
            Studio
          </div>
          <h2 className="font-heading font-semibold tracking-[-0.03em] text-[38px] md:text-[56px] text-zinc-950 leading-[1.02]">
            A studio, quietly.
            <br />
            <span className="text-zinc-500 italic font-normal">Powerful, loudly.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <WIN title="ClipForge" subtitle="Timeline">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[12.5px] font-medium text-zinc-800">podcast_ep_47</div>
                  <div className="text-[10.5px] font-mono text-zinc-400">01:24:33</div>
                  <div className="ml-auto text-[10.5px] font-mono text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E5BFF]" /> LIVE
                  </div>
                </div>
                <div className="space-y-2">
                  {["Video", "Vocals", "Music", "Captions"].map((tr, i) => (
                    <div key={tr} className="flex items-center gap-3">
                      <div className="w-16 text-[10.5px] text-zinc-500 font-mono">{tr}</div>
                      <div className="flex-1 h-6 bg-zinc-50 rounded-md relative overflow-hidden border border-zinc-100">
                        <div
                          className="absolute inset-y-0 rounded-md"
                          style={{
                            left: `${10 + i * 3}%`,
                            width: `${65 - i * 8}%`,
                            background: i === 0 ? "linear-gradient(90deg,#e4e4e7,#d4d4d8)" : i === 3 ? "#2E5BFF" : "#a1a1aa",
                            opacity: i === 3 ? 0.9 : 0.6,
                          }}
                        />
                        <div className="absolute inset-y-0 left-[35%] w-[2px] bg-[#2E5BFF]" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-8 gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="aspect-video rounded-[3px] bg-gradient-to-br from-zinc-200 to-zinc-100" />
                  ))}
                </div>
              </div>
            </WIN>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <WIN title="ClipForge" subtitle="Caption Editor">
              <div className="p-5">
                <div className="aspect-[9/16] max-h-[360px] mx-auto rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-center pb-16">
                    <div className="bg-white px-3 py-1.5 rounded-md font-bold text-zinc-950 text-[15px]">
                      SHIP <span className="text-[#2E5BFF]">IT</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 text-[9px] font-mono text-white/70">00:12 / 00:47</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["Bold", "Highlight", "Karaoke"].map((s, i) => (
                    <div
                      key={s}
                      className={`text-[11px] py-2 rounded-lg text-center border ${
                        i === 0
                          ? "bg-zinc-950 text-white border-zinc-950"
                          : "bg-white text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </WIN>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <WIN title="ClipForge" subtitle="Generated Shorts">
              <div className="p-5 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[9/16] rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-100 relative overflow-hidden">
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[8px] font-semibold text-white bg-black/40 rounded px-1 py-0.5 backdrop-blur">
                      Short {i + 1}
                    </div>
                    <div className="absolute top-1.5 right-1.5 text-[8px] font-semibold text-[#2E5BFF] bg-white rounded px-1 py-0.5">
                      {88 + i}
                    </div>
                  </div>
                ))}
              </div>
            </WIN>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <WIN title="ClipForge" subtitle="Export">
              <div className="p-5 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full">
                  <div className="text-[13px] font-semibold text-zinc-950 mb-3">Export queue</div>
                  {[
                    ["ep47_hook_01.mp4", "1080p · 9:16 · captions", 100],
                    ["ep47_hook_02.mp4", "1080p · 9:16 · captions", 78],
                    ["ep47_hook_03.mp4", "1080p · 9:16 · translations", 42],
                  ].map(([n, m, p], i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-zinc-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-zinc-800 font-mono">{n}</div>
                        <div className="text-[10.5px] text-zinc-500">{m}</div>
                      </div>
                      <div className="w-24 h-1 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2E5BFF] rounded-full" style={{ width: `${p}%` }} />
                      </div>
                      <div className="text-[10.5px] font-mono text-zinc-500 w-8 text-right">{p}%</div>
                    </div>
                  ))}
                </div>
                <div className="w-full md:w-52 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Total</div>
                  <div className="text-[28px] font-heading font-semibold text-zinc-950 mt-1 leading-none">40</div>
                  <div className="text-[11px] text-zinc-500 mt-1">shorts ready</div>
                  <button className="mt-4 w-full bg-zinc-950 text-white text-[12px] font-medium rounded-lg py-2 hover:bg-zinc-800 transition-colors">
                    Publish all →
                  </button>
                </div>
              </div>
            </WIN>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
