// Section label.
// With an index: "[02] Selected Work ————————" (mobile: centred, "——— [02] Selected Work ———").
// Without an index: always centred between two lines, "——— Our Guarantee ———".
export function SectionTag({ index, label }: { index?: string; label: string }) {
  return (
    <div className="label flex items-center gap-4 text-muted">
      <span aria-hidden className={`h-px flex-1 bg-line ${index ? "lg:hidden" : ""}`} />
      {index && <span className="text-signal">[{index}]</span>}
      <span className="text-silver">{label}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}
