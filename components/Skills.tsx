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
      className="mx-auto flex max-w-6xl flex-col px-6 py-24 md:px-16 md:py-32"
    >
      <SectionHeading label="skills" />

      <p className="-mt-8 mb-10 uppercase tracking-[3px] text-grayColor text-sm">
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
