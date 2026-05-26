"use client";

import { cn } from "@/lib/utils";
import type { AchievementItem } from "@/types";

function BentoIcon({ icon }: { icon: AchievementItem["icon"] }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: "text-luxury-gold/70",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "trophy":
      return (
        <svg {...props}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4H3v2a2 2 0 002 2M19 4h2v2a2 2 0 01-2 2" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "award":
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </svg>
      );
  }
}

const sizeClasses: Record<AchievementItem["size"], string> = {
  large: "col-span-6 md:col-span-4",
  medium: "col-span-6 md:col-span-2",
  small: "col-span-3 md:col-span-2",
};

interface BentoCardProps {
  item: AchievementItem;
}

export function BentoCard({ item }: BentoCardProps) {
  const isLarge = item.size === "large";

  return (
    <article
      className={cn(
        sizeClasses[item.size],
        "group relative h-full rounded-sm border border-charcoal-600/30 bg-charcoal-800 p-6 transition-all duration-300 hover:border-charcoal-500/50 hover:bg-charcoal-700",
        isLarge && "border-l-4 border-l-luxury-gold"
      )}
    >
      {isLarge && (
        <span
          className="pointer-events-none absolute bottom-2 right-4 font-serif text-[6rem] leading-none text-luxury-gold/10"
          aria-hidden
        >
          1st
        </span>
      )}

      <div className="flex items-center justify-between gap-3">
        <BentoIcon icon={item.icon} />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-luxury-gold/60">
          {item.category}
        </span>
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-luxury-muted">
        {item.label}
      </p>
      <h3 className="mt-2 font-serif text-xl text-luxury-ivory">{item.title}</h3>
      <p className="mt-1 font-sans text-sm text-luxury-silver/60">{item.subtitle}</p>
      <p className="mt-2 font-sans text-sm font-light text-luxury-warm/70">{item.description}</p>

      {item.pdfLink && (
        <>
          {isLarge ? (
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-xs tracking-wide text-luxury-gold transition-opacity hover:opacity-80"
            >
              View Certificate →
            </a>
          ) : (
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-xs tracking-wide text-luxury-gold opacity-0 transition-opacity group-hover:opacity-100"
            >
              View Certificate →
            </a>
          )}
        </>
      )}
    </article>
  );
}
