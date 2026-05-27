import Link from "next/link";
import Container from "@/components/layout/Container";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProgramsGrid({
  eyebrow = "OUR PROGRAMS",
  title = "THE PROGRAMS",
  subtitle = "",
  items = [],
}) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          {eyebrow ? (
            <div className="inline-flex rounded-full bg-[#EEF0FF] px-5 py-2 text-[0.625rem] font-semibold tracking-[0.18em] text-[#2C2F8F]">
              {eyebrow}
            </div>
          ) : null}

          {title ? (
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold text-[#131313] main-title">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <p className="mt-3 leading-relaxed text-[#7A7A7A]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2 max-w-3xl m-auto">
          {items.map((it, idx) => (
            <ProgramCard key={`${it?.id || it?.cardTitle || "card"}-${idx}`} item={it} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------- Card -------------------- */

function ProgramCard({ item }) {
  const {
    badge = "",
    cardTitle = "",
    focusLabel = "Focus",
    focusText = "",
    environmentTitle = "The Environment:",
    environmentText = "",
    parentTitle = "The Parent Perspective:",
    parentText = "",
    cta = { label: "Explore", href: "#" },

    // Theme tokens (set via JSON)
    theme = {
      bg: "#F8B09D",
      text: "#131313",
      pillBg: "rgba(255,255,255,0.75)",
      pillText: "#131313",
      focusBg: "rgba(0,0,0,0.06)",
      focusText: "#131313",
      subtleText: "rgba(19,19,19,0.68)",
      ctaText: "#131313",
    },
  } = item || {};

  return (
    <div
      className="relative rounded-[1.25rem] p-6 sm:p-7"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Badge (top-right pill) */}
      {badge ? (
        <div className="flex justify-end pb-2">
          <span
            className="flex items-center rounded-full px-4 py-2 text-[0.625rem] font-medium"
            style={{
              backgroundColor: theme.pillBg,
              color: theme.pillText,
            }}
          >
            {badge}
          </span>
        </div>
      ) : null}

      {/* Title */}
      {cardTitle ? (
        <h3 className="pr-6 text-[0.875rem] sm:text-[0.95rem] font-medium tracking-[0.08em] uppercase">
          {cardTitle}
        </h3>
      ) : null}

      {/* Focus strip */}
      {(focusLabel || focusText) ? (
        <div
          className="mt-5 rounded-[0.5rem] px-4 py-3"
          style={{ backgroundColor: theme.focusBg }}
        >
          <div className="text-[0.75rem] sm:text-[0.8125rem]">
            <span className="font-semibold">{focusLabel}:</span>{" "}
            <span style={{ color: theme.focusText }}>{focusText}</span>
          </div>
        </div>
      ) : null}

      {/* Content */}
      <div className="mt-5 space-y-4">
        {environmentText ? (
          <div>
            <div className="text-[0.75rem] sm:text-[0.8125rem] font-semibold">
              {environmentTitle}
            </div>
            <p
              className="mt-2 text-[0.75rem] sm:text-[0.8125rem] leading-relaxed"
              style={{ color: theme.subtleText }}
            >
              {environmentText}
            </p>
          </div>
        ) : null}

        {parentText ? (
          <div>
            <div className="text-[0.75rem] sm:text-[0.8125rem] font-semibold">
              {parentTitle}
            </div>
            <p
              className="mt-2 text-[0.75rem] sm:text-[0.8125rem] leading-relaxed"
              style={{ color: theme.subtleText }}
            >
              {parentText}
            </p>
          </div>
        ) : null}
      </div>

      {/* CTA bottom-right */}
      {cta?.href ? (
        <div className="mt-6 flex justify-end">
          <Link
            href={cta.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.75rem] font-medium",
              "transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/10"
            )}
            style={{ color: theme.ctaText }}
          >
            {cta.label} <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
