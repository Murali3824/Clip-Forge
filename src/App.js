import "@/App.css";
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useLenis } from "@/lib/lenis";
import ErrorBoundary from "@/components/ErrorBoundary";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Pipeline from "@/components/landing/Pipeline";
import ExplodedView from "@/components/landing/ExplodedView";
import Showcase from "@/components/landing/Showcase";
import Architecture from "@/components/landing/Architecture";
import Storage from "@/components/landing/Storage";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import CursorBlob from "@/components/landing/CursorBlob";

const DocsPage = lazy(() => import("@/components/docs/DocsPage"));

function LandingContent() {
  useLenis();

  useEffect(() => {
    // Global error handler for worker-related errors
    const handleError = (event) => {
      if (
        event.error?.message?.includes("importScripts") ||
        event.error?.message?.includes("Worker") ||
        (event.message && event.message.includes("blob") && event.message.includes("Worker"))
      ) {
        console.warn("Worker blob URL error caught globally - using fallback scroll");
        document.documentElement.style.scrollBehavior = "smooth";
        // Prevent error from crashing the app
        event.preventDefault?.();
      }
    };

    window.addEventListener("error", handleError, true);
    return () => window.removeEventListener("error", handleError, true);
  }, []);

  return (
    <div className="App relative">
      {/* <CursorBlob /> */}
      <Nav />
      <main>
        <Hero />
        <Pipeline />
        <ExplodedView />
        <Showcase />
        <Architecture />
        <Storage />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingContent />} />
        <Route
          path="/docs"
          element={
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
                  <span className="text-sm text-zinc-500">Loading documentation…</span>
                </div>
              </div>
            }>
              <DocsPage />
            </Suspense>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

