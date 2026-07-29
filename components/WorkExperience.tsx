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
      className="relative flex min-h-screen flex-col items-center justify-center px-10 py-24 text-left"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-slate-400 text-xl md:text-2xl">
        Experience
      </h3>

      {/* Experience cards */}
      <div className="flex w-full max-w-6xl flex-col flex-wrap items-stretch justify-center gap-8 md:flex-row">
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
