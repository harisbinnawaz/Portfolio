"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer, useReducedMotion } from "@/lib/motion";

const GRAIN_SVG = encodeURIComponent(
  `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="1"/></svg>`
);

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-24 md:px-16 lg:px-24"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 bg-charcoal-950" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184,156,110,0.06) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-4xl"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p
          variants={fadeUpVariant}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-luxury-gold/70"
        >
          [Insert Discipline Line — e.g., Software Engineering · Game Systems · Engine
          Architecture]
        </motion.p>

        <motion.h1
          variants={fadeUpVariant}
          className="font-serif text-display-2xl leading-[1.05] text-luxury-ivory"
        >
          [Insert First Name]
          <span className="block text-luxury-warm/60">[Insert Last Name]</span>
        </motion.h1>

        <motion.div variants={fadeUpVariant} className="my-8 h-px w-16 bg-luxury-gold/50" />

        <motion.p
          variants={fadeUpVariant}
          className="max-w-2xl font-sans text-lg font-light leading-relaxed text-luxury-silver md:text-xl"
        >
          [Insert Sentence 1 — what you engineer and at what level of scale or complexity.]{" "}
          [Insert Sentence 2 — your core technical identity: systems thinking, tooling
          ownership, optimization focus.]{" "}
          [Insert Sentence 3 — optional: the type of work environments or challenges
          you&apos;re drawn to.]
        </motion.p>

        <motion.div variants={fadeUpVariant} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#mechanics"
            className="bg-luxury-gold px-7 py-3 font-sans text-sm font-medium tracking-wide text-charcoal-950 transition-colors duration-300 hover:bg-luxury-warm"
          >
            Explore Architecture
          </a>
          <a
            href="[Insert Resume PDF Link]"
            className="border border-luxury-warm/30 px-7 py-3 font-sans text-sm font-light tracking-wide text-luxury-warm/70 transition-all duration-300 hover:border-luxury-warm hover:text-luxury-warm"
          >
            View Executive Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-luxury-gold/50"
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
