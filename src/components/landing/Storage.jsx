import { motion } from "framer-motion";

const FOLDERS = [
  { name: "Uploads", count: "247" },
  { name: "Temp", count: "12" },
  { name: "Processing", count: "3" },
  { name: "Outputs", count: "1.2k" },
  { name: "Assets", count: "84" },
  { name: "Exports", count: "912" },
];

export default function Storage() {
  return (
    <section
      data-testid="storage-section"
      className="relative py-24 md:py-36 bg-[#F8F9FB] border-y border-zinc-200/60 overflow-hidden"
    >
      <div className="grain absolute inset-0 opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
            Storage Flow
          </div>
          <h2 className="font-heading font-semibold tracking-[-0.03em] text-[34px] md:text-[48px] text-zinc-950 leading-[1.05]">
            Files that move themselves.
          </h2>
        </div>

        <div className="relative flex items-center gap-3 overflow-x-auto pb-4 -mx-2">
          {FOLDERS.map((f, i) => (
            <div key={f.name} className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <motion.div
                data-testid={`folder-${f.name.toLowerCase()}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="w-[150px] rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_24px_-10px_rgba(9,9,11,0.08)] overflow-hidden"
              >
                <div className="h-3 bg-gradient-to-b from-zinc-100 to-white border-b border-zinc-100 relative">
                  <div className="absolute top-0 left-3 w-12 h-3 rounded-t-md bg-white border border-b-0 border-zinc-200 -translate-y-1.5" />
                </div>
                <div className="p-4 aspect-square flex flex-col">
                  <div className="text-[13px] font-semibold text-zinc-950">{f.name}</div>
                  <div className="text-[10.5px] text-zinc-500 mt-0.5 font-mono">{f.count} files</div>
                  <div className="mt-auto grid grid-cols-4 gap-1">
                    {Array.from({ length: 8 }).map((_, k) => (
                      <span key={k} className="h-1.5 rounded-full bg-zinc-200" style={{ opacity: 1 - k * 0.1 }} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {i < FOLDERS.length - 1 && (
                <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <motion.span
                    animate={{ x: [-6, 6, -6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#2E5BFF]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
