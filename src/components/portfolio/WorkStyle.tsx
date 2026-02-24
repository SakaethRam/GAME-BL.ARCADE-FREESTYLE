"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code2, Database, Search } from "lucide-react";

const slides = [
  { id: "ask", icon: Search, label: "Analyze" },
  { id: "structured", icon: FileText, label: "Architect" },
  { id: "export", icon: Code2, label: "Execute" },
  { id: "stored", icon: Database, label: "Deploy" },
];

/* ---------------- SLIDES ---------------- */

const SlideAsk = () => (
  <div className="p-8 space-y-6 text-gray-200">
    <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
      [Step 01]
    </p>

    <h3 className="text-3xl font-bold text-white">
      Understanding The Vision
    </h3>

    <div className="rounded-xl border border-white/20 px-4 py-3 text-sm text-white/70">
      "Crafting scalable AI-driven platforms with real-time intelligence."
    </div>

    <p className="text-white/60 text-sm">
      Translating ideas into structured technical blueprints.
    </p>
  </div>
);

const SlideStructured = () => (
  <div className="p-8 space-y-6 text-gray-200">
    <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
      [Step 02]
    </p>

    <h3 className="text-3xl font-bold text-white">
      Solution Design & Architecture
    </h3>

    <div className="space-y-3">
      <div className="h-4 w-3/4 rounded bg-white/20" />
      <div className="h-4 w-5/6 rounded bg-white/10" />
      <div className="h-4 w-2/3 rounded bg-white/10" />
    </div>

    <p className="text-white/60 text-sm">
      Scalable backend systems, API pipelines, and automation layers.
    </p>
  </div>
);

const SlideExport = () => (
  <div className="p-8 space-y-6 text-gray-200">
    <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
      [Step 03]
    </p>

    <h3 className="text-3xl font-bold text-white">
      Engineering Execution
    </h3>

    <motion.div
      initial={{ scale: 0.85, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
    >
      <FileText className="w-16 h-16 text-white/60" strokeWidth={1} />
    </motion.div>

    <p className="text-white/60 text-sm">
      Clean code. Optimized performance. Measurable impact.
    </p>
  </div>
);

const SlideStored = () => (
  <div className="p-8 space-y-6 text-gray-200">
    <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
      [Step 04]
    </p>

    <h3 className="text-3xl font-bold text-white">
      Deployment & Scale
    </h3>

    <p className="text-white/60 text-sm">
      Monitoring, iteration cycles & long-term system evolution.
    </p>

    <div className="grid grid-cols-2 gap-3">
      <div className="h-10 rounded-lg bg-white/10 border border-white/20" />
      <div className="h-10 rounded-lg bg-white/10 border border-white/20" />
      <div className="h-10 rounded-lg bg-white/10 border border-white/20" />
      <div className="h-10 rounded-lg bg-white/10 border border-white/20" />
    </div>
  </div>
);

const slideComponents = [
  SlideAsk,
  SlideStructured,
  SlideExport,
  SlideStored,
];

/* ---------------- MAIN COMPONENT ---------------- */

const WorkStyle = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [paused, next]);

  const SlideComponent = slideComponents[current];

  return (
    <section
      className="relative bg-black py-28 xl:py-40 px-6 overflow-hidden"
      id="workstyle"
    >
      {/* Enlarged Brighter Center Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          w-[650px] h-[400px]
          sm:w-[900px] sm:h-[500px]
          xl:w-[1200px] xl:h-[650px]
          rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 10%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 items-start relative z-10">
        {/* LEFT SIDE TEXT */}
        <div className="xl:sticky xl:top-40 h-fit">
          <p className="font-mono text-xs tracking-widest uppercase mb-6 text-white/40">
            [ My Workflow ]
          </p>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-semibold leading-tight text-white/30">
            From Concept
            <br />
            To Deployment,
            <br />
            <span className="text-white font-bold">
              Code → Precision.
            </span>
          </h2>
        </div>

        {/* RIGHT SIDE SLIDER */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[340px] bg-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <SlideComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                key={`${current}-${paused}`}
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: paused ? undefined : "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
              />
            </div>
          </div>

          {/* 4 Hovering Steps */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {slides.map((step, index) => {
              const Icon = step.icon;
              const active = index === current;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => setCurrent(index)}
                  whileHover={{ y: -4 }}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-4 text-xs transition-all duration-300
                  ${
                    active
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/60 border-white/20 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  {step.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkStyle;