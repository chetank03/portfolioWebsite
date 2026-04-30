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
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80">
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
              className="w-full max-w-3xl rounded-3xl border border-darkGreen/20 bg-white/80 p-8 shadow-xl"
            >
              <div className="mb-6 h-48 rounded-2xl border border-dashed border-darkGreen/20 bg-gradient-to-br from-white to-darkGreen/10 flex items-center justify-center text-center text-3xl md:text-5xl font-semibold text-darkGreen px-6">
                {project.title}
              </div>

              <div className="space-y-5 md:space-y-8 px-0 md:px-4 max-w-6xl">
                <h4 className="text-lg md:text-2xl lg:text-4xl font-semibold text-center">
                  <span className="underline decoration-darkGreen/50">
                    Project {i + 1}:
                  </span>{" "}
                  {project?.title}
                </h4>
                <div className="flex items-center gap-2 justify-center flex-wrap">
                  {project?.technologies.map((technology) => (
                    <span
                      key={technology._id}
                      className="rounded-full border border-darkGreen/20 px-3 py-1 text-sm text-darkGreen"
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

      <div className="w-full absolute top-[20%] md:top-[30%] bg-darkGreen/40 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
