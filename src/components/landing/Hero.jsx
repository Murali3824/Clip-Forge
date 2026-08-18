import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import HeroMockup from "./HeroMockup";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100vh] pt-32 pb-24 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F8F9FB]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, rgba(46,91,255,0.08) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-30 mask-fade-b" />
      </div>

      {/* 3D canvas */}
      <div className="absolute inset-0 -z-0">
        <HeroCanvas />
      </div>
      <div className="grain absolute inset-0 -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white/70 backdrop-blur text-[11.5px] font-medium tracking-wide text-zinc-700 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5BFF]" />
            Now shipping: Smart Crop 2.0 · v1.4
          </div>

          <h1
            data-testid="hero-heading"
            className="font-heading font-semibold tracking-[-0.04em] text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[0.98] text-zinc-950 max-w-5xl"
          >
            Turn long videos into
            <br />
            <span className="italic font-normal text-zinc-500">viral shorts</span>{" "}
            <span className="text-zinc-950">with AI.</span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-6 max-w-xl text-[16.5px] sm:text-[17.5px] text-zinc-500 leading-relaxed font-normal"
          >
            ClipForge listens, watches, and edits — turning podcasts, keynotes
            and interviews into perfectly framed shorts. In minutes, not weeks.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
            <a
              data-testid="hero-cta-primary"
              href="#pipeline"
              className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-[14px] rounded-full px-6 py-3.5 transition-all magnetic shadow-[0_10px_30px_-10px_rgba(9,9,11,0.5)]"
            >
              Generate Clips
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              data-testid="hero-cta-secondary"
              href="#exploded"
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-zinc-200 hover:border-zinc-300 hover:bg-white text-zinc-900 font-medium text-[14px] rounded-full px-6 py-3.5 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo
            </a>
          </div>

          <div className="mt-6 text-[11.5px] text-zinc-400 tracking-wide">
            No credit card · Export in 1080p · Free for creators
          </div>
        </motion.div>

        {/* Mockup */}
        <div className="mt-20 md:mt-24">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
