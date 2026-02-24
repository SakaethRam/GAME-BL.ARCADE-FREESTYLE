"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    number: "01",
    title: "Analyze",
    description:
      "Deconstructing the problem space through research, threat modeling, and system evaluation.",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "Designing scalable, secure frameworks that align logic, automation, and performance.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Engineering intelligent solutions with precision, optimization, and measurable impact.",
  },
];

export default function WorkflowGSAP() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      // Desktop Only Pin (xl and above)
      mm.add("(min-width: 1280px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${cards.length * 140}%`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return;

          tl.fromTo(
            card,
            { xPercent: 100, opacity: 0 },
            { xPercent: 0, opacity: 1, ease: "power3.out" },
            index
          );

          tl.to(
            cards[index - 1],
            { opacity: 0, ease: "power4.out" },
            index
          );
        });
      });

      // Tablet & Mobile Fade-Up Animation
      mm.add("(max-width: 1279px)", () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 xl:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 mb-24">

        {/* LEFT TEXT */}
        <div className="xl:sticky xl:top-40 h-fit">
          <p className="font-mono text-xs tracking-widest uppercase mb-4 xl:mb-6 text-white/60">
            [ HOW I WORK ]
          </p>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-semibold leading-snug xl:leading-tight text-white/20">
            No Topsy-Turvy, 
            <br />
            My Clear Path From
            <br />
            <span className="text-white font-bold">
              Ideas → Results.
            </span>
          </h2>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2
              w-[400px] h-[250px] 
              sm:w-[600px] sm:h-[350px] 
              xl:w-[900px] xl:h-[500px] 
              rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 255, 255, 0.63) 0%, rgba(255,255,255,0.15) 40%, transparent 80%)",
            }}
          />
        </div>

        {/* RIGHT STACK */}
        <div className="relative min-h-[320px] xl:h-[320px]">

          {[...cardsData, {
            number: "",
            title: ":) Let's Connect",
            description:
              "Have a vision? Let’s make a plan. Reach out and take the first step toward something great.",
          }].map((card, index, arr) => {

            const isLast = index === arr.length - 1;
            const lastColor = isLast
              ? "bg-white text-black"
              : "bg-transparent text-white";

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`
                  ${index === 0 ? "relative xl:absolute" : "relative xl:absolute"}
                  inset-0 rounded-xl border border-white/20
                  p-8 sm:p-10 xl:p-12
                  min-h-[280px] xl:min-h-[320px]
                  mb-8 xl:mb-0
                  ${lastColor}
                `}
                style={{
                  zIndex: arr.length - index,
                }}
              >
                {card.number && (
                  <div className="flex items-center gap-6 xl:gap-8 mb-10 xl:mb-16">
                    <span className="font-bold text-5xl xl:text-6xl text-white/40">
                      {card.number}
                    </span>

                    <h3 className="text-3xl xl:text-4xl font-bold">
                      {card.title}
                    </h3>
                  </div>
                )}

                {!card.number && (
                  isLast ? (
                    <h3 className="flex items-start gap-3 text-4xl font-bold mb-8 group cursor-pointer">
                      <span className="shrink-0">:)</span>

                      <span className="relative inline-block h-[1.2em] overflow-hidden">
                        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                          Let's Connect
                        </span>

                        <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                          Let's Build
                        </span>
                      </span>
                    </h3>
                  ) : (
                    <h3 className="text-4xl font-bold mb-8">
                      {card.title}
                    </h3>
                  )
                )}

                <p
                  className={`max-w-md text-base xl:text-lg ${
                    isLast ? "text-black/70" : "text-white/70"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}