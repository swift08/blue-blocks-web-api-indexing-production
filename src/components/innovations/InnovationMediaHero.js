import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

function stripTypographySizing(className = "") {
  return String(className)
    .split(/\s+/)
    .filter((t) => {
      if (!t) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?text-/.test(t)) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?font-/.test(t)) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?leading-/.test(t)) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?tracking-/.test(t)) return false;
      return true;
    })
    .join(" ")
    .trim();
}

export default function InnovationMediaHero({
  spacingTop,
  image,
  title,
  subtitle,

  // legacy default had text-xs/sm:text-sm; keep prop but strip sizing tokens
  cardTextClassName = "mt-3 text-white/85 text-xs sm:text-sm leading-relaxed",

  primaryCta,
  secondaryCta,

  // NEW
  sectionBg = "",

  // legacy wrapper behavior
  bg = "bg-white",
}) {
  const resolved = resolveBg(sectionBg || bg);
  console.log("✅ InnovationMediaHero (NEW) is rendering", { title, subtitle, description });

  return (
    <section className={["bb-ui", resolved.className, spacingTop].filter(Boolean).join(" ")} style={resolved.style}>
      <div className="bb-section">
        <div className="bb-section__inner">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-slate-100">
              <div className="relative aspect-[16/10] sm:aspect-[16/8]">
                <Image
                  src={image}
                  alt={title || "Innovation"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 640px) 90vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/45" />
              </div>

              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-6 sm:p-10">
                  {title ? <h1 className="bb-section-title text-white whitespace-pre-line">{title}</h1> : null}
                  {subtitle ? (
                    <p className={["mt-8 bb-text text-white/85", stripTypographySizing(cardTextClassName)].filter(Boolean).join(" ")}>
                      {subtitle}
                    </p>
                  ) : null}

                  {(primaryCta?.href && primaryCta?.label) || (secondaryCta?.href && secondaryCta?.label) ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {primaryCta?.href && primaryCta?.label ? (
                        <Link className="bb-btn bb-btn--primary" href={primaryCta.href}>
                          {primaryCta.label}
                        </Link>
                      ) : null}

                      {secondaryCta?.href && secondaryCta?.label ? (
                        <Link className="bb-btn bb-btn--secondary" href={secondaryCta.href}>
                          {secondaryCta.label}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}