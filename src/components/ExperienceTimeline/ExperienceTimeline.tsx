"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { fadeUpVariant, staggerContainer, useReducedMotion } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ExperienceItem } from "@/types";

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const toggle = () => setExpanded((prev) => !prev);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <motion.li
      ref={ref}
      variants={fadeUpVariant}
      className="relative pl-8 md:pl-0"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span
        className="absolute left-0 top-8 z-10 h-3 w-3 -translate-x-[5px] rounded-full bg-luxury-gold md:left-[calc(33.333%-6px)]"
        aria-hidden
      />

      <article
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={toggle}
        onKeyDown={onKeyDown}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) setExpanded(true);
        }}
        onMouseLeave={() => {
          if (window.matchMedia("(hover: hover)").matches) setExpanded(false);
        }}
        className={cn(
          "cursor-pointer rounded-sm border border-charcoal-600/40 bg-charcoal-800 p-6 transition-colors duration-300 md:ml-[calc(33.333%+2rem)] md:p-8",
          expanded && "border-l-2 border-l-luxury-gold"
        )}
      >
        <h3 className="font-serif text-xl text-luxury-ivory">{item.role}</h3>
        <p className="mt-1 font-sans text-sm tracking-wide text-luxury-gold">{item.company}</p>
        <p className="mt-2 font-mono text-xs text-luxury-silver/60">
          {item.period} · {item.type}
        </p>
        <p className="mt-1 font-mono text-xs text-luxury-silver/40">{item.location}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-t border-charcoal-600/40 pt-6">
                <span className="inline-block rounded-sm border border-luxury-gold/20 bg-luxury-gold/10 px-3 py-1 font-mono text-xs text-luxury-gold">
                  {item.highlight}
                </span>

                <ul className="mt-6 space-y-3">
                  {item.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="font-sans text-sm font-light leading-relaxed text-luxury-warm/80"
                    >
                      — {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm bg-charcoal-700 px-2 py-0.5 font-sans text-xs text-luxury-silver/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.li>
  );
}

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div id="work">
      <SectionHeading title="Professional Tenure" />

      <div className="relative md:grid md:grid-cols-[1fr_2fr] md:gap-8">
        <div
          className="absolute bottom-0 left-[5px] top-0 hidden w-0.5 bg-charcoal-600 md:left-[calc(33.333%-1px)] md:block"
          aria-hidden
        />

        <motion.ol
          ref={ref}
          className="relative space-y-8"
          variants={staggerContainer}
          initial={reducedMotion ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
        >
          {items.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
