"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";

export default function InsightsCarousel({
  title,
  subtitle,
  items = [],
  bg = "#D97B58",
}) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const total = safeItems.length;

  // Controller exposed by CarouselTrack (for arrows below)
  const [ctrl, setCtrl] = useState(null);

  const perViewDesktop = 3;
  const showArrows = total > perViewDesktop;

  return (
    <section style={{ backgroundColor: bg }} className="w-full">
      <Container className="py-14 sm:py-16">
        {/* Heading */}
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight whitespace-pre-line">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-4 mx-auto max-w-3xl text-sm sm:text-base text-white/90 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* MOBILE: stacked */}
        <div className="mt-10 grid gap-4 md:hidden">
          {safeItems.map((item, idx) => (
            <InsightCard key={`mobile-${idx}`} item={item} />
          ))}
        </div>

        {/* DESKTOP: carousel */}
        <div className="hidden md:block mt-12">
          <CarouselTrack
            total={total}
            initialIndex={0}
            swipeThreshold={60}
            rubberBand={true}
            perView={{ base: 1, md: 3, lg: 3 }}
            gap={24}
            paddingX={0}
            dots={{ show: false }}
            arrows={{ show: false }} // we render arrows below
            maxIndexOverride={Math.max(0, total - perViewDesktop)}
            onControllerChange={setCtrl}
          >
            {({ cardW }) =>
              safeItems.map((item, idx) => (
                <div
                  key={`desktop-${idx}`}
                  style={{ width: cardW }}
                  className="shrink-0"
                >
                  <InsightCard item={item} />
                </div>
              ))
            }
          </CarouselTrack>

          {/* Arrows BELOW carousel (Desktop only) */}
          {showArrows ? (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => ctrl?.goPrev?.()}
                disabled={!ctrl || ctrl.active === 0}
                aria-label="Previous"
                className={`h-10 w-10 rounded-full border border-white/70 text-white grid place-items-center transition
                ${
                  !ctrl || ctrl.active === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => ctrl?.goNext?.()}
                disabled={!ctrl || ctrl.active === ctrl.maxIndex}
                aria-label="Next"
                className={`h-10 w-10 rounded-full border border-white/70 text-white grid place-items-center transition
                ${
                  !ctrl || ctrl.active === ctrl.maxIndex
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function InsightCard({ item }) {
  const { image, title, description, href = "#" } = item || {};

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-[190px_1fr] p-1">
        <div className="relative h-[160px] w-[190px] rounded-l-2xl overflow-hidden bg-slate-200">
          {image ? (
            <Image
              src={image}
              alt={title || "Insight"}
              fill
              sizes="190px"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="px-4 flex flex-col justify-between">
          <p className="text-[0.75rem] text-slate-700 leading-relaxed line-clamp-5">
            {description}
          </p>

          <div className="mt-3 flex justify-end">
            <Link
              href={href}
              className="text-sm text-[#0E4AA2] hover:underline inline-flex items-center gap-1"
            >
              Read Now <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}