import Link from "next/link";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

const toneClass = {
  peach: "bg-orange-200/70",
  yellow: "bg-yellow-200/70",
  sky: "bg-sky-200/70",
  navy: "bg-[#1f2a44] text-white",
};

export default function JourneyCards({
  title,
  subText,
  cards = [],

  // NEW (preferred)
  sectionBg = "",

  // OLD (kept)
  bg = "#f5efe6",
}) {
  const resolved = resolveBg(sectionBg || bg);

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner">
        {title ? <h2 className="bb-section-title text-center">{title}</h2> : null}
        {subText ? <p className="bb-subtitle text-center mt-3">{subText}</p> : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`rounded-2xl p-5 shadow-sm ${toneClass[c.tone] || "bg-white"}`}
            >
              <div className="flex justify-end gap-3 pb-1">
                {c.tag ? (
                  <span
                    className="bb-pill"
                    style={{
                      "--bb-pill-bg": "rgba(255,255,255,0.6)",
                      "--bb-pill-border": "transparent",
                      "--bb-pill-text": "inherit",
                    }}
                  >
                    <span className="bb-pill__text">{c.tag}</span>
                  </span>
                ) : null}
              </div>

              <div className="bb-text font-semibold whitespace-pre-line">{c.title}</div>

              <div className="bb-text mt-3 opacity-80">
                {c.text || "The formative years are guided with independence and curiosity."}
              </div>

              {c.cta ? (
                <Link
                  href={c.cta.href}
                  className="mt-5 inline-flex items-center underline underline-offset-4"
                >
                  {c.cta.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}