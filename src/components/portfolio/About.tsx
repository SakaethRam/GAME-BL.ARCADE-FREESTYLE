"use client";

import {
  motion,
  type Variants,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ============================= */
/* ANIMATION VARIANT */
/* ============================= */

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardBase =
  "relative rounded-xl border border-2 border-border/80 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.45)]";

/* ============================= */
/* COUNT UP COMPONENT */
/* ============================= */

function CountUp({
  value,
  suffix = "",
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ============================= */
/* ABOUT SECTION */
/* ============================= */

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 px-6 bg-black rounded-xl overflow-hidden"
    >
      {/* ================= HEADER ================= */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
      >
        <span className="font-mono text-muted-foreground text-xs tracking-[0.3em] uppercase">
          [ About ]
        </span>

        <h2 className="font-display font-black text-3xl lg:text-5xl text-foreground max-w-2xl leading-[1.1]">
          More Than Code,
          <br />
          <span className="text-white/20">
            A Mindset Built To Ship.
          </span>
        </h2>
      </motion.div>

      {/* ================= GRID ================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* ================= VISION ================= */}
        <motion.div
          variants={sectionVariant}
          className={`${cardBase} lg:col-span-2 lg:row-span-2 p-8 lg:p-12 flex flex-col justify-between min-h-[380px] lg:min-h-[420px] overflow-hidden group`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-110 transition duration-700"
            style={{
              backgroundImage: "url('HeroBGM.png')",
            }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Hover Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

          <div className="relative z-10">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
              The Vision
            </span>

            <h3 className="font-display font-black text-4xl lg:text-6xl text-foreground mt-6 leading-[1.05]">
              Building
              <br />
              intelligent interfaces.
            </h3>
          </div>

          <p className="relative z-10 text-muted-foreground text-sm leading-relaxed mt-8 max-w-md">
            I believe the next wave of software isn't just functional. It's{" "}
            <strong className="text-foreground">alive</strong>. I design systems
            that learn, adapt, and delight.
          </p>
        </motion.div>

        {/* ================= TIMELINE ================= */}
        <motion.div
          variants={sectionVariant}
          className="rounded-3xl bg-foreground text-background p-8 lg:p-10 flex flex-col justify-between min-h-[200px] hover:-translate-y-1 transition-all duration-500"
        >
          <span className="font-mono text-xs text-background/50 tracking-[0.3em] uppercase">
            Timeline
          </span>

          <div>
            <p className="text-background/60 text-sm mt-4">
              Shipped products in
            </p>
            <p className="font-display font-black text-5xl xl:text-6xl leading-none mt-2">
              <CountUp value={5} /> continents.
            </p>
          </div>
        </motion.div>

        {/* ================= SCALE ================= */}
        <motion.div
          variants={sectionVariant}
          className={`${cardBase} p-8 lg:p-10 flex flex-col bg-transparent justify-between min-h-[200px]`}
        >
          <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
            Scale
          </span>

          <div>
            <p className="font-display font-black text-5xl lg:text-6xl text-foreground leading-none">
              <CountUp value={140} suffix="+" />
            </p>
            <p className="text-muted-foreground text-sm mt-3">
              Countries reached
            </p>
          </div>
        </motion.div>

        {/* ================= PROCESS + MISSION ================= */}
        <motion.div
          variants={sectionVariant}
          className={`${cardBase} lg:col-span-2 p-8 lg:p-12 flex flex-col bg-transparent lg:flex-row gap-8 lg:gap-12`}
        >
          <div className="flex-1">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
              The Process
            </span>
            <h3 className="font-display font-bold text-lg lg:text-xl text-white mt-6 mb-4">
              Precision meets creativity
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From architecture diagrams to pixel-perfect interfaces, I obsess
              over the full stack.
            </p>
          </div>

          <div className="flex-1">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
              The Mission
            </span>
            <h3 className="font-display font-bold text-lg lg:text-xl text-white mt-6 mb-4">
              Human-centered AI
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Technology should amplify human potential, not replace it.
            </p>
          </div>
        </motion.div>

        {/* ================= EXPERIENCE ================= */}
        <motion.div
          variants={sectionVariant}
          className={`${cardBase} p-8 lg:p-10 flex flex-col justify-between min-h-[220px] overflow-hidden group`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-110 transition duration-700"
            style={{
              backgroundImage: "url('EXP.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />

          <div className="relative z-10">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
              Experience
            </span>

            <div>
              <p className="font-display font-black text-5xl lg:text-6xl text-foreground leading-none mt-6">
                <CountUp value={5} suffix="+" />
              </p>
              <p className="text-muted-foreground text-sm mt-3">
                Years of experience
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}