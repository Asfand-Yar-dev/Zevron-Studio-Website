import { PROJECTS } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { ProjectEntry } from "@/components/work/ProjectEntry";

export function Work() {
  const [p1, p2, p3, p4] = PROJECTS;
  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden border-t border-line bg-black py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index="02" label="Selected Work" />

        <header className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <h2
            id="work-title"
            className="text-center font-display text-[clamp(3.25rem,9vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.05em] text-white lg:col-span-8 lg:text-left"
          >
            Engineering
            <span className="block text-metal lg:pl-[12%]">
              in Action<span className="text-signal">.</span>
            </span>
          </h2>
          <div className="text-center lg:col-span-4 lg:pb-4 lg:text-left">
            <p className="text-lg leading-relaxed text-silver">
              Digital experiences and intelligent systems built to solve real problems.
            </p>
            <p className="label mt-6 flex flex-col gap-2 border-t border-line pt-4 leading-relaxed text-muted lg:flex-row lg:gap-3">
              <span className="text-cyan">Note</span>
              <span className="normal-case tracking-[0.04em]">
                The four builds below are concept projects that demonstrate our approach not client engagements.
              </span>
            </p>
          </div>
        </header>

        <div className="mt-28 flex flex-col gap-32 lg:mt-40 lg:gap-44">
          <ProjectEntry project={p1} layout="wide" />

          <div className="grid gap-32 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <ProjectEntry project={p2} layout="tall" />
            </div>
            <div className="lg:col-span-5 lg:mt-56">
              <ProjectEntry project={p3} layout="square" />
            </div>
          </div>

          <ProjectEntry project={p4} layout="bleed" />
        </div>
      </div>
    </section>
  );
}
