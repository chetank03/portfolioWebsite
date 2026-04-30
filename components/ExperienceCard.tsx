import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Experience } from "../typings";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  const companyMark = (
    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-darkGreen/30 bg-white/95 text-2xl font-semibold text-darkGreen shadow-lg shadow-darkGreen/10">
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
    <article className=" flex drop-shadow-xl flex-col rounded-3xl items-center space-y-0 flex-shrink-0 w-72  md:w-[600px] xl:w-[700px] snap-center border border-darkGreen/20 bg-slate-950/80 bg-gradient-to-tr from-slate-950 to-darkGreen/10 p-5 md:p10 hover:opacity-100 opacity-100 cursor-pointer transition-opacity duration-200 shadow-2xl shadow-black/30 ">
      <div className="w-full px-0 md:px-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:text-left">
          <div>
            <h4 className="text-lg md:text-3xl font-light text-darkBlack">
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
        <p className="uppercase py-2 md:py-5 text-slate-400 text-sm md:text-lg">
          {new Date(experience?.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience?.dateEnded).toDateString()}
        </p>
      </div>
      <ul className="px-0 md:px-10 list-disc  text-slate-200 space-y-2 pr-5 text-justify ml-0 text-sm md:text-lg pl-5 overflow-y-scroll scrollbar-thin scrollbar-track-slate-800/70 scrollbar-thumb-darkGreen/80">
        {experience?.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
