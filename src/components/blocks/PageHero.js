import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import { normalizeSiteHref } from "@/lib/links";

export default function PageHero({
  title,
  breadcrumb = [],
  bg, // legacy object { base, leftArc, rightArc }
  sectionBg = "", // preferred
}) {
  // support both the new token system and the legacy bg.base
  const resolved = resolveBg(sectionBg || bg?.base || "#F3E3CF");

  return (
    <section
      className={["bb-ui", "relative overflow-hidden", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      {/* fixed header space (manual) */}
      <div className="pt-32 sm:pt-36" />

      {/* arcs (legacy) */}
      {bg?.leftArc ? (
        <img
          src={bg.leftArc}
          alt=""
          className="pointer-events-none absolute left-0 top-0 h-full w-auto opacity-100"
        />
      ) : null}
      {bg?.rightArc ? (
        <img
          src={bg.rightArc}
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-auto opacity-100"
        />
      ) : null}

      <div className="bb-section">
        <div className="bb-section__inner">
          <Container className="relative text-center">
            {title ? <h1 className="bb-section-title text-slate-900">{title}</h1> : null}

            {breadcrumb?.length ? (
              <div className="mt-3 bb-text text-slate-700/70">
                {breadcrumb.map((b, i) => (
                  <span key={`${b.label}-${i}`}>
                    {b.href ? (
                      <a href={normalizeSiteHref(b.href)} className="hover:text-slate-900 transition">
                        {b.label}
                      </a>
                    ) : (
                      <span className="text-slate-900">{b.label}</span>
                    )}
                    {i < breadcrumb.length - 1 ? "  ›  " : ""}
                  </span>
                ))}
              </div>
            ) : null}
          </Container>
        </div>
      </div>
    </section>
  );
}
