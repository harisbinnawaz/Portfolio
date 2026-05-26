"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUpVariant, useReducedMotion } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : "hidden"}
      animate={inView ? "visible" : "hidden"}
      variants={fadeUpVariant}
      className={cn("mb-12", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-luxury-gold/60">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-display-lg text-luxury-ivory">{title}</h2>
      <div
        className={cn(
          "mt-4 mb-3 h-px w-12 bg-luxury-gold/50",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "max-w-xl font-sans text-base font-light text-luxury-silver/70",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
