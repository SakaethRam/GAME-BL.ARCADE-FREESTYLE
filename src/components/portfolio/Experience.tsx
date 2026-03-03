"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

/* ================= Types ================= */

type ExperienceItem = {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
};

/* ================= Data ================= */

const experiences: ExperienceItem[] = [
  {
    year: "2022",
    role: "BE Computer Science",
    company: "SRM IST",
    location: "India",
    description:
      "Crafted immersive 3D web experiences for Fortune 500 clients.",
    tags: ["Three.js", "WebGL", "GSAP", "Vue"],
  },
  {
    year: "2023",
    role: "AI Systems Architect",
    company: "ARKIN X ENGINE",
    location: "Cambridge, Massachusetts",
    description:
      "Contributed to reinforcement learning research.",
    tags: ["Python", "TensorFlow", "RL", "Research"],
  },
  {
    year: "2025",
    role: "AI & Automation Consultant",
    company: "Prime Focus Technologies",
    location: "Mumbai, India",
    description:
      "Built core infrastructure for a Series B tech startup.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "React Native"],
  },
  {
    year: "2026",
    role: "Director of AI Strategies",
    company: "GUN | METAL",
    location: "San Francisco, CA",
    description:
      "Led the development of a real-time LLM inference platform serving 5k+ daily requests.",
    tags: ["LLMs", "PyTorch", "Kubernetes", "React"],
  },
];

/* ================= Component ================= */

export default function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const delayedProgress = useTransform(
    smoothProgress,
    [0.2, 1],
    [0, 1],
    { clamp: true }
  );

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-32 lg:py-48 px-4 bg-black overflow-hidden"
    >
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-20 lg:mb-28">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
            [ EVOLUTION ]
          </span>

          <h2 className="font-display font-black text-3xl lg:text-5xl text-foreground max-w-2xl leading-[1.1]">
            Beyond Roles,
            <br />
            <span className="text-white/20">
              Execution Over Intention.
            </span>
          </h2>
        </div>
      </div>

      {/* ================= Timeline ================= */}
      <div className="relative max-w-6xl mx-auto">

        {/* SVG Line */}
        <motion.svg
          viewBox="0 0 200 1600"
          preserveAspectRatio="none"
          className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-0 h-full w-[120px] lg:w-[200px]"
        >
          <motion.path
            d="M100 0 
               C 50 300, 150 400, 100 700
               C 50 1000, 150 1100, 100 1400
               C 80 1500, 120 1550, 100 1600"
            fill="transparent"
            stroke="hsl(var(--cyan))"
            strokeWidth="3"
            style={{
              pathLength: delayedProgress,
              filter: "drop-shadow(0 0 12px hsl(var(--cyan)))",
            }}
          />
        </motion.svg>

        {/* Timeline Items */}
        <div className="relative flex flex-col gap-20 lg:gap-56">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;

            const start = i * 0.22;
            const end = start + 0.25;

            const opacity = useTransform(
              delayedProgress,
              [start, end],
              [0, 1]
            );

            const y = useTransform(
              delayedProgress,
              [start, end],
              [80, 0]
            );

            const scale = useTransform(
              delayedProgress,
              [start, end],
              [0.9, 1]
            );

            return (
              <div key={exp.year} className="relative flex items-center">

                {/* Desktop Left (only lg+) */}
                <div
                  className={`hidden lg:block w-1/2 ${
                    isLeft ? "pr-20 text-right" : "opacity-0"
                  }`}
                >
                  {isLeft && (
                    <motion.div style={{ opacity, y, scale }}>
                      <Card exp={exp} />
                    </motion.div>
                  )}
                </div>

                {/* Node */}
                <motion.div
                  style={{ scale }}
                  className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-background border-2 border-cyan z-10"
                />

                {/* Desktop Right (only lg+) */}
                <div
                  className={`hidden lg:block w-1/2 ${
                    !isLeft ? "pl-20 text-left" : "opacity-0"
                  }`}
                >
                  {!isLeft && (
                    <motion.div style={{ opacity, y, scale }}>
                      <Card exp={exp} />
                    </motion.div>
                  )}
                </div>

                {/* Mobile + Tablet (default) */}
                <div className="w-full pl-16 lg:hidden">
                  <motion.div style={{ opacity, y, scale }}>
                    <Card exp={exp} />
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= Card ================= */

function Card({ exp }: { exp: ExperienceItem }) {
  return (
    /* for background === bg-card/60 backdrop-blur-xl border border-border rounded-2xl */
    <div className="p-6 shadow-xl"> 
      <p className="text-cyan font-mono text-xs mb-3">
        {exp.year}
      </p>

      <h3 className="text-lg lg:text-2xl font-display font-bold text-foreground">
        {exp.role}
      </h3>

      <p className="text-muted-foreground text-xs lg:text-sm mt-1">
        {exp.company} • {exp.location}
      </p>

      <div className="w-10 h-px bg-border my-4" />

      <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed mb-5">
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[10px] lg:text-xs rounded-full bg-cyan/10 text-cyan border border-cyan/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

}

