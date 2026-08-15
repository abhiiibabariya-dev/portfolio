# Assets

**Every image in this project is hotlinked from an external host.** There are no image files in this repository.

This works today, but it is the single biggest fragility in the project: if any of these hosts changes a filename, adds hotlink protection, or goes offline, the corresponding images break with no fallback. Treat localizing them as a prerequisite for anything you consider "live".

---

## Why they were not committed

Two reasons, both worth a deliberate decision rather than a silent default:

1. **Provenance.** The marquee GIFs are preview captures of other companies' websites, hosted by `motionsites.ai`. Committing them into a public repository redistributes third-party content. That is a call for the repository owner to make, not an implementation detail.
2. **They are placeholders.** The project imagery does not depict the actual work described in the case studies. It came from the source design and is intended to be replaced.

---

## Inventory

### Hero portrait — `src/sections/HeroSection.tsx`

Host: `shrug-person-78902957.figma.site`

| Purpose | File |
|---|---|
| Portrait (wrapped in the Magnet effect) | `Rectangle_40443.81459862.png` |

### About decorations — `src/sections/AboutSection.tsx`

Host: `shrug-person-78902957.figma.site` (shared `DECOR_BASE` constant)

| Position | File |
|---|---|
| Top-left | `moon_icon.11395d36.png` |
| Bottom-left | `p59_1.4659672e.png` |
| Top-right | `lego_icon-1.703bb594.png` |
| Bottom-right | `Group_134-1.2e04f3ce.png` |

### Marquee — `src/sections/MarqueeSection.tsx`

Host: `motionsites.ai` — 21 GIFs in the `MARQUEE_IMAGES` array.

Row 1 renders the first 11, row 2 the remaining 10. Each row is tripled in the DOM for seamless scroll coverage, so **63 image elements** reference these 21 files.

### Projects — `src/sections/ProjectsSection.tsx`

Host: `images.higgs.ai` (a resizing proxy in front of a CloudFront origin).

Three images per project × three projects = 9 URLs. Each is a proxy request of the form:

```
https://images.higgs.ai/?default=1&output=webp&url=<encoded CloudFront URL>&w=1280&q=85
```

---

## Localizing them

Recommended before any real deployment:

1. Download each asset into `public/images/`.
2. Replace the absolute URLs with root-relative paths (`/images/hero-portrait.png`). Vite serves `public/` at the root, so no imports are needed.
3. Compress before committing — the GIFs in particular are large. Converting the marquee tiles to `.webp` or `.mp4` would cut page weight substantially, since 63 elements reference them.
4. Confirm you have the right to redistribute anything you commit, and swap the project imagery for real work.

The `loading="lazy"` attributes already on the marquee and project images should be kept.
