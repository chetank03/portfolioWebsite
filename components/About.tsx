import { motion } from "framer-motion";
import React from "react";
import { PageInfo } from "../typings";

type Props = { pageInfo: PageInfo };

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-slate-400 text-xl md:text-2xl">
        About
      </h3>

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
        className=" -mb-24 md:mb-0 flex-shrink-0 w-52 h-52 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] bg-gradient-to-br from-slate-950/90 to-darkGreen/20 border border-darkGreen/30 shadow-2xl shadow-darkGreen/10 flex items-center justify-center"
      >
        <div className="text-center px-8">
          <p className="text-6xl xl:text-8xl font-semibold text-darkGreen">CK</p>
          <p className="mt-4 text-sm md:text-base uppercase tracking-[8px] text-slate-400">
            Software Engineer
          </p>
        </div>
      </motion.div>
      <div className="space-y-5 md:space-y-10 px-0 md:px-10">
        <h4 className="text-xl md:text-4xl font-semibold">
          Here is a{" "}
          <span className=" underline decoration-darkGreen/50">little</span>{" "}
          background
        </h4>
        <p className="text-sm md:text-lg lg:text-lg text-justify">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
