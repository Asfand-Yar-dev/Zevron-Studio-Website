"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { CONTACT_PATH, type Project } from "@/lib/content";
import { ProjectVisual } from "@/components/visuals/ProjectVisuals";

type Layout = "wide" | "tall" | "square" | "bleed";

const previewAspect: Record<Layout, string> = {
  wide: "aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]",
  tall: "aspect-[4/3] lg:aspect-[5/6]",
  square: "aspect-[4/3] lg:aspect-square",
  bleed: "aspect-[4/3] sm:aspect-[16/8] lg:aspect-[2/1]",
};

// Crop anchor per layout so each frame keeps the meaningful part of the preview.
const previewAlign = { wide: "xMidYMid", tall: "xMinYMin", square: "xMaxYMid", bleed: "xMidYMid" } as const;

function Corners() {
  const base = "absolute h-5 w-5 border-cyan transition-all duration-500 ease-precise opacity-0 group-hover/project:opacity-100";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-3">
      <span className={`${base} left-2 top-2 border-l border-t group-hover/project:left-0 group-hover/project:top-0`} />
      <span className={`${base} right-2 top-2 border-r border-t group-hover/project:right-0 group-hover/project:top-0`} />
      <span className={`${base} bottom-2 left-2 border-b border-l group-hover/project:bottom-0 group-hover/project:left-0`} />
      <span className={`${base} bottom-2 right-2 border-b border-r group-hover/project:bottom-0 group-hover/project:right-0`} />
    </span>
  );
}

export function ProjectEntry({ project, layout }: { project: Project; layout: Layout }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const titleId = `project-${project.id}-title`;
  const overlay = layout === "bleed";

  return (
    <article aria-labelledby={titleId} className="group/project relative">
      {/* Oversized index */}
      <span
        aria-hidden
        className={`text-outline pointer-events-none absolute z-10 select-none font-display font-bold leading-none tracking-[-0.06em] transition-[-webkit-text-stroke-color] duration-500 group-hover/project:[-webkit-text-stroke-color:var(--color-signal)] ${
          layout === "square"
            ? "-top-[0.42em] right-2 text-[clamp(5rem,12vw,10rem)]"
            : "-top-[0.45em] left-2 text-[clamp(5rem,15vw,15rem)] lg:-left-3"
        }`}
      >
        {project.index}
      </span>

      <div className={`relative ${overlay ? "lg:-mx-14" : ""}`}>
        <button
          type="button"
          onClick={open}
          tabIndex={-1}
          aria-hidden
          className={`relative block w-full cursor-pointer overflow-hidden border border-line bg-surface ${previewAspect[layout]}`}
        >
          <span className="absolute inset-0 block transition-transform duration-[1200ms] ease-precise group-hover/project:scale-[1.035]">
            <ProjectVisual kind={project.visual} align={previewAlign[layout]} />
          </span>
          <span className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          <Corners />
          <span className="label absolute left-4 top-4 flex items-center gap-2 bg-black/80 px-2.5 py-1.5 text-[0.6rem] text-cyan">
            <span className="h-1.5 w-1.5 bg-cyan" />
            Concept build
          </span>
        </button>

        {/* Meta */}
        <div
          className={
            overlay
              ? "relative border-x border-b border-line bg-black p-6 text-center sm:p-8 lg:absolute lg:bottom-0 lg:left-14 lg:w-[min(36rem,46%)] lg:border-t lg:border-b-0 lg:text-left"
              : "border-x border-b border-line p-6 text-center sm:p-8 lg:text-left"
          }
        >
          <div className="label flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-muted lg:justify-start">
            <span className="text-signal">{project.index}</span>
            <span className="text-silver">{project.category}</span>
          </div>
          <div
            className={`mt-5 grid gap-6 ${
              layout === "wide" ? "lg:grid-cols-12 lg:items-end lg:gap-8" : ""
            }`}
          >
            <h3
              id={titleId}
              className={`font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl ${layout === "wide" ? "lg:col-span-4 lg:text-6xl" : ""}`}
            >
              {project.name}
            </h3>
            <p className={`mx-auto max-w-xl leading-relaxed text-silver lg:mx-0 ${layout === "wide" ? "lg:col-span-5" : ""}`}>
              {project.summary}
            </p>
            <div className={`flex flex-col items-center gap-5 ${layout === "wide" ? "lg:col-span-3 lg:items-end" : "lg:items-start"}`}>
              <ul
                aria-label="Technologies"
                className={`flex flex-wrap justify-center gap-x-3 gap-y-2 ${layout === "wide" ? "lg:justify-end" : "lg:justify-start"}`}
              >
                {project.stack.map((t) => (
                  <li key={t} className="label text-[0.6rem] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={open}
                className="group/view inline-flex items-center gap-3 font-display text-sm font-medium text-white"
              >
                <span className="relative">
                  View Project
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-line" />
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-precise group-hover/project:scale-x-100" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center border border-line transition-colors duration-300 group-hover/project:border-signal group-hover/project:bg-signal group-hover/project:text-black">
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 ease-precise group-hover/project:rotate-45" />
                </span>
                <span className="sr-only">: {project.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${titleId}-dialog`}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[92svh] w-[min(64rem,calc(100vw-2rem))] overflow-y-auto border border-line bg-black p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-[16/8] border-b border-line">
          <ProjectVisual kind={project.visual} />
          <button
            type="button"
            onClick={close}
            aria-label="Close project details"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center border border-line bg-black text-silver transition-colors hover:border-signal hover:text-white"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="label flex flex-wrap gap-4 text-muted">
              <span className="text-signal">{project.index}</span>
              <span className="text-silver">{project.category}</span>
              <span className="text-cyan">Concept build</span>
            </div>
            <h3 id={`${titleId}-dialog`} className="mt-4 font-display text-5xl font-bold tracking-[-0.03em]">
              {project.name}
            </h3>
            <p className="mt-5 leading-relaxed text-silver">{project.summary}</p>
            <p className="mt-6 border-l border-signal pl-4 text-sm leading-relaxed text-muted">
              This is a concept project created by Zevron Studio to demonstrate our engineering approach. It is not
              a client engagement.
            </p>
          </div>
          <div className="md:col-span-5">
            <h4 className="label text-silver">Engineering scope</h4>
            <ul className="mt-4 border-t border-line">
              {project.scope.map((s, i) => (
                <li key={s} className="flex gap-4 border-b border-line py-3 text-sm text-white">
                  <span className="label pt-0.5 text-[0.6rem] text-signal">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
            <h4 className="label mt-8 text-silver">Stack</h4>
            <p className="label mt-3 leading-loose text-muted">{project.stack.join(" / ")}</p>
            <Link
              href={CONTACT_PATH}
              onClick={close}
              className="mt-8 inline-flex items-center gap-3 font-display text-sm font-semibold text-signal hover:text-white"
            >
              Discuss a similar build <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </dialog>
    </article>
  );
}
