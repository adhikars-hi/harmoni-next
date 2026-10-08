# Next js project — Landing Page (Next.js)

Single-page marketing site for **Sonata Harmoni.AI**, built with **Next.js (App Router)**, **React 19** and **Framer Motion**. It is a straight port of the earlier Vite + React project: same sections, styles, animations and assets, now running on Next.js.

## Requirements

- **Node.js 20.9 or newer** (Next.js 16 requirement) — check with `node -v`
- npm 10+ (ships with Node)

## Getting started

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload (`http://localhost:3000`) |
| `npm run build` | Production build into `.next/` |
| `npm run start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | ESLint with the Next.js rule set |

To use a different port: `npm run dev -- -p 4000`.

## Tech stack

| Package | Why it's here |
| --- | --- |
| `next` 16 | Framework: App Router, static pre-rendering, bundling (Turbopack) |
| `react`, `react-dom` 19 | UI library |
| `framer-motion` 13 | Scroll-driven and entrance animations, carousels, dissolves |
| `@fontsource/inter`, `@fontsource/roboto-mono` | Fonts bundled locally (no call to Google Fonts at runtime) |
| `eslint`, `eslint-config-next` | Linting (dev only) |

The project is plain JavaScript (`.jsx`), not TypeScript.

## Project structure

```
harmoni-next/
├── public/                     Static files, served from the site root ("/…")
│   ├── brand/                  Sonata logo
│   ├── alliance-logos/         Partner logo tiles (367×150)
│   ├── client-logos/
│   ├── blog-assets/
│   ├── industry-assets/
│   ├── product-assets/
│   ├── recognition-assets/
│   ├── winner-assets/
│   └── videos/hero-video-scrub.mp4   Hero head animation (see "Hero video")
├── src/
│   ├── app/
│   │   ├── layout.jsx          Root layout: <html>/<body>, metadata, fonts, global CSS
│   │   ├── page.jsx            Home page: composes the sections in order
│   │   └── providers.jsx       Client providers (Framer Motion reduced-motion config)
│   ├── lib/             # Drupal client + mappers
│   ├── sections/               One file per page section
│   │   ├── Navbar.jsx  Hero.jsx  PointOfView.jsx  ProductStack.jsx
│   │   ├── LatestUpdates.jsx  Clients.jsx  Testimonials.jsx  Alliances.jsx
│   │   ├── FeaturedBlogs.jsx  Industries.jsx  WhyChooseUs.jsx
│   │   └── Recognitions.jsx  Winner.jsx  Connect.jsx  Footer.jsx
│   ├── components/             Shared building blocks
│   │   ├── ui.jsx              Reveal, GlowButton, SectionHead, icons…
│   │   ├── KeyedVideo.jsx      Video with the black background removed (WebGL)
│   │   ├── Dust.jsx            Drifting dust-speck canvas behind the page
│   │   ├── Marquee.jsx         Logo rows
│   │   ├── logos.jsx           Partner names / metadata
│   │   └── useIsMobile.js      Viewport hook (≤ 768px)
│   └── styles/
│       ├── globals.css         Base styles (design tokens, layout, every section)
│       ├── custom.css          Overrides and later fixes — loaded after globals
│       └── mobile.css          Responsive layer (≤ 768px) — loaded last
├── next.config.mjs
├── eslint.config.mjs
├── jsconfig.json               "@/…" import alias → "src/…"
├── .env.example
└── package.json
```

The three stylesheets are imported in `src/app/layout.jsx` and **the order matters**: `globals.css` → `custom.css` → `mobile.css`.

## How it works in Next.js

- **Server vs client components.** `app/layout.jsx` and `app/page.jsx` are Server Components. Every section and interactive component starts with `'use client'` because it uses Framer Motion, React state or browser APIs. The page is still pre-rendered to static HTML at build time, then hydrated in the browser.
- **Mobile markup.** Some sections render different markup on phones (static hero, industries accordion, single testimonial card…). The server cannot know the viewport, so it renders the desktop markup and `useIsMobile` switches to the real value during hydration (via `useSyncExternalStore`, so there is no hydration-mismatch error).
- **Hero.** `Hero.jsx` contains `HeroDesktop` (pinned, scroll-driven) and `HeroMobile` (stacked). They are separate components so each owns its own scroll hooks.
- **Static assets.** Images and the video live in `public/` and are referenced by root paths such as `/product-assets/spina-BG.png`. Plain `<img>` tags are used rather than `next/image`.
- **Imports.** Use the `@/` alias for anything under `src/`, e.g. `import Hero from '@/sections/Hero'`.

## Hero video

The head animation is **scrubbed by scroll**: the frame shown follows the scroll position, so the whole animation plays out as the visitor scrolls through the hero, however fast they scroll, and reverses on the way back up.

Two things make this work:

1. **Black background removal.** The clip is rendered on solid black with no alpha channel. `KeyedVideo.jsx` draws each frame through a small WebGL shader that turns the black transparent, so the page grid shows around the head.
2. **A keyframe on every frame.** Scrubbing seeks constantly; a normal video (few keyframes) stutters badly. The clip must be encoded all-intra. To replace the video, encode the new source like this and keep the same file name:

```bash
ffmpeg -i new-clip.mov -an -c:v libx264 -preset slow -crf 28 \
  -g 1 -keyint_min 1 -bf 0 -pix_fmt yuv420p -movflags +faststart \
  public/videos/hero-video-scrub.mp4
```

> **Before going live:** the current clip is an Adobe Stock *preview* with the watermark burned in. It must be licensed and replaced with the clean file (encoded as above).

## Drupal CMS content

The page reads content from the Drupal JSON:API at `{DRUPAL_API_URL}/jsonapi/node/home_page`. The fetch happens on the server in `src/app/page.jsx` (via `src/lib/drupal.js`), is cached and re-fetched every `DRUPAL_REVALIDATE` seconds (default 300), and the result is passed to sections as props.

| CMS field (`data[0].attributes`) | Section | Prop |
| --- | --- | --- |
| `field_testimonials` | Testimonials | `quotes` → `[{ q, who }]` |

Each `field_testimonials` item is an HTML string (`<figure class="testi-card">` with `<blockquote><p>` quote and `<figcaption class="who">` attribution). `mapTestimonials()` extracts only those two texts, decodes entities (`&amp;` etc.) and renders them as plain text. Surrounding markup (inline styles, SVG, `aria-hidden`) is ignored and no CMS HTML is injected into the page. Array order in Drupal is the slide order.

If the CMS is down or returns no testimonials, the section falls back to the built-in copy in `Testimonials.jsx`, so the page never breaks. Test the mapping with `node scripts/test-drupal-mapping.mjs`.

Fields on the same node not yet wired: `field_sonata_harmoni_ai_cards`, `field_our_point_of_view`, `field_body`, and the `field_our_clients` / `field_our_strategic_ai_alliances` logo files. Add each as a mapper in `src/lib/drupal.js` and a prop on its section.

## Environment variables

Copy `.env.example` to `.env.local`. These are read on the server only.

| Variable | Notes |
| --- | --- |
| `DRUPAL_API_URL` | Drupal base URL (default `https://devcms.sonata-software.com`). |
| `DRUPAL_REVALIDATE` | Seconds between CMS re-fetches (default `300`). |

## Deployment

- **Node server:** `npm run build` then `npm run start` (defaults to port 3000; `npm run start -- -p 8080` to change it).
- **Vercel / similar:** import the repository; no extra configuration is needed.
- **Static hosting:** the site is a single statically rendered page. To get plain HTML/CSS/JS files, add `output: 'export'` to `next.config.mjs` and run `npm run build`; the result is written to `out/`.

## What changed from the Vite project

| Vite project | This project |
| --- | --- |
| `index.html` + `src/main.jsx` | `src/app/layout.jsx` (+ `providers.jsx`) |
| `src/App.jsx` | `src/app/page.jsx` |
| `src/index.css` | `src/styles/globals.css` |
| `src/custom.css`, `src/mobile.css` | `src/styles/custom.css`, `src/styles/mobile.css` |
| `src/sections/*`, `src/components/*` | Same files, now with `'use client'` |
| `import logo from '../assets/sonata-blk-logo.png'` | `/brand/sonata-blk-logo.png` in `public/` |
| `VITE_DRUPAL_API_URL` | `DRUPAL_API_URL` (server-side) |
| `npm run dev` → port 5173 | `npm run dev` → port 3000 |
| `npm run preview` | `npm run start` |

Left behind on purpose: the `*.bak` files, the unused `Orb.jsx` placeholder, `App.css` (never imported), the Vite/React template SVGs, `react-router-dom` (never used) and the original `hero-video.mov` (superseded by the scrub-encoded MP4).

## Known content placeholders

- Footer "about" paragraph, Industries desktop card and the "Why Choose Us" cards still use Lorem Ipsum.
- "Latest Updates" eyebrow reads `// Placeholder`.
- Navigation and footer links point to `#`.
