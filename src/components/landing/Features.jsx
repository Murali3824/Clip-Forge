import { motion } from "framer-motion";
import {
  Scissors,
  Mic2,
  Film,
  Crop,
  Type,
  Languages,
  Image as ImageIcon,
  FolderOpen,
  Pencil,
  Activity,
  PackageOpen,
} from "lucide-react";

const FEATURES = [
  { icon: Scissors, title: "AI Clip Detection", desc: "Find the 45 seconds worth watching in every hour." },
  { icon: Mic2, title: "Speaker Tracking", desc: "Every voice, identified and cut with the frame." },
  { icon: Film, title: "Scene Detection", desc: "Never cut mid-sentence or mid-motion. Ever." },
  { icon: Crop, title: "Smart Crop", desc: "9:16 that always keeps the face centered." },
  { icon: Type, title: "Caption Generator", desc: "Three premium styles. Word-perfect timing." },
  { icon: Languages, title: "Translation", desc: "One click. Twenty-eight languages. Native tone." },
  { icon: ImageIcon, title: "Thumbnail Generator", desc: "Auto-picked frames with the strongest CTR." },
  { icon: FolderOpen, title: "Asset Library", desc: "Reusable clips, sounds, and overlays." },
  { icon: Pencil, title: "Manual Editing", desc: "When you want to. Never when you don't." },
  { icon: Activity, title: "Live Progress", desc: "Watch every stage in real time on any device." },
  { icon: PackageOpen, title: "Batch Export", desc: "Ship 40 shorts before you finish coffee." },
];

function Card({ icon: Icon, title, desc, i }) {
  return (
    <motion.div
      data-testid={`feature-${title.toLowerCase().replace(/\s+/g, "-")}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-zinc-200 bg-white p-6 md:p-7 transition-shadow hover:shadow-[0_16px_40px_-16px_rgba(9,9,11,0.12)]"
    >
      <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-5 group-hover:border-[#2E5BFF]/30 group-hover:bg-[#2E5BFF]/5 transition-colors">
        <Icon className="w-4 h-4 text-zinc-700 group-hover:text-[#2E5BFF] transition-colors" strokeWidth={1.8} />
      </div>
      <div className="text-[15.5px] font-semibold text-zinc-950 tracking-tight">{title}</div>
      <div className="mt-1.5 text-[13.5px] text-zinc-500 leading-relaxed">{desc}</div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-32 md:py-48 bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
            Features
          </div>
          <h2 className="font-heading font-semibold tracking-[-0.03em] text-[38px] md:text-[56px] text-zinc-950 leading-[1.02]">
            Everything you'd hire an editor for.
            <br />
            <span className="text-zinc-500 italic font-normal">Nothing you wouldn't.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f, i) => (
            <Card key={f.title} {...f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
