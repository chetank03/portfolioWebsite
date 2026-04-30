import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Education as EducationType } from "../typings";

type Props = { education: EducationType[] };

function formatMonthYear(date: string) {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Education({ education }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex relative flex-col text-center max-w-7xl px-10 py-24 justify-center mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl left-1/2 -translate-x-1/2">
        Education
      </h3>

      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 mt-16">
        {education
          .slice()
          .sort(
            (a, b) =>
              new Date(b.dateStarted).getTime() -
              new Date(a.dateStarted).getTime()
          )
          .map((item) => (
            <article
              key={item._id}
              className="flex h-full flex-col items-center rounded-3xl border border-darkGreen/20 bg-white/90 p-6 text-center shadow-xl"
            >
              {item.logoUrl && (
                <div className="mb-5 flex h-24 w-40 items-center justify-center rounded-2xl border border-darkGreen/20 bg-white px-4 shadow-sm">
                  <Image
                    src={item.logoUrl}
                    alt={`${item.school} logo`}
                    width={140}
                    height={72}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              )}
              <p className="text-sm uppercase tracking-[6px] text-gray-500">
                {item.school}
              </p>
              <h4 className="mt-3 text-xl md:text-2xl font-semibold text-darkBlack">
                {item.degree}
              </h4>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                {item.location} | {formatMonthYear(item.dateStarted)} -{" "}
                {formatMonthYear(item.dateEnded)}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full border border-darkGreen/20 px-3 py-1 text-sm text-darkGreen"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </article>
          ))}
      </div>
    </motion.div>
  );
}
