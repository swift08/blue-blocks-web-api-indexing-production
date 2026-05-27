"use client";

import { useMemo } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";
import { resolveBg } from "@/lib/ui";

export default function AdmissionsJourney({
  eyebrow,
  title,
  items = [],

  // NEW
  sectionBg = "bg-white",
}) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const total = safeItems.length;

  const resolved = resolveBg(sectionBg);

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner">
        {/* Header */}
        <div className="text-center">
          {eyebrow ? (
            <div
              className="bb-pill"
              style={{
                "--bb-pill-bg": "#E7E8FF",
                "--bb-pill-border": "transparent",
                "--bb-pill-text": "#2C2F8F",
              }}
            >
              <span className="bb-pill__text">{eyebrow}</span>
            </div>
          ) : null}

          {title ? <h2 className="bb-section-title mt-4 whitespace-pre-line">{title}</h2> : null}
        </div>

        {/* DESKTOP (static) */}
        <div className="hidden lg:grid mt-10 grid-cols-4 gap-6 items-stretch">
          {safeItems.map((card, idx) => (
            <JourneyCard key={`desktop-${idx}`} {...card} />
          ))}
        </div>

        {/* MOBILE / TABLET */}
        <div className="lg:hidden mt-10 relative">
          <CarouselTrack
            total={total}
            initialIndex={0}
            swipeThreshold={60}
            rubberBand={true}
            perView={{ base: 1, md: 1, lg: 1 }}
            gap={0}
            paddingX={0}
            mode="page"
            arrows={{ show: false }}
            dots={{
              show: total > 1,
              showOn: "mobile",
              count: total,
              className: "bb-carousel-dots",
              dotClassName: "bb-carousel-dot",
              activeClassName: "bb-carousel-dot--active",
              inactiveClassName: "bb-carousel-dot--inactive",
              focusRingClassName: "bb-carousel-dot--focus",
            }}
            className="overflow-hidden"
          >
            {() =>
              safeItems.map((card, idx) => (
                <div key={`mobile-${idx}`} className="w-full shrink-0 px-10 flex">
                  <JourneyCard {...card} />
                </div>
              ))
            }
          </CarouselTrack>
        </div>
      </Container>
    </section>
  );
}

function JourneyCard({
  icon,
  title,
  text,
  cardTextClassName = "bb-card-text", // ✅ default now global
}) {
  return (
    <div className="rounded-2xl bg-[#F3E3CF] px-6 py-6 h-full w-full flex flex-col justify-flex-start">
      <div className="flex items-center justify-center">
        <div className="relative h-10 w-10">
          {icon ? <Image src={icon} alt={title || ""} fill className="object-contain" /> : null}
        </div>
      </div>

      <div className="text-center">
        {title ? <div className="bb-card-subtitle mt-2">{title}</div> : null}

        {Array.isArray(text) && text.length ? (
          <div className="mt-2">
            {text.map((p, idx) =>
              typeof p === "string" ? (
                <p className={cardTextClassName} key={idx} dangerouslySetInnerHTML={{ __html: p }} />
              ) : null
            )}
          </div>
        ) : typeof text === "string" ? (
          <p className="mt-2" dangerouslySetInnerHTML={{ __html: text }} />
        ) : null}
      </div>
    </div>
  );
}