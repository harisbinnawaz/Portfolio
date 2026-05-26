"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export function MotionSafe({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
