import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

export default function AcademicsIntro({
  image, // { src, alt }
  eyebrow,
  spacingTop,
  title,
  subtitle,
  promiseTitle = "The Promise",
  promiseItems = [], // [{ icon, title, text }]

  // OLD (kept)
  bg = "#ffffff",

  // NEW (preferred)
  sectionBg = "",

  promiseBg = "#F3E3CF",
  promiseCardBg = "#F7EADB",

  // OLD prop kept (but default now uses global typography class)
  cardTextClassName = "bb-text bb-text--muted mt-6",
}) {
  const sectionResolved = resolveBg(sectionBg || bg);
  const promiseResolved = resolveBg(promiseBg);
  const promiseCardResolved = resolveBg(promiseCardBg);

  return (
    <section
      className={["bb-ui", "bb-section", spacingTop, sectionResolved.className].filter(Boolean).join(" ")}
      style={sectionResolved.style}
    >
      <Container className="bb-section__inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100 aspect-[4/3]">
              {image?.src ? (
                <Image
                  src={image.src}
                  alt={image.alt || title || "Academics"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              ) : null}
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-6 lg:pt-2">
            {eyebrow ? (
              <div
                className="bb-pill"
                style={{
                  "--bb-pill-bg": "#EEF0FF",
                  "--bb-pill-border": "transparent",
                  "--bb-pill-text": "#2C2F8F",
                }}
              >
                <span className="bb-pill__text">{eyebrow}</span>
              </div>
            ) : null}

            {title ? <h2 className="bb-section-title mt-5">{title}</h2> : null}

            {Array.isArray(subtitle) && subtitle.length ? (
              <div>
                {subtitle.map((p, idx) =>
                  typeof p === "string" ? (
                    <p className={cardTextClassName} key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                  ) : null
                )}
              </div>
            ) : typeof subtitle === "string" ? (
              <p className={cardTextClassName} dangerouslySetInnerHTML={{ __html: subtitle }} />
            ) : null}

            {/* Promise box */}
            <div
              className={["mt-8 rounded-[1rem] p-6 sm:p-7", promiseResolved.className].filter(Boolean).join(" ")}
              style={promiseResolved.style}
            >
              <div className="bb-card-title">{promiseTitle}</div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {promiseItems.map((p, idx) => (
                  <div
                    key={`${p.title ?? "promise"}-${idx}`}
                    className={["rounded-[0.9rem] p-4 sm:p-5 text-center", promiseCardResolved.className]
                      .filter(Boolean)
                      .join(" ")}
                    style={promiseCardResolved.style}
                  >
                    {p.icon ? (
                      <div className="mx-auto relative h-10 w-10">
                        <Image src={p.icon} alt="" fill className="object-contain" sizes="40px" />
                      </div>
                    ) : null}

                    {p.title ? <div className="bb-card-subtitle mt-4">{p.title}</div> : null}
                    {p.text ? <div className="bb-card-text mt-1">{p.text}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}