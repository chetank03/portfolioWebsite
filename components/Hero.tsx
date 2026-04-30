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
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      <div className="absolute left-6 top-8 z-20 flex items-center justify-start gap-3 px-5 md:left-16 xl:left-24">
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="gray"
            bgColor="transparent"
            className="!h-10 !w-10"
          />
        ))}
      </div>

      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-darkGreen/20 bg-white/80 text-5xl font-semibold text-darkGreen shadow-xl">
        CK
      </div>

      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#68B2A0" />
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
        </div>
      </div>
    </div>
  );
}
