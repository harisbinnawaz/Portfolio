import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
          700: "#242424",
          600: "#2e2e2e",
          500: "#3a3a3a",
        },
        luxury: {
          gold: "#b89c6e",
          silver: "#9ca3af",
          ivory: "#f5f0e8",
          warm: "#e8e0d0",
          muted: "#a89880",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        section: "7rem",
        "section-sm": "4rem",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-draw": "lineDraw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        lineDraw: {
          from: { scaleX: "0" },
          to: { scaleX: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
