import React from "react";

type Props = {
  label: string;
  action?: { href: string; text: string };
};

export default function SectionHeading({ label, action }: Props) {
  return (
    <div className="mb-12 flex w-full items-center gap-4">
      <h3 className="whitespace-nowrap font-serif text-xl text-grayColor md:text-2xl">
        <span className="text-darkGreen">/</span> {label}
      </h3>

      <span aria-hidden="true" className="h-px flex-1 bg-grayColor/20" />

      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap font-sans text-xs uppercase tracking-widest text-grayColor transition-colors hover:text-darkGreen"
        >
          {action.text}
        </a>
      )}
    </div>
  );
}
