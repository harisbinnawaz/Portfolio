"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Mechanics", href: "#mechanics" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
] as const;

const RESUME_LINK = "[Insert Resume PDF Link]";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      role="navigation"
      aria-label="Main"
      className={cn(
        "fixed top-0 z-50 w-full bg-charcoal-950/80 backdrop-blur-md transition-colors duration-300",
        scrolled && "border-b border-charcoal-600/30"
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-16 lg:px-24">
        <a
          href="#"
          className="font-serif text-lg tracking-wide text-luxury-gold transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          [YN]
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm font-light tracking-wide text-luxury-warm/70 transition-colors hover:text-luxury-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={RESUME_LINK}
              className="border border-luxury-gold/50 px-4 py-2 text-sm tracking-wide text-luxury-gold transition-colors duration-300 hover:bg-luxury-gold hover:text-charcoal-950"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "block h-px w-6 bg-luxury-warm transition-transform duration-300",
              mobileOpen && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-luxury-warm transition-opacity duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-luxury-warm transition-transform duration-300",
              mobileOpen && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-charcoal-600/30 bg-charcoal-950/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-3 font-sans text-base text-luxury-warm/80 transition-colors hover:text-luxury-ivory"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={RESUME_LINK}
                  className="inline-block border border-luxury-gold/50 px-5 py-2.5 text-sm tracking-wide text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-charcoal-950"
                  onClick={() => setMobileOpen(false)}
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
