import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES, SceneStage } from "./PipelineScenes";

gsap.registerPlugin(ScrollTrigger);

const SCENE_DWELL = 0.9; // viewport heights per scene

export default function Pipeline() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    if (!section || !pinEl) return;

    const total = SCENES.length;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * SCENE_DWELL * total}`,
        pin: pinEl,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          const idx = Math.min(total - 1, Math.floor(p * total));
          setActive(idx);
        },
      });

      return () => {
        trigger.kill();
      };
    }, section);

    // Recalculate after mount / font load
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  // Trigger a refresh on window resize (handled by ScrollTrigger, but fonts can shift)
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      data-testid="pipeline-section"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFAFB] to-white" />
        <div className="grain absolute inset-0 opacity-40" />

        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-12 gap-8 items-center">
          {/* Left timeline */}
          <aside className="col-span-12 md:col-span-3 hidden md:block">
            <div className="mb-8">
              <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-2">
                The Pipeline
              </div>
              <div className="text-[13px] text-zinc-500 leading-relaxed">
                Eleven stages. Zero clicks. One perfectly cut short.
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[7px] top-1 bottom-1 w-[1.5px] timeline-line" />
              <div
                className="absolute left-[6px] top-1 w-[3px] bg-[#2E5BFF] transition-[height] duration-500 ease-out"
                style={{
                  height: `calc(${((active + 1) / SCENES.length) * 100}% - 4px)`,
                  boxShadow: "0 0 12px rgba(46,91,255,0.5)",
                }}
              />

              <ul className="relative space-y-4">
                {SCENES.map((sc, i) => {
                  const isActive = i === active;
                  const isDone = i < active;
                  return (
                    <li
                      key={sc.id}
                      data-testid={`timeline-item-${sc.id}`}
                      className="flex items-center gap-4 group"
                    >
                      <span
                        className={`w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center ${
                          isActive
                            ? "bg-white border-[3px] border-[#2E5BFF] shadow-[0_0_0_4px_rgba(46,91,255,0.15)]"
                            : isDone
                              ? "bg-[#2E5BFF]"
                              : "bg-white border border-zinc-300"
                        }`}
                      >
                        {isDone && (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className={`font-mono text-[10.5px] ${isActive ? "text-[#2E5BFF]" : "text-zinc-400"}`}>
                            {String(sc.id).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-[13.5px] transition-colors ${
                              isActive
                                ? "text-zinc-950 font-semibold"
                                : isDone
                                  ? "text-zinc-400"
                                  : "text-zinc-500"
                            }`}
                          >
                            {sc.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Right stage */}
          <div className="col-span-12 md:col-span-9">
            <div className="mb-6 md:mb-8">
              <div className="text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium mb-2">
                Stage {String(active + 1).padStart(2, "0")} / 11
              </div>
              <h3 className="font-heading font-semibold tracking-tight text-[28px] md:text-[38px] text-zinc-950 leading-tight">
                {SCENES[active].title}.
              </h3>
              <p className="mt-2 text-[15px] md:text-[16.5px] text-zinc-500 max-w-lg leading-relaxed">
                {SCENES[active].subtitle}
              </p>
            </div>

            <SceneStage active={active} />
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          <span className="font-mono text-[10.5px] text-zinc-400 tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
          </span>
          <div className="w-40 h-[2px] bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#2E5BFF]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
