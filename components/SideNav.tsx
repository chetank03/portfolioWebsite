import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col md:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                isActive ? "scale-150 bg-lightGreen" : "bg-grayColor/70"
              }`}
            />
            <span
              className={`pointer-events-none absolute left-full whitespace-nowrap font-sans text-xs uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                isActive ? "text-darkGreen" : "text-grayColor"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
