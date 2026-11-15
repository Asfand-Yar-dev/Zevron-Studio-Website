import Image from "next/image";
import { CONTACT_PATH, TEAM, type TeamMember } from "@/lib/content";
import { SectionTag } from "@/components/ui/SectionTag";
import { ButtonLink } from "@/components/ui/Button";

function Corners() {
  const base =
    "absolute h-5 w-5 border-cyan opacity-0 transition-all duration-500 ease-precise group-hover/portrait:opacity-100";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-4">
      <span className={`${base} left-2 top-2 border-l border-t group-hover/portrait:left-0 group-hover/portrait:top-0`} />
      <span className={`${base} right-2 top-2 border-r border-t group-hover/portrait:right-0 group-hover/portrait:top-0`} />
      <span className={`${base} bottom-2 left-2 border-b border-l group-hover/portrait:bottom-0 group-hover/portrait:left-0`} />
      <span className={`${base} bottom-2 right-2 border-b border-r group-hover/portrait:bottom-0 group-hover/portrait:right-0`} />
    </span>
  );
}

// Profiles alternate sides on desktop: portrait left, then portrait right.
function Member({ member, index }: { member: TeamMember; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article aria-labelledby={`member-${index}`} className="relative grid gap-12 lg:grid-cols-12 lg:gap-8">
      {/* Oversized role mark behind the profile */}
      <span
        aria-hidden
        className={`text-outline pointer-events-none absolute -top-[0.3em] hidden select-none font-display text-[17rem] font-bold leading-none tracking-[-0.06em] lg:block ${
          flip ? "left-0" : "right-0"
        }`}
      >
        {member.roleShort}
      </span>

      <figure className={`group/portrait relative lg:col-span-5 lg:row-start-1 ${flip ? "lg:col-start-8" : ""}`}>
        <span
          aria-hidden
          className={`chamfer-frame absolute inset-0 hidden translate-y-4 bg-signal/60 lg:block ${flip ? "-translate-x-4" : "translate-x-4"}`}
        />
        <div className="chamfer relative aspect-[4/5] overflow-hidden bg-black">
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role} at Zevron Studio`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[50%_22%] transition-transform duration-700 ease-precise group-hover/portrait:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/40 to-transparent" />
          <span
            aria-hidden
            className={`absolute inset-y-0 w-px bg-linear-to-b from-transparent via-cyan/70 to-transparent ${flip ? "right-0" : "left-0"}`}
          />
          <Corners />
          <figcaption className="absolute bottom-6 left-6 flex items-center gap-3">
            <span className="label bg-signal px-2.5 py-1.5 text-[0.65rem] font-medium text-black">{member.roleShort}</span>
            <span className="label text-[0.6rem] text-silver">Zevron Studio</span>
          </figcaption>
        </div>
        <span aria-hidden className="chamfer-frame absolute inset-0 bg-white/15" />
      </figure>

      <div
        className={`relative flex flex-col items-center justify-center text-center lg:col-span-6 lg:row-start-1 lg:items-stretch lg:text-left ${
          flip ? "lg:col-start-1" : "lg:col-start-7"
        }`}
      >
        <p className="label flex items-center justify-center gap-3 text-[0.6rem] text-muted lg:justify-start">
          <span className="text-signal">0{index + 1}</span>
          <span>Leadership</span>
        </p>
        <h3
          id={`member-${index}`}
          className="mt-6 font-display text-[clamp(3rem,6.5vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white"
        >
          {member.name}
        </h3>
        <p className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
          <span aria-hidden className="h-px w-10 bg-signal" />
          <span className="label text-silver">{member.role}</span>
        </p>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver">{member.bio}</p>

        <ul aria-label="Focus areas" className="mt-10 w-full max-w-xl border-t border-line">
          {member.focus.map((f, i) => (
            <li
              key={f}
              className="group/focus relative flex items-baseline justify-center gap-6 border-b border-line py-4 transition-colors duration-300 hover:text-white lg:justify-start"
            >
              <span className="label text-[0.6rem] text-signal">0{i + 1}</span>
              <span className="font-display text-xl font-medium text-white sm:text-2xl">{f}</span>
              <span
                aria-hidden
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-cyan transition-transform duration-700 ease-precise group-hover/focus:scale-x-100"
              />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ButtonLink href={CONTACT_PATH} variant="secondary">
            {member.cta}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative overflow-hidden border-t border-line bg-surface py-16 lg:py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
        <SectionTag index="05" label="Team" />

        <header className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <h2
            id="team-title"
            className="text-center font-display text-[clamp(3.25rem,9vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.05em] text-white lg:col-span-8 lg:text-left"
          >
            The People
            <span className="block text-metal lg:pl-[10%]">
              Behind It<span className="text-signal">.</span>
            </span>
          </h2>
          <p className="mx-auto max-w-sm text-center text-lg leading-relaxed text-silver lg:col-span-4 lg:mx-0 lg:pb-4 lg:text-left">
            Every system we deliver is shaped, built and owned by the people who lead Zevron.
          </p>
        </header>

        <div className="mt-24 flex flex-col gap-32 lg:mt-32 lg:gap-44">
          {TEAM.map((m, i) => (
            <Member key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
