# Gireesh — Product Designer

A dark, motion-driven single-page portfolio built with React, TypeScript, Tailwind CSS and Framer Motion.

**Product Design · UX/UI · AI · Digital Experiences**

---

## Stack

| Tool | Version | Role |
|---|---|---|
| React | 18.3 | UI |
| TypeScript | 5.5 | Types |
| Vite | 5.4 | Build / dev server |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 12.38 | Scroll + reveal animations |
| Lucide React | 0.344 | Icons |
| Kanit (Google Fonts) | 300–900 | Typography |

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

The dev server prints its URL (default `http://localhost:5173`). If that port is taken, set `PORT` and Vite will follow it:

```bash
PORT=5174 npm run dev
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

---

## Project structure

```
src/
├── main.tsx                  Entry point
├── App.tsx                   Section order
├── index.css                 Global reset, Kanit, .hero-heading gradient
├── components/
│   ├── FadeIn.tsx            whileInView reveal wrapper (delay/duration/x/y)
│   ├── Magnet.tsx            Mouse-following magnetic hover effect
│   ├── AnimatedText.tsx      Character-by-character scroll reveal
│   ├── ContactButton.tsx     Gradient pill CTA
│   └── ProjectButton.tsx     Ghost/outline pill ("View Project")
└── sections/
    ├── HeroSection.tsx       Navbar, giant heading, magnetic portrait
    ├── MarqueeSection.tsx    Two scroll-driven image rows (opposite directions)
    ├── AboutSection.tsx      Scroll-revealed bio + 3D corner decorations
    ├── ExperienceSection.tsx Role + education (education intentionally secondary)
    ├── ServicesSection.tsx   White sheet, 5 numbered services
    ├── ProjectsSection.tsx   3 sticky cards that stack and scale
    ├── ContactSection.tsx    Closing CTA
    └── FooterSection.tsx     Wordmark + back to top
```

---

## Design system

| Token | Value |
|---|---|
| Background | `#0C0C0C` |
| Body / UI text | `#D7E2EA` |
| Heading gradient | `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` |
| Services sheet | `#FFFFFF` on `#0C0C0C` text |
| CTA gradient | `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)` |
| Font | `'Kanit', sans-serif` |
| Breakpoints | Tailwind defaults — `sm` 640 / `md` 768 / `lg` 1024 |

Fluid type uses `clamp()` throughout, so the layout scales continuously from mobile to ultra-wide rather than stepping at breakpoints.

Section headings use the `.hero-heading` class (defined in `src/index.css`) for the gradient text fill.

### Animation behaviour

- **FadeIn** — `whileInView` with `viewport={{ once: true, margin: '50px', amount: 0 }}`, easing `[0.25, 0.1, 0.25, 1]`. Staggered by `delay`.
- **Magnet** (hero portrait) — tracks the cursor within 150px of the element, translating by `distance / 3`. Eases in at `0.3s`, out at `0.6s`.
- **Marquee** — rows translate on page scroll by `(scrollY - sectionTop + innerHeight) * 0.3`; row 1 moves right, row 2 moves left. Images are tripled for seamless coverage; the scroll listener is passive.
- **AnimatedText** — each character animates `0.2 → 1` opacity across the paragraph's scroll progress (`['start 0.8', 'end 0.2']`).
- **Project cards** — each card is `sticky top-24 md:top-32` and scales to `1 - (totalCards - 1 - index) * 0.03`, offset `index * 28px`, so cards pin and stack with their headers peeking.

---

## Editing content

Everything is co-located with its section — there is no CMS or config layer.

| To change | Edit |
|---|---|
| Nav links | `NAV_LINKS` in `src/sections/HeroSection.tsx` |
| Hero name / tagline | `src/sections/HeroSection.tsx` |
| Bio paragraphs | `ABOUT_PARAGRAPHS` in `src/sections/AboutSection.tsx` |
| Role, company, education | `src/sections/ExperienceSection.tsx` |
| Services | `SERVICES` in `src/sections/ServicesSection.tsx` |
| Projects (copy, tags, images, links) | `PROJECTS` in `src/sections/ProjectsSection.tsx` |
| Contact copy + email | `src/sections/ContactSection.tsx` |
| Page title / meta | `index.html` |

### Placeholders to replace

- **Project links** — every project's `href` is `'#'`. Real URLs were deliberately not invented; set them in the `PROJECTS` array.
- **Contact email** — the CTA links to `mailto:heeding.ai@gmail.com` in `ContactSection.tsx`.
- **Images** — all imagery lives in `public/images/` and is placeholder content: the marquee tiles are third-party website previews, and the project stills do not show the work described. See [`docs/ASSETS.md`](docs/ASSETS.md) before making the repo public or treating the site as live.

### Adding a fourth project

The stacking interaction is driven by `PROJECTS.length`, not a hardcoded `3` — appending an entry works and the scale formula adapts. It was capped at three because the source design was composed for three cards.

---

## Deployment

Any static host works. Build output is `dist/`.

```bash
npm run build
```

- **Vercel / Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — set `base: '/Portfolio2/'` in `vite.config.ts` before building, then publish `dist/`.

---

## Documentation

| Doc | Contents |
|---|---|
| [`docs/ASSETS.md`](docs/ASSETS.md) | Where the images live, how they were optimized, provenance caveats, and how to replace them |
| [`docs/prompts/01-design-spec.md`](docs/prompts/01-design-spec.md) | Original design specification — the source of truth for layout, animation and styling |
| [`docs/prompts/02-content-brief.md`](docs/prompts/02-content-brief.md) | Content brief that defined the identity, copy and project data |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Implementation decisions, deviations from spec, and one bug found during verification |
