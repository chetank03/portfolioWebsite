# Projects Expansion and Layout Simplification

**Date:** 2026-07-29
**Status:** Approved (pending spec review)
**Builds on:** `docs/superpowers/specs/2026-07-29-japanese-zen-theme-design.md` (implemented on
branch `japanese-zen-theme`, 10 commits, not yet pushed or merged)

## Context

The portfolio (`chetank03/portfolioWebsite`, Next.js 13.0.2 Pages Router + Tailwind, deployed on
Railway at `chetankodeboyina.com`) has just been re-skinned to a light Japanese Zen paper theme.
Two problems remain:

1. **Projects are thin and stale.** Only 5 hardcoded entries in `data/portfolioData.ts`, several
   with no GitHub or live links, while the user has 17 public repos plus 2 private ones with
   substantially better material (real metrics, live deploys).
2. **The layout fights its own content.** Every section is locked to `h-screen` with
   `snap-y snap-mandatory` scroll, so a 2-card Education grid and a 2-card Experience grid each
   have to fill an entire viewport. Navigation exists only as a button row inside Hero, so once
   you scroll away there is no way to jump between sections.

The user asked for simplicity inspiration from `https://www.gazijarin.com`, which was fetched and
screenshotted during design. Its relevant patterns: natural continuous scroll with large gaps
rather than viewport-locked snapping, in-flow lowercase `/ section` headers with a thin trailing
rule, a persistent restrained nav, and a "View all projects →" affordance floated opposite the
section header.

**Explicitly out of scope:** gazijarin's dark navy palette. The user chose to keep the light Zen
theme and borrow only structure. No color tokens from the previous spec change in this work.

## Scroll architecture

Replace viewport-locked snap scrolling with natural continuous scroll.

- `pages/index.tsx`: drop `h-screen`, `snap-y`, `snap-mandatory`, and `overflow-y-scroll` from
  the page wrapper (the page scrolls in the normal document flow instead). Keep
  `overflow-x-hidden`. Drop `snap-start`/`snap-center` from all seven `<section>` elements. Keep
  the `border-t border-grayColor/20` hairline dividers added by the Zen spec.
- Sections currently forcing full-viewport height switch to content height with generous vertical
  padding: `Skills.tsx`, `Projects.tsx`, `ContactMe.tsx`, `About.tsx` (each currently `h-screen`)
  become `py-24 md:py-32` with no height constraint. Note `Skills.tsx` carries **both** `h-screen`
  and `min-h-screen` on the same element — remove both.
- `WorkExperience.tsx` and `Education.tsx` already use `min-h-screen` + padding; change
  `min-h-screen` to no height constraint and keep their existing `py-24`.
- `Hero.tsx` keeps `h-screen` — a full-height opening panel is intentional and matches gazijarin's
  own hero.

Because the page wrapper no longer scrolls, the sticky back-to-top footer in `pages/index.tsx`
must be verified to still position correctly against the document (it uses `sticky bottom-5`).

## Section headers

Every section except Hero currently renders its label as an absolutely-positioned, centered,
letter-spaced uppercase `<h3>` (`absolute top-20 md:top-24 ... tracking-[20px]`), which only works
because sections are viewport-height. With natural scroll these must move into the document flow.

New pattern, applied to About, Experience, Education, Skills, Projects, Contact:

- In-flow (not absolute), left-aligned, lowercase, prefixed with a literal `/ ` character.
- A thin `1px` rule in `grayColor/20` extending horizontally from the end of the label to the
  right edge of the section's content column.
- Rendered in `font-serif` (Noto Serif JP, per the Zen spec), sized `text-xl md:text-2xl`.
- The small gold `yellowColor` accent dot added by the Zen spec is **removed** from section
  headings — the `/` prefix now carries that role, and keeping both is redundant decoration. (The
  Zen spec's dot was a stopgap for the centered-uppercase style being replaced here.)
- Because the label is now in-flow, each section's existing offsets that compensated for the
  absolute heading are removed: `Education.tsx`'s grid drops `mt-16`, and `Skills.tsx`'s second
  subheading ("Hover over a skill for current proficiency", currently
  `absolute top-32 md:top-36`) moves into the flow directly beneath the `SectionHeading` as
  ordinary text, keeping its `text-sm uppercase tracking-[3px] text-grayColor/80` styling.

Extract this into a single shared component rather than repeating the markup six times:
`components/SectionHeading.tsx`, props `{ label: string; action?: { href: string; text: string } }`.
The optional `action` renders a right-floated link (used by Projects for "View GitHub →").

## Side navigation rail

New component `components/SideNav.tsx`. The one deliberately bold element of this change.

**Desktop (`md` and up):**
- Fixed to the left edge, vertically centered (`fixed left-6 top-1/2 -translate-y-1/2 z-40`).
- One small dot per section (7 total: hero, about, experience, education, skills, projects,
  contact). Dots are `h-2 w-2 rounded-full`, inactive `bg-grayColor/30`, active
  `bg-lightGreen` (sage) and slightly scaled up.
- Each dot is an anchor to its section's `#id`. On hover, the section's name fades in to the right
  of the dot (`opacity-0 group-hover:opacity-100`, `transition-opacity`), in `font-sans`
  `text-xs uppercase tracking-widest text-grayColor`.
- The rail's own background is transparent. No card, no border, no blur panel — it reads as marks
  on the paper, not a floating UI chrome element.

**Active-section tracking:** a single `IntersectionObserver` in a `useEffect`, observing the seven
`<section>` elements, with `rootMargin: "-45% 0px -45% 0px"` so a section counts as active while
it occupies the vertical middle of the viewport. Store the active id in `useState`. Disconnect the
observer on unmount. The section ids already exist in `pages/index.tsx` — the observer targets
them via `document.querySelectorAll("section[id]")`, so no changes to the section markup are
needed beyond what the scroll-architecture section above specifies.

**Mobile (below `md`):** the rail is hidden (`hidden md:flex`). No hamburger menu, no drawer — the
Hero's existing in-page button row already provides section jumps, and a drawer for a
seven-anchor single page is unnecessary machinery. (This is a deliberate narrowing of the earlier
"collapses to a menu button on mobile" idea: on reflection it is unrequested complexity for a page
this short.)

**Accessibility (from the ui-ux-pro-max UX guidelines consulted during design):**
- The rail is a `<nav>` with `aria-label="Section navigation"`.
- Each dot link has an accessible name — the section name is real text (revealed on hover
  visually), not an `aria-label` on an empty element, so keyboard and screen-reader users get the
  same names sighted users do.
- Dot hit targets are padded to at least 44x44px (`p-3` around the 8px dot) even though the dot
  renders small, per the touch-target guideline. Focus rings are not removed.
- Because the rail is the first focusable thing on the page, `pages/index.tsx` gets a skip link
  (`Skip to content` → `#hero`), visually hidden until focused, per the skip-link guideline.

## Projects data

`data/portfolioData.ts` — replace the 5 current `projects` entries with 9. The `Project` type in
`typings.d.ts` currently has `title`, `linkToBuild`, `summary`, `technologies`, `image`. Add one
optional field: `liveUrl?: string`, for projects with a running deploy (distinct from
`linkToBuild`, which becomes the GitHub source link).

Order (most substantial / best-evidenced first):

1. **American Option Lattice Engine** — C++17 binomial lattice. CRR for European, Snell-envelope
   backward induction for American. O(N) low-memory path vs naive O(N²): 50,000-step American put
   goes 173s/9.7GB → 1.6s/0.4MB (109x faster, ~25,000x less memory); both paths agree to 1e-10.
   Validated against Black-Scholes convergence and put-call parity, 30 checks in CI.
   Source: `github.com/chetank03/american-option-lattice-engine`. No live URL (CLI tool).
2. **IICCI Trade Analytics** — Django REST + PostgreSQL + React/Recharts bilateral-trade platform.
   21 endpoints, 24 tests pinning aggregation rules, Firebase Google sign-in with a Django-side
   admin approval gate, Excel import, cached reporting endpoints.
   Live: `https://iicci.up.railway.app`. Source repo is private — omit `linkToBuild`.
3. **BigSMILES Viewer** — FastAPI + React/TypeScript/Cytoscape.js polymer-notation graph viewer;
   renders stochastic objects and repeat units as nested boxes rather than flattening them; RDKit
   per-unit formula/weight. Cut initial JS bundle 69% (632KB → 197KB) by code-splitting Cytoscape;
   13 API tests + 7 Playwright specs including axe-core WCAG 2.1 AA audits, all gated in CI.
   Live: `https://bigsmiles-viewer.up.railway.app`.
   Source: `github.com/chetank03/bigsmiles-viewer`.
4. **Studio (client site)** — Next.js + TypeScript + Supabase + Framer Motion site for a bespoke
   art-installation studio, with a custom admin area (rich-text journal editor, portfolio
   management, enquiry inbox wired to transactional email) so the non-technical owner runs it
   independently. Live: `https://studio-flax-mu-86.vercel.app`. Source repo is private — omit
   `linkToBuild`.
5. **Parkinson's Motion Monitor** — STM32 (DISCO-L475VG-IOT01A) mbed/PlatformIO firmware, ~1,445
   lines of C++. LSM6DSL IMU over I2C at 400kHz, 256-point CMSIS-DSP FFT over a 156-sample window
   at 52Hz to detect resting tremor (3-5Hz), dyskinesia (5-7Hz), and freezing of gait;
   3-window confirmation suppresses false positives; BLE GATT telemetry; interrupt-driven with a
   polling fallback so a missed data-ready line degrades sample rate rather than stalling.
   Source: `github.com/chetank03/parkinsons-motion-monitor`. No live URL (embedded).
6. **GLA-DPO Transformer** — PyTorch-from-scratch Gated Linear Attention LM (158M params) trained
   on TinyStories, then aligned with Direct Preference Optimization without a separate reward
   model. GLA matches plain linear attention's loss at equal steps while staying O(N), with
   constant inference memory vs a growing KV-cache. Summary must state it is a two-person NYU
   project (co-author Bryce Miranda: DPO and preference data; this author: GLA architecture,
   pretraining, generation/Gradio UI) — credit is not optional.
   Source: `github.com/chetank03/gla-dpo-transformer`. No live URL (local Gradio).
7. **Two Compilers: LLVM-IR and JVM Bytecode** — one entry covering both Scala compiler repos, the
   way the HRT resume already frames them. Regex-derivative lexer built from first principles,
   recursive-descent parsing; one targets LLVM-IR end to end (recursion, Mandelbrot, Towers of
   Hanoi), the other emits Jasmin-style JVM assembly (Collatz, Fibonacci, factorization, primes).
   `linkToBuild` points at `github.com/chetank03/functional-language-compiler-llvm`; the summary
   names `while-language-jvm-compiler` as the companion repo.
8. **Notely** — retained from the existing site data, copy unchanged (Django + ReactJS real-time
   collaborative notes, 50+ concurrent users, formula rendering). No repo or resume corroboration
   was found during research; the user confirmed it is real work. Keep existing `linkToBuild`
   value (currently empty) rather than inventing a link.
9. **2D Code Detection and Decoding** — retained from the existing site data, copy unchanged
   (CNN-based QR/Data Matrix detection at 96% accuracy, ONNX Runtime + OpenCV, up to 100 codes in
   under 500ms). Same corroboration note and same rule about not inventing a link.

**Honesty constraints on this data (binding):**
- Every metric above traces to a repo README or a resume; do not round, inflate, or add metrics
  that were not found.
- `mini-vllm` is deliberately excluded — its own README checklist is entirely unchecked and its
  repo description says "no engine yet."
- `Setiko` is deliberately excluded — no README exists, so there is nothing to describe honestly
  beyond a one-line repo blurb.
- Do not invent live URLs. Only the three confirmed deploys (IICCI, BigSMILES Viewer, Studio) get
  `liveUrl`.

## Projects presentation

`Projects.tsx` currently renders a full-viewport horizontal snap-scroll carousel: each project is
`w-screen h-screen`, so the section is 5 viewports wide and the user must scroll sideways through
whole screens. With 9 projects this becomes 9 viewports of horizontal scroll — the opposite of the
requested simplicity.

Replace with a **single-focus carousel** (the gazijarin pattern): one project card visible at a
time, sized to its content, with previous/next controls and dot pagination beneath.

- Local `useState` index, `0` to `projects.length - 1`. No wrapping — previous is disabled at 0,
  next disabled at the last index (disabled state uses reduced opacity plus the `disabled`
  attribute, not just a visual change).
- Prev/next are real `<button>` elements with `aria-label="Previous project"` /
  `"Next project"`, not bare icons in a div.
- Dot pagination: one `<button>` per project, `aria-label={`Go to project ${i + 1}`}`, active dot
  filled `bg-lightGreen`, inactive `bg-grayColor/30`.
- The card itself keeps the Zen-theme styling already applied by the previous spec
  (`bg-darkBackground`, `border-darkGreen/20`, `rounded-3xl`, `shadow-darkBlack/10`) and its
  existing content structure (title, technology pills, summary), plus a new link row: "Source →"
  when `linkToBuild` is set and "Live →" when `liveUrl` is set. Both open in a new tab with
  `rel="noopener noreferrer"`.
- The decorative `-skew-y-12` full-width band currently at the bottom of `Projects.tsx` is
  removed — it was scenery for the full-bleed carousel and does not survive the layout change.
- Keep the existing Framer Motion fade/slide on the card, keyed by index so switching projects
  re-triggers it. No new animation libraries, no autoplay (autoplay would fight the calm brief and
  the reduced-motion guideline).

## Files touched

- Create: `components/SideNav.tsx`, `components/SectionHeading.tsx`
- Modify: `pages/index.tsx` (scroll wrapper, skip link, mount `SideNav`)
- Modify: `components/Projects.tsx` (single-focus carousel, links, remove skew band)
- Modify: `components/About.tsx`, `components/WorkExperience.tsx`, `components/Education.tsx`,
  `components/Skills.tsx`, `components/ContactMe.tsx` (heights → padding, adopt `SectionHeading`,
  drop accent dot and absolute-heading offsets)
- Modify: `data/portfolioData.ts` (9 projects), `typings.d.ts` (`liveUrl?: string`)
- Unchanged: `components/Hero.tsx` (keeps `h-screen` and its button row),
  `components/ExperienceCard.tsx`, `components/Skill.tsx`, `tailwind.config.js`,
  `styles/globals.css`, `pages/_document.tsx`

## Verification

No test framework exists in this project (no Jest/RTL in `package.json`) and none is added — same
constraint as the Zen theme work. Verification is:

1. `npm run build` succeeds.
2. Scroll the full page: no viewport-snapping, every section is only as tall as its content needs
   (Hero excepted), hairline dividers still separate sections.
3. Side rail: dots track the section in the viewport middle while scrolling; hovering reveals
   names; clicking jumps to the section; rail is absent below `md`.
4. Projects: all 9 reachable via prev/next and dots; prev disabled on the first, next disabled on
   the last; Source/Live links open the right targets.
5. Keyboard pass: Tab from page load reaches the skip link first, then the rail, then content;
   focus rings visible throughout; carousel buttons operable by keyboard.
6. Per the user's standing preference, a single spot-check screenshot only — no iterative
   screenshot loop for aesthetic judgment. The user reviews the running site themselves.
