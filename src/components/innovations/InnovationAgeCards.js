import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";

/**
 * Standard tone classes (prefer token classes instead of raw hex here).
 * If you want to keep exact figma colors, you can map these to bg-[#...] too.
 */
const TONES = {
  navy: "bg-[#243B7B] text-white",
  mint: "bg-[#8FC4A3] text-white", // figma looks like green with white text
  coral: "bg-[#D9815E] text-white",
};

export default function InnovationAgeCards({
  // ✅ standardized background (NEW)
  sectionBg = "bg-white",

  // OLD support if you already used "bg" in json somewhere
  bg = "",

  eyebrow,
  title,
  desc,
  cardWidth = "sm:w-[15.5rem]",
  cards = [],
  footnote,

  // optional future-proofing
  align = "center",
}) {
  const { heading, flow } = splitFootnote(footnote);

  // prefer new prop, fallback to old
  const resolvedSection = resolveBg(sectionBg || bg);

  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          {/* Keep Container for your existing layout system,
              but remove extra vertical padding because bb-section handles it */}
          <Container className="py-0">
            {/* Eyebrow pill */}
            {eyebrow ? (
              <div className="flex justify-center">
                <span className="rounded-full bg-[#EEF0FF] px-6 py-2 text-[0.625rem] font-semibold tracking-[0.18em] text-[#2B2F87]">
                  {eyebrow}
                </span>
              </div>
            ) : null}

            {/* Title */}
            {title ? (
              <h2 className={`bb-section-title mt-6 ${alignClass}`}>
                {renderMultiline(title)}
              </h2>
            ) : null}

            {/* Description */}
            {desc ? (
              <div className={`bb-text ${alignClass}`}>
                <p>{desc}</p>
              </div>
            ) : null}

            {/* Cards row */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              {cards.map((c, idx) => (
                <AgeCard
                  key={`${c.tag}-${idx}`}
                  tone={c.tone}
                  tag={c.tag}
                  text={c.text}
                  icon={c.icon}
                  cardWidth={cardWidth}
                />
              ))}
            </div>

            {/* Research loop box */}
            {(heading || flow) ? (
              <div className="mt-8 sm:mt-10 flex justify-center">
                <div className="w-full max-w-[54rem] rounded-2xl border border-black/15 bg-white px-5 py-6 text-center sm:px-8">
                  {heading ? (
                    <div className="text-[#2F6FED] font-medium text-[1.375rem] leading-tight sm:text-[1.75rem]">
                      {normalizeQuotes(heading)}
                    </div>
                  ) : null}

                  {flow ? (
                    <div className="mt-2 text-[#111827] leading-6">
                      {flow}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </Container>
        </div>
      </div>
    </section>
  );
}

/* -------------------- pieces -------------------- */

function AgeCard({ tone, tag, text, icon, cardWidth }) {
  return (
    <div
      className={[
        `relative w-full ${cardWidth} rounded-2xl px-6 py-6 sm:px-7 sm:py-7`,
        `shadow-[0_10px_30px_rgba(0,0,0,0.08)]`,
        TONES[tone] || "bg-slate-100 text-slate-900",
      ].join(" ")}
    >
      {/* Icon */}
      {icon ? (
        <div className="mb-8 relative h-8 w-8">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
      ) : null}

      {/* Age */}
      <div className="text-[2.25rem] leading-none font-medium tracking-tight">
        {tag}
      </div>

      {/* Description */}
      <div className="mt-3 leading-5 opacity-90">
        {text}
      </div>
    </div>
  );
}

function renderMultiline(text) {
  return String(text)
    .split("\n")
    .map((line, idx) => (
      <span key={idx} className="block">
        {line}
      </span>
    ));
}

function splitFootnote(footnote) {
  if (!footnote) return { heading: "", flow: "" };

  const parts = String(footnote).split("—");
  if (parts.length >= 2) {
    return {
      heading: parts[0].trim(),
      flow: parts.slice(1).join("—").trim(),
    };
  }

  const parts2 = String(footnote).split(":");
  if (parts2.length >= 2) {
    return {
      heading: parts2[0].trim(),
      flow: parts2.slice(1).join(":").trim(),
    };
  }

  return { heading: String(footnote).trim(), flow: "" };
}

function normalizeQuotes(str) {
  return String(str)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');
}