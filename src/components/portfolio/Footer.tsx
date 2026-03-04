"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/* ================= Link Data ================= */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sakaethram" },
  { label: "GitHub", href: "https://github.com/SakaethRam" },
];

/* ================= Animated Text ================= */

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "-150px",
    once: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
          },
        },
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              y: 24,
              transition: { duration: 0.4 },
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

/* ================= Animated Nav Link ================= */

function AnimatedLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.95 }}
      className="relative inline-block tracking-wide text-black"
      variants={{
        rest: { y: 0 },
        hover: { y: -2 },
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        variants={{
          rest: { letterSpacing: "0.05em" },
          hover: { letterSpacing: "0em" },
        }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        <motion.span
          variants={{
            rest: { marginRight: "0.5rem" },
            hover: { marginRight: "0rem" },
          }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          [
        </motion.span>

        {label}

        <motion.span
          variants={{
            rest: { marginLeft: "0.5rem" },
            hover: { marginLeft: "0rem" },
          }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          ]
        </motion.span>
      </motion.span>
    </motion.a>
  );
}

/* ================= Footer ================= */

const Footer = () => {
  return (
    <footer className="w-full px-4 sm:px-6 pb-6">
      <div className="relative mx-auto max-w-7xl rounded-3xl bg-white text-black border border-black/10 overflow-hidden">

        {/* Top Nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6 sm:px-8 pt-8 text-sm text-black/60">

          {/* Internal Navigation */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
            {navLinks.map((item) => (
              <AnimatedLink
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 sm:gap-6 justify-center md:justify-end">
            {socialLinks.map((item) => (
              <AnimatedLink
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>

        </div>

        {/* Center Hero Text */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 sm:py-24 md:py-32">

          <AnimatedText
            text="Ideas Made Tangible."
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-black/50 leading-tight"
          />

          <AnimatedText
            text="It’s The Work Behind The Mindset."
            className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-black leading-tight"
          />

        </div>

        {/* Bottom Section */}
        <div className="border-t border-black/10 px-6 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">

            <div>
              <h3 className="text-3xl sm:text-4xl font-bold italic tracking-tight">
                SAM • PHOENIX
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-black/60">
                © {new Date().getFullYear()} SAKAETH | RAM. All rights reserved.
              </p>
            </div>

            <div>
              <p className="text-sm text-black/60 mb-2">Email</p>
              <a
                href="mailto:sakaethrambusiness@gmail.com"
                className="text-base sm:text-lg md:text-xl font-medium hover:opacity-70 transition-opacity break-words"
              >
                Sam@Phoenix.com
              </a>
            </div>

            <div>
              <p className="text-sm text-black/60 mb-2">Phone</p>
              <a
                href="tel:+918925351116"
                className="text-base sm:text-lg md:text-xl font-medium hover:opacity-70 transition-opacity"
              >
                +1 (555) 127-4567
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};


export default Footer;
