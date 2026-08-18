import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Always disable Lenis in development to prevent worker blob URL errors
const DISABLE_LENIS_IN_DEV = true;
const isLenisDisabled =
  DISABLE_LENIS_IN_DEV &&
  process.env.NODE_ENV === "development";

export function useLenis() {
  useEffect(() => {
    if (isLenisDisabled) {
      // Fallback: use native smooth scroll
      document.documentElement.style.scrollBehavior = "smooth";
      return () => {
        document.documentElement.style.scrollBehavior = "";
      };
    }

    let lenis;
    let raf;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: true,
        prevent: (node) => {
          return node?.classList?.contains?.("prevent-scroll") || false;
        },
        // Disable lerp to reduce worker dependency
        lerp: 0.1,
      });

      const animate = (time) => {
        try {
          lenis.raf(time);
          ScrollTrigger.update();
          raf = requestAnimationFrame(animate);
        } catch (e) {
          console.warn("Lenis animation error:", e);
          // Continue with requestAnimationFrame even if lenis fails
          raf = requestAnimationFrame(animate);
        }
      };

      raf = requestAnimationFrame(animate);

      // Mark that Lenis is enabled
      window.__lenis_enabled = true;

      return () => {
        if (raf) cancelAnimationFrame(raf);
        if (lenis) {
          try {
            lenis.destroy();
          } catch (e) {
            console.warn("Error destroying Lenis:", e);
          }
        }
      };
    } catch (error) {
      console.warn(
        "Lenis initialization failed (worker blob URL issue), using native scroll",
        error
      );

      // Fallback: use CSS smooth scroll
      document.documentElement.style.scrollBehavior = "smooth";

      return () => {
        document.documentElement.style.scrollBehavior = "";
      };
    }
  }, []);
}
