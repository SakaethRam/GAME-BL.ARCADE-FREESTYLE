"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "workstyle", label: "Workflow" },
  { id: "projects", label: "Projects" },
];

/* FAQ: { id: "faq", label: "FAQ" } */

/* ================= Animated Nav Link ================= */

function AnimatedNavLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-1 font-mono text-sm"
    >
      <motion.span
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={`inline-block ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <motion.span
          variants={{
            rest: { marginRight: "0.5rem" },
            hover: { marginRight: "0rem" },
          }}
          transition={{ duration: 0.25 }}
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
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          ]
        </motion.span>
      </motion.span>

      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-4 right-4 h-px bg-foreground"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
          }}
        />
      )}
    </button>
  );
}

/* ================= Navbar ================= */

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= Scroll Detection ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) =>
        document.getElementById(item.id)
      );

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      let foundActive: string | null = null;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
          scrollY + viewportHeight * 0.3 >= top &&
          scrollY + viewportHeight * 0.3 < top + height
        ) {
          foundActive = navItems[i].id;
          break;
        }
      }

      setActive(foundActive); // null in hero/footer
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Lock Body Scroll ================= */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 mx-auto z-50 w-full max-w-6xl px-4"
      >
        <div
          className={`rounded-2xl border transition-all duration-300 px-6 lg:px-10 py-4
          ${
            scrolled
              ? "bg-background/20 backdrop-blur-xl border-border shadow-2xl"
              : "bg-background/20 backdrop-blur-xl border-border/60 shadow-xl"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="font-display font-black text-foreground text-lg lg:text-xl tracking-tight"
            >
              SAM • PHOENIX
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <AnimatedNavLink
                  key={item.id}
                  label={item.label}
                  isActive={active === item.id}
                  onClick={() => scrollTo(item.id)}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <motion.button
                onClick={() => scrollTo("contact")}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                initial="rest"
                animate="rest"
                className="px-5 py-2 rounded-xl bg-foreground text-background font-display font-semibold text-sm flex items-center gap-2 shadow-lg overflow-hidden relative"
              >
                <Github size={16} />

                <span className="relative h-5 overflow-hidden">
                  <motion.span
                    variants={{
                      rest: { y: 0 },
                      hover: { y: "-100%" },
                    }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    Get in Touch
                  </motion.span>

                  <motion.span
                    variants={{
                      rest: { y: "100%" },
                      hover: { y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 block"
                  >
                    Let's Build
                  </motion.span>
                </span>
              </motion.button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-foreground"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col px-8 py-10"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-display font-black text-2xl text-black">
                SAM • PHOENIX
              </h1>

              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-xl border border-black flex items-center justify-center text-black"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-20 flex flex-col items-end gap-10 text-2xl font-medium text-black">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="hover:opacity-60 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            <button
              onClick={() => scrollTo("contact")}
              className="w-full bg-black text-white rounded-xl py-5 text-base font-semibold flex items-center justify-center gap-2"
            >
              <Github size={18} />
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}