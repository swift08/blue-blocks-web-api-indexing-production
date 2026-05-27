"use client";

import Image from "next/image";
import { useMemo } from "react";
import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";
import Link from "next/link";
import { resolveBg } from "@/lib/ui";
import ReadMoreBlock from "@/components/ui/ReadMoreBlock";

export default function InnovationHabitSplit({
  image,
  eyebrow,
  title,
  subtitle,
  description,

  // ✅ Standard (NEW)
  sectionBg = "bg-white",

  // ✅ Backward compatibility (OLD)
  bg = "",

  subdescription = [],
  className,
  readMore,

  bullets = [],
  images = [],

  details = [],
  detailsClassName = "",
  detailsLabelClassName = "text-[1.3rem] tracking-[0.12em] uppercase text-[#9A9A9A]",
  detailsValueClassName = "text-[1.3rem] sm:text-[1.3rem] font-semibold text-[#1B1B1B]",
  detailsDividerClassName = "border-black/10",

  // keep existing but default to bb-text color
  descriptionClassName = "",
}) {
  const safeItems = useMemo(() => (images || []).filter(Boolean), [images]);
  const total = safeItems.length;
  const hasDetails = Array.isArray(details) && details.length > 0;

  // Prefer standardized prop, fallback to old
  const resolvedSection = resolveBg(sectionBg || bg);

  // Typography defaults (centralized)
  const finalDescriptionClassName = descriptionClassName || "bb-text";

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          {/* Keep Container; do not add extra vertical padding (bb-section handles it) */}
          <Container className="py-0">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left Side: Carousel */}
              <div className="lg:col-span-6 relative">
                <div
                  aria-hidden
                  className="absolute top-0 left-0 -translate-x-[1%] translate-y-[1%] w-[100%] h-full rounded-[28px] bg-[#FFDBAE] border border-black/20"
                />

                <div className="relative">
                  <CarouselTrack
                    total={total}
                    initialIndex={0}
                    swipeThreshold={60}
                    rubberBand={true}
                    perView={{ base: 1, md: 1, lg: 1 }}
                    gap={0}
                    paddingX={0}
                    arrows={{ show: false }}
                    autoplay={{
                      enabled: true,     // ← from JSON
                      delay: 3500,       // ← from JSON
                      loop: true,
                      pauseOnHover: true,
                      pauseOnDrag: true,
                    }}
                    dots={{
                      show: total > 1,
                      showOn: "both",
                      count: total,
                      className: "bb-carousel-dots absolute w-full bottom-3",
                      dotClassName: "bb-carousel-dot",
                      activeClassName: "bb-carousel-dot--active",
                      inactiveClassName: "bb-carousel-dot--inactive",
                      focusRingClassName: "bb-carousel-dot--focus",
                    }}
                    className="overflow-hidden"
                  >
                    {safeItems.map((card, idx) => (
                      <div key={`slide-${idx}`} className="w-full shrink-0 px-2 flex">
                        <ImageCard {...card} />
                      </div>
                    ))}
                  </CarouselTrack>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="lg:col-span-6">
                {eyebrow ? <div className="bb-eyebrow">{eyebrow}</div> : null}

                {title ? <h2 className="bb-section-title mt-2">{title}</h2> : null}

                {subtitle ? <h3 className="bb-section-subtitle mt-2">{subtitle}</h3> : null}

                {description ? (
                  <div className={finalDescriptionClassName}>
                    <p>{description}</p>
                  </div>
                ) : null}

                {Array.isArray(subdescription) && subdescription.length ? (
                  <div className={finalDescriptionClassName}>
                    {subdescription.map((p, idx) =>
                      typeof p === "string" ? (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                      ) : null
                    )}
                  </div>
                ) : null}
                
                <ReadMoreBlock
                  readMore={readMore}
                  className=""
                  contentClassName="bb-text"
                  buttonClassName="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:opacity-80"
                />

                {/* Details rows */}
                {hasDetails ? (
                  <div className={`mt-8 ${detailsClassName}`}>
                    <div className="divide-y" style={{ borderColor: "transparent" }}>
                      {details.map((row, idx) => (
                        <div
                          key={`${row?.label || "row"}-${idx}`}
                          className={[
                            "grid items-center gap-6 py-4 border-b",
                            "grid-cols-1 sm:grid-cols-[300px_1fr]",
                            detailsDividerClassName,
                          ].join(" ")}
                        >
                          <div className={detailsLabelClassName}>{row?.label}</div>
                          <div className={detailsValueClassName}>
                            {row?.href ? <Link href={row.href}>{row.value}</Link> : row?.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Bullets */}
                {bullets?.length ? (
                  <div className="mt-6 space-y-6">
                    {bullets.map((b, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        {b.icon ? (
                          <span className="mt-1 inline-flex flex-shrink-0 items-center justify-center">
                            <Image
                              src={b.icon}
                              alt={b.title || ""}
                              width={52}
                              height={52}
                              className="object-contain"
                            />
                          </span>
                        ) : null}

                        <div className={className || ""}>
                          {b.title ? <div className="bb-text font-semibold text-[#1B1B1B]">{b.title}</div> : null}
                          {b.text ? (
                            <div className="bb-text mt-1 text-[#1B1B1B]/55 leading-relaxed">
                              {b.text}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function ImageCard({ icon }) {
  return (
    <div className="relative h-[420px] sm:h-[680px] w-full rounded-[28px] overflow-hidden border border-black/20 bg-white">
      {icon ? (
        <Image
          src={icon}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 680px"
          priority={false}
        />
      ) : null}
    </div>
  );
}