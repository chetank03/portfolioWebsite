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
