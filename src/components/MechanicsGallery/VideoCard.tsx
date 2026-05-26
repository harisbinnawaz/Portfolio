"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { scaleRevealVariant, useReducedMotion } from "@/lib/motion";
import type { VideoItem } from "@/types";

interface VideoCardProps {
  item: VideoItem;
  isHero?: boolean;
}

export function VideoCard({ item, isHero = false }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleMouseEnter = () => {
    setHovered(true);
    void videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <motion.article
      ref={ref}
      variants={scaleRevealVariant}
      initial={reducedMotion ? false : "hidden"}
      animate={inView ? "visible" : "hidden"}
      className={cn(
        "group relative overflow-hidden rounded-sm bg-charcoal-800",
        isHero ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-video"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={item.videoSrc}
        poster={item.thumbnailSrc}
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={`Demo video: ${item.title}`}
      />

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent transition-opacity duration-300",
          hovered && "from-charcoal-950/95"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 border border-transparent transition-colors duration-300",
          hovered && "border-luxury-gold/30"
        )}
      />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-luxury-gold/60">
          {item.category}
        </p>
        <h3 className="mt-1 font-serif text-lg text-luxury-ivory">{item.title}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-charcoal-700/80 px-2 py-0.5 font-sans text-xs text-luxury-silver/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 font-sans text-sm font-light leading-relaxed text-luxury-warm/80"
            >
              {item.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
