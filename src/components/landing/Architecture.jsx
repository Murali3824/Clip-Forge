import { motion } from "framer-motion";

const NODES = [
  { key: "fe", label: "Frontend", sub: "React · R3F · GSAP", stack: ["Vite", "Tailwind", "Framer"] },
  { key: "be", label: "Backend", sub: "FastAPI · WebSocket · Queue", stack: ["FastAPI", "Redis", "S3"] },
  { key: "ai", label: "Python AI Pipeline", sub: "WhisperX · Diarization · Scene", stack: ["Whisper", "PyAnnote", "OpenCV"] },
  { key: "clip", label: "Generated Clips", sub: "MP4 · 9:16 · burned captions", stack: ["FFmpeg", "MoviePy", "SRT"] },
];

export default function Architecture() {
  return (
    <section
      id="architecture"
      data-testid="architecture-section"
      className="relative py-32 md:py-48 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 dot-grid opacity-30 mask-fade-b" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
            Architecture
          </div>
          <h2 className="font-heading font-semibold tracking-[-0.03em] text-[38px] md:text-[56px] text-zinc-950 leading-[1.02]">
            Built for scale.
            <br />
            <span className="text-zinc-500 italic font-normal">Designed for speed.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="flex flex-col items-center gap-6">
            {NODES.map((n, i) => (
              <motion.div
                key={n.key}
                data-testid={`arch-node-${n.key}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_40px_-16px_rgba(9,9,11,0.1)] p-6 flex items-center gap-5 relative"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-heading font-semibold text-[15px]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-semibold text-zinc-950">{n.label}</div>
                  <div className="text-[12.5px] text-zinc-500 mt-0.5">{n.sub}</div>
                </div>
                <div className="hidden sm:flex gap-1.5">
                  {n.stack.map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-1 rounded-md border border-zinc-200 text-zinc-600">
                      {s}
                    </span>
                  ))}
                </div>

                {i < NODES.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                    className="absolute left-1/2 -bottom-6 h-6 w-[1.5px] bg-gradient-to-b from-[#2E5BFF] to-transparent origin-top"
                  >
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2E5BFF]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
