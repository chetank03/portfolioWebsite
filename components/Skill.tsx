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
