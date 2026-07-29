import Head from "next/head";
import Education from "../components/Education";
import Hero from "../components/Hero";
import { Education as EducationType, Experience, PageInfo, Skill, Project, Social } from "../typings";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import {
  experiences,
  education,
  pageInfo,
  projects,
  skills,
  socials,
} from "../data/portfolioData";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  education: EducationType[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, education, projects, skills, socials }: Props) => {
  return (
    <div
      className="bg-lightBackground bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#FAF6EE_42%,#F1EBDD_100%)] text-darkBlack h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-lightBackground scrollbar-thumb-darkGreen/80"
    >
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Chetan Kodeboyina | Portfolio</title>
      </Head>

      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} socials={socials} />
      </section>

      {/* About */}
      <section id="about" className="snap-center border-t border-grayColor/20">
        <About pageInfo={pageInfo} />
      </section>

      {/* Experiences */}
      <section id="experience" className="snap-center border-t border-grayColor/20">
        <WorkExperience experiences={experiences} />
      </section>

      {/* Education */}
      <section id="education" className="snap-start border-t border-grayColor/20">
        <Education education={education} />
      </section>

      {/* Skills */}
      <section id="skills" className="snap-start border-t border-grayColor/20">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="snap-start border-t border-grayColor/20">
        <Projects projects={projects} />
      </section>

      {/* Contact */}
      <section id="contact" className="snap-start border-t border-grayColor/20">
        <ContactMe pageInfo={pageInfo} />
      </section>

      <Link href="#hero" aria-label="Back to top">
        <footer className="sticky bottom-5 z-30 flex w-full cursor-pointer justify-end pr-5 md:pr-10">
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 bg-darkGreen/80 rounded-full flex items-center justify-center shadow-lg shadow-darkGreen/20">
              <ArrowUpIcon className="h-6 w-6 text-white animate-pulse" />
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      pageInfo,
      experiences,
      education,
      skills,
      projects,
      socials,
    },
  };
}
