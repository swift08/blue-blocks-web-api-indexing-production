import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import ReadMoreBlock from "@/components/ui/ReadMoreBlock";

export default function OurStory({
  eyebrow,
  title,
  paragraphs = [],
  readMore,
  cta = { label: "Explore", href: "/about" },
  timeline = [],

  // legacy
  bgClass = "bg-white",

  // NEW
  sectionBg = "",
}) {
  const resolved = resolveBg(sectionBg || bgClass);

  return (
    <section className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")} style={resolved.style}>
      <div className="bb-section__inner">
        <Container>
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left Content */}
            <div>
              {eyebrow ? <h2 className="bb-section-title">{eyebrow}</h2> : null}
              {title ? <p className="bb-subtitle mt-3 text-[#414141]">{title}</p> : null}

              {paragraphs?.length ? (
                <div className="mt-6 space-y-4 bb-text text-slate-600 leading-relaxed">
                  {paragraphs.map((p, i) => (
                    <p key={`p-${i}`}>{p}</p>
                  ))}
                </div>
              ) : null}

              <ReadMoreBlock
                readMore={readMore}
                className=""
                contentClassName="bb-text"
                buttonClassName="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:opacity-80"
              />

              {cta?.href ? (
                <a href={cta.href} className="mt-8 inline-flex items-center gap-2 bb-btn bb-btn--primary">
                  {cta.label || "Explore"}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>

            {/* Right Timeline (Desktop) */}
            <div className="hidden lg:block">
              <DesktopTimeline timeline={timeline} />
            </div>

            {/* Mobile Timeline (Horizontal slider) */}
            <div className="lg:hidden">
              <MobileTimeline timeline={timeline} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function DesktopTimeline({ timeline = [] }) {
  if (!timeline?.length) return null;

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[10px] top-2 bottom-2 w-px bg-slate-200" />

      <div className="space-y-14">
        {timeline.map((item, idx) => (
          <div key={`t-${idx}`} className="relative pl-10">
            {/* Dot */}
            <span className="absolute left-[3px] top-2 h-4 w-4 rounded-full bg-[#435B9D] ring-2 ring-slate-300" />

            <div className="flex flex-col items-start gap-2">
              {/* year is intentionally display-sized, keep as-is */}
              <div className={`text-5xl font-semibold leading-none ${item.colorClass || "text-slate-300"}`}>
                {item.year}
              </div>
              <p className="mt-2 bb-text text-slate-600 max-w-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileTimeline({ timeline = [] }) {
  if (!timeline?.length) return null;

  return (
    <div className="mt-2">
      <div className="mb-3 bb-text text-slate-500">Swipe to explore milestones →</div>

      <div className="-mx-4 px-4 overflow-x-auto">
        <div className="flex gap-4 min-w-max snap-x snap-mandatory">
          {timeline.map((item, idx) => (
            <div
              key={`mt-${idx}`}
              className="snap-start w-[260px] rounded-2xl border border-slate-200 bg-white p-5"
            >
              {/* year is intentionally display-sized, keep as-is */}
              <div className={`text-4xl font-semibold ${item.colorClass || "text-slate-300"}`}>{item.year}</div>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white ring-2 ring-slate-300" />
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="mt-3 bb-text text-slate-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}