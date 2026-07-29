# Japanese Zen Theme Redesign

**Date:** 2026-07-29
**Status:** Approved (pending spec review)

## Context

The portfolio (`chetank03/portfolioWebsite`, Next.js + Tailwind, deployed on Railway at
`chetankodeboyina.com`) currently uses a dark neon-teal theme (`#071014`/`#0B1720`
backgrounds, `#2DD4BF`/`#5EEAD4` accents). The user wants a Japanese Zen-minimalist theme:
brighter, more natural colors, full treatment (typography + motifs + spacing, not just a
color swap), while keeping every existing section, layout structure, and piece of content
unchanged.

## Palette

Same custom Tailwind token **names** in `tailwind.config.js`, new values — this avoids
touching class names across the ~8 section components; only the config values change for
config-driven usage. (Hardcoded literal Tailwind classes like `slate-950`/`slate-400` are a
separate, explicit part of the sweep — see Implementation.)

| Token | Old value | New value | Role |
|---|---|---|---|
| `lightBackground` | `#071014` | `#FAF6EE` | page background (washi paper) |
| `darkBackground` | `#0B1720` | `#F1EBDD` | card & section surfaces (deeper paper/stone) |
| `darkBlack` | `#E6F1F5` | `#2B2A25` | headings & primary text (sumi ink) |
| `grayColor` | `#94A3B8` | `#78715F` | secondary/muted text (warm stone; darkened from the initially proposed `#8C8574` to clear the 4.5:1 AA contrast threshold against `#FAF6EE`) |
| `lightGreen` | `#2DD4BF` | `#7C9473` | primary accent, links (sage/moss) |
| `darkGreen` | `#5EEAD4` | `#5B7A5A` | hover states, borders (deep moss) |
| `yellowColor` | `FFE033` (invalid hex, missing `#`, dead value) | `#C9A15A` | sparing highlight/accent mark (soft gold) — also fixes the live bug |

## Typography

- **Headings/display**: `Noto Serif JP` — a real Japanese-designed Mincho serif with full
  Latin support, not a generic Western "elegant serif" default.
- **Body/UI text**: `Noto Sans JP` — matching Gothic companion, calm and highly readable.
- Load via a plain Google Fonts `<link>` in a new `pages/_document.tsx` (not
  `next/font/google`: this project pins `next@13.0.2`, which predates Next's built-in font
  loader — introduced in 13.2 — so importing `next/font/google` here would fail to
  resolve; a `<link>` needs no new dependency and works on any Next version).
- Weight usage stays restrained: headings 400/500 only, body 400 (avoid heavy 700+ weights
  which would fight the calm/Zen brief).

## Motifs & signature element

- **Signature (the one bold risk)**: a single large, very faint (~6% opacity) hand-drawn
  ensō (ink-brush circle) SVG behind the Hero name. This is the one memorable, deliberate
  element; everything else in the design stays quiet around it.
- **Hairline dividers**: thin 1px rules (stone-tone, e.g. `border-grayColor/20`) between
  sections, replacing the current abrupt snap-scroll section cut, to reinforce Ma
  (breathing room) between sections.
- **Small accent mark**: a small gold (`yellowColor`) circular dot, used sparingly next to
  section headings (e.g. before "EXPERIENCE", "PROJECTS"). No literal kanji/characters —
  keeps the motif abstract rather than reading as costume.
- No numbered markers (01/02/03) — the content isn't a numbered sequence, so this would be
  decoration without meaning per the design brief's own content-encoding principle.

## Motion

- Keep the existing Framer Motion fade-in/slide-in transitions as-is (`opacity`/`y`
  transitions already used throughout). No new scroll-triggered parallax or heavy motion —
  additional animation would work against the calm/Zen brief and risks reading as
  AI-generated template flourish.

## Spacing (Ma)

- Section horizontal padding: `px-10` → `px-12 md:px-16` where currently used.
- Card/grid gaps (Experience, Projects, Skills): increase roughly 30-50% (e.g. `gap-8` →
  `gap-12`).
- Bullet list spacing inside cards: `space-y-2` → `space-y-3`.
- Content columns stay narrower than full-bleed (e.g. `max-w-3xl`/`max-w-6xl` caps already
  used in Experience — keep/extend this pattern) so paper whitespace frames the content.
- Headings stay left-anchored (existing `tracking-[20px] uppercase` label style), not
  re-centered — avoids the generic symmetric-centered template look.

## Implementation scope

**In scope:**
- `tailwind.config.js` — swap the 7 token values above.
- Sweep hardcoded literal dark-theme classes across all 8 section components
  (`Hero.tsx`, `About.tsx`, `WorkExperience.tsx`, `ExperienceCard.tsx`, `Education.tsx`,
  `Skills.tsx`, `Skill.tsx`, `Projects.tsx`, `ContactMe.tsx`, `pages/index.tsx`):
  - `bg-slate-950` (card/surface backgrounds) → `bg-darkBackground`
  - `text-slate-400`/`slate-300`/`slate-200` (muted/body text) → `text-grayColor` /
    `text-darkBlack` as appropriate for contrast
  - `shadow-black/30`-style shadows → softened/warmer opacity
  - `bg-white` logo circles, `text-white` back-to-top icon: unchanged, still contrast fine
- Add `Noto Serif JP` / `Noto Sans JP` via `next/font/google` in `pages/_app.tsx` (or
  equivalent), wire into `tailwind.config.js` `fontFamily`.
- Add the ensō SVG signature element to `Hero.tsx`.
- Add hairline section dividers and the small gold accent mark to section headings.
- Apply the spacing bumps listed above.

**Out of scope (explicitly not doing):**
- No content/copy changes.
- No new sections, no layout restructuring beyond spacing.
- No new page transitions or scroll-triggered animation.
- No literal Japanese script/kanji anywhere in the UI.
- No changes to the Experience-card grid fix already shipped in a prior change.

## Accessibility checklist

- [ ] `grayColor` (#78715F) vs `lightBackground` (#FAF6EE) meets 4.5:1 contrast for body
  text — verify with a contrast checker during implementation, adjust further if not.
- [ ] `darkBlack` (#2B2A25) vs `lightBackground`/`darkBackground` — expected to comfortably
  exceed 4.5:1 (dark ink on light paper).
- [ ] Focus states remain visible on all interactive elements after the color swap.
- [ ] Ensō signature element is `aria-hidden` / purely decorative, doesn't interfere with
  screen readers or Hero heading semantics.
