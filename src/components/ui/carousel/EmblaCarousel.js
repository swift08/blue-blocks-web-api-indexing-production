// src/components/ui/carousel/EmblaCarousel.js
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

/**
 * Reusable Embla Carousel (JSON-driven)
 *
 * Props:
 * - items: array
 * - renderItem: (item, index) => ReactNode
 * - gapPx: number
 * - cardWidth: number (used when sizingMode="auto")
 * - carousel: {
 *    loop?: boolean,
 *    align?: "start" | "center",
 *    sizingMode?: "perView" | "auto",
 *    perView?: { desktop?: number, tablet?: number, mobile?: number },
 *    showDots?: boolean,
 *    navPosition?: "bottom" | "center",
 *    containScroll?: "trimSnaps" | "keepSnaps",
 *    skipSnaps?: boolean,
 *    showArrows?: boolean
 * }
 */
export default function EmblaCarousel({
  items = [],
  renderItem,
  gapPx = 24,
  cardWidth = 520,
  carousel = {},
}) {
  const loop = Boolean(carousel?.loop);
  const align = carousel?.align === "center" ? "center" : "start";
  const sizingMode = carousel?.sizingMode === "auto" ? "auto" : "perView";

  const perView = carousel?.perView || { desktop: 2, tablet: 2, mobile: 1 };
  const perViewNow = useResponsivePerView(perView);

  const showDots = carousel?.showDots !== false; // default true
  const showArrows = carousel?.showArrows !== false; // default true
  const navPosition = carousel?.navPosition === "center" ? "center" : "bottom";

  const containScroll =
    carousel?.containScroll === "keepSnaps" ? "keepSnaps" : "trimSnaps";
  const skipSnaps = Boolean(carousel?.skipSnaps);

  const safeCardWidth =
    Number.isFinite(cardWidth) && cardWidth > 0 ? cardWidth : 520;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align,
    skipSnaps,
    containScroll,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  const slideStyle = useMemo(() => {
    if (sizingMode === "auto") {
      return { flex: `0 0 ${safeCardWidth}px` };
    }
    return { flex: `0 0 ${calcSlideBasis(perViewNow, gapPx)}` };
  }, [sizingMode, safeCardWidth, perViewNow, gapPx]);

  const navButtonBase =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="relative">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div
          className="flex"
          style={{
            gap: `${gapPx}px`,
            paddingBottom: "4px",
            willChange: "transform",
          }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="min-w-0" style={slideStyle}>
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      {/* Center overlay arrows */}
      {showArrows && navPosition === "center" ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            className={`${navButtonBase} absolute left-2 top-1/2 -translate-y-1/2 z-10`}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className={`${navButtonBase} absolute right-2 top-1/2 -translate-y-1/2 z-10`}
            aria-label="Next"
          >
            ›
          </button>
        </>
      ) : null}

      {/* Bottom row controls */}
      {(showArrows || (showDots && scrollSnaps.length > 1)) ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          {/* Bottom arrows only when navPosition is bottom */}
          {showArrows && navPosition === "bottom" ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canPrev}
                className={navButtonBase}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canNext}
                className={navButtonBase}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          ) : (
            <div />
          )}

          {/* Dots */}
          {showDots && scrollSnaps.length > 1 ? (
            <div className="flex flex-wrap items-center justify-end gap-2">
              {scrollSnaps.map((_, i) => {
                const active = i === selectedIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollTo(i)}
                    className="h-2.5 w-2.5 rounded-full border border-slate-400 transition"
                    style={{
                      backgroundColor: active ? "#0f172a" : "transparent",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={active ? "true" : undefined}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function calcSlideBasis(perView, gapPx) {
  const n = Math.max(1, Number(perView) || 1);
  const gapTotal = gapPx * (n - 1);
  return `calc((100% - ${gapTotal}px) / ${n})`;
}

function useResponsivePerView(perView) {
  const get = useCallback(() => {
    if (typeof window === "undefined") return perView?.desktop || 2;
    const w = window.innerWidth;

    if (w >= 1024) return perView?.desktop ?? 2;
    if (w >= 640) return perView?.tablet ?? 2;
    return perView?.mobile ?? 1;
  }, [perView]);

  const [value, setValue] = useState(get);

  useEffect(() => {
    const onResize = () => setValue(get());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [get]);

  return value;
}