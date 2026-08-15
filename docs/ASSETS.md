# Assets

All imagery is committed to this repository under `public/images/` and served as root-relative paths (`/images/...`). Vite serves `public/` at the web root, so no imports or bundler config are involved — swapping an image is a file replacement.

Nothing is fetched from a third-party host at runtime.

```
public/images/
├── hero/portrait.webp          Hero portrait (Magnet effect)
├── decor/                      4 About-section 3D decorations
│   ├── moon.png  object.png  lego.png  group.png
├── marquee/                    20 animated tiles, 01–20
└── projects/                   9 project stills (3 per project)
```

**Total: 34 files, ~41 MB.**

---

## Why they were localized

They were originally hotlinked to `figma.site`, `motionsites.ai` and `images.higgs.ai`. That dependency was not theoretical — see below.

## One source URL was already dead

`hero-celestia-preview-0yO3jXO8.gif`, the 21st marquee image in the original spec, returns **HTTP 404**. It had been failing silently on the live page.

The marquee is therefore **20 images, not 21**: row 1 keeps its 11, row 2 has 9 instead of 10. The rows were never equal (11/10), and `ROW_1`/`ROW_2` derive from `slice(0, 11)` / `slice(11)`, so nothing else changed. To restore a 21st tile, drop a file into `public/images/marquee/` and add its path to the end of `MARQUEE_IMAGES`.

---

## Optimization applied

Downloaded at full size the set was **172 MB**, which is not reasonable to clone. The animated GIFs were re-encoded to **animated WebP** with ffmpeg:

```bash
ffmpeg -i in.gif -vf "fps=12,scale=640:-2:flags=lanczos" \
  -c:v libwebp -lossless 0 -q:v 60 -compression_level 6 -loop 0 -an out.webp
```

The hero portrait (a 2.5 MB PNG that loads immediately and is the LCP element) was converted at `-q:v 90`, preserving alpha.

| | Before | After |
|---|---|---|
| Converted files | 170.4 MB | 38.7 MB |
| Repository total | ~172 MB | **~41 MB** |

640px wide at 12fps is comfortably above what the tiles need — they render at 420×270 CSS px, `object-cover`, scrolling horizontally. Animated WebP is a drop-in `<img src>` replacement, so no markup or styling changed.

Two things worth knowing if you re-run this:

- **`ffprobe` cannot read animated WebP.** It reports `image data not found` on perfectly valid files, because ffmpeg encodes animated WebP but its demuxer can't decode it. Verify in a browser (`img.decode()`) or by checking for `VP8X`/`ANIM`/`ANMF` chunks in the header — not with ffprobe.
- **`fps=` on a static GIF produces an empty file.** `09-skyelite` is a single 1920×1455 frame; the fps filter emitted zero frames and wrote a 0-byte output. Static sources need the filter omitted.

The 9 project images were already served as WebP by the source proxy and were saved as-is. The 4 decor PNGs (~1 MB total) keep alpha and were left alone.

---

## Provenance — read before making this repository public

**The marquee tiles are preview captures of other companies' websites**, originally hosted by `motionsites.ai`. They are committed here as placeholders. Redistributing them from a public repository is a decision worth making deliberately, and one you may want to reverse by substituting your own imagery.

The project images do **not** depict the work described in the case studies — they are generated placeholders carried over from the source design. Replace them with real screenshots of Heeding Climate Solutions, Lock.AI and Freight Matrix before treating the site as a live portfolio.

## Replacing an image

1. Drop the new file into the matching folder under `public/images/`.
2. Update the path in the relevant section file — `MARQUEE_IMAGES` in `MarqueeSection.tsx`, `PROJECTS` in `ProjectsSection.tsx`, `PORTRAIT_URL` in `HeroSection.tsx`, `DECOR_BASE` in `AboutSection.tsx`.
3. Keep the `loading="lazy"` attributes on marquee and project images.
4. Compress before committing. Reuse the ffmpeg command above for anything animated.
