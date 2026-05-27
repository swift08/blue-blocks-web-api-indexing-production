import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import ReadMoreBlock from "@/components/ui/ReadMoreBlock";
import RichTextContent from "@/components/ui/RichTextContent";

const pillClass = {
  sky: "bg-[#95D6ED]",
  peach: "bg-[#F9A78F]",
  yellow: "bg-[#F9E48F]",
};

export default function Insights({
  title,
  subtitle,
  eyebrow,
  hasCTA,
  sectionBg = "",
  bgClassName = "bg-[#f5efe6]",
  bg,
  items = [],
  containerClassName = "py-14",
  cols = { base: 1, sm: 3, md: 3 },
  gapClassName = "gap-5",
}) {
  const resolved = resolveBg(sectionBg || bg || bgClassName);
  const gridColsClass = `grid grid-cols-${cols.base} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md}`;

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className={["bb-section__inner", containerClassName].filter(Boolean).join(" ")}>
        <div className="text-center">
          {eyebrow ? <RichTextContent as="div" value={eyebrow} className="bb-eyebrow" /> : null}
          {title ? <RichTextContent as="h2" value={title} className="bb-section-title mt-2" /> : null}
          {subtitle ? <RichTextContent as="p" value={subtitle} className="bb-subtitle mt-3" /> : null}
        </div>

        <div className={`mt-8 ${gridColsClass} ${gapClassName}`}>
          {items.map((it) => {
            const cardBgStyle = it.cardBg ? { backgroundColor: it.cardBg } : undefined;
            const cardBgClass = it.cardBg ? "" : (pillClass[it.tone] || "bg-slate-200");

            return (
              <div
                key={it.title}
                className={`rounded-2xl p-6 border border-black/5 ${cardBgClass}`}
                style={cardBgStyle}
              >
                <div className="flex items-start justify-between gap-3">
                  {it.pillSec ? (
                    <span
                      className="bb-pill"
                      style={{
                        "--bb-pill-bg": "rgba(255,255,255,0.30)",
                        "--bb-pill-border": "transparent",
                      }}
                    >
                      <RichTextContent as="span" value={it.pillSec} className="bb-pill__text" />
                    </span>
                  ) : (
                    <span />
                  )}

                  {it.pill ? (
                    <span
                      className="bb-pill"
                      style={{
                        "--bb-pill-bg": "rgba(255,255,255,0.30)",
                        "--bb-pill-border": "transparent",
                      }}
                    >
                      <RichTextContent as="span" value={it.pill} className="bb-pill__text" />
                    </span>
                  ) : null}
                </div>

                <RichTextContent as="div" value={it.title} className="bb-text font-semibold mt-3" />

                {it.meta ? <RichTextContent as="div" value={it.meta} className="bb-text mt-2" /> : null}

                <ReadMoreBlock
                  readMore={it.readMore}
                  className=""
                  contentClassName="bb-text"
                  buttonClassName="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:opacity-80"
                />

                {it.bullets ? (
                  <ul className="mt-4 space-y-2 bb-text">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-900/60 flex-shrink-0" />
                        <RichTextContent as="span" value={b} />
                      </li>
                    ))}
                  </ul>
                ) : null}

                {hasCTA ? (
                  <div className="mt-5 underline underline-offset-4">
                    <RichTextContent as="span" value={it.cta?.label || "Read this guide →"} allowHtml={false} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
