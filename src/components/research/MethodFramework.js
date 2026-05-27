import Container from "@/components/layout/Container";

function TonePill({ children, tone = "neutral" }) {
  const toneMap = {
    neutral: "bg-white/60 text-slate-700",
    peach: "bg-[#F2D9C9] text-slate-700",
    sage: "bg-[#DDE3D8] text-slate-700",
    sand: "bg-[#E9E1D6] text-slate-700",
  };

  return (
    <div className={`rounded-[10px] px-4 py-4 text-[0.9rem] leading-snug ${toneMap[tone] || toneMap.neutral}`}>
      {children}
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-[18px] bg-[#EDE0CF] px-8 py-10 sm:px-10 sm:py-12 min-h-[210px] flex items-center">
      <div className="mx-auto max-w-sm text-center">
        
        <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
          <span className="text-[11px] font-semibold tracking-wide text-slate-700">{title}</span> {text}
        </p>
      </div>
    </div>
  );
}

function RightStack({ label, items = [] }) {
  // rotate tones like the screenshot
  const tones = ["sand", "peach", "sage", "sand", "peach", "sand"];

  return (
    <div className="space-y-2">
      <div className="rounded-[10px] bg-[#1F3B82] text-white px-4 py-4 text-[0.8rem] font-medium">
        {label}
      </div>
      <div className="space-y-2">
        {items.map((t, i) => (
          <TonePill key={i} tone={tones[i % tones.length]}>
            {t}
          </TonePill>
        ))}
      </div>
    </div>
  );
}

export default function MethodFramework({
  title,
  sections,
  leftText = [],
  pillGroups = [],
}) {
  const normalized =
    Array.isArray(sections) && sections.length
      ? sections
      : (() => {
          const leftA = leftText?.[0] || leftText?.join(" ") || "";
          const leftB = leftText?.[1] || leftA;

          return [
            {
              left: { title: "Observation Protocols", text: leftA },
              right: pillGroups?.[0] || { label: "", items: [] },
            },
            {
              left: { title: "Retrospective Coding", text: leftB },
              right: pillGroups?.[1] || { label: "", items: [] },
            },
          ];
        })();

  return (
    <section className="bg-[#F3E3CF]">
      <Container className="py-16 sm:py-20">
        <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
          {title}
        </h2>

        <div className="mt-10 sm:mt-12 space-y-8 sm:space-y-10">
          {normalized.map((row, idx) => (
            <div key={idx} className="grid gap-3 lg:grid-cols-[1fr_1.15fr]">
              <InfoCard title={row.left?.title} text={row.left?.text} />
              <RightStack label={row.right?.label} items={row.right?.items || []} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}