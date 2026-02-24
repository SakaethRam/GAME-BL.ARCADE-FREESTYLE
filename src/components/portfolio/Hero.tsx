"use client";

import {
  motion,
  type Variants,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

/* ================= Animation Variants ================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ================= CountUp Component ================= */

function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    stiffness: 20,
    damping: 20,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

/* ================= Hero ================= */

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden
                 pt-28 sm:pt-32 xl:pt-36
                 pb-20 sm:pb-24 xl:pb-28"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/HeroBG.png')",
        }}
      />

      {/* Base Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Center Responsive Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 
                     -translate-x-1/2 -translate-y-1/2
                     w-[400px] h-[250px]
                     sm:w-[650px] sm:h-[380px]
                     xl:w-[1000px] xl:h-[550px]
                     rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.63) 0%, rgba(255,255,255,0.15) 40%, transparent 80%)",
          }}
        />
      </div>

      {/* ================= Social Icons ================= */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="
          hidden sm:flex
          absolute 
          right-4 sm:right-8 xl:right-16
          top-1/2 -translate-y-1/2
          flex-col items-center
          gap-6
          z-20
        "
      >
        <a
          href="https://github.com/SakaethRam"
          className="group transition-all duration-300"
        >
          <Github
            size={20}
            className="text-white/60 sm:w-5 sm:h-5 xl:w-6 xl:h-6
                       group-hover:text-white 
                       group-hover:scale-110
                       transition-all duration-300"
          />
        </a>

        <a
          href="https://www.linkedin.com/in/sakaethram"
          className="group transition-all duration-300"
        >
          <Linkedin
            size={20}
            className="text-white/60 sm:w-5 sm:h-5 xl:w-6 xl:h-6
                       group-hover:text-white 
                       group-hover:scale-110
                       transition-all duration-300"
          />
        </a>

        <a
          href="https://twitter.com"
          className="group transition-all duration-300"
        >
          <Twitter
            size={20}
            className="text-white/60 sm:w-5 sm:h-5 xl:w-6 xl:h-6
                       group-hover:text-white 
                       group-hover:scale-110
                       transition-all duration-300"
          />
        </a>

        {/* Decorative Line */}
        <div className="w-[1px] h-16 bg-white/30 mt-4" />
      </motion.div>

      {/* ================= Content ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-1 flex flex-col justify-center
                   px-6 sm:px-10 md:px-16 xl:px-24"
      >
        {/* First Name */}
        <motion.div variants={itemVariants} className="overflow-hidden">
          <h1
            className="font-display font-black leading-[0.85] tracking-[-0.02em] text-white mt-6"
            style={{ fontSize: "clamp(4.5rem, 16vw, 20rem)" }}
          >
            Sam
          </h1>
        </motion.div>

        {/* Last Name */}
        <motion.div variants={itemVariants} className="overflow-hidden">
          <h1
            className="font-display font-black leading-[0.85] tracking-[-0.02em] text-white/20"
            style={{ fontSize: "clamp(4.5rem, 16vw, 20rem)" }}
          >
            Phoenix.
          </h1>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          variants={itemVariants}
          className="mt-20 sm:mt-24 xl:mt-28
                     flex flex-col md:flex-row md:items-end
                     justify-between gap-10 xl:gap-16
                     pb-10 sm:pb-12"
        >
          {/* Stats */}
          <div className="flex gap-10 sm:gap-12 flex-wrap">
            <div>
              <p className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white">
                <CountUp value={5} suffix="+" />
              </p>
              <p className="text-white/70 text-sm mt-2">
                Years of Experience
              </p>
            </div>

            <div>
              <p className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white">
                <CountUp value={30} suffix="+" />
              </p>
              <p className="text-white/70 text-sm mt-2">
                Projects Shipped
              </p>
            </div>

            <div>
              <p className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white">
                <CountUp value={100} suffix="%" />
              </p>
              <p className="text-white/70 text-sm mt-2">
                Passion Driven
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-xs sm:max-w-sm xl:max-w-md uppercase">
            <p className="font-Merienda text-white/80 text-sm sm:text-base leading-relaxed">
              I architect intelligent systems and craft cinematic digital
              experiences. Obsessed with the intersection of{" "}
              <strong className="text-white font-semibold">
                artificial intelligence
              </strong>{" "}
              and{" "}
              <strong className="text-white font-semibold">
                beautiful design
              </strong>
              .
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}