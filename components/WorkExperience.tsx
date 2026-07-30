import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";
import SectionHeading from "./SectionHeading";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  const roles = experiences
    ?.slice() // shallow copy so we don't mutate the original array
    .sort(
      (a, b) =>
        new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime()
    );

  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!roles?.length) return null;

  // Arrow keys move between tabs on either axis, since the tablist is a column
  // on desktop and a row on mobile.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = roles.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next !== null) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto flex w-full max-w-6xl flex-col px-6 py-24 text-left md:px-16 md:py-32"
    >
      <SectionHeading label="experience" />

      <div className="flex flex-col gap-8 rounded-3xl border border-darkGreen/20 bg-darkBackground p-6 shadow-2xl shadow-darkBlack/10 md:flex-row md:gap-10 md:p-10">
        <div
          role="tablist"
          aria-label="Roles"
          onKeyDown={onKeyDown}
          className="flex shrink-0 overflow-x-auto border-b border-grayColor/20 md:w-56 md:flex-col md:overflow-visible md:border-b-0 md:border-l md:border-grayColor/20"
        >
          {roles.map((role, i) => {
            const isActive = i === active;
            return (
              <button
                key={role._id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`role-tab-${role._id}`}
                aria-selected={isActive}
                aria-controls={`role-panel-${role._id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-left font-sans text-sm transition-colors md:-ml-px md:border-b-0 md:border-l-2 ${
                  isActive
                    ? "border-darkGreen text-darkGreen"
                    : "border-transparent text-grayColor hover:text-darkBlack"
                }`}
              >
                {role.jobTitle}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`role-panel-${roles[active]._id}`}
          aria-labelledby={`role-tab-${roles[active]._id}`}
          tabIndex={0}
          className="min-w-0 flex-1 outline-none"
        >
          <ExperienceCard experience={roles[active]} />
        </div>
      </div>
    </motion.div>
  );
}
