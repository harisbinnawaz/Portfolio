# Claude.md — Master Build Instructions for Cursor Agent
> **Portfolio Website — Senior Software & Game Tools Engineer**
> Feed this file into Cursor's Composer/Agent. Follow every directive sequentially and autonomously. Do not skip steps. Do not invent data — use the exact placeholders specified.

---

## AGENT PRIME DIRECTIVES

1. **Never auto-fill personal data.** All content slots use the exact placeholder strings defined in this document. The human will populate them.
2. **Never use the words** `student`, `graduate`, `junior`, `beginner`, or `learner` — in code, comments, placeholder text, or anywhere in the UI.
3. **No glassmorphism overload.** No neon gradients. No startup clichés. No purple-on-white. No bouncy loaders.
4. **Aesthetic target:** Quiet luxury. Executive dark mode. Editorial precision. Cinematic restraint.
5. **Build for production quality** — TypeScript strict mode, semantic HTML, ARIA labels, responsive-first.

---

## PHASE 0 — REPO INITIALIZATION

### 0.1 Scaffold the Next.js Application

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd portfolio
```

### 0.2 Install Required Dependencies

```bash
npm install framer-motion
npm install @radix-ui/react-dialog @radix-ui/react-tooltip
npm install react-intersection-observer
npm install clsx tailwind-merge
npm install @fontsource/playfair-display @fontsource/dm-sans
```

### 0.3 Configure `tailwind.config.ts`

Replace the default config entirely with the following:

```typescript
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
          gold:    "#b89c6e",
          silver:  "#9ca3af",
          ivory:   "#f5f0e8",
          warm:    "#e8e0d0",
          muted:   "#a89880",
        },
      },
      fontFamily: {
        serif:     ["Playfair Display", "Georgia", "serif"],
        sans:      ["DM Sans", "system-ui", "sans-serif"],
        mono:      ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "section": "7rem",
        "section-sm": "4rem",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up":   "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":   "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-draw": "lineDraw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp:   { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:   { from: { opacity: "0" }, to: { opacity: "1" } },
        lineDraw: { from: { scaleX: "0" }, to: { scaleX: "1" } },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 0.4 Configure `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/500.css";
@import "@fontsource/playfair-display/700.css";
@import "@fontsource/dm-sans/300.css";
@import "@fontsource/dm-sans/400.css";
@import "@fontsource/dm-sans/500.css";

@layer base {
  :root {
    color-scheme: dark;
  }

  html {
    @apply bg-charcoal-950 text-luxury-warm scroll-smooth;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    @apply bg-luxury-gold/20 text-luxury-ivory;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-charcoal-950;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-luxury-gold/40 rounded-full;
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .border-luxury { @apply border-charcoal-600/50; }
  .divider { @apply w-full h-px bg-gradient-to-r from-transparent via-charcoal-600 to-transparent; }
}
```

### 0.5 Configure `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "[Your Full Name] — Senior Software & Game Tools Engineer",
  description: "Portfolio of a seasoned Software & Game Tools Engineer specializing in real-time systems, engine tooling, and scalable architecture.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "[Your Full Name] — Senior Software & Game Tools Engineer",
    description: "[Insert SEO meta description — 155 characters max]",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

---

## PHASE 1 — SHARED UTILITIES & DESIGN TOKENS

### 1.1 Create `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 1.2 Create `src/lib/motion.ts` — Reusable Framer Motion Variants

```typescript
import { Variants } from "framer-motion";

export const fadeUpVariant: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeInVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const scaleRevealVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const slideInLeftVariant: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
```

### 1.3 Create `src/lib/constants.ts` — All Placeholder Data

> **AGENT NOTE:** Populate these objects with the exact placeholder strings below. Never substitute real data.

```typescript
// ─── EXPERIENCE ────────────────────────────────────────────────────────────────
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "[Insert Job Title — e.g., Senior Game Tools Engineer]",
    company: "[Insert Company Name]",
    period: "[Month YYYY] — [Month YYYY / Present]",
    location: "[City, Country / Remote]",
    type: "[Full-time / Contract / Freelance]",
    outcomes: [
      "[Insert Outcome 1 — e.g., Architected a custom asset pipeline that reduced build times by X%]",
      "[Insert Outcome 2 — e.g., Owned and shipped [Feature Name] used by N engineers across M projects]",
      "[Insert Outcome 3 — e.g., Led technical design review for [System Name], reducing runtime overhead by X ms]",
      "[Insert Outcome 4 — scalability, optimization, or ownership focus]",
    ],
    techStack: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    highlight: "[Insert High-Impact Metric — e.g., 40% reduction in iteration time]",
  },
  {
    id: "exp-2",
    role: "[Insert Job Title]",
    company: "[Insert Company Name]",
    period: "[Month YYYY] — [Month YYYY]",
    location: "[City, Country / Remote]",
    type: "[Full-time / Contract]",
    outcomes: [
      "[Insert Outcome 1]",
      "[Insert Outcome 2]",
      "[Insert Outcome 3]",
    ],
    techStack: ["[Tech 1]", "[Tech 2]"],
    highlight: "[Insert High-Impact Metric for CPU/GPU Optimization]",
  },
  {
    id: "exp-3",
    role: "[Insert Job Title]",
    company: "[Insert Company Name]",
    period: "[Month YYYY] — [Month YYYY]",
    location: "[City, Country]",
    type: "[Internship / Contract]",
    outcomes: [
      "[Insert Outcome 1]",
      "[Insert Outcome 2]",
    ],
    techStack: ["[Tech 1]", "[Tech 2]"],
    highlight: "[Insert Architecture or Scalability Achievement]",
  },
];

// ─── VIDEO GALLERY ──────────────────────────────────────────────────────────────
export const MECHANICS_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "[Insert System/Mechanic Name — e.g., Procedural Terrain Generator]",
    description: "[Insert 1–2 sentence strategic description of the system, its architecture, and engineering challenge solved]",
    techStack: ["Unity", "C#", "[Insert Additional Tech]"],
    videoSrc: "/videos/[filename-1].mp4",
    thumbnailSrc: "/thumbnails/[filename-1].jpg",
    category: "[Insert Category — e.g., Engine Tools / Gameplay Systems / Rendering]",
  },
  {
    id: "vid-2",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["Unreal Engine 5", "C++", "[Insert Additional Tech]"],
    videoSrc: "/videos/[filename-2].mp4",
    thumbnailSrc: "/thumbnails/[filename-2].jpg",
    category: "[Insert Category]",
  },
  {
    id: "vid-3",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["Unity", "C#", "Shader Graph"],
    videoSrc: "/videos/[filename-3].mp4",
    thumbnailSrc: "/thumbnails/[filename-3].jpg",
    category: "[Insert Category]",
  },
  {
    id: "vid-4",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["[Engine]", "[Language]"],
    videoSrc: "/videos/[filename-4].mp4",
    thumbnailSrc: "/thumbnails/[filename-4].jpg",
    category: "[Insert Category]",
  },
  {
    id: "vid-5",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["[Engine]", "[Language]"],
    videoSrc: "/videos/[filename-5].mp4",
    thumbnailSrc: "/thumbnails/[filename-5].jpg",
    category: "[Insert Category]",
  },
  {
    id: "vid-6",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["[Engine]", "[Language]"],
    videoSrc: "/videos/[filename-6].mp4",
    thumbnailSrc: "/thumbnails/[filename-6].jpg",
    category: "[Insert Category]",
  },
  {
    id: "vid-7",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["[Engine]", "[Language]"],
    videoSrc: "/videos/[filename-7].mp4",
    thumbnailSrc: "/thumbnails/[filename-7].jpg",
    category: "[Insert Category]",
  },
  {
    id: "vid-8",
    title: "[Insert System/Mechanic Name]",
    description: "[Insert strategic description]",
    techStack: ["[Engine]", "[Language]"],
    videoSrc: "/videos/[filename-8].mp4",
    thumbnailSrc: "/thumbnails/[filename-8].jpg",
    category: "[Insert Category]",
  },
];

// ─── ACHIEVEMENTS BENTO ────────────────────────────────────────────────────────
export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-fyp",
    label: "1st Prize",
    title: "FYP Exhibition",
    subtitle: "[Insert Full Project Title]",
    description: "[Insert 1–2 sentence description of what the project achieved, the problem it solved, and why it won]",
    pdfLink: "[Insert Certificate PDF Link — /certificates/fyp-award.pdf]",
    category: "Award",
    icon: "trophy",
    size: "large",
  },
  {
    id: "ach-cr",
    label: "Class Representative",
    title: "University Leadership",
    subtitle: "[Insert Batch / Cohort — e.g., BSCS 2021–2025]",
    description: "[Insert 1-sentence description of scope — number of peers represented, initiatives led]",
    pdfLink: null,
    category: "Leadership",
    icon: "users",
    size: "medium",
  },
  {
    id: "ach-tour",
    label: "Tour Organizer",
    title: "University Leadership",
    subtitle: "[Insert Event/Tour Name and Year]",
    description: "[Insert 1-sentence description — number of participants, logistics managed, outcome]",
    pdfLink: null,
    category: "Leadership",
    icon: "map",
    size: "medium",
  },
  {
    id: "ach-football",
    label: "Captain",
    title: "Football Team",
    subtitle: "[Insert Team Name / Tournament / Year]",
    description: "[Insert 1-sentence description — team size, season record, or notable achievement]",
    pdfLink: null,
    category: "Sports",
    icon: "shield",
    size: "medium",
  },
  {
    id: "ach-ieee",
    label: "Appreciation",
    title: "IEEE RAS",
    subtitle: "[Insert Chapter Name and Year]",
    description: "[Insert reason for appreciation — contribution, role, or project]",
    pdfLink: "[Insert Certificate PDF Link — /certificates/ieee-ras.pdf]",
    category: "Society",
    icon: "award",
    size: "small",
  },
  {
    id: "ach-gdsc",
    label: "Appreciation",
    title: "GDSC",
    subtitle: "[Insert Chapter Name and Year]",
    description: "[Insert reason for appreciation — contribution, role, or project]",
    pdfLink: "[Insert Certificate PDF Link — /certificates/gdsc.pdf]",
    category: "Society",
    icon: "award",
    size: "small",
  },
];

// ─── TECHNICAL ARSENAL ─────────────────────────────────────────────────────────
export const TECH_ARSENAL = {
  "Game Engines": [
    { name: "Unity", proficiency: "[Expert / Advanced / Proficient]" },
    { name: "Unreal Engine 5", proficiency: "[Expert / Advanced / Proficient]" },
    { name: "[Insert Additional Engine]", proficiency: "[Proficiency Level]" },
  ],
  "Languages": [
    { name: "C#", proficiency: "[Expert / Advanced]" },
    { name: "C++", proficiency: "[Advanced / Proficient]" },
    { name: "TypeScript", proficiency: "[Advanced / Proficient]" },
    { name: "[Insert Language]", proficiency: "[Proficiency Level]" },
  ],
  "Web & Mobile": [
    { name: "Next.js", proficiency: "[Advanced / Proficient]" },
    { name: "React", proficiency: "[Advanced / Proficient]" },
    { name: "[Insert Framework]", proficiency: "[Proficiency Level]" },
  ],
  "Architecture Patterns": [
    { name: "[Insert Pattern — e.g., ECS / DOTS]", proficiency: "[Advanced]" },
    { name: "[Insert Pattern — e.g., Service Locator]", proficiency: "[Advanced]" },
    { name: "[Insert Pattern — e.g., State Machine Architecture]", proficiency: "[Advanced]" },
  ],
  "QA & DevOps": [
    { name: "[Insert Tool — e.g., Jenkins / GitHub Actions]", proficiency: "[Proficient]" },
    { name: "[Insert Tool — e.g., Unity Test Framework]", proficiency: "[Proficient]" },
    { name: "[Insert Tool]", proficiency: "[Proficient]" },
  ],
};
```

### 1.4 Create `src/types/index.ts` — TypeScript Interfaces

```typescript
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  outcomes: string[];
  techStack: string[];
  highlight: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  videoSrc: string;
  thumbnailSrc: string;
  category: string;
}

export interface AchievementItem {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  pdfLink: string | null;
  category: "Award" | "Leadership" | "Sports" | "Society";
  icon: "trophy" | "users" | "map" | "shield" | "award";
  size: "large" | "medium" | "small";
}
```

---

## PHASE 2 — COMPONENT ARCHITECTURE

Create all components inside `src/components/`. Each component gets its own folder.

---

### 2.1 `src/components/Navigation/Navigation.tsx`

Build a minimal sticky navigation bar.

**Specifications:**
- `position: fixed`, `top: 0`, full width, `z-index: 50`
- Background: `bg-charcoal-950/80` with `backdrop-blur-md`
- On scroll past 80px: add a `border-b border-charcoal-600/30` transition (use `useEffect` + `scroll` event listener)
- Left: Name/monogram — `[YN]` in `font-serif` with luxury-gold color
- Right: Nav links — `Work`, `Mechanics`, `Arsenal`, `Recognition`, `Contact` — smooth scroll anchors (`href="#work"`, etc.)
- Mobile: hamburger → slide-down drawer using Framer Motion `AnimatePresence`
- CTA button: `"Resume"` — links to `[Insert Resume PDF Link]` — styled with `border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold hover:text-charcoal-950` transition

---

### 2.2 `src/components/Hero/Hero.tsx`

Build a full-viewport cinematic hero section.

**Specifications:**
- Section: `min-h-screen flex flex-col justify-center` with `pt-24 pb-16 px-6 md:px-16 lg:px-24`
- Background: `bg-charcoal-950`. Add a subtle radial gradient overlay: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184,156,110,0.06) 0%, transparent 60%)` via an absolutely positioned `div`
- Add a very faint grain texture overlay (use a CSS `url("data:image/svg+xml...")` noise pattern at 3% opacity)

**Content structure:**

```tsx
// Eyebrow line — small uppercase tracking-widest text
<p className="font-mono text-xs tracking-[0.3em] text-luxury-gold/70 uppercase mb-6">
  [Insert Discipline Line — e.g., Software Engineering · Game Systems · Engine Architecture]
</p>

// Primary headline — editorial serif, massive, multi-line
<h1 className="font-serif text-display-2xl text-luxury-ivory leading-[1.05]">
  [Insert First Name]
  <span className="block text-luxury-warm/60">[Insert Last Name]</span>
</h1>

// Horizontal rule with gold tint
<div className="w-16 h-px bg-luxury-gold/50 my-8" />

// Two–three sentence technical summary
<p className="font-sans font-light text-lg md:text-xl text-luxury-silver leading-relaxed max-w-2xl">
  [Insert Sentence 1 — what you engineer and at what level of scale or complexity.]
  [Insert Sentence 2 — your core technical identity: systems thinking, tooling ownership, optimization focus.]
  [Insert Sentence 3 — optional: the type of work environments or challenges you're drawn to.]
</p>

// CTA row
<div className="flex flex-wrap gap-4 mt-10">
  <a href="#mechanics">Explore Architecture</a>  {/* primary filled button */}
  <a href="[Insert Resume PDF Link]">View Executive Resume</a>  {/* outlined button */}
</div>

// Scroll indicator — animated downward chevron at bottom-center
```

**Button styles:**
- Primary: `bg-luxury-gold text-charcoal-950 font-sans font-medium px-7 py-3 text-sm tracking-wide hover:bg-luxury-warm transition-colors duration-300`
- Secondary: `border border-luxury-warm/30 text-luxury-warm/70 font-sans font-light px-7 py-3 text-sm tracking-wide hover:border-luxury-warm hover:text-luxury-warm transition-all duration-300`

**Animation:** Wrap all content in a Framer Motion `staggerContainer` variant. Each child uses `fadeUpVariant`. Entry is triggered on mount (not scroll).

---

### 2.3 `src/components/ExperienceTimeline/ExperienceTimeline.tsx`

Build an interactive vertical experience timeline.

**Section ID:** `id="work"`

**Specifications:**
- Section heading (reusable `<SectionHeading>` component — see 2.9): `"Professional Tenure"`
- Layout: Two-column on desktop (timeline spine left, content right). Single column on mobile.
- Timeline spine: A vertical `2px` line in `bg-charcoal-600`. Each entry has a circular dot node (`w-3 h-3 rounded-full bg-luxury-gold`) positioned on the spine.
- Each `ExperienceItem` renders as a card: `bg-charcoal-800 border border-charcoal-600/40 rounded-sm p-6 md:p-8`

**Card anatomy:**

```
[Role Title]          ← font-serif, text-xl, text-luxury-ivory
[Company]             ← font-sans, text-sm, text-luxury-gold tracking-wide
[Period] · [Type]     ← font-mono, text-xs, text-luxury-silver/60
─────────────────
[Highlight Badge]     ← small pill: bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20
                         Contains: highlight metric string
─────────────────
Outcomes list         ← each item preceded by a `—` em-dash, font-light, text-luxury-warm/80
─────────────────
Tech Stack chips      ← small rounded tags: bg-charcoal-700 text-luxury-silver/70 text-xs px-2 py-0.5
```

**Interactivity:**
- Each card is collapsed by default, showing only Role, Company, and Period
- On click/hover (desktop), it expands to reveal outcomes and tech stack with Framer Motion `AnimatePresence` height animation
- Active card: left border becomes `border-l-2 border-luxury-gold`

**Scroll Animation:** Use `useInView` from `react-intersection-observer`. Cards animate in with `fadeUpVariant`, staggered, as they enter the viewport.

---

### 2.4 `src/components/MechanicsGallery/MechanicsGallery.tsx`

Build a cinematic video gallery for game mechanics and systems.

**Section ID:** `id="mechanics"`

**Specifications:**
- Section heading: `"Mechanics & Systems"`
- Section subheading: `"[Insert 1-sentence description of what this body of work represents — engineering depth, breadth of systems, etc.]"`
- Grid layout: CSS Grid, responsive:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns, with the first item spanning 2 columns (hero slot)
- Total items: 8 `VideoItem` objects from `MECHANICS_VIDEOS`

**Each `VideoCard` component (`src/components/MechanicsGallery/VideoCard.tsx`):**

```
Structure:
- Outer wrapper: relative, overflow-hidden, rounded-sm, aspect-ratio: 16/9 (or 4/3 for hero slot)
- Background: dark charcoal
- <video> element: autoPlay, loop, muted, playsInline, src={item.videoSrc}
  - Video plays ONLY when hovered (use onMouseEnter/onMouseLeave to toggle play/pause)
  - Poster: item.thumbnailSrc
  - Object-fit: cover, w-full h-full absolute inset-0
- Overlay: absolute inset-0, bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent
- Content (bottom-left):
    [Category chip]    ← tiny uppercase mono text, luxury-gold/60
    [Title]            ← font-serif text-lg text-luxury-ivory
    [Tech Stack chips] ← small tags, same style as timeline
- Hover state (Framer Motion):
    - Description slides up from bottom (AnimatePresence, y: 20 → 0, opacity 0 → 1)
    - Overlay darkens slightly
    - Border: 1px border-luxury-gold/30 appears
```

**Scroll animation:** Gallery wrapper uses `staggerContainer`. Each card uses `scaleRevealVariant` on scroll into view.

---

### 2.5 `src/components/AchievementsBento/AchievementsBento.tsx`

Build a modular bento-box achievement grid.

**Section ID:** `id="recognition"`

**Specifications:**
- Section heading: `"Recognition & Leadership"`
- Layout: CSS Grid with `grid-template-columns: repeat(6, 1fr)` on desktop, collapsing gracefully
- Bento sizing rules:
  - `large` items: `col-span-6 md:col-span-4` (FYP 1st Prize)
  - `medium` items: `col-span-6 md:col-span-2`
  - `small` items: `col-span-3 md:col-span-2` (society appreciations, side-by-side)

**Each `BentoCard` component (`src/components/AchievementsBento/BentoCard.tsx`):**

```
Base styles: bg-charcoal-800, border border-charcoal-600/30, rounded-sm, p-6, h-full
Hover state: bg-charcoal-700, border-charcoal-500/50 — smooth 300ms transition

Structure:
- Top row: [Icon (SVG, 20px, luxury-gold/70)] + [Category chip — uppercase mono xs]
- Label: small text, luxury-muted, tracking-widest, uppercase, font-mono, text-xs
- Title: font-serif, text-xl, luxury-ivory
- Subtitle: font-sans, text-sm, luxury-silver/60
- Description: font-sans, font-light, text-sm, luxury-warm/70, mt-2

PDF hover action (only if pdfLink !== null):
- A "View Certificate →" link appears on hover via AnimatePresence
- Styled as: text-luxury-gold text-xs font-mono tracking-wide
- Opens pdfLink in a new tab
- The large FYP card shows this link prominently, not just on hover
```

**The large FYP card** additionally renders:
- A subtle `border-l-4 border-luxury-gold` accent
- A large `"1st"` numeral in `font-serif` at ~6rem, `text-luxury-gold/8` (watermark style, positioned absolutely bottom-right)

---

### 2.6 `src/components/TechnicalArsenal/TechnicalArsenal.tsx`

Build a clean, organized technical skills grid.

**Section ID:** `id="arsenal"`

**Specifications:**
- Section heading: `"Technical Arsenal"`
- Layout: Responsive grid of category cards — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Iterate over `TECH_ARSENAL` object keys to render category groups

**Each category block:**

```
Container: bg-charcoal-800 border border-charcoal-600/30 rounded-sm p-6

Header:
- Category name: font-mono text-xs tracking-[0.25em] text-luxury-gold/70 uppercase mb-4
- Thin divider line below

Skills list:
- Each skill row: flex justify-between items-center py-2 border-b border-charcoal-600/20
- Skill name: font-sans text-sm text-luxury-warm
- Proficiency: font-mono text-xs text-luxury-silver/50 italic
```

**No progress bars.** No skill meters. No percentages. Clean typographic list only — this reads as confident and mature, not gamified.

---

### 2.7 `src/components/Footer/Footer.tsx`

Build a minimal, refined footer with contact form UI.

**Section ID:** `id="contact"`

**Specifications:**

```
Layout: Two-column on desktop (left: identity + links, right: contact form)

Left column:
- Name in font-serif text-2xl text-luxury-ivory
- Title: "[Insert Professional Title]"
- Degree: "[Insert Full Degree Name]"
- University: "[Insert University Name]"
- CGPA: "3.28"   ← this is a confirmed value, render it as-is
- Social links: GitHub, LinkedIn — icon + handle, no full URLs shown

Right column — Contact Form UI:
- Built as a controlled React form (no form action, no submission logic yet — leave a TODO comment)
- Fields: Full Name, Email, Subject, Message (textarea)
- Field styles: bg-charcoal-800 border border-charcoal-600/40 text-luxury-warm
  placeholder: text-luxury-silver/30, focus: border-luxury-gold/50 outline-none
- Submit button: full-width, bg-luxury-gold text-charcoal-950 font-medium
  text: "Send Message"
- TODO comment: "// TODO: Connect to form submission API (Resend / Formspree / Server Action)"

Bottom bar:
- Thin divider
- Left: "© [current year] [Insert Full Name]. All rights reserved."
- Right: "Crafted with precision."
- Both in font-mono text-xs text-luxury-silver/30
```

---

### 2.8 `src/components/ui/SectionDivider.tsx`

```tsx
export function SectionDivider() {
  return (
    <div className="w-full flex items-center gap-6 px-6 md:px-16 lg:px-24 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-charcoal-600/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-charcoal-600/50" />
    </div>
  );
}
```

---

### 2.9 `src/components/ui/SectionHeading.tsx`

```tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

// Render:
// - Eyebrow: font-mono, text-xs, tracking-[0.3em], text-luxury-gold/60, uppercase, mb-3
// - Title: font-serif, text-display-lg, text-luxury-ivory
// - Thin gold underline: w-12 h-px bg-luxury-gold/50 mt-4 mb-3
// - Subtitle: font-sans, font-light, text-luxury-silver/70, max-w-xl, text-base
// Wrap in motion.div with fadeUpVariant, triggered by useInView
```

---

## PHASE 3 — PAGE ASSEMBLY

### 3.1 `src/app/page.tsx`

Assemble all components in order:

```tsx
import { Navigation }          from "@/components/Navigation/Navigation";
import { Hero }                from "@/components/Hero/Hero";
import { ExperienceTimeline }  from "@/components/ExperienceTimeline/ExperienceTimeline";
import { MechanicsGallery }    from "@/components/MechanicsGallery/MechanicsGallery";
import { AchievementsBento }   from "@/components/AchievementsBento/AchievementsBento";
import { TechnicalArsenal }    from "@/components/TechnicalArsenal/TechnicalArsenal";
import { Footer }              from "@/components/Footer/Footer";
import { SectionDivider }      from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <main className="bg-charcoal-950 min-h-screen">
      <Navigation />
      <Hero />
      <SectionDivider />
      <section className="px-6 md:px-16 lg:px-24 py-section">
        <ExperienceTimeline />
      </section>
      <SectionDivider />
      <section className="px-6 md:px-16 lg:px-24 py-section">
        <MechanicsGallery />
      </section>
      <SectionDivider />
      <section className="px-6 md:px-16 lg:px-24 py-section">
        <AchievementsBento />
      </section>
      <SectionDivider />
      <section className="px-6 md:px-16 lg:px-24 py-section">
        <TechnicalArsenal />
      </section>
      <SectionDivider />
      <Footer />
    </main>
  );
}
```

---

## PHASE 4 — ASSETS & PUBLIC FOLDER

### 4.1 Directory Structure for `/public`

Create the following empty directories with `.gitkeep` placeholder files:

```
/public
  /videos
    .gitkeep          ← Human will add .mp4 files here matching MECHANICS_VIDEOS[].videoSrc
  /thumbnails
    .gitkeep          ← Human will add .jpg poster frames here
  /certificates
    .gitkeep          ← Human will add PDF files here (fyp-award.pdf, ieee-ras.pdf, gdsc.pdf)
  /og-image.png       ← Placeholder; human will replace with real OG image
```

### 4.2 `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
```

---

## PHASE 5 — PERFORMANCE & ACCESSIBILITY

### 5.1 Motion Safety

Wrap all Framer Motion animation-heavy components with a `MotionSafe` provider:

```tsx
// src/components/providers/MotionSafe.tsx
"use client";
import { LazyMotion, domAnimation } from "framer-motion";

export function MotionSafe({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
```

Add `<MotionSafe>` to `layout.tsx` wrapping `{children}`.

### 5.2 `prefers-reduced-motion`

In `src/lib/motion.ts`, add a hook:

```typescript
export function useReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

In all animated components, if `useReducedMotion()` returns true, pass `{ initial: false }` to `motion` elements.

### 5.3 Semantic HTML Requirements

- Every section must have a corresponding `id` attribute (listed in each component spec above)
- All `<img>` and `<video>` elements must have `alt` or `aria-label`
- Form fields must have `<label>` elements
- Icon-only buttons must have `aria-label`
- Navigation landmark: `<nav role="navigation" aria-label="Main">`

---

## PHASE 6 — FINAL CHECKS & DEV RUN

### 6.1 TypeScript Strict Mode

Ensure `tsconfig.json` contains:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 6.2 Run & Verify

```bash
npm run dev
```

Verify the following in browser before considering build complete:

- [ ] Hero section renders with correct typography hierarchy
- [ ] Navigation sticky behavior and backdrop blur work on scroll
- [ ] Timeline cards expand/collapse with smooth animation
- [ ] All 8 video cards render (videos will be blank until .mp4 files are added)
- [ ] Bento grid achieves correct column spans on desktop
- [ ] Technical Arsenal has no progress bars (type-only)
- [ ] Footer form renders all fields with correct dark styling
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] No console errors or warnings in development mode

---

## APPENDIX A — PLACEHOLDER QUICK-REFERENCE

| Placeholder | Location | Notes |
|---|---|---|
| `[Your Full Name]` | layout.tsx, Footer | Full legal name |
| `[Insert Discipline Line]` | Hero eyebrow | 2–3 disciplines, `·` separated |
| `[Insert Resume PDF Link]` | Navigation, Hero CTA | Path to PDF in `/public` or external URL |
| `[Insert High-Impact Metric for CPU Optimization]` | EXPERIENCE exp-2 highlight | Concrete % or ms improvement |
| `[Insert Certificate PDF Link]` | ACHIEVEMENTS | Path to PDF in `/public/certificates/` |
| `[filename-N].mp4` | MECHANICS_VIDEOS | Actual filenames of uploaded videos |
| `CGPA: 3.28` | Footer | **Pre-filled. Do not modify.** |
| `[Insert Professional Title]` | Footer left | One-line title, e.g. "Senior Game Tools Engineer" |

---

## APPENDIX B — WHAT CURSOR MUST NEVER DO

- ❌ Never render dummy lorem ipsum in the final UI
- ❌ Never add a loading spinner or skeleton loader unless explicitly requested
- ❌ Never use `@apply` for one-off styles — write Tailwind classes inline
- ❌ Never use `any` type in TypeScript
- ❌ Never install or use `styled-components`, `emotion`, or CSS Modules
- ❌ Never add a dark mode toggle — the site is dark mode only, always
- ❌ Never position the navigation at the bottom of the page
- ❌ Never add a chatbot widget, cookie banner, or analytics script
- ❌ Never use `<marquee>`, `<blink>`, or deprecated HTML elements
- ❌ Never auto-populate CGPA with any value other than `3.28`

---

*End of Claude.md — Master Build Instructions*
*Version 1.0 · Generated for Cursor Composer/Agent*
