# Portfolio — Senior Software & Game Tools Engineer

Executive dark-mode portfolio built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

Build spec: [`Claude.md`](./Claude.md)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Populate your content

1. Edit placeholders in `src/lib/constants.ts` (experience, videos, achievements, skills).
2. Replace bracket placeholders in components (`Hero`, `Footer`, `Navigation`, `layout.tsx` metadata).
3. Add assets:
   - `public/videos/*.mp4` — match `MECHANICS_VIDEOS[].videoSrc`
   - `public/thumbnails/*.jpg` — poster frames
   - `public/certificates/*.pdf` — award PDFs
   - `public/og-image.png` — Open Graph image (1200×630)

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Development server       |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |

## Design system

Custom tokens live in `tailwind.config.ts` (charcoal, luxury gold/ivory/warm) and `src/app/globals.css`.
