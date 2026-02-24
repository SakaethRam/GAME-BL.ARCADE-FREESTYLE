import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github } from "lucide-react";

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative px-10 py-5 rounded-full font-display font-bold text-lg overflow-hidden group flex items-center gap-3"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ background: "hsl(var(--cyan))" }}
      />

      {/* Shine */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow */}
      <motion.div
        className="absolute -inset-2 rounded-full"
        animate={
          hovered
            ? {
                boxShadow:
                  "0 0 60px hsl(var(--cyan) / 0.6), 0 0 100px hsl(var(--cyan) / 0.3)",
              }
            : { boxShadow: "0 0 30px hsl(var(--cyan) / 0.3)" }
        }
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10 text-background flex items-center gap-3">
        {children}
      </span>
    </motion.button>
  );
}

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-30 pb-28 px-6 text-center bg-black relative overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full bg-violet/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* ===== Let's Connect with GitHub Icon ===== */}
        <motion.span
          className="text-cyan text-sm font-display font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Github size={16} />
          Let's Connect
        </motion.span>

        <h2 className="font-display text-5xl md:text-7xl font-bold mt-4 mb-6 text-foreground leading-tight">
          Ready to build{" "}
          <span className="gradient-text">something great</span>?
        </h2>

        <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
          Whether it's a moonshot idea or a mission-critical system. I'm here
          to make it real. Let's talk.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* ===== Say Hello Button with GitHub Icon ===== */}
          <MagneticButton>
            <Github size={20} />
            Say Hello →
          </MagneticButton>

          <motion.a
            href="mailto:sakaethrambusiness@gmail.com"
            className="px-10 py-5 glass rounded-full font-display font-bold text-lg text-muted-foreground hover:text-foreground hover:border-cyan/30 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            sam@phoenix.dev
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
