import { motion } from "framer-motion";
import React from "react";
import { Project } from "../typings";
import SectionHeading from "./SectionHeading";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const linkClasses =
    "font-sans text-sm uppercase tracking-widest text-grayColor transition-colors hover:text-darkGreen";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-24 md:px-16 md:py-32">
      <SectionHeading
        label="projects"
        action={{ href: "https://github.com/chetank03", text: "View GitHub →" }}
      />

      <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-darkGreen/40 md:-mx-16 md:px-16">
        {projects.map((project) => (
          <motion.article
            key={project._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex w-[80%] shrink-0 snap-center flex-col rounded-3xl border border-darkGreen/20 bg-darkBackground p-8 shadow-2xl shadow-darkBlack/10 sm:w-[70%] md:w-[55%] md:p-10 lg:w-[46%]"
          >
            <h3 className="font-serif text-2xl font-semibold text-darkBlack md:text-3xl">
              {project.title}
            </h3>

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
        ))}
      </div>

      <p className="mt-2 font-sans text-xs uppercase tracking-widest text-grayColor">
        Scroll for more projects →
      </p>
    </div>
  );
}
