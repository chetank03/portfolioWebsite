import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Experience } from "../typings";
import { formatMonthYear } from "../utils/formatDate";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  const dateRange = `${formatMonthYear(experience.dateStarted)} - ${
    experience.isCurrentlyWorkingHere
      ? "Present"
      : formatMonthYear(experience.dateEnded)
  }`;

  return (
    <motion.div
      key={experience._id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-start gap-4">
        {experience.companyLogoUrl && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-darkGreen/20 bg-white p-1.5 shadow-sm">
            <Image
              src={experience.companyLogoUrl}
              alt={`${experience.company} logo`}
              width={44}
              height={44}
              className="h-full w-full object-contain"
            />
          </div>
        )}
        <h3 className="font-serif text-xl font-semibold text-darkBlack md:text-2xl">
          {experience.jobTitle}{" "}
          <span className="text-darkGreen">@ {experience.company}</span>
        </h3>
      </div>

      <p className="mt-3 font-mono text-xs text-grayColor md:text-sm">
        {dateRange}
        {experience.location ? ` · ${experience.location}` : ""}
      </p>

      <ul className="mt-6 space-y-4">
        {experience.points.map((point, i) => (
          <li key={i} className="flex gap-3 text-sm text-darkBlack md:text-base">
            <span aria-hidden="true" className="mt-1 shrink-0 text-darkGreen">
              &#9656;
            </span>
            <span className="text-justify">{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-2">
        {experience.technologies.map((technology) => (
          <span
            key={technology._id}
            className="rounded-full border border-darkGreen/30 bg-darkGreen/10 px-3 py-1 text-xs text-darkGreen md:text-sm"
          >
            {technology.title}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
