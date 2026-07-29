# Japanese Zen Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the portfolio (chetank03/portfolioWebsite) from its current dark neon-teal
theme to a light, Japanese Zen-minimalist "washi paper" theme, per
`docs/superpowers/specs/2026-07-29-japanese-zen-theme-design.md`.

**Architecture:** Config-driven color tokens in `tailwind.config.js` handle most of the
change automatically (component files reference token names like `bg-darkBackground`,
`text-darkGreen`). A second, explicit sweep replaces hardcoded dark-theme literal classes
(`bg-slate-950`, `text-slate-400`, `shadow-black/30`, raw hex props) that don't route
through the token system. Typography is added via a plain `<link>`-based Google Fonts
import in a new `pages/_document.tsx` (no new npm dependency, works regardless of the
pinned Next 13.0.2's `next/font` support). One signature SVG (ensō) and a repeated small
accent-dot motif are added inline in JSX — no new components, no new dependencies.

**Tech Stack:** Next.js 13.0.2 (Pages Router), Tailwind CSS 3.2, Framer Motion 7 (unchanged).

## Global Constraints

- Every color value below is copied verbatim from the approved spec — do not substitute
  approximate hexes.
- No new npm dependencies (fonts load via `<link>`, not `next/font` or a Google Fonts npm
  package — this project pins `next@13.0.2`, predating built-in `next/font`).
- No content/copy changes. No new sections. No layout restructuring beyond the specific
  spacing bumps listed per task.
- No literal Japanese script/kanji anywhere in the UI — the gold accent dot is an abstract
  mark, not a character.
- This is a pure visual/CSS/markup change with zero existing test infrastructure (no
  Jest/RTL in `package.json`). The TDD loop below is adapted accordingly: "test" =
  `npm run build` (catches TS/JSX errors the compiler would otherwise hide) plus a manual
  screenshot check of the affected section via a local dev server. Do not add a test
  framework solely for this change — that would be scope creep for a static portfolio site.
- Every task must leave the site in a state where `npm run build` succeeds.

---

## Task 1: Design tokens, global base styles, and font loading

**Files:**
- Modify: `tailwind.config.js` (full file, 22 lines)
- Modify: `styles/globals.css` (full file, 17 lines)
- Create: `pages/_document.tsx`

**Interfaces:**
- Produces: Tailwind token values (`lightBackground`, `darkBackground`, `darkBlack`,
  `grayColor`, `lightGreen`, `darkGreen`, `yellowColor`) and two new `fontFamily` keys
  (`serif`, `sans`) that every later task's `className` strings rely on.

- [ ] **Step 1: Replace the color tokens and add font families in `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#7C9473",
        darkGreen: "#5B7A5A",
        lightBackground: "#FAF6EE",
        darkBackground: "#F1EBDD",
        darkBlack: "#2B2A25",
        grayColor: "#78715F",
        yellowColor: "#C9A15A",
      },
      fontFamily: {
        serif: ["'Noto Serif JP'", "serif"],
        sans: ["'Noto Sans JP'", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
```

- [ ] **Step 2: Update `styles/globals.css` (body background, `.heroButton`, `.contactInput`)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #faf6ee;
  font-family: "Noto Sans JP", sans-serif;
}

@layer components {
  .heroButton {
    @apply px-3 md:px-6 py-2 border border-darkGreen/20 rounded-full uppercase text-xs tracking-widest text-grayColor transition-all hover:border-darkGreen/70 hover:text-darkGreen;
  }

  .contactInput {
    @apply outline-none bg-darkBackground rounded-lg border border-darkGreen/10 border-b-2 px-6 py-3 md:py-4 text-darkBlack placeholder-grayColor/70 transition-all focus:border-darkGreen/60 focus:text-darkBlack hover:border-darkGreen/40;
  }
}
```

- [ ] **Step 3: Create `pages/_document.tsx` to load the Google Fonts**

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds with no TypeScript/JSX errors (the site will look partially
mismatched at this point — that's expected, later tasks sweep the remaining literal
dark-theme classes).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js styles/globals.css pages/_document.tsx
git commit -m "Add Japanese Zen color tokens, fonts, and base styles"
```

---

## Task 2: Hero section — colors, fonts, and the ensō signature element

**Files:**
- Modify: `components/Hero.tsx` (full file, 71 lines)

**Interfaces:**
- Consumes: `darkBackground`, `darkGreen`, `grayColor` tokens and `font-serif` family from
  Task 1.

- [ ] **Step 1: Replace literal colors, add `font-serif` to the name mark, add the ensō SVG**

```tsx
import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo, Social } from "../typings";
import BackgroundCircles from "./BackgroundCircles";
import { SocialIcon } from "react-social-icons";

type Props = { pageInfo: PageInfo; socials: Social[] };

export default function Hero({ pageInfo, socials }: Props) {
  const [text] = useTypewriter({
    words: [
      "I build software with real technical depth.",
      "I work across ML systems and product engineering.",
      "I like shipping systems that can be inspected.",
      "I am still a student and I still build seriously.",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] md:h-[520px] md:w-[520px]"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#2B2A25"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="500 34"
          transform="rotate(-100 100 100)"
        />
      </svg>

      <div className="absolute left-6 top-8 z-20 flex items-center justify-start gap-3 px-5 md:left-16 xl:left-24">
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="#78715F"
            bgColor="transparent"
            className="!h-10 !w-10"
          />
        ))}
      </div>

      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-darkGreen/30 bg-darkBackground text-5xl font-serif font-semibold text-darkGreen shadow-2xl shadow-darkGreen/20">
        CK
      </div>

      <div className="z-20">
        <h2 className="text-sm uppercase text-grayColor pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-semibold px-12 md:px-16">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#5B7A5A" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#education">
            <button className="heroButton">Education</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Visual check**

Start `npm run dev`, open the Hero section in a browser, confirm: paper background, sage/moss
"CK" circle, faint circle visible behind the name text, no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "Apply Zen theme colors and enso signature to Hero"
```

---

## Task 3: About section

**Files:**
- Modify: `components/About.tsx` (full file, 53 lines)

**Interfaces:**
- Consumes: `darkBackground`, `darkGreen`, `grayColor`, `yellowColor` tokens, `font-serif`
  family from Task 1.

- [ ] **Step 1: Replace literal colors, add heading font and accent dot, bump padding**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { PageInfo } from "../typings";

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-12 md:px-16 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 flex items-center gap-3 uppercase tracking-[20px] text-grayColor text-xl md:text-2xl font-serif">
        <span
          className="inline-block h-2 w-2 rounded-full bg-yellowColor"
          aria-hidden="true"
        />
        About
      </h3>

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
        className=" -mb-24 md:mb-0 flex-shrink-0 w-52 h-52 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] bg-gradient-to-br from-darkBackground to-darkGreen/20 border border-darkGreen/30 shadow-2xl shadow-darkGreen/10 flex items-center justify-center"
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
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Visual check**

Confirm the About section shows the paper/stone gradient circle, gold dot before "About",
serif heading, no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx
git commit -m "Apply Zen theme colors and spacing to About"
```

---

## Task 4: Experience section (WorkExperience + ExperienceCard)

**Files:**
- Modify: `components/WorkExperience.tsx` (full file, 35 lines)
- Modify: `components/ExperienceCard.tsx` (full file, 71 lines)

**Interfaces:**
- Consumes: `darkBackground`, `darkGreen`, `lightGreen`, `grayColor`, `yellowColor` tokens,
  `font-serif` family from Task 1.

- [ ] **Step 1: Replace literal colors and spacing in `WorkExperience.tsx`, add accent dot**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex min-h-screen flex-col items-center justify-center px-12 py-24 text-left md:px-16"
    >
      <h3 className="absolute top-20 md:top-24 flex items-center gap-3 uppercase tracking-[20px] text-grayColor text-xl md:text-2xl font-serif">
        <span
          className="inline-block h-2 w-2 rounded-full bg-yellowColor"
          aria-hidden="true"
        />
        Experience
      </h3>

      {/* Experience cards */}
      <div className="flex w-full max-w-6xl flex-col flex-wrap items-stretch justify-center gap-12 md:flex-row">
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

- [ ] **Step 2: Replace literal colors and spacing in `ExperienceCard.tsx`**

Note: the card's own internal `md:px-10` padding (on the details wrapper and the bullet
`<ul>`) is intentionally left unchanged here — the spec's padding bump targets
section-level breathing room, not card-internal padding, which is a separate concern.
Only `space-y-2` on the bullet list is bumped, per the spec's explicit bullet-list rule.

```tsx
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Experience } from "../typings";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  const companyMark = (
    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-darkGreen/30 bg-white/95 text-2xl font-serif font-semibold text-darkGreen shadow-lg shadow-darkGreen/10">
      {experience.companyLogoUrl ? (
        <Image
          src={experience.companyLogoUrl}
          alt={`${experience.company} logo`}
          width={78}
          height={78}
          className="h-[78px] w-[78px] object-contain"
        />
      ) : (
        experience.company.slice(0, 2).toUpperCase()
      )}
    </div>
  );

  return (
    <article className="flex drop-shadow-xl flex-col rounded-3xl items-center space-y-0 w-full md:w-[calc(50%-1rem)] border border-darkGreen/20 bg-darkBackground bg-gradient-to-tr from-darkBackground to-darkGreen/10 p-5 md:p-10 hover:opacity-100 opacity-100 cursor-pointer transition-opacity duration-200 shadow-2xl shadow-darkBlack/10 ">
      <div className="w-full px-0 md:px-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:text-left">
          <div>
            <h4 className="text-lg md:text-3xl font-serif font-light text-darkBlack">
              {experience?.jobTitle}
            </h4>
            <p className="font-bold text-md md:text-2xl  mt-1 text-lightGreen">
              {experience?.company}
            </p>
            <div className="flex flex-wrap gap-2 my-3">
              {experience?.technologies.map((technology) => (
                <span
                  key={technology._id}
                  className="rounded-full border border-darkGreen/30 bg-darkGreen/10 px-3 py-1 text-sm text-darkGreen"
                >
                  {technology.title}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="flex"
          >
            {companyMark}
          </motion.div>
        </div>
        <p className="uppercase py-2 md:py-5 text-grayColor text-sm md:text-lg">
          {new Date(experience?.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience?.dateEnded).toDateString()}
        </p>
      </div>
      <ul className="px-0 md:px-10 list-disc  text-darkBlack space-y-3 pr-5 text-justify ml-0 text-sm md:text-lg pl-5">
        {experience?.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual check**

Confirm both experience cards show paper-stone card backgrounds, sage company name, ink
bullet text, gold dot before "Experience", no console errors.

- [ ] **Step 5: Commit**

```bash
git add components/WorkExperience.tsx components/ExperienceCard.tsx
git commit -m "Apply Zen theme colors and spacing to Experience section"
```

---

## Task 5: Education section

**Files:**
- Modify: `components/Education.tsx` (full file, 77 lines)

**Interfaces:**
- Consumes: `darkBackground`, `darkGreen`, `grayColor`, `darkBlack`, `yellowColor` tokens,
  `font-serif` family from Task 1.

- [ ] **Step 1: Replace literal colors and spacing, add accent dot**

```tsx
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Education as EducationType } from "../typings";

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
      className="min-h-screen flex relative flex-col text-center max-w-7xl px-12 py-24 justify-center mx-auto items-center md:px-16"
    >
      <h3 className="absolute top-20 md:top-24 flex items-center gap-3 uppercase tracking-[20px] text-grayColor text-xl md:text-2xl left-1/2 -translate-x-1/2 font-serif">
        <span
          className="inline-block h-2 w-2 rounded-full bg-yellowColor"
          aria-hidden="true"
        />
        Education
      </h3>

      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 mt-16">
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

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Visual check**

Confirm both education cards show paper-stone backgrounds, ink headings, gold dot before
"Education", no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/Education.tsx
git commit -m "Apply Zen theme colors and spacing to Education"
```

---

## Task 6: Skills section (Skills + Skill)

**Files:**
- Modify: `components/Skills.tsx` (full file, 34 lines)
- Modify: `components/Skill.tsx` (full file, 45 lines)

**Interfaces:**
- Consumes: `darkGreen`, `grayColor`, `darkBackground`, `yellowColor` tokens, `font-serif`
  family from Task 1.

- [ ] **Step 1: Replace literal colors and spacing in `Skills.tsx`, add accent dot**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

type Props = { skills: SkillType[] };

export default function Skills({ skills }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-16 min-h-screen justify-center xl:space-y-0 mx-auto items-center "
    >
      <h3 className="absolute top-20 md:top-24 flex items-center gap-3 uppercase tracking-[20px] text-grayColor text-xl md:text-2xl font-serif">
        <span
          className="inline-block h-2 w-2 rounded-full bg-yellowColor"
          aria-hidden="true"
        />
        Skills
      </h3>
      <h3 className="absolute top-32 md:top-36 uppercase tracking-[3px] text-grayColor/80 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-4 gap-4 md:gap-5">
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

- [ ] **Step 2: Replace literal colors in `Skill.tsx`**

```tsx
import React from "react";
import { motion } from "framer-motion";
import { Skill as mySkill } from "../typings";

type Props = {
  skill: mySkill;
  directionLeft?: boolean;
};

export default function Skill({ skill, directionLeft }: Props) {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.div
        initial={{ x: directionLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="rounded-full border-2 border-darkGreen/70 bg-white w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 filter transition duration-300 ease-in-out flex items-center justify-center p-3 md:p-4 shadow-lg shadow-darkGreen/10"
        title={skill.title}
      >
        {skill.iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.iconUrl}
            alt={`${skill.title} logo`}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-center text-[10px] font-semibold md:text-xs 2xl:text-sm">
            {skill.title}
          </span>
        )}
      </motion.div>
      <div className="absolute opacity-0 group-hover:opacity-95 transition duration-300 ease-in-out group-hover:bg-darkBackground w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 rounded-full z-0">
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-xl md:text-3xl font-bold text-darkGreen opacity-100">
            {skill.progress}%
          </p>
          <p className="hidden max-w-[5rem] text-center text-[10px] font-semibold text-darkBlack md:block">
            {skill.title}
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual check**

Confirm skill icons still show on white circles (unchanged), hover state shows paper-stone
overlay with readable ink text, gold dot before "Skills", no console errors.

- [ ] **Step 5: Commit**

```bash
git add components/Skills.tsx components/Skill.tsx
git commit -m "Apply Zen theme colors to Skills section"
```

---

## Task 7: Projects section

**Files:**
- Modify: `components/Projects.tsx` (full file, 66 lines)

**Interfaces:**
- Consumes: `darkBackground`, `darkGreen`, `grayColor`, `darkBlack`, `yellowColor` tokens,
  `font-serif` family from Task 1.

- [ ] **Step 1: Replace literal colors, scrollbar track, and add accent dot**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { Project } from "../typings";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className=" h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-20 md:top-24 flex items-center gap-3 uppercase tracking-[20px] text-grayColor text-xl md:text-2xl font-serif">
        <span
          className="inline-block h-2 w-2 rounded-full bg-yellowColor"
          aria-hidden="true"
        />
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-darkBackground scrollbar-thumb-darkGreen/80">
        {projects?.map((project, i) => (
          <div
            key={project._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10 md:p-44 h-screen"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="w-full max-w-3xl rounded-3xl border border-darkGreen/20 bg-darkBackground p-8 shadow-2xl shadow-darkBlack/10"
            >
              <div className="mb-6 h-48 rounded-2xl border border-dashed border-darkGreen/30 bg-gradient-to-br from-darkBackground to-darkGreen/10 flex items-center justify-center text-center text-3xl md:text-5xl font-serif font-semibold text-darkGreen px-6">
                {project.title}
              </div>

              <div className="space-y-5 md:space-y-8 px-0 md:px-4 max-w-6xl">
                <h4 className="text-lg md:text-2xl lg:text-4xl font-serif font-semibold text-center">
                  <span className="underline decoration-darkGreen/50">
                    Project {i + 1}:
                  </span>{" "}
                  {project?.title}
                </h4>
                <div className="flex items-center gap-2 justify-center flex-wrap">
                  {project?.technologies.map((technology) => (
                    <span
                      key={technology._id}
                      className="rounded-full border border-darkGreen/30 bg-darkGreen/10 px-3 py-1 text-sm text-darkGreen"
                    >
                      {technology.title}
                    </span>
                  ))}
                </div>

                <p className="text-sm md:text-md lg:text-lg text-justify ">
                  {project?.summary}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[20%] md:top-[30%] bg-darkGreen/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Visual check**

Confirm project cards show paper-stone backgrounds, ink summary text, gold dot before
"Projects", scrollbar track no longer near-black, no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/Projects.tsx
git commit -m "Apply Zen theme colors to Projects section"
```

---

## Task 8: Contact section

**Files:**
- Modify: `components/ContactMe.tsx` (full file, 86 lines)

**Interfaces:**
- Consumes: `darkGreen`, `grayColor`, `darkBlack`, `yellowColor` tokens, `font-serif` family
  from Task 1.

- [ ] **Step 1: Replace literal colors and spacing, add accent dot**

```tsx
import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../typings";

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
    <div className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-12 md:px-16 justify-evenly mx-auto items-center">
      <h3 className="absolute top-20 md:top-24 flex items-center gap-3 uppercase tracking-[20px] text-grayColor text-xl md:text-2xl font-serif">
        <span
          className="inline-block h-2 w-2 rounded-full bg-yellowColor"
          aria-hidden="true"
        />
        Contact
      </h3>
      <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10">
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

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Visual check**

Confirm the form inputs show a paper-stone background with readable ink text, gold dot
before "Contact", submit button legible on the sage background, no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/ContactMe.tsx
git commit -m "Apply Zen theme colors and spacing to Contact"
```

---

## Task 9: Page shell — background gradient, scrollbar, hairline section dividers

**Files:**
- Modify: `pages/index.tsx` (full file, 119 lines)

**Interfaces:**
- Consumes: `lightBackground`, `darkGreen`, `grayColor` tokens from Task 1.

- [ ] **Step 1: Replace the radial gradient, scrollbar track, and add hairline dividers between sections**

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
    <div
      className="bg-lightBackground bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#FAF6EE_42%,#F1EBDD_100%)] text-darkBlack h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-lightBackground scrollbar-thumb-darkGreen/80"
    >
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

      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} socials={socials} />
      </section>

      {/* About */}
      <section id="about" className="snap-center border-t border-grayColor/20">
        <About pageInfo={pageInfo} />
      </section>

      {/* Experiences */}
      <section id="experience" className="snap-center border-t border-grayColor/20">
        <WorkExperience experiences={experiences} />
      </section>

      {/* Education */}
      <section id="education" className="snap-start border-t border-grayColor/20">
        <Education education={education} />
      </section>

      {/* Skills */}
      <section id="skills" className="snap-start border-t border-grayColor/20">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="snap-start border-t border-grayColor/20">
        <Projects projects={projects} />
      </section>

      {/* Contact */}
      <section id="contact" className="snap-start border-t border-grayColor/20">
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
Expected: build succeeds.

- [ ] **Step 3: Visual check**

Scroll the full page top to bottom, confirm: paper gradient background throughout, a
visible hairline rule at the top edge of each section (About through Contact), back-to-top
button still legible (white arrow on moss green), no console errors.

- [ ] **Step 4: Commit**

```bash
git add pages/index.tsx
git commit -m "Apply Zen theme background and hairline section dividers"
```

---

## Task 10: Full-site verification and push

**Files:** none (verification only)

**Interfaces:** none — this task only verifies the cumulative result of Tasks 1-9.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: build succeeds with no errors or new warnings beyond what existed before this
change.

- [ ] **Step 2: One spot-check screenshot, then hand off to the user**

Per user preference, this is not a self-driven screenshot loop: take a single full-page
screenshot (or one per section, max) as a sanity check that nothing is visibly broken
(no leftover near-black `slate-950` surfaces, no literal Japanese characters, ensō visible
behind the Hero name, gold dot before section headings). Do not iterate on pixel-level
polish via repeated screenshots — ship the change and ask the user to look at it
themselves in a real browser for the actual aesthetic judgment call.

- [ ] **Step 3: Focus-state check**

Tab through the Hero nav buttons, the Contact form fields, and the Submit button. Confirm
a visible focus outline/ring appears on each — none of the tasks above removed or hid any
`focus:` styles, but this confirms the new colors didn't make an existing focus ring
invisible against the lighter background (e.g. a pale ring on a pale background).

- [ ] **Step 4: Contrast check**

Verify `grayColor` (#78715F) against `lightBackground` (#FAF6EE) and `darkBackground`
(#F1EBDD) meets 4.5:1 using any contrast checker (e.g. the browser devtools color picker's
built-in contrast ratio display) — this is a measurement, not an aesthetic judgment, so
browser automation is fine here. If it fails, darken `grayColor` further in
`tailwind.config.js` and re-run Step 1.

- [ ] **Step 5: Push**

```bash
git push origin main
```

Expected: Railway's connected GitHub deploy picks this up automatically and redeploys
(per the existing auto-deploy wiring confirmed working earlier).
