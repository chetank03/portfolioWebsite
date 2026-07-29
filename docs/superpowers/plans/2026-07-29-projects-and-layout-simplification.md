# Projects Expansion and Layout Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace viewport-locked snap scrolling with natural scroll, add a transparent scroll-spy side rail, restyle every section heading to an in-flow `/ label` pattern, and expand Projects from 5 entries in a full-bleed horizontal carousel to 9 entries in a single-focus carousel.

**Architecture:** Two new presentational components (`SectionHeading`, `SideNav`) absorb patterns currently duplicated or absent. `SideNav` is the only stateful addition, using one `IntersectionObserver` over the existing `section[id]` elements in `pages/index.tsx` — no scroll-event listeners, no new libraries. Every section component drops its height constraint and absolute-positioned heading in favour of ordinary flow plus padding. Project data grows a single optional `liveUrl` field; `Projects.tsx` becomes index-driven local state.

**Tech Stack:** Next.js 13.0.2 (Pages Router), React 18.2, Tailwind CSS 3.2, Framer Motion 7, `@heroicons/react` 2 (all already installed).

## Global Constraints

- **No new npm dependencies.** Chevron icons come from the already-installed `@heroicons/react/24/solid`.
- **No test framework exists** (`package.json` has no Jest/RTL/Vitest) and none is added. Per-task verification is `npm run build` succeeding plus the stated manual check. Do not flag or "fix" the absence of unit tests.
- **Colour tokens are frozen.** `tailwind.config.js`, `styles/globals.css`, and `pages/_document.tsx` are not touched by this plan. Use only the existing tokens: `lightBackground`, `darkBackground`, `darkBlack`, `grayColor` (`#6C6555`), `lightGreen` (`#7C9473`), `darkGreen` (`#5B7A5A`), `yellowColor` (`#C9A15A`), and the `font-serif` / `font-sans` families.
- **The gold `yellowColor` accent dot is removed from all section headings.** The `/` prefix replaces it. `yellowColor` becomes unused by this plan's components — that is expected, leave the token defined.
- **Project copy is evidence-bound.** Every metric in Task 1 traces to a repo README or a resume. Do not round, embellish, or add metrics. Do not invent GitHub or live URLs — only IICCI, BigSMILES Viewer, and Studio have live URLs; IICCI and Studio have private repos and therefore an empty `linkToBuild`.
- **`mini-vllm` and `Setiko` are deliberately excluded** from the project list (unfinished / no README to describe honestly). Do not add them.
- **The GLA-DPO Transformer summary must credit co-author Bryce Miranda.** Not optional.
- **`components/Hero.tsx`, `components/ExperienceCard.tsx`, `components/Skill.tsx` are not modified.** Hero deliberately keeps `h-screen` and its in-page button row.
- **No `git push`.** The plan ends at a local commit; pushing requires separate user confirmation.
- Branch is `japanese-zen-theme`. Do not switch or create branches.

---

## Task 1: Project data — `liveUrl` field and 9 curated entries

**Files:**
- Modify: `typings.d.ts:58-65` (the `Project` interface)
- Modify: `data/portfolioData.ts:112-188` (the `projects` array)

**Interfaces:**
- Produces: `Project.liveUrl?: string` — an optional live-deploy URL, distinct from `linkToBuild` (which is the GitHub source link and stays a required `string`, empty for private repos). `Projects.tsx` in Task 7 renders a "Source →" link when `linkToBuild` is truthy and a "Live →" link when `liveUrl` is truthy.

- [ ] **Step 1: Add the optional `liveUrl` field to the `Project` interface**

Replace the `Project` interface in `typings.d.ts` (currently lines 58-65) with:

```ts
export interface Project extends SanityBody {
    _type: 'project';
    title: string;
    linkToBuild: string;
    liveUrl?: string;
    image: Image | null;
    summary: string;
    technologies: Technology[];
}
```

- [ ] **Step 2: Replace the `projects` array in `data/portfolioData.ts`**

Replace the entire `export const projects: Project[] = [ ... ];` block with the following. Keep the surrounding `pageInfo`, `socials`, `skills`, `experiences`, and `education` exports untouched.

```ts
export const projects: Project[] = [
  {
    ...blankMeta,
    _id: "project-option-engine",
    _type: "project",
    title: "American Option Lattice Engine",
    linkToBuild: "https://github.com/chetank03/american-option-lattice-engine",
    image: null,
    summary:
      "C++17 binomial lattice pricer: Cox-Ross-Rubinstein for European options, Snell-envelope backward induction for American early exercise. Swapping the naive O(N^2) grid for an O(N) rolling path took a 50,000-step American put from 173 seconds and 9.7 GB to 1.6 seconds and 0.4 MB, with both paths agreeing to 1e-10. Validated against Black-Scholes convergence and put-call parity rather than against itself, with 30 checks gating CI. Testing surfaced 3 real defects, including an incomplete no-arbitrage check that was silently admitting a negative risk-neutral probability.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-cpp-lattice", _type: "technology", image: null, progress: 80, title: "C++17" },
      { ...blankMeta, _id: "proj-tech-crr", _type: "technology", image: null, progress: 72, title: "CRR Lattice" },
      { ...blankMeta, _id: "proj-tech-quant", _type: "technology", image: null, progress: 68, title: "Quant Finance" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-iicci",
    _type: "project",
    title: "IICCI Trade Analytics",
    linkToBuild: "",
    liveUrl: "https://iicci.up.railway.app",
    image: null,
    summary:
      "India-Italy bilateral trade analytics platform: Django REST and PostgreSQL behind a React and Recharts dashboard. 21 endpoints covered by 24 tests that pin the aggregation rules, Firebase Google sign-in gated behind a Django-side admin approval step, Excel import in append or replace mode, and short-lived response caching on the reporting routes.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-django-iicci", _type: "technology", image: null, progress: 80, title: "Django REST" },
      { ...blankMeta, _id: "proj-tech-postgres-iicci", _type: "technology", image: null, progress: 74, title: "PostgreSQL" },
      { ...blankMeta, _id: "proj-tech-recharts-iicci", _type: "technology", image: null, progress: 76, title: "React + Recharts" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-bigsmiles",
    _type: "project",
    title: "BigSMILES Viewer",
    linkToBuild: "https://github.com/chetank03/bigsmiles-viewer",
    liveUrl: "https://bigsmiles-viewer.up.railway.app",
    image: null,
    summary:
      "Parses a subset of the BigSMILES polymer notation into a graph, rendering stochastic objects and repeat units as nested boxes instead of flattening them the way a plain SMILES viewer would, with RDKit computing per-unit formula and weight. Code-splitting Cytoscape cut the initial JS bundle 69 percent, from 632 KB to 197 KB. 13 API tests and 7 Playwright specs run in CI, including axe-core WCAG 2.1 AA audits that caught a real contrast failure.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-fastapi-bigsmiles", _type: "technology", image: null, progress: 78, title: "FastAPI" },
      { ...blankMeta, _id: "proj-tech-cytoscape-bigsmiles", _type: "technology", image: null, progress: 74, title: "Cytoscape.js" },
      { ...blankMeta, _id: "proj-tech-rdkit-bigsmiles", _type: "technology", image: null, progress: 70, title: "RDKit" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-studio",
    _type: "project",
    title: "Studio (client site)",
    linkToBuild: "",
    liveUrl: "https://studio-flax-mu-86.vercel.app",
    image: null,
    summary:
      "Site for a bespoke art-installation studio, built to a Figma design in Next.js, TypeScript, Supabase, and Framer Motion. Behind it sits a custom admin area with a rich-text journal editor, portfolio management, and an enquiry inbox wired to transactional email, so the owner runs the site without a developer. Error boundaries in place and CI running lint and build on every push.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-next-studio", _type: "technology", image: null, progress: 80, title: "Next.js" },
      { ...blankMeta, _id: "proj-tech-supabase-studio", _type: "technology", image: null, progress: 74, title: "Supabase" },
      { ...blankMeta, _id: "proj-tech-framer-studio", _type: "technology", image: null, progress: 72, title: "Framer Motion" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-parkinsons",
    _type: "project",
    title: "Parkinson's Motion Monitor",
    linkToBuild: "https://github.com/chetank03/parkinsons-motion-monitor",
    image: null,
    summary:
      "About 1,445 lines of embedded C++ on an STM32 DISCO-L475VG-IOT01A, reading an LSM6DSL IMU over I2C at 400 kHz. A 256-point CMSIS-DSP FFT over a 156-sample window at 52 Hz separates resting tremor (3-5 Hz), dyskinesia (5-7 Hz), and freezing of gait, with 3-window confirmation to suppress false positives and BLE GATT telemetry out. Interrupt-driven with a polling fallback, so a missed data-ready line degrades the sample rate instead of stalling the device. Thresholds are hand-tuned; there is no on-device ML.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-stm32-parkinsons", _type: "technology", image: null, progress: 74, title: "STM32 / mbed" },
      { ...blankMeta, _id: "proj-tech-cmsis-parkinsons", _type: "technology", image: null, progress: 70, title: "CMSIS-DSP FFT" },
      { ...blankMeta, _id: "proj-tech-ble-parkinsons", _type: "technology", image: null, progress: 66, title: "BLE GATT" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-gla-dpo",
    _type: "project",
    title: "GLA-DPO Transformer",
    linkToBuild: "https://github.com/chetank03/gla-dpo-transformer",
    image: null,
    summary:
      "A 158M-parameter Gated Linear Attention language model written from scratch in PyTorch, pretrained on TinyStories and then aligned with Direct Preference Optimization, no separate reward model. GLA matches plain linear attention's loss at equal steps while staying O(N), and holds memory constant during inference where a standard transformer's KV-cache keeps growing. A two-person NYU project with Bryce Miranda: he built the DPO stage and preference data, I built the GLA architecture, pretraining, and the generation interface.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-pytorch-gla", _type: "technology", image: null, progress: 76, title: "PyTorch" },
      { ...blankMeta, _id: "proj-tech-gla", _type: "technology", image: null, progress: 72, title: "Gated Linear Attention" },
      { ...blankMeta, _id: "proj-tech-dpo", _type: "technology", image: null, progress: 70, title: "DPO" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-compilers",
    _type: "project",
    title: "Two Compilers: LLVM-IR and JVM Bytecode",
    linkToBuild: "https://github.com/chetank03/functional-language-compiler-llvm",
    image: null,
    summary:
      "Two Scala compilers sharing a regex-derivative lexer built from first principles rather than a generator. One takes a small functional language to LLVM-IR end to end, demonstrated on recursion, Mandelbrot, and Towers of Hanoi. The companion repo, while-language-jvm-compiler, interprets a WHILE-like imperative language and emits Jasmin-style JVM assembly, demonstrated on Collatz, Fibonacci, factorization, and primes.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-scala-compilers", _type: "technology", image: null, progress: 70, title: "Scala" },
      { ...blankMeta, _id: "proj-tech-llvm-compilers", _type: "technology", image: null, progress: 68, title: "LLVM-IR" },
      { ...blankMeta, _id: "proj-tech-jvm-compilers", _type: "technology", image: null, progress: 68, title: "JVM Bytecode" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-notely",
    _type: "project",
    title: "Notely - Real-Time Notes Platform",
    linkToBuild: "",
    image: null,
    summary:
      "Built a Django and ReactJS collaboration platform supporting 50+ concurrent users with real-time editing and formula rendering, reducing note-sharing time by 60% for technical coursework.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-notely-django", _type: "technology", image: null, progress: 80, title: "Django" },
      { ...blankMeta, _id: "proj-tech-notely-react", _type: "technology", image: null, progress: 84, title: "ReactJS" },
      { ...blankMeta, _id: "proj-tech-notely-rest", _type: "technology", image: null, progress: 74, title: "REST APIs" },
    ],
  },
  {
    ...blankMeta,
    _id: "project-2d-code",
    _type: "project",
    title: "2D Code Detection and Decoding",
    linkToBuild: "",
    image: null,
    summary:
      "Designed a CNN-based computer vision model achieving 96% accuracy for QR and Data Matrix detection, then deployed it with ONNX Runtime and OpenCV to detect up to 100 codes in under 500ms.",
    technologies: [
      { ...blankMeta, _id: "proj-tech-cnn", _type: "technology", image: null, progress: 78, title: "CNN" },
      { ...blankMeta, _id: "proj-tech-onnx-cv", _type: "technology", image: null, progress: 76, title: "ONNX Runtime" },
      { ...blankMeta, _id: "proj-tech-opencv", _type: "technology", image: null, progress: 80, title: "OpenCV" },
    ],
  },
];
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: succeeds. The existing `Projects.tsx` still renders all 9 in its old horizontal carousel at this point — that is fine and expected; Task 7 replaces it.

- [ ] **Step 4: Commit**

```bash
git add typings.d.ts data/portfolioData.ts
git commit -m "Expand portfolio to 9 projects with source and live links"
```

---

## Task 2: `SectionHeading` component

**Files:**
- Create: `components/SectionHeading.tsx`

**Interfaces:**
- Produces: `export default function SectionHeading({ label, action }: { label: string; action?: { href: string; text: string } })`. Callers pass `label` already lowercase (e.g. `"about"`); the component does not transform case. When `action` is given, it renders a right-aligned external link after the rule. The component supplies its own `mb-12` bottom margin, so callers must not add their own top spacing beneath it.

- [ ] **Step 1: Create the component**

```tsx
import React from "react";

type Props = {
  label: string;
  action?: { href: string; text: string };
};

export default function SectionHeading({ label, action }: Props) {
  return (
    <div className="mb-12 flex w-full items-center gap-4">
      <h3 className="whitespace-nowrap font-serif text-xl text-grayColor md:text-2xl">
        <span className="text-darkGreen">/</span> {label}
      </h3>

      <span aria-hidden="true" className="h-px flex-1 bg-grayColor/20" />

      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap font-sans text-xs uppercase tracking-widest text-grayColor transition-colors hover:text-darkGreen"
        >
          {action.text}
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: succeeds. Nothing imports the component yet, so there is no visible change.

- [ ] **Step 3: Commit**

```bash
git add components/SectionHeading.tsx
git commit -m "Add SectionHeading component with in-flow label and hairline rule"
```

---

## Task 3: `SideNav` scroll-spy rail

**Files:**
- Create: `components/SideNav.tsx`

**Interfaces:**
- Consumes: the seven `<section id="...">` elements rendered by `pages/index.tsx` — `hero`, `about`, `experience`, `education`, `skills`, `projects`, `contact`. It finds them at runtime via `document.querySelectorAll("section[id]")`, so it takes no props.
- Produces: `export default function SideNav()`. Task 4 mounts it once in `pages/index.tsx`.

Why the label is absolutely positioned: an `opacity-0` label in normal flow would still occupy layout width, leaving an invisible ~150px-wide column of links intercepting clicks over page content. Positioning it `absolute left-full` with `pointer-events-none` keeps each anchor's hit area to the 44px dot while still revealing the name on hover. The label is real text (not an `aria-label` on an empty element), so assistive tech reads the same names sighted users see.

- [ ] **Step 1: Create the component**

```tsx
import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col md:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                isActive ? "scale-150 bg-lightGreen" : "bg-grayColor/30"
              }`}
            />
            <span
              className={`pointer-events-none absolute left-full whitespace-nowrap font-sans text-xs uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                isActive ? "text-darkGreen" : "text-grayColor"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: succeeds. Nothing imports it yet.

- [ ] **Step 3: Commit**

```bash
git add components/SideNav.tsx
git commit -m "Add SideNav scroll-spy rail with hover-revealed labels"
```

---

## Task 4: Page shell — natural scroll, skip link, mount the rail

**Files:**
- Modify: `pages/index.tsx` (full file, 119 lines)

**Interfaces:**
- Consumes: `SideNav` from Task 3 (default export, no props).

Three things change on the wrapper `div`: `h-screen`, `snap-y`, `snap-mandatory`, and `overflow-y-scroll` come off so the document scrolls normally instead of the wrapper. The `scrollbar-thin scrollbar-track-lightBackground scrollbar-thumb-darkGreen/80` classes also come off — they styled the wrapper's own scrollbar, which no longer exists once the wrapper stops being a scroll container. `overflow-x-hidden` stays. Every `snap-start` / `snap-center` comes off the sections; the `border-t border-grayColor/20` hairlines stay.

- [ ] **Step 1: Replace `pages/index.tsx`**

```tsx
import Head from "next/head";
import Education from "../components/Education";
import Hero from "../components/Hero";
import { Education as EducationType, Experience, PageInfo, Skill, Project, Social } from "../typings";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import SideNav from "../components/SideNav";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import {
  experiences,
  education,
  pageInfo,
  projects,
  skills,
  socials,
} from "../data/portfolioData";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  education: EducationType[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, education, projects, skills, socials }: Props) => {
  return (
    <div className="bg-lightBackground bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#FAF6EE_42%,#F1EBDD_100%)] text-darkBlack overflow-x-hidden z-0">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Chetan Kodeboyina | Portfolio</title>
      </Head>

      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-darkGreen/40 focus:bg-darkBackground focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-darkBlack"
      >
        Skip to content
      </a>

      <SideNav />

      {/* Hero */}
      <section id="hero">
        <Hero pageInfo={pageInfo} socials={socials} />
      </section>

      {/* About */}
      <section id="about" className="border-t border-grayColor/20">
        <About pageInfo={pageInfo} />
      </section>

      {/* Experiences */}
      <section id="experience" className="border-t border-grayColor/20">
        <WorkExperience experiences={experiences} />
      </section>

      {/* Education */}
      <section id="education" className="border-t border-grayColor/20">
        <Education education={education} />
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-grayColor/20">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-grayColor/20">
        <Projects projects={projects} />
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-grayColor/20">
        <ContactMe pageInfo={pageInfo} />
      </section>

      <Link href="#hero" aria-label="Back to top">
        <footer className="sticky bottom-5 z-30 flex w-full cursor-pointer justify-end pr-5 md:pr-10">
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 bg-darkGreen/80 rounded-full flex items-center justify-center shadow-lg shadow-darkGreen/20">
              <ArrowUpIcon className="h-6 w-6 text-white animate-pulse" />
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      pageInfo,
      experiences,
      education,
      skills,
      projects,
      socials,
    },
  };
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Manual check**

Run `npx next start -p 3904`, open `http://127.0.0.1:3904`. Confirm: the page scrolls continuously with no snapping; the side rail is visible at the left edge and its active dot changes as you scroll; pressing Tab from page load reveals a "Skip to content" chip. Sections still have their old absolute headings and full-viewport heights at this point — Tasks 5-7 fix that. Stop the server when done.

- [ ] **Step 4: Commit**

```bash
git add pages/index.tsx
git commit -m "Switch to natural scroll, add skip link and side nav rail"
```

---

## Task 5: `h-screen` sections — About, Skills, Contact

**Files:**
- Modify: `components/About.tsx` (full file, 57 lines)
- Modify: `components/Skills.tsx` (full file, 38 lines)
- Modify: `components/ContactMe.tsx` (full file, 90 lines)

**Interfaces:**
- Consumes: `SectionHeading` from Task 2 (`{ label, action? }`; supplies its own `mb-12`).

These three each carry `h-screen` on their root element. `Skills.tsx` carries **both** `h-screen` and `min-h-screen` on the same element — remove both. Each also has an absolute-positioned heading with the gold dot, which `SectionHeading` replaces. `About.tsx`'s inner circle keeps its `-mb-24 md:mb-0` overlap removed in favour of an ordinary flex `gap-12`, since the negative margin only existed to claw back space in the viewport-locked layout. `About.tsx`'s pre-existing `md:h-95` class is not a real Tailwind utility and has never done anything; it is left alone as out of scope.

- [ ] **Step 1: Replace `components/About.tsx`**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { PageInfo } from "../typings";
import SectionHeading from "./SectionHeading";

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto flex max-w-7xl flex-col px-12 py-24 md:px-16 md:py-32"
    >
      <SectionHeading label="about" />

      <div className="flex flex-col items-center gap-12 text-center md:flex-row md:justify-evenly md:text-left">
        <motion.div
          initial={{
            x: -200,
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="flex h-52 w-52 flex-shrink-0 items-center justify-center rounded-full border border-darkGreen/30 bg-gradient-to-br from-darkBackground to-darkGreen/20 shadow-2xl shadow-darkGreen/10 md:h-95 md:w-64 md:rounded-lg xl:h-[600px] xl:w-[500px]"
        >
          <div className="text-center px-8">
            <p className="text-6xl xl:text-8xl font-serif font-semibold text-darkGreen">CK</p>
            <p className="mt-4 text-sm md:text-base uppercase tracking-[8px] text-grayColor">
              Software Engineer
            </p>
          </div>
        </motion.div>
        <div className="space-y-5 md:space-y-10 px-0 md:px-10">
          <h4 className="text-xl md:text-4xl font-serif font-semibold">
            Here is a{" "}
            <span className=" underline decoration-darkGreen/50">little</span>{" "}
            background
          </h4>
          <p className="text-sm md:text-lg lg:text-lg text-justify">
            {pageInfo?.backgroundInformation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Replace `components/Skills.tsx`**

The "Hover over a skill" subheading was `absolute top-32 md:top-36`; it moves into the flow directly under the `SectionHeading`, keeping its `text-sm uppercase tracking-[3px] text-grayColor/80` styling.

```tsx
import { motion } from "framer-motion";
import React from "react";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";
import SectionHeading from "./SectionHeading";

type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto flex max-w-6xl flex-col px-12 py-24 md:px-16 md:py-32"
    >
      <SectionHeading label="skills" />

      <p className="-mt-8 mb-10 uppercase tracking-[3px] text-grayColor/80 text-sm">
        Hover over a skill for current proficiency
      </p>

      <div className="grid grid-cols-4 gap-4 md:gap-5 justify-items-center">
        {skills?.slice(0, skills.length / 2).map((skill) => (
          <Skill key={skill._id} skill={skill} />
        ))}

        {skills?.slice(skills.length / 2, skills.length).map((skill) => (
          <Skill key={skill._id} skill={skill} directionLeft />
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Replace `components/ContactMe.tsx`**

```tsx
import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../typings";
import SectionHeading from "./SectionHeading";

type Props = {
  pageInfo: PageInfo;
};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe({ pageInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:${pageInfo.email}?subject=${formData.subject}&body=Hi, my name is ${formData.name}. You can reach me at ${formData.email}. ${formData.message}`;
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-12 py-24 md:px-16 md:py-32">
      <SectionHeading label="contact" />

      <div className="mx-auto flex flex-col space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10">
        <h4 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-serif font-semibold text-center">
          I have got just what you need.{" "}
          <span className="decoration-darkGreen/50 underline">Lets talk.</span>
        </h4>

        <div className="space-y-1 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-5">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-darkGreen h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl lg:text-2xl">{pageInfo.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-darkGreen h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl lg:text-2xl">{pageInfo.email}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-darkGreen h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl lg:text-2xl">{pageInfo.address}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-80 md:w-fit mx-auto"
        >
          <div className="md:flex md:space-x-2 space-y-2 md:space-y-0 ">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput w-80 md:w-auto"
              type="text"
            />{" "}
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput w-80 md:w-auto"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput "
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput"
          />
          <button className="bg-lightGreen py-3 md:py-5 px-10 rounded-lg text-darkBlack font-bold text-lg transition hover:bg-darkGreen">
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/About.tsx components/Skills.tsx components/ContactMe.tsx
git commit -m "Convert About, Skills, Contact to natural height with SectionHeading"
```

---

## Task 6: `min-h-screen` sections — Experience and Education

**Files:**
- Modify: `components/WorkExperience.tsx` (full file, 39 lines)
- Modify: `components/Education.tsx` (full file, 81 lines)

**Interfaces:**
- Consumes: `SectionHeading` from Task 2 (`{ label, action? }`; supplies its own `mb-12`).

Both drop `min-h-screen` and their absolute heading. `Education.tsx`'s grid drops the `mt-16` that compensated for the absolute heading, and its heading's `left-1/2 -translate-x-1/2` centering goes away with the heading itself. `formatMonthYear`, both sort comparators, the `Image` logo usage, and `ExperienceCard` are untouched.

- [ ] **Step 1: Replace `components/WorkExperience.tsx`**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";
import SectionHeading from "./SectionHeading";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto flex max-w-6xl flex-col px-12 py-24 text-left md:px-16 md:py-32"
    >
      <SectionHeading label="experience" />

      {/* Experience cards */}
      <div className="flex w-full flex-col flex-wrap items-stretch justify-center gap-12 md:flex-row">
        {experiences
          ?.slice() // make a shallow copy so we don't mutate the original array
          .sort(
            (a, b) =>
              new Date(b.dateStarted).getTime() -
              new Date(a.dateStarted).getTime()
          )
          .map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Replace `components/Education.tsx`**

```tsx
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Education as EducationType } from "../typings";
import SectionHeading from "./SectionHeading";

type Props = { education: EducationType[] };

function formatMonthYear(date: string) {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Education({ education }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto flex max-w-6xl flex-col px-12 py-24 md:px-16 md:py-32"
    >
      <SectionHeading label="education" />

      <div className="grid w-full gap-6 md:grid-cols-2">
        {education
          .slice()
          .sort(
            (a, b) =>
              new Date(b.dateStarted).getTime() -
              new Date(a.dateStarted).getTime()
          )
          .map((item) => (
            <article
              key={item._id}
              className="flex h-full flex-col items-center rounded-3xl border border-darkGreen/20 bg-darkBackground p-6 text-center shadow-2xl shadow-darkBlack/10"
            >
              {item.logoUrl && (
                <div className="mb-5 flex h-24 w-40 items-center justify-center rounded-2xl border border-darkGreen/20 bg-white px-4 shadow-lg shadow-darkGreen/10">
                  <Image
                    src={item.logoUrl}
                    alt={`${item.school} logo`}
                    width={140}
                    height={72}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              )}
              <p className="text-sm uppercase tracking-[6px] text-grayColor">
                {item.school}
              </p>
              <h4 className="mt-3 text-xl md:text-2xl font-serif font-semibold text-darkBlack">
                {item.degree}
              </h4>
              <p className="mt-3 text-sm md:text-base text-grayColor">
                {item.location} | {formatMonthYear(item.dateStarted)} -{" "}
                {formatMonthYear(item.dateEnded)}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full border border-darkGreen/30 bg-darkGreen/10 px-3 py-1 text-sm text-darkGreen"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </article>
          ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/WorkExperience.tsx components/Education.tsx
git commit -m "Convert Experience and Education to natural height with SectionHeading"
```

---

## Task 7: Projects single-focus carousel

**Files:**
- Modify: `components/Projects.tsx` (full file, 70 lines)

**Interfaces:**
- Consumes: `SectionHeading` from Task 2; `Project.liveUrl?: string` and `Project.linkToBuild: string` from Task 1.

Replaces the full-bleed horizontal snap carousel (each project `w-screen h-screen`, which with 9 projects would be nine viewports of sideways scroll) with one card at a time driven by a `useState` index. Prev/next do not wrap — they are `disabled` at the bounds, using the real `disabled` attribute so keyboard and assistive tech get the state, not just a visual cue. The dashed title placeholder box and the decorative `-skew-y-12` band both go: they were scenery for the full-bleed layout. `ChevronLeftIcon` / `ChevronRightIcon` come from the already-installed `@heroicons/react/24/solid` — no new dependency. No autoplay.

- [ ] **Step 1: Replace `components/Projects.tsx`**

```tsx
import { motion } from "framer-motion";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Project } from "../typings";
import SectionHeading from "./SectionHeading";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  if (!project) return null;

  const linkClasses =
    "font-sans text-sm uppercase tracking-widest text-grayColor transition-colors hover:text-darkGreen";
  const arrowClasses =
    "flex h-11 w-11 items-center justify-center rounded-full border border-darkGreen/30 text-darkGreen transition hover:bg-darkGreen/10 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="mx-auto flex max-w-4xl flex-col px-12 py-24 md:px-16 md:py-32">
      <SectionHeading
        label="projects"
        action={{ href: "https://github.com/chetank03", text: "View GitHub →" }}
      />

      <motion.article
        key={project._id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-darkGreen/20 bg-darkBackground p-8 shadow-2xl shadow-darkBlack/10 md:p-10"
      >
        <h4 className="font-serif text-2xl font-semibold text-darkBlack md:text-3xl">
          {project.title}
        </h4>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology._id}
              className="rounded-full border border-darkGreen/30 bg-darkGreen/10 px-3 py-1 text-sm text-darkGreen"
            >
              {technology.title}
            </span>
          ))}
        </div>

        <p className="mt-6 text-justify text-sm text-darkBlack md:text-base">
          {project.summary}
        </p>

        {(project.linkToBuild || project.liveUrl) && (
          <div className="mt-8 flex flex-wrap gap-6">
            {project.linkToBuild && (
              <a
                href={project.linkToBuild}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Source →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Live →
              </a>
            )}
          </div>
        )}
      </motion.article>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setIndex((current) => current - 1)}
          disabled={index === 0}
          aria-label="Previous project"
          className={arrowClasses}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center">
          {projects.map((item, i) => (
            <button
              key={item._id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to project ${i + 1}: ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-11 w-6 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index ? "scale-150 bg-lightGreen" : "bg-grayColor/30"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIndex((current) => current + 1)}
          disabled={index === projects.length - 1}
          aria-label="Next project"
          className={arrowClasses}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 text-center font-sans text-xs uppercase tracking-widest text-grayColor">
        {index + 1} / {projects.length}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx
git commit -m "Replace full-bleed project carousel with single-focus carousel"
```

---

## Task 8: Full-site verification

**Files:** none (verification only)

**Interfaces:** none — verifies the cumulative result of Tasks 1-7.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: succeeds with no errors and no new warnings beyond the pre-existing `Browserslist: caniuse-lite is outdated` notice.

- [ ] **Step 2: Start the built site**

Run: `npx next start -p 3904`
Then open `http://127.0.0.1:3904`.

- [ ] **Step 3: Layout checks**

Confirm by scrolling top to bottom:
- No viewport snapping; scrolling is continuous.
- Hero is roughly full height; every other section is only as tall as its content (no large empty gaps inside a section).
- A hairline rule separates each section from the one above (About through Contact).
- Every section from About down shows a left-aligned lowercase `/ label` heading with a thin rule running to the right, and no gold dot anywhere.
- Projects' heading has a "View GitHub" link at the right end of its rule.

- [ ] **Step 4: Side rail checks**

- The rail sits at the left edge, vertically centred, with 7 dots.
- Scrolling changes which dot is filled sage green, tracking the section in the middle of the viewport.
- Hovering a dot reveals its section name to the right; the name does not shift the layout.
- Clicking a dot jumps to that section.
- Narrow the window below 768px: the rail disappears.

- [ ] **Step 5: Projects carousel checks**

- All 9 projects are reachable via next and via the dots; the counter reads `1 / 9` through `9 / 9`.
- On project 1 the previous arrow is visibly dimmed and does nothing; on project 9 the next arrow is dimmed and does nothing.
- "Source →" appears for the 5 projects with a GitHub link (Option Engine, BigSMILES Viewer, Parkinson's, GLA-DPO, Compilers) and is absent for IICCI, Studio, Notely, and 2D Code Detection.
- "Live →" appears only on IICCI, BigSMILES Viewer, and Studio, and each opens the right URL in a new tab.

- [ ] **Step 5b: Sticky footer check**

The back-to-top button used to be sticky inside a scrolling wrapper; the wrapper no longer scrolls. Confirm it still sits at the bottom-right of the viewport while scrolling and still jumps to the top when clicked. If it has instead scrolled away with the document, report it rather than redesigning it.

- [ ] **Step 6: Keyboard pass**

Reload, then press Tab repeatedly from page load. Confirm: the "Skip to content" chip appears first and works, then focus moves through the rail dots, then into page content; focus outlines are visible throughout; the carousel arrows and dots are reachable and activate with Enter/Space; disabled arrows are skipped.

- [ ] **Step 7: Spot-check screenshot**

Take a **single** full-page screenshot as a sanity check that nothing is visibly broken. Per the user's standing preference, do not iterate on pixel-level polish through repeated screenshots — the user reviews the running site themselves for aesthetic judgement. Stop the server when done.

- [ ] **Step 8: Report, do not push**

Summarise the verification results to the user, including anything that failed. **Do not run `git push`** — the user confirms separately before anything leaves the machine.
