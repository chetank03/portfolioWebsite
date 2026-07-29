import { motion } from "framer-motion";
import React from "react";
import { PageInfo } from "../typings";
import SectionHeading from "./SectionHeading";

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto flex max-w-6xl flex-col px-6 py-24 md:px-16 md:py-32"
    >
      <SectionHeading label="about" />

      <div className="flex flex-col items-center gap-12 text-center md:flex-row md:justify-evenly md:text-left">
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
          className="flex h-52 w-52 flex-shrink-0 items-center justify-center rounded-full border border-darkGreen/30 bg-gradient-to-br from-darkBackground to-darkGreen/20 shadow-2xl shadow-darkGreen/10 md:h-64 md:w-64 md:rounded-lg xl:h-[600px] xl:w-[500px]"
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
      </div>
    </motion.div>
  );
}
