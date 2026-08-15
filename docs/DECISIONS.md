# Implementation decisions

Where the implementation departs from, or had to interpret, the two source prompts. Recorded so the reasoning survives the commit.

---

## 1. Hero heading size — the one intentional design deviation

**Spec:** `text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]`
**Implemented:** `text-[10.91vw] sm:text-[11.69vw] md:text-[12.47vw] lg:text-[13.64vw]`

The content brief forbade changing font sizes, but it also changed the headline from `HI, I'M JACK` (12 glyphs) to `HI, I'M GIREESH` (15). The heading is `whitespace-nowrap`, so at the specified sizes the longer name overflows and clips — roughly 28% of it disappears off-screen.

Rather than guess, both strings were measured in the live browser at the real font weight, size and letter-spacing:

| String | Width @ 100px |
|---|---|
| `HI, I'M JACK` | 519.3px |
| `HI, I'M GIREESH` | 666.1px |

Ratio: **0.7796**. Applying it to each breakpoint reproduces the original composition's viewport fill exactly.

Verified at 1280px: the heading occupies **90.9%** of viewport width — identical to what `17.5vw` gave the original name. The intent of the spec (a heading that spans nearly edge to edge) is preserved; only the number changed, because the number was a function of a name that no longer applies.

Every other size, spacing and radius value in the project uses the spec's figures unchanged.

---

## 2. Sections the content brief required but the design spec never defined

The design spec described five sections. The content brief supplied copy for Experience, Contact and Footer, which had no counterpart.

These were built strictly in the established visual language rather than invented freshly — same `.hero-heading` gradient, same `clamp()` type scale, same `1px` divider treatment and `py-8 sm:py-10 md:py-12` rhythm as the services list, and the existing `ContactButton` reused for "Get In Touch". Final section order:

`Hero → Marquee → About → Experience → Services → Projects → Contact → Footer`

Education is rendered at reduced size and opacity, on a single row, per the brief's "keep Education visually secondary — this is a portfolio, not a CV."

---

## 3. Project count held at three

The brief supplied four projects with an explicit instruction not to compromise the stacking interaction for a fourth. Only the first three are rendered.

Worth knowing: the implementation derives everything from `PROJECTS.length`, so a fourth entry would work without touching the scale maths. The cap is a composition decision, not a technical limit. The unused fourth project is preserved in [`prompts/02-content-brief.md`](prompts/02-content-brief.md).

---

## 4. Content that had no slot in the design

- **Project descriptions and tags** — the source card had no copy area. They were placed in the card's existing top row, styled to match the services descriptions (`font-light`, `opacity 0.6`, same clamp scale).
- **Secondary positioning line** ("UX/UI · Product · AI · Digital Experiences") — placed in the `<meta name="description">` and the footer rather than adding an unspecified hero element.

---

## 5. Placeholders left deliberately

- **Project `href`s are all `'#'`.** The brief said not to invent project URLs.
- **Contact CTA** points at `mailto:heeding.ai@gmail.com`.
- **All imagery remains hotlinked** to the source hosts — see [`ASSETS.md`](ASSETS.md).

---

## 6. Bug found during verification: cards scaled but never stacked

Worth recording because it is easy to reintroduce.

The spec reads "each card is sticky top-24 md:top-32 inside an h-[85vh] container," which was first implemented literally:

```tsx
<div className="h-[85vh]">
  <div className="sticky top-24 md:top-32">   {/* ← wrong */}
```

A `sticky` element can only travel within its own parent. Nesting it inside the `h-[85vh]` block confined each card's sticky range to that block, so cards scrolled away instead of pinning — the scale animation ran correctly, but no stacking ever happened. Browser inspection showed all three sticky tops diverging (`-768`, `-155`, `459`) instead of converging.

The fix is to make the sticky element *be* the flow block, as a direct child of the shared container:

```tsx
<div className="sticky top-24 md:top-32 h-[85vh]">
```

Verified after the fix at 65% scroll through the stack:

| Card | Sticky top | Scale |
|---|---|---|
| 01 | 128px (pinned) | 0.9588 |
| 02 | 128px (pinned) | 0.9841 |
| 03 | 500px (entering) | 1 |

Scales match `1 - (total - 1 - index) * 0.03` to four decimals.

---

## Verification performed

Checked in a live browser against the running dev server, not by inspection alone:

- Production build passes `tsc -b` and `vite build` with no errors or warnings.
- Zero console errors; zero failed image requests across all 77 image elements.
- No horizontal overflow (`documentElement.scrollWidth` 1265 ≤ viewport 1280).
- Marquee: a 400px scroll moved row 1 by **+120px** and row 2 by **−120px** — the specified `0.3` multiplier, mirrored.
- AnimatedText: character opacities confirmed grading mid-paragraph (leading characters at `1`, trailing still at `0.2`).
- Hero, About decorations, Experience, Services and Projects all confirmed rendering and animating on screen.
