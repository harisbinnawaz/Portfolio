"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer, useReducedMotion } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TechSkill } from "@/types";

interface TechnicalArsenalProps {
  arsenal: Record<string, TechSkill[]>;
}

export function TechnicalArsenal({ arsenal }: TechnicalArsenalProps) {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div id="arsenal">
      <SectionHeading title="Technical Arsenal" />

      <motion.div
        ref={ref}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate={inView ? "visible" : "hidden"}
      >
        {Object.entries(arsenal).map(([category, skills]) => (
          <motion.article
            key={category}
            variants={fadeUpVariant}
            className="rounded-sm border border-charcoal-600/30 bg-charcoal-800 p-6"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-luxury-gold/70">
              {category}
            </h3>
            <div className="mb-4 h-px bg-charcoal-600/40" />
            <ul>
              {skills.map((skill, index) => (
                <li
                  key={skill.name}
                  className={`flex items-center justify-between py-2 ${
                    index < skills.length - 1 ? "border-b border-charcoal-600/20" : ""
                  }`}
                >
                  <span className="font-sans text-sm text-luxury-warm">{skill.name}</span>
                  <span className="font-mono text-xs italic text-luxury-silver/50">
                    {skill.proficiency}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
