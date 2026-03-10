"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const GAP = 22;

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 1024); // hide on tablets & mobiles
    };

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("resize", checkScreen);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      animate={{
        x: mousePosition.x - GAP,
        y: mousePosition.y - GAP
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 28,
        mass: 0.5
      }}
    >
      <div className="w-3 h-3 bg-white rounded-full" />
    </motion.div>
  );
}