import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo, Social } from "../typings";
import BackgroundCircles from "./BackgroundCircles";
import { SocialIcon } from "react-social-icons";

type Props = { pageInfo: PageInfo; socials: Social[] };

export default function Hero({ pageInfo, socials }: Props) {
  const [text] = useTypewriter({
    words: [
      "I build software with real technical depth.",
      "I work across ML systems and product engineering.",
      "I like shipping systems that can be inspected.",
      "I am still a student and I still build seriously.",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="relative h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] md:h-[520px] md:w-[520px]"
      >
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#2B2A25"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="500 34"
          transform="rotate(-100 100 100)"
        />
      </svg>

      <div className="absolute left-6 top-8 z-20 flex items-center justify-start gap-3 px-5 md:left-16 xl:left-24">
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="#6C6555"
            bgColor="transparent"
            className="!h-10 !w-10"
          />
        ))}
      </div>

      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-darkGreen/30 bg-darkBackground text-5xl font-serif font-semibold text-darkGreen shadow-2xl shadow-darkGreen/20">
        CK
      </div>

      <div className="z-20">
        <h2 className="text-sm uppercase text-grayColor pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-semibold px-12 md:px-16">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#5B7A5A" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#education">
            <button className="heroButton">Education</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
          <Link href="#contact">
            <button className="heroButton">Contact</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
