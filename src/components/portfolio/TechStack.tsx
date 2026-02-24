"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Database,
  Server,
  Cpu,
  Cloud,
  Boxes,
  GitBranch,
  Terminal,
  Layers,
  Shield,
  Globe,
  Workflow,
  HardDrive,
  Binary,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                 TECH DATA                                  */
/* -------------------------------------------------------------------------- */

const techItems = [
  { icon: Server },
  { icon: Code2 },
  { icon: Database },
  { icon: Workflow },
  { icon: Cloud },
  { icon: Boxes },
  { icon: GitBranch },
  { icon: Cpu },
  { icon: Shield },
  { icon: Globe },
  { icon: Terminal },
  { icon: HardDrive },
  { icon: Binary },
  { icon: Zap },
  { icon: Layers },
];

const duplicated = [...techItems, ...techItems];

/* -------------------------------------------------------------------------- */
/*                                 TECH CARD                                  */
/* -------------------------------------------------------------------------- */

function TechCard({ icon: Icon }: { icon: any }) {
  return (
    <motion.div
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        relative
        flex-shrink-0
        w-28 h-28 md:w-32 md:h-32
        rounded-2xl
        bg-gradient-to-b from-white/[0.04] to-white/[0.01]
        border border-white/10
        backdrop-blur-xl
        flex items-center justify-center
        transition-all duration-300
        hover:border-white/20
        hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]
      "
    >
      <Icon
        size={40}
        className="text-white/40 group-hover:text-white/70 transition-colors duration-300"
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SCROLL ROW                                    */
/* -------------------------------------------------------------------------- */

function ScrollRow({
  direction = "left",
  speed = 40,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);

  useAnimationFrame((_, delta) => {
    setX((prev) => {
      const movement = (delta / 1000) * speed;
      const width = containerRef.current?.scrollWidth ?? 0;

      if (!width) return prev;

      let next =
        direction === "left" ? prev - movement : prev + movement;

      if (direction === "left" && Math.abs(next) >= width / 2) {
        return 0;
      }

      if (direction === "right" && next >= 0) {
        return -width / 2;
      }

      return next;
    });
  });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-8 md:gap-10 w-max"
      >
        {duplicated.map((item, index) => (
          <TechCard key={index} icon={item.icon} />
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function TechStack() {
  return (
    <section className="py-32 bg-black rounded-xl overflow-hidden" id="stack">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          The Arsenal
        </h2>
        <p className="text-white/40 mt-4 tracking-widest uppercase text-sm">
          Stack I USE.
        </p>
      </div>

      {/* 3 ROWS */}
      <div className="space-y-10">
        {/* Row 1 → Left */}
        <ScrollRow direction="left" speed={40} />

        {/* Row 2 → Right */}
        <ScrollRow direction="right" speed={35} />

        {/* Row 3 → Left */}
        <ScrollRow direction="left" speed={45} />
      </div>
    </section>
  );
}
