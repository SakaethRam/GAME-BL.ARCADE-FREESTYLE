"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  DATA                                      */
/* -------------------------------------------------------------------------- */

const projects = [
  {
    name: "Synapse AI",
    category: "Machine Learning Platform",
    description:
      "A full-stack ML platform that enables teams to train, evaluate, and deploy models with zero infrastructure overhead.",
    tags: ["PyTorch", "FastAPI", "React", "Kubernetes"],
    year: "2024",
    image: "/projects/Model-1.jpg",
  },
  {
    name: "Iris: Vision AI",
    category: "Computer Vision · SaaS",
    description:
      "Real-time video intelligence platform using WebAssembly and ONNX, used by 200+ teams.",
    tags: ["WebAssembly", "ONNX", "WebRTC", "Python"],
    year: "2023",
    image: "/projects/Model-2.jpg",
  },
  {
    name: "Forge Protocol",
    category: "Web3 · DeFi Infrastructure",
    description:
      "Decentralized infrastructure for cross-chain asset management.",
    tags: ["Rust", "Solidity", "React", "Ethers.js"],
    year: "2023",
    image: "/projects/Model-3.png",
  },
  {
    name: "Chronicle",
    category: "Productivity · AI Writing",
    description:
      "AI-powered knowledge management tool with semantic retrieval.",
    tags: ["GPT-4", "Embeddings", "Next.js", "Supabase"],
    year: "2022",
    image: "/projects/Model-4.png",
  },
];

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const total = projects.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  const Background = ({ image }: { image: string }) => (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/30 hover:bg-black/10" />
      
    </>
  );

  return (
    <section
      className="py-20 md:py-32 bg-black overflow-hidden"
      id="projects"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-16 mb-10 flex items-end justify-between"
      >
        <div>
          <span className="text-white/40 text-xs font-mono">
            [ PROJECTS ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
            Work Suite.
          </h2>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={prev}
            className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </div>
      </motion.div>

      {/* CAROUSEL */}
      <div className="relative flex items-stretch gap-4 px-4 md:px-16">

        {/* PREVIOUS CARD */}
        <motion.div
          key={`prev-${prevIdx}`}
          className="hidden lg:flex w-64 flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer group"
          onClick={prev}
          style={{ minHeight: 380 }}
        >
          <Background image={projects[prevIdx].image} />

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 z-20 text-white transition-all duration-300 opacity-70 group-hover:opacity-100">
            
            <h4 className="text-lg font-semibold">
              {projects[prevIdx].name}
            </h4>
          </div>
        </motion.div>

        {/* CENTER CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${current}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ minHeight: 380 }}
            onClick={() => { window.open("https://github.com/SakaethRam", "_blank"); }}
          >
            <Background image={projects[current].image} />

            {/* MAIN CONTENT */}
            <div
              className="
                absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20
                transition-all duration-300
                translate-y-0 opacity-100
                lg:translate-y-10 lg:opacity-0
                lg:group-hover:translate-y-0 lg:group-hover:opacity-100
              "
            >
              <div className="rounded-xl p-4 md:p-6 bg-black/30 backdrop-blur-md text-white">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <div>
                    <span className="text-xs opacity-60">
                      {projects[current].year} · {projects[current].category}
                    </span>
                    <h4 className="text-lg md:text-xl font-bold mt-1">
                      {projects[current].name}
                    </h4>
                  </div>
                  <a
                    href="https://github.com/SakaethRam"
                    className="hover:scale-110 transition"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <p className="text-sm opacity-80 mb-4">
                  {projects[current].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[current].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs border border-white/20 rounded-xl bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NEXT CARD */}
        <motion.div
          key={`next-${nextIdx}`}
          className="hidden lg:flex w-64 flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer group"
          onClick={next}
          style={{ minHeight: 380 }}
        >
          <Background image={projects[nextIdx].image} />

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 z-20 text-white transition-all duration-300 opacity-70 group-hover:opacity-100 text-right">
            
            <h4 className="text-lg font-semibold">
              {projects[nextIdx].name}
            </h4>
          </div>
        </motion.div>
      </div>

      {/* MOBILE NAV */}
      <div className="flex md:hidden justify-center gap-6 mt-6">
        <button
          onClick={prev}
          className="p-3 rounded-xl border border-white/10 bg-white/5"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
        <button
          onClick={next}
          className="p-3 rounded-xl border border-white/10 bg-white/5"
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>

      {/* INDICATORS */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}